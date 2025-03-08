import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getMarketPrices } from './services/apiService';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Fix for default Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon for vendors
const vendorIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  className: 'vendor-marker'
});

// Map recenter component
const ChangeMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const MarketPrices = () => {
  const [marketPriceData, setMarketPriceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visibleData, setVisibleData] = useState([]); // First 8 items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('prices'); // 'prices', 'map', 'marketplace', 'trading', 'community', 'resources', 'analytics'
  const [showAllData, setShowAllData] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Vendor data with locations
  const [vendors] = useState([
    { 
      id: 1, 
      name: "Kathmandu Farmers Market", 
      contact: "+977 985-123-4567", 
      commodities: "Vegetables, Fruits", 
      position: [27.7172, 85.3240],
      operatingHours: "Wed & Sat: 7 AM - 1 PM"
    },
    { 
      id: 2, 
      name: "Patan Organic Bazaar", 
      contact: "+977 980-456-7890", 
      commodities: "Organic Produce", 
      position: [27.6588, 85.3247],
      operatingHours: "Daily: 6 AM - 12 PM"
    },
    { 
      id: 3, 
      name: "Bhaktapur Fresh Market", 
      contact: "+977 981-234-5678", 
      commodities: "Rice, Grains, Vegetables", 
      position: [27.6710, 85.4298],
      operatingHours: "Mon-Fri: 5 AM - 11 AM"
    },
    { 
      id: 4, 
      name: "Pokhara Lakeside Market", 
      contact: "+977 982-345-6789", 
      commodities: "All Farm Produce", 
      position: [28.2096, 83.9856],
      operatingHours: "Daily: 7 AM - 2 PM"
    },
    { 
      id: 5, 
      name: "Chitwan Agricultural Hub", 
      contact: "+977 984-567-8901", 
      commodities: "Rice, Maize, Vegetables", 
      position: [27.5291, 84.3542],
      operatingHours: "Tue & Fri: 8 AM - 3 PM"
    }
  ]);
  
  // Map state
  const [mapCenter, setMapCenter] = useState([27.7172, 85.3240]); // Default to Kathmandu
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  
  // New marketplace form state
  const [productForm, setProductForm] = useState({
    productName: '',
    quantity: '',
    quality: 'Standard',
    price: '',
    availability: '',
    location: ''
  });

  // Products, fertilizers, and local items for trading
  const [tradingItems] = useState([
    { id: 1, type: 'crop', name: 'Premium Rice', price: 70, seller: 'Ram Sharma', location: 'Chitwan', image: 'rice.jpg', quantity: '100 kg' },
    { id: 2, type: 'crop', name: 'Organic Tomatoes', price: 85, seller: 'Sita Thapa', location: 'Kavre', image: 'tomatoes.jpg', quantity: '50 kg' },
    { id: 3, type: 'fertilizer', name: 'Organic Compost', price: 20, seller: 'Agro Nepal', location: 'Kathmandu', image: 'compost.jpg', quantity: '25 kg bags' },
    { id: 4, type: 'fertilizer', name: 'NPK 20-20-20', price: 1200, seller: 'Farmer Supplies Co.', location: 'Bharatpur', image: 'npk.jpg', quantity: '50 kg bags' },
    { id: 5, type: 'local', name: 'Handmade Bamboo Baskets', price: 350, seller: 'Harka Tamang', location: 'Gorkha', image: 'baskets.jpg', quantity: '10 pieces' },
    { id: 6, type: 'local', name: 'Natural Honey', price: 800, seller: 'Mountain Bee Farm', location: 'Dhading', image: 'honey.jpg', quantity: '1 kg jars' },
    { id: 7, type: 'crop', name: 'Fresh Cauliflower', price: 65, seller: 'Bishnu KC', location: 'Pokhara', image: 'cauliflower.jpg', quantity: '40 kg' },
    { id: 8, type: 'crop', name: 'Green Chillies', price: 120, seller: 'Maya Gurung', location: 'Lamjung', image: 'chillies.jpg', quantity: '10 kg' },
    { id: 9, type: 'fertilizer', name: 'Vermicompost', price: 35, seller: 'Green Earth', location: 'Lalitpur', image: 'vermicompost.jpg', quantity: '20 kg bags' },
    { id: 10, type: 'local', name: 'Traditional Dhaka Cloth', price: 1200, seller: 'Nepali Crafts', location: 'Bhaktapur', image: 'dhaka.jpg', quantity: '5 meters' },
    { id: 11, type: 'crop', name: 'Fresh Ginger', price: 115, seller: 'Prakash Magar', location: 'Palpa', image: 'ginger.jpg', quantity: '25 kg' },
    { id: 12, type: 'local', name: 'Himalayan Pink Salt', price: 250, seller: 'Mountain Treasures', location: 'Mustang', image: 'salt.jpg', quantity: '1 kg packs' }
  ]);
  
  const [visibleTradingItems, setVisibleTradingItems] = useState([]);
  const [tradingFilter, setTradingFilter] = useState('all');
  const [tradingSearchTerm, setTradingSearchTerm] = useState('');

  // Community Forum state
  const [communityPosts] = useState([
    {
      id: 1,
      author: "Hari Thapa",
      title: "Tips for growing tomatoes in Kathmandu valley",
      content: "I've been experimenting with different tomato varieties in the Kathmandu valley and wanted to share my experience...",
      likes: 24,
      comments: 7,
      date: "2 days ago",
      tags: ["tomatoes", "organic", "kathmandu"]
    },
    {
      id: 2,
      author: "Sarita Poudel",
      title: "Looking for advice on natural pest control",
      content: "My vegetable garden has been infested with aphids. I'm trying to avoid chemical pesticides. Has anyone tried neem oil or other natural solutions?",
      likes: 18,
      comments: 12,
      date: "5 days ago",
      tags: ["pests", "organic", "solutions"]
    },
    {
      id: 3,
      author: "Bijay Sharma",
      title: "Weather alert: Prepare your farms for heavy rainfall",
      content: "According to the latest forecasts, we should expect heavy rainfall in central Nepal next week. Here are some tips to protect your crops...",
      likes: 42,
      comments: 15,
      date: "1 day ago",
      tags: ["weather", "rainfall", "preparation"]
    },
    {
      id: 4,
      author: "Krishna Adhikari",
      title: "Success with new rice variant in Chitwan",
      content: "I switched to the new drought-resistant rice variant this season and my yield increased by 30%. Happy to share more details with interested farmers.",
      likes: 36,
      comments: 20,
      date: "3 days ago",
      tags: ["rice", "chitwan", "success"]
    },
    {
      id: 5,
      author: "Anita Gurung",
      title: "Farmer's market in Pokhara - Join us!",
      content: "We're organizing a weekend farmer's market in Pokhara next month. If you're interested in setting up a stall, please contact me...",
      likes: 27,
      comments: 8,
      date: "4 days ago",
      tags: ["market", "pokhara", "event"]
    }
  ]);

  // Educational resources state
  const [resources] = useState([
    {
      id: 1,
      title: "Organic Farming Techniques",
      description: "Learn sustainable practices for organic farming in Nepal's diverse climate zones.",
      type: "video",
      duration: "45 mins",
      author: "Nepal Agricultural Research Council",
      image: "organic_farming.jpg"
    },
    {
      id: 2,
      title: "Seasonal Planting Calendar",
      description: "Month-by-month guide for planting different crops across Nepal's regions.",
      type: "pdf",
      size: "2.4 MB",
      author: "Department of Agriculture",
      image: "planting_calendar.jpg"
    },
    {
      id: 3,
      title: "Water Conservation Methods",
      description: "Techniques for efficient water usage and irrigation systems for small-scale farms.",
      type: "article",
      readTime: "15 mins",
      author: "Water Resource Management Institute",
      image: "water_conservation.jpg"
    },
    {
      id: 4,
      title: "Natural Pest Management",
      description: "Non-chemical approaches to manage common pests in Nepali agriculture.",
      type: "video",
      duration: "30 mins",
      author: "Organic Farming Association",
      image: "pest_management.jpg"
    },
    {
      id: 5,
      title: "Soil Health Assessment Guide",
      description: "Simple tests to evaluate and improve your soil fertility.",
      type: "pdf",
      size: "1.8 MB",
      author: "Soil Science Department, TU",
      image: "soil_health.jpg"
    },
    {
      id: 6,
      title: "Post-Harvest Handling",
      description: "Reduce losses and maintain quality after harvesting your crops.",
      type: "article",
      readTime: "12 mins",
      author: "Food Research Center",
      image: "post_harvest.jpg"
    },
    {
      id: 7,
      title: "Government Subsidies for Farmers",
      description: "Guide to accessing available government support programs for Nepali farmers.",
      type: "pdf",
      size: "3.2 MB",
      author: "Ministry of Agriculture",
      image: "subsidies.jpg"
    },
    {
      id: 8,
      title: "Climate-Smart Agriculture",
      description: "Adapting farming practices to changing climate conditions in Nepal.",
      type: "video",
      duration: "50 mins",
      author: "Climate Adaptation Network",
      image: "climate_smart.jpg"
    }
  ]);

  // Analytics data - Price trends over time
  const [priceTrendData] = useState([
    { month: 'Jan', rice: 65, potatoes: 40, tomatoes: 75, onions: 60 },
    { month: 'Feb', rice: 68, potatoes: 42, tomatoes: 80, onions: 65 },
    { month: 'Mar', rice: 70, potatoes: 45, tomatoes: 85, onions: 70 },
    { month: 'Apr', rice: 72, potatoes: 48, tomatoes: 90, onions: 75 },
    { month: 'May', rice: 75, potatoes: 50, tomatoes: 95, onions: 80 },
    { month: 'Jun', rice: 80, potatoes: 55, tomatoes: 85, onions: 85 },
    { month: 'Jul', rice: 85, potatoes: 60, tomatoes: 80, onions: 90 },
    { month: 'Aug', rice: 80, potatoes: 55, tomatoes: 75, onions: 85 },
    { month: 'Sep', rice: 75, potatoes: 50, tomatoes: 70, onions: 80 },
    { month: 'Oct', rice: 70, potatoes: 45, tomatoes: 65, onions: 75 },
    { month: 'Nov', rice: 65, potatoes: 42, tomatoes: 60, onions: 70 },
    { month: 'Dec', rice: 60, potatoes: 40, tomatoes: 70, onions: 65 }
  ]);

  // Monthly crop yield data
  const [cropYieldData] = useState([
    { name: 'Rice', yield: 4500 },
    { name: 'Maize', yield: 3200 },
    { name: 'Wheat', yield: 2800 },
    { name: 'Potatoes', yield: 5500 },
    { name: 'Vegetables', yield: 4200 }
  ]);

  // Selected analytics view
  const [analyticsView, setAnalyticsView] = useState('trends');

  // Fetch market price data from backend
  useEffect(() => {
    const fetchMarketPrices = async () => {
      try {
        setLoading(true);
        const data = await getMarketPrices();
        setMarketPriceData(data);
        setFilteredData(data);
        setVisibleData(data.slice(0, 8)); // Set first 8 items
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching market prices:', err);
      }
    };

    fetchMarketPrices();
  }, []);

  // Filter data based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(marketPriceData);
      if (!showAllData) {
        setVisibleData(marketPriceData.slice(0, 8));
      } else {
        setVisibleData(marketPriceData);
      }
    } else {
      const filtered = marketPriceData.filter(item =>
        item.commodity.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      if (!showAllData) {
        setVisibleData(filtered.slice(0, 8));
      } else {
        setVisibleData(filtered);
      }
    }
  }, [searchTerm, marketPriceData, showAllData]);

  // Filter trading items
  useEffect(() => {
    let filtered = tradingItems;
    
    // Apply type filter
    if (tradingFilter !== 'all') {
      filtered = filtered.filter(item => item.type === tradingFilter);
    }
    
    // Apply search term
    if (tradingSearchTerm.trim() !== '') {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(tradingSearchTerm.toLowerCase()) ||
        item.seller.toLowerCase().includes(tradingSearchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(tradingSearchTerm.toLowerCase())
      );
    }
    
    setVisibleTradingItems(filtered);
  }, [tradingFilter, tradingSearchTerm, tradingItems]);

  // Close mobile menu when tab changes
  useEffect(() => {
    if (activeTab !== 'more') {
      setMobileMenuOpen(false);
    }
  }, [activeTab]);

  // Handle "Show More" button click
  const handleShowMore = () => {
    setShowAllData(!showAllData);
    if (!showAllData) {
      setVisibleData(filteredData);
    } else {
      setVisibleData(filteredData.slice(0, 8));
    }
  };

  // Handle map search
  const handleMapSearch = async (e) => {
    e.preventDefault();
    if (!searchLocation) return;
    
    try {
      // Using Nominatim API for geocoding (OpenStreetMap's geocoding service)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}, Nepal`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        alert('Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Error searching for location. Please try again.');
    }
  };
  
  // Handle vendor selection
  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    setMapCenter(vendor.position);
  };
  
  // Handle product form change
  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle product form submit
  const handleProductSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('Product information submitted successfully!');
    setProductForm({
      productName: '',
      quantity: '',
      quality: 'Standard',
      price: '',
      availability: '',
      location: ''
    });
  };

  // Handle trading filter change
  const handleTradingFilterChange = (filter) => {
    setTradingFilter(filter);
  };

  // Handle analytics view change
  const handleAnalyticsViewChange = (view) => {
    setAnalyticsView(view);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <section className="mb-16 md:mb-10 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Market Prices</h2>
        <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search commodities..."
              className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
          
          {/* Desktop tabs */}
          <div className="hidden md:flex flex-wrap space-x-1 space-y-0">
            <button 
              onClick={() => setActiveTab('prices')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'prices' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Prices
            </button>
            <button 
              onClick={() => setActiveTab('map')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'map' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Map
            </button>
            <button 
              onClick={() => setActiveTab('marketplace')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'marketplace' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Market
            </button>
            <button 
              onClick={() => setActiveTab('trading')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'trading' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Trading
            </button>
            <button 
              onClick={() => setActiveTab('community')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'community' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Community
            </button>
            <button 
              onClick={() => setActiveTab('resources')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'resources' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Resources
            </button>
            <button 
              onClick={() => setActiveTab('analytics')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeTab === 'analytics' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Analytics
            </button>
          </div>
          
          {/* Mobile tabs */}
          <div className="flex md:hidden w-full overflow-x-auto pb-2 gap-2">
            <button 
              onClick={() => setActiveTab('prices')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${activeTab === 'prices' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Prices
            </button>
            <button 
              onClick={() => setActiveTab('map')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${activeTab === 'map' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Map
            </button>
            <button 
              onClick={() => setActiveTab('trading')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${activeTab === 'trading' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Trading
            </button>
            <button 
              onClick={() => toggleMobileMenu()} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${mobileMenuOpen ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              More ⋯
            </button>
          </div>
        </div>
      </div>

      {/* Mobile more menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setActiveTab('marketplace')} 
              className={`p-3 rounded-lg text-sm font-medium ${activeTab === 'marketplace' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Marketplace
            </button>
            <button 
              onClick={() => setActiveTab('community')} 
              className={`p-3 rounded-lg text-sm font-medium ${activeTab === 'community' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Community
            </button>
            <button 
              onClick={() => setActiveTab('resources')} 
              className={`p-3 rounded-lg text-sm font-medium ${activeTab === 'resources' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Resources
            </button>
            <button 
              onClick={() => setActiveTab('analytics')} 
              className={`p-3 rounded-lg text-sm font-medium ${activeTab === 'analytics' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Analytics
            </button>
          </div>
        </div>
      )}

      {/* Digital Ecosystem Banner - Always visible */}
      <div className="bg-green-50 p-4 md:p-6 rounded-xl mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">Digital Ecosystem for Nepali Farmers</h3>
        <p className="text-gray-700 mb-6">Our platform empowers Nepali farmers by connecting them directly with small-scale vendors and eliminating middlemen to ensure fairer pricing.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-bold text-green-700 mb-2">Direct Farmer-to-Vendor</h4>
            <p className="text-gray-600">Enable direct transactions to ensure fairer pricing for your produce.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-bold text-green-700 mb-2">Integrated Transportation</h4>
            <p className="text-gray-600">Structured channels for picking up and delivering produce to markets.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-bold text-green-700 mb-2">Simple Data Entry</h4>
            <p className="text-gray-600">Easily list your produce with quantity, quality, and availability information.</p>
          </div>
        </div>
        
        {!['marketplace', 'trading', 'analytics'].includes(activeTab) && (
          <div className="mt-4 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => setActiveTab('analytics')} 
                className="bg-green-600 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-green-700 inline-flex items-center text-sm"
              >
                <span className="mr-2">📊</span> Market Analytics
              </button>
              <button 
                onClick={() => setActiveTab('trading')} 
                className="bg-green-600 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-green-700 inline-flex items-center text-sm"
              >
                <span className="mr-2">🔄</span> Trade Crops & More
              </button>
            </div>
          </div>
        )}
      </div>

      {activeTab === 'prices' && (
        loading ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-600">Loading market prices...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-8 rounded-lg shadow-md text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <p className="text-red-600">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600">No matching items found. Try a different search term.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="py-4 px-6 text-left">Commodity</th>
                    <th className="py-4 px-6 text-left">Price (per kg)</th>
                    <th className="py-4 px-6 text-left">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleData.map((item, index) => (
                    <tr 
                      key={index} 
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-4 px-6">{item.commodity}</td>
                      <td className="py-4 px-6">Rs {item.average}</td>
                      <td className="py-4 px-6">{item.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Show More / Show Less button */}
            {filteredData.length > 8 && (
              <div className="p-4 text-center">
                <button 
                  onClick={handleShowMore} 
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 inline-flex items-center"
                >
                  {showAllData ? (
                    <>
                      <span className="mr-2">▲</span> Show Less
                    </>
                  ) : (
                    <>
                      <span className="mr-2">▼</span> Show All {filteredData.length} Items
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )
      )}
      
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vendor Sidebar */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-green-700 mb-2">Direct Selling Locations</h3>
              <p className="text-sm text-gray-600">Find vendors where you can sell your produce directly:</p>
            </div>
            
            {/* Search location */}
            <form onSubmit={handleMapSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search location in Nepal..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bg-green-600 text-white rounded-lg px-2 py-1 text-xs"
                >
                  Search
                </button>
              </div>
            </form>
            
            {/* Vendor list */}
            <div className="space-y-3 overflow-y-auto max-h-96">
              {vendors.map(vendor => (
                <div 
                  key={vendor.id} 
                  className={`border rounded-lg p-3 cursor-pointer hover:border-green-500 transition-colors ${selectedVendor && selectedVendor.id === vendor.id ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => handleVendorSelect(vendor)}
                >
                  <h4 className="font-bold text-gray-800">{vendor.name}</h4>
                  <p className="text-sm text-gray-600">Products: {vendor.commodities}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">{vendor.operatingHours}</p>
                    <a href={`tel:${vendor.contact}`} className="text-green-600 text-sm flex items-center" onClick={(e) => e.stopPropagation()}>
                      <span className="mr-1">📞</span> Call
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Add vendor button */}
            <div className="mt-4">
              <button className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center">
                <span className="mr-1">➕</span> Register Your Market
              </button>
            </div>
          </div>
          
          {/* Map Container */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden p-1 h-[600px]">
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {vendors.map(vendor => (
                <Marker 
                  key={vendor.id} 
                  position={vendor.position}
                  icon={vendorIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedVendor(vendor);
                    },
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{vendor.name}</h3>
                      <p className="text-sm">Products: {vendor.commodities}</p>
                      <p className="text-sm">Hours: {vendor.operatingHours}</p>
                      <p className="text-sm">
                        Contact: <a href={`tel:${vendor.contact}`} className="text-green-600">{vendor.contact}</a>
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              <ChangeMapView center={mapCenter} />
            </MapContainer>
          </div>
        </div>
      )}

      {activeTab === 'marketplace' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Product Listing Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">List Your Produce</h3>
            <p className="text-gray-600 text-sm mb-4">
              Add your produce to the marketplace for vendors to see and purchase directly.
            </p>
            
            <form onSubmit={handleProductSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={productForm.productName}
                    onChange={handleProductFormChange}
                    placeholder="e.g., Rice, Tomatoes, Potatoes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Quantity (kg)
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={productForm.quantity}
                      onChange={handleProductFormChange}
                      placeholder="e.g., 50"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Quality
                    </label>
                    <select
                      name="quality"
                      value={productForm.quality}
                      onChange={handleProductFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Premium">Premium</option>
                      <option value="Standard">Standard</option>
                      <option value="Economy">Economy</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Price per kg (NPR)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductFormChange}
                    placeholder="e.g., 75"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Availability Date
                  </label>
                  <input
                    type="date"
                    name="availability"
                    value={productForm.availability}
                    onChange={handleProductFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Farm Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={productForm.location}
                    onChange={handleProductFormChange}
                    placeholder="e.g., Chitwan, Kavre, Pokhara"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    List Product
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Right Side - Marketplace Info & Transportation */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">How It Works</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="inline-block bg-green-100 text-green-800 text-2xl p-2 rounded-full">1</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-center mb-2">List Products</h4>
                  <p className="text-sm text-gray-600">Add your produce details including quantity, quality, price, and availability.</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="inline-block bg-green-100 text-green-800 text-2xl p-2 rounded-full">2</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-center mb-2">Get Connected</h4>
                  <p className="text-sm text-gray-600">Vendors will contact you directly to negotiate and confirm purchases.</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="inline-block bg-green-100 text-green-800 text-2xl p-2 rounded-full">3</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-center mb-2">Arrange Transport</h4>
                  <p className="text-sm text-gray-600">Use our integrated transportation network or arrange your own delivery.</p>
                </div>
              </div>
            </div>
            
            {/* Transportation Options */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">Transportation Options</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">🚚</div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">AgroTruck Network</h4>
                      <p className="text-gray-600 text-sm mb-2">Our network of trusted drivers who can transport your produce from farm to market at affordable rates.</p>
                      <button className="bg-green-600 text-white text-sm font-medium py-1 px-3 rounded hover:bg-green-700">
                        Request Pickup
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">👨‍🌾</div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Farmer Cooperatives</h4>
                      <p className="text-gray-600 text-sm mb-2">Join forces with other farmers in your area to share transportation costs to major markets.</p>
                      <button className="bg-green-600 text-white text-sm font-medium py-1 px-3 rounded hover:bg-green-700">
                        Find Cooperatives
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">🏪</div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Vendor Pickup</h4>
                      <p className="text-gray-600 text-sm mb-2">Some vendors offer direct pickup from your farm for large orders. Negotiate this option during sales.</p>
                      <button className="bg-green-600 text-white text-sm font-medium py-1 px-3 rounded hover:bg-green-700">
                        Vendor Directory
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Market Demand */}
            <div className="bg-green-50 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">Current Market Demand</h3>
              <p className="text-gray-700 mb-4">These products are in high demand right now. Consider prioritizing these if you have them available.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Tomatoes</span>
                    <span className="text-green-600 font-bold">↑ High</span>
                  </div>
                  <p className="text-xs text-gray-500">Current price: Rs 80-95/kg</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Potatoes</span>
                    <span className="text-green-600 font-bold">↑ High</span>
                  </div>
                  <p className="text-xs text-gray-500">Current price: Rs 45-55/kg</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Cauliflower</span>
                    <span className="text-green-600 font-bold">↑ High</span>
                  </div>
                  <p className="text-xs text-gray-500">Current price: Rs 60-75/kg</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Ginger</span>
                    <span className="text-yellow-600">→ Medium</span>
                  </div>
                  <p className="text-xs text-gray-500">Current price: Rs 110-130/kg</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Garlic</span>
                    <span className="text-yellow-600">→ Medium</span>
                  </div>
                  <p className="text-xs text-gray-500">Current price: Rs 140-160/kg</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Rice</span>
                    <span className="text-blue-600">↓ Low</span>
                  </div>
                  <p className="text-xs text-gray-500">Current price: Rs 60-80/kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Trading Hub - New Tab for Crops, Fertilizers and Local Products */}
      {activeTab === 'trading' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-xl font-bold text-green-700 mb-3 md:mb-0">Trading Hub</h3>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <div className="relative w-full md:w-64 mb-2 md:mb-0">
                <input
                  type="text"
                  placeholder="Search products or sellers..."
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={tradingSearchTerm}
                  onChange={(e) => setTradingSearchTerm(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <button 
                  onClick={() => handleTradingFilterChange('all')} 
                  className={`px-3 py-1.5 rounded text-xs font-medium ${tradingFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  All Items
                </button>
                <button 
                  onClick={() => handleTradingFilterChange('crop')} 
                  className={`px-3 py-1.5 rounded text-xs font-medium ${tradingFilter === 'crop' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Crops
                </button>
                <button 
                  onClick={() => handleTradingFilterChange('fertilizer')} 
                  className={`px-3 py-1.5 rounded text-xs font-medium ${tradingFilter === 'fertilizer' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Fertilizers
                </button>
                <button 
                  onClick={() => handleTradingFilterChange('local')} 
                  className={`px-3 py-1.5 rounded text-xs font-medium ${tradingFilter === 'local' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Local Products
                </button>
              </div>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {visibleTradingItems.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-500 transition-colors">
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <div className="text-4xl">
                    {item.type === 'crop' ? '🌾' : item.type === 'fertilizer' ? '💧' : '🧶'}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      item.type === 'crop' 
                        ? 'bg-green-100 text-green-800' 
                        : item.type === 'fertilizer'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type === 'crop' 
                        ? 'Crop' 
                        : item.type === 'fertilizer'
                          ? 'Fertilizer'
                          : 'Local Product'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Price: Rs {item.price}</p>
                  <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{item.location}</span>
                    <span className="text-xs text-gray-500">Seller: {item.seller}</span>
                  </div>
                  <button className="w-full mt-3 bg-green-600 text-white text-sm font-medium py-1.5 px-3 rounded hover:bg-green-700">
                    Contact Seller
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* List your item CTA */}
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-bold text-green-800 mb-2">Have something to sell?</h4>
                <p className="text-gray-700">List your crops, fertilizers, or local products for other farmers to purchase.</p>
              </div>
              <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 inline-flex items-center">
                <span className="mr-2">➕</span> List New Item
              </button>
            </div>
          </div>
          
          {/* Featured categories */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Featured Categories</h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center hover:bg-green-100 cursor-pointer">
                <div className="text-3xl mb-2">🌾</div>
                <h5 className="font-medium text-green-800">Organic Crops</h5>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 text-center hover:bg-blue-100 cursor-pointer">
                <div className="text-3xl mb-2">💧</div>
                <h5 className="font-medium text-blue-800">Bio Fertilizers</h5>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 text-center hover:bg-amber-100 cursor-pointer">
                <div className="text-3xl mb-2">🌱</div>
                <h5 className="font-medium text-amber-800">Seeds</h5>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center hover:bg-purple-100 cursor-pointer">
                <div className="text-3xl mb-2">🧶</div>
                <h5 className="font-medium text-purple-800">Handcrafts</h5>
              </div>
            </div>
          </div>
          
          {/* Trading guidelines */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-bold text-gray-800 mb-3">Trading Guidelines</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Always verify the quality of products before completing a transaction</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Use the chat or phone call feature to discuss details with sellers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Report any suspicious listings or unfair pricing to our support team</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Consider requesting product certificates for organic or premium items</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Community Tab */}
      {activeTab === 'community' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Community forum */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-green-700">Farmer's Community Forum</h3>
                <button className="bg-green-600 text-white py-1.5 px-4 rounded-lg hover:bg-green-700 inline-flex items-center text-sm">
                  <span className="mr-1">✏️</span> Create Post
                </button>
              </div>
              
              {/* Posts list */}
              <div className="space-y-6">
                {communityPosts.map(post => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800">{post.title}</h4>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                      <span className="text-gray-600">By {post.author}</span>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-green-600">
                          <span className="mr-1">👍</span> {post.likes}
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-green-600">
                          <span className="mr-1">💬</span> {post.comments}
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-green-600">
                          <span className="mr-1">📤</span> Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 inline-flex items-center">
                  <span className="mr-1">🔄</span> Load More Posts
                </button>
              </div>
            </div>
          </div>
          
          {/* Right side - Trending topics & events */}
          <div>
            {/* Trending topics */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-green-700 mb-4">Trending Topics</h3>
              <div className="space-y-3">
                <div className="flex items-center bg-green-50 rounded-lg p-3">
                  <span className="text-xl mr-3">🔥</span>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">Monsoon Preparedness</h4>
                    <p className="text-xs text-gray-600">32 posts this week</p>
                  </div>
                </div>
                <div className="flex items-center bg-green-50 rounded-lg p-3">
                  <span className="text-xl mr-3">🔥</span>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">Organic Certification</h4>
                    <p className="text-xs text-gray-600">28 posts this week</p>
                  </div>
                </div>
                <div className="flex items-center bg-green-50 rounded-lg p-3">
                  <span className="text-xl mr-3">🔥</span>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">Market Price Trends</h4>
                    <p className="text-xs text-gray-600">24 posts this week</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming events */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-green-700 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-gray-800">Organic Farming Workshop</h4>
                  <p className="text-xs text-gray-500 mb-1">March 15 • Kathmandu</p>
                  <button className="text-green-600 text-xs font-medium hover:underline">
                    Register Now
                  </button>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-gray-800">Agricultural Tech Expo</h4>
                  <p className="text-xs text-gray-500 mb-1">March 22-24 • Pokhara</p>
                  <button className="text-green-600 text-xs font-medium hover:underline">
                    Register Now
                  </button>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-gray-800">Farmer's Market Day</h4>
                  <p className="text-xs text-gray-500 mb-1">April 5 • Bharatpur</p>
                  <button className="text-green-600 text-xs font-medium hover:underline">
                    Register Now
                  </button>
                </div>
              </div>
              <button className="w-full mt-4 bg-gray-100 text-gray-700 py-1.5 px-3 rounded-lg hover:bg-gray-200 text-sm">
                View All Events
              </button>
            </div>
            
            {/* Success stories */}
            <div className="bg-green-50 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-green-700 mb-4">Success Stories</h3>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span>👨‍🌾</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">Ramesh from Dhading</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      "Using this platform, I found buyers willing to pay 20% more for my organic vegetables!"
                    </p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-1.5 px-3 rounded-lg hover:bg-green-700 text-sm">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-xl font-bold text-green-700 mb-3 md:mb-0">Educational Resources</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white">
                All
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700">
                Videos
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700">
                Articles
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700">
                Documents
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {resources.map(resource => (
              <div key={resource.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-500 transition-colors">
                <div className="h-36 bg-gray-200 flex items-center justify-center">
                  <div className="text-4xl">
                    {resource.type === 'video' ? '🎬' : resource.type === 'pdf' ? '📄' : '📝'}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-800 mb-2">{resource.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      resource.type === 'video' 
                        ? 'bg-red-100 text-red-800' 
                        : resource.type === 'pdf'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{resource.type === 'video' ? resource.duration : resource.type === 'pdf' ? resource.size : resource.readTime}</span>
                    <span>{resource.author}</span>
                  </div>
                  <button className="w-full mt-3 bg-green-600 text-white text-sm font-medium py-1.5 px-3 rounded hover:bg-green-700">
                    {resource.type === 'video' ? 'Watch Now' : resource.type === 'pdf' ? 'Download' : 'Read Article'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Request resources section */}
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-bold text-green-800 mb-2">Can't find what you need?</h4>
                <p className="text-gray-700">Let us know what agricultural topics you'd like to learn more about.</p>
              </div>
              <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 inline-flex items-center">
                Request Resources
              </button>
            </div>
          </div>
          
          {/* Featured courses */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">Online Courses</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">Featured</span>
                    <h5 className="font-bold text-gray-800">Modern Farming Techniques</h5>
                  </div>
                  <span className="text-sm text-green-700 font-medium">Free</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">A comprehensive 6-week course covering sustainable farming methods adapted for Nepal's geography.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <span>👨‍🏫</span>
                    </div>
                    <span className="text-xs text-gray-600">Nepal Agricultural University</span>
                  </div>
                  <button className="bg-green-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-green-700">
                    Enroll Now
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded mb-2">Certificate</span>
                    <h5 className="font-bold text-gray-800">Agricultural Business Management</h5>
                  </div>
                  <span className="text-sm text-green-700 font-medium">Rs 1,500</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Learn to transform your farm into a profitable business with marketing and financial skills.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <span>👩‍🏫</span>
                    </div>
                    <span className="text-xs text-gray-600">Business Skills Institute</span>
                  </div>
                  <button className="bg-green-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-green-700">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-xl font-bold text-green-700 mb-3 md:mb-0">Market Analytics</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleAnalyticsViewChange('trends')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium ${analyticsView === 'trends' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Price Trends
              </button>
              <button 
                onClick={() => handleAnalyticsViewChange('yields')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium ${analyticsView === 'yields' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Crop Yields
              </button>
              <button 
                onClick={() => handleAnalyticsViewChange('predictions')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium ${analyticsView === 'predictions' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Predictions
              </button>
            </div>
          </div>
          
          {/* Price Trends View */}
          {analyticsView === 'trends' && (
            <div>
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Annual Price Trends (Rs/kg)</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4" style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={priceTrendData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="rice" stroke="#8884d8" activeDot={{ r: 8 }} name="Rice" />
                      <Line type="monotone" dataKey="potatoes" stroke="#82ca9d" name="Potatoes" />
                      <Line type="monotone" dataKey="tomatoes" stroke="#ff7300" name="Tomatoes" />
                      <Line type="monotone" dataKey="onions" stroke="#387908" name="Onions" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Key Insights</h4>
                  <div className="bg-blue-50 rounded-lg p-4 md:p-6 space-y-4">
                    <div>
                      <h5 className="font-bold text-gray-800 mb-2">Seasonal Patterns</h5>
                      <p className="text-sm text-gray-600">Tomato prices peak in May and are lowest in November. Plan your planting schedule accordingly to maximize profits.</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800 mb-2">Price Stability</h5>
                      <p className="text-sm text-gray-600">Rice shows the most stable pricing throughout the year, with only a 25% variation between highest and lowest prices.</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800 mb-2">Market Opportunities</h5>
                      <p className="text-sm text-gray-600">Growing potatoes for the June-July market could yield 50% higher returns compared to winter harvests.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Price Volatility</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">Tomatoes</span>
                        <span className="text-red-600 font-bold">High Volatility</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">80% price variation throughout the year</p>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">Onions</span>
                        <span className="text-orange-600 font-bold">Medium Volatility</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">50% price variation throughout the year</p>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">Potatoes</span>
                        <span className="text-yellow-600 font-bold">Low-Medium Volatility</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">40% price variation throughout the year</p>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">Rice</span>
                        <span className="text-green-600 font-bold">Low Volatility</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">25% price variation throughout the year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Crop Yields View */}
          {analyticsView === 'yields' && (
            <div>
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Crop Yields Comparison (kg/hectare)</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4" style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={cropYieldData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="yield" fill="#4CAF50" name="Yield (kg/hectare)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 rounded-lg p-4 md:p-6">
                  <h4 className="font-bold text-gray-800 mb-3">Yield Enhancement Tips</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Implement crop rotation to improve soil health</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Use quality seeds adapted for local conditions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Optimize irrigation based on crop requirements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Apply balanced fertilization programs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Implement integrated pest management</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                  <h4 className="font-bold text-gray-800 mb-3">Regional Comparison</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Your Farm</span>
                        <span className="font-medium">4,500 kg/ha</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>District Average</span>
                        <span className="font-medium">3,800 kg/ha</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '63%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>National Average</span>
                        <span className="font-medium">3,400 kg/ha</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '57%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Top Performers</span>
                        <span className="font-medium">6,000 kg/ha</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                  <h4 className="font-bold text-gray-800 mb-3">Yield-Price Analysis</h4>
                  <p className="text-sm text-gray-600 mb-4">Optimal crop selection based on yield and current market prices:</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Potatoes</span>
                      <span className="text-green-700 font-bold">High ROI</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Vegetables</span>
                      <span className="text-green-700 font-bold">High ROI</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium">Rice</span>
                      <span className="text-yellow-700 font-bold">Medium ROI</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium">Maize</span>
                      <span className="text-yellow-700 font-bold">Medium ROI</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Wheat</span>
                      <span className="text-red-700 font-bold">Low ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Predictions View */}
          {analyticsView === 'predictions' && (
            <div>
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-indigo-800 mb-4">Market Price Predictions (Next 3 Months)</h4>
                <p className="text-gray-700 mb-4">Based on historical data, weather patterns, and market trends, our AI model predicts the following price movements:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-5 border border-indigo-100">
                    <h5 className="font-bold text-gray-800 mb-3">Rice</h5>
                    <div className="flex items-center text-2xl mb-3">
                      <span className="font-bold">Rs 75</span>
                      <span className="text-green-600 ml-3">↑ 5%</span>
                    </div>
                    <p className="text-sm text-gray-600">Expected to rise slightly due to reduced planting area this season.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 border border-indigo-100">
                    <h5 className="font-bold text-gray-800 mb-3">Tomatoes</h5>
                    <div className="flex items-center text-2xl mb-3">
                      <span className="font-bold">Rs 65</span>
                      <span className="text-red-600 ml-3">↓ 15%</span>
                    </div>
                    <p className="text-sm text-gray-600">Expected to decrease as summer harvests come to market.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 border border-indigo-100">
                    <h5 className="font-bold text-gray-800 mb-3">Potatoes</h5>
                    <div className="flex items-center text-2xl mb-3">
                      <span className="font-bold">Rs 48</span>
                      <span className="text-gray-500 ml-3">→ 0%</span>
                    </div>
                    <p className="text-sm text-gray-600">Expected to remain stable due to balanced supply and demand.</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Planting Recommendations</h4>
                  <p className="text-sm text-gray-600 mb-4">Crops to consider for upcoming planting season based on predicted market conditions:</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <span className="font-medium block">Onions</span>
                        <span className="text-xs text-gray-500">Predicted high demand in 3-4 months</span>
                      </div>
                      <span className="text-green-700 font-bold">Recommended</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <span className="font-medium block">Garlic</span>
                        <span className="text-xs text-gray-500">Supply shortage expected</span>
                      </div>
                      <span className="text-green-700 font-bold">Recommended</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <span className="font-medium block">Cauliflower</span>
                        <span className="text-xs text-gray-500">Favorable price trend expected</span>
                      </div>
                      <span className="text-green-700 font-bold">Recommended</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div>
                        <span className="font-medium block">Tomatoes</span>
                        <span className="text-xs text-gray-500">Market likely to be oversupplied</span>
                      </div>
                      <span className="text-red-700 font-bold">Not Recommended</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Market Trend Confidence</h4>
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-4">Our prediction confidence levels based on data reliability and market factors:</p>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Rice</span>
                          <span className="font-medium">85% confidence</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Potatoes</span>
                          <span className="font-medium">78% confidence</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Onions</span>
                          <span className="font-medium">72% confidence</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Tomatoes</span>
                          <span className="font-medium">65% confidence</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fruits</span>
                          <span className="font-medium">56% confidence</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '56%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Advanced Insights</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-bold text-gray-800 text-sm mb-2">Import/Export Factors</h5>
                    <p className="text-xs text-gray-600">Recent policy changes are expected to reduce vegetable imports from India by 15% over the next quarter, potentially increasing local prices.</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-bold text-gray-800 text-sm mb-2">Consumer Trends</h5>
                    <p className="text-xs text-gray-600">Growing demand for organic produce in urban areas is creating premium pricing opportunities for certified farmers.</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h5 className="font-bold text-gray-800 text-sm mb-2">Seasonal Shifts</h5>
                    <p className="text-xs text-gray-600">Climate change has pushed the monsoon season later by approximately 10 days, affecting traditional planting schedules.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-center">
            <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 inline-flex items-center">
              <span className="mr-2">📊</span> Download Full Analytics Report
            </button>
          </div>
        </div>
      )}
      
      {/* Mobile bottom navigation - Only visible on small screens */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-between items-center p-2">
          <button 
            onClick={() => setActiveTab('prices')} 
            className={`flex flex-col items-center p-2 ${activeTab === 'prices' ? 'text-green-600' : 'text-gray-600'}`}
          >
            <span className="text-xl">💰</span>
            <span className="text-xs">Prices</span>
          </button>
          <button 
            onClick={() => setActiveTab('map')} 
            className={`flex flex-col items-center p-2 ${activeTab === 'map' ? 'text-green-600' : 'text-gray-600'}`}
          >
            <span className="text-xl">🗺️</span>
            <span className="text-xs">Map</span>
          </button>
          <button 
            onClick={() => setActiveTab('trading')} 
            className={`flex flex-col items-center p-2 ${activeTab === 'trading' ? 'text-green-600' : 'text-gray-600'}`}
          >
            <span className="text-xl">🔄</span>
            <span className="text-xs">Trade</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`flex flex-col items-center p-2 ${activeTab === 'analytics' ? 'text-green-600' : 'text-gray-600'}`}
          >
            <span className="text-xl">📊</span>
            <span className="text-xs">Analytics</span>
          </button>
          <button 
            onClick={() => toggleMobileMenu()} 
            className={`flex flex-col items-center p-2 ${mobileMenuOpen ? 'text-green-600' : 'text-gray-600'}`}
          >
            <span className="text-xl">⋯</span>
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600 mb-16 md:mb-8">
        <p>Last updated: Today | Prices subject to change</p>
        <p>Source: Department of Agriculture, Nepal</p>
      </div>
    </section>
  );
};

export default MarketPrices;