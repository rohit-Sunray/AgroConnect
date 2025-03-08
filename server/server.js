import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Parse the market data from the text file
const parseMarketData = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/market_prices.txt'), 'utf8');
    const lines = data.split('\n');
    
    // Skip the header line
    const marketData = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      const parts = lines[i].split('\t');
      if (parts.length >= 5) {
        // Add location data based on commodity name
        let location = 'Kathmandu';
        if (parts[0].includes('(Terai)')) {
          location = 'Terai';
        } else if (parts[0].includes('(Indian)')) {
          location = 'Imported';
        } else if (parts[0].includes('(Local)')) {
          location = 'Local Markets';
        }
        
        marketData.push({
          commodity: parts[0],
          unit: parts[1],
          minPrice: parts[2].replace('Rs ', ''),
          maxPrice: parts[3].replace('Rs ', ''),
          average: parts[4].replace('Rs ', ''),
          location: location
        });
      }
    }
    return marketData;
  } catch (error) {
    console.error('Error parsing market data:', error);
    return [];
  }
};

// Farm produce data
const farmProduceData = [
  { commodity: "Paddy", category: "Cereal Crops", area: "1,447,789", production: "5,486,472", yield: "3.79", demandLevel: "High", bestSellingMarket: "Birgunj", storageTips: "Dry, cool place", profitabilitySuggestion: "Sell before monsoon for best price", priceHistory: [{ year: 2020, price: 40 }, { year: 2021, price: 45 }, { year: 2022, price: 50 }, { year: 2023, price: 55 }] },
  { commodity: "Maize", category: "Cereal Crops", area: "940,256", production: "2,976,490", yield: "3.16", demandLevel: "Medium", bestSellingMarket: "Chitwan", storageTips: "Ventilated area", profitabilitySuggestion: "Store & sell in off-season", priceHistory: [{ year: 2020, price: 28 }, { year: 2021, price: 30 }, { year: 2022, price: 32 }, { year: 2023, price: 35 }] },
  { commodity: "Wheat", category: "Cereal Crops", area: "697,762", production: "2,098,462", yield: "3.01", demandLevel: "Low", bestSellingMarket: "Bhairahawa", storageTips: "Jute bags", profitabilitySuggestion: "Hold for price recovery", priceHistory: [{ year: 2020, price: 26 }, { year: 2021, price: 28 }, { year: 2022, price: 25 }, { year: 2023, price: 27 }] },
  { commodity: "Millet", category: "Cereal Crops", area: "227,934", production: "310,847", yield: "1.36", demandLevel: "Medium", bestSellingMarket: "Kathmandu", storageTips: "Dry conditions", profitabilitySuggestion: "Sell in winter for better demand", priceHistory: [{ year: 2020, price: 35 }, { year: 2021, price: 38 }, { year: 2022, price: 40 }, { year: 2023, price: 42 }] },
  { commodity: "Buckwheat", category: "Cereal Crops", area: "11,857", production: "15,083", yield: "1.27", demandLevel: "Low", bestSellingMarket: "Pokhara", storageTips: "Air-tight storage", profitabilitySuggestion: "Process into flour for added value", priceHistory: [{ year: 2020, price: 60 }, { year: 2021, price: 58 }, { year: 2022, price: 55 }, { year: 2023, price: 52 }] },
  { commodity: "Barley", category: "Cereal Crops", area: "17,536", production: "25,912", yield: "1.48", demandLevel: "Low", bestSellingMarket: "Butwal", storageTips: "Dry storage", profitabilitySuggestion: "Sell early before price drop", priceHistory: [{ year: 2020, price: 45 }, { year: 2021, price: 43 }, { year: 2022, price: 40 }, { year: 2023, price: 38 }] },
  { commodity: "Potato", category: "Cash Crops", area: "203,812", production: "3,487,816", yield: "17.11", demandLevel: "High", bestSellingMarket: "Kathmandu", storageTips: "Dark, dry place", profitabilitySuggestion: "Bulk sell in peak season", priceHistory: [{ year: 2020, price: 25 }, { year: 2021, price: 30 }, { year: 2022, price: 35 }, { year: 2023, price: 40 }] },
  { commodity: "Sugarcane", category: "Cash Crops", area: "62,833", production: "3,130,109", yield: "49.82", demandLevel: "Low", bestSellingMarket: "Sunsari", storageTips: "Process into jaggery", profitabilitySuggestion: "Sell to mills early", priceHistory: [{ year: 2020, price: 15 }, { year: 2021, price: 14 }, { year: 2022, price: 12 }, { year: 2023, price: 10 }] },
  { commodity: "Oilseeds", category: "Cash Crops", area: "244,046", production: "270,482", yield: "1.11", demandLevel: "Medium", bestSellingMarket: "Nepalgunj", storageTips: "Moisture-free storage", profitabilitySuggestion: "Hold for better rates", priceHistory: [{ year: 2020, price: 70 }, { year: 2021, price: 75 }, { year: 2022, price: 80 }, { year: 2023, price: 85 }] },
  { commodity: "Lentil", category: "Pulses", area: "173,011", production: "200,787", yield: "1.16", demandLevel: "High", bestSellingMarket: "Biratnagar", storageTips: "Moisture-free place", profitabilitySuggestion: "Wait for slight price increase", priceHistory: [{ year: 2020, price: 95 }, { year: 2021, price: 100 }, { year: 2022, price: 110 }, { year: 2023, price: 120 }] },
  { commodity: "Chickpea", category: "Pulses", area: "10,408", production: "11,980", yield: "1.15", demandLevel: "Medium", bestSellingMarket: "Nepalgunj", storageTips: "Airtight storage", profitabilitySuggestion: "Sell in bulk for better deals", priceHistory: [{ year: 2020, price: 80 }, { year: 2021, price: 85 }, { year: 2022, price: 90 }, { year: 2023, price: 95 }] },
  { commodity: "Pigeon Pea", category: "Pulses", area: "11,745", production: "12,710", yield: "1.08", demandLevel: "Medium", bestSellingMarket: "Janakpur", storageTips: "Keep dry", profitabilitySuggestion: "Sell after post-harvest storage", priceHistory: [{ year: 2020, price: 75 }, { year: 2021, price: 78 }, { year: 2022, price: 80 }, { year: 2023, price: 83 }] },
  { commodity: "Soybean", category: "Pulses", area: "26,842", production: "36,672", yield: "1.37", demandLevel: "Medium", bestSellingMarket: "Pokhara", storageTips: "Ventilated place", profitabilitySuggestion: "Wait for processing demand", priceHistory: [{ year: 2020, price: 65 }, { year: 2021, price: 70 }, { year: 2022, price: 75 }, { year: 2023, price: 80 }] },
  { commodity: "Ginger", category: "Spices", area: "23,829", production: "309,533", yield: "13.0", demandLevel: "High", bestSellingMarket: "Dharan", storageTips: "Dry before storage", profitabilitySuggestion: "Process into dried ginger for export", priceHistory: [{ year: 2020, price: 85 }, { year: 2021, price: 90 }, { year: 2022, price: 100 }, { year: 2023, price: 110 }] },
  { commodity: "Garlic", category: "Spices", area: "9,570", production: "73,567", yield: "7.69", demandLevel: "High", bestSellingMarket: "Kathmandu", storageTips: "Dark, dry place", profitabilitySuggestion: "Sell in small packets for more profit", priceHistory: [{ year: 2020, price: 180 }, { year: 2021, price: 200 }, { year: 2022, price: 220 }, { year: 2023, price: 240 }] },
  { commodity: "Turmeric", category: "Spices", area: "9,022", production: "90,428", yield: "10.02", demandLevel: "Medium", bestSellingMarket: "Surkhet", storageTips: "Dry, airtight bags", profitabilitySuggestion: "Hold for price stabilization", priceHistory: [{ year: 2020, price: 110 }, { year: 2021, price: 115 }, { year: 2022, price: 120 }, { year: 2023, price: 125 }] },
  { commodity: "Citrus Fruits", category: "Fruits", area: "49,469", production: "317,494", yield: "9.39", demandLevel: "Medium", bestSellingMarket: "Kathmandu", storageTips: "Refrigerated storage", profitabilitySuggestion: "Sell in tourist areas", priceHistory: [{ year: 2020, price: 70 }, { year: 2021, price: 75 }, { year: 2022, price: 80 }, { year: 2023, price: 85 }] },
  { commodity: "Winter Fruits", category: "Fruits", area: "36,741", production: "145,868", yield: "7.34", demandLevel: "High", bestSellingMarket: "Kathmandu", storageTips: "Cool storage", profitabilitySuggestion: "Sell during holidays for max price", priceHistory: [{ year: 2020, price: 90 }, { year: 2021, price: 100 }, { year: 2022, price: 110 }, { year: 2023, price: 120 }] },
  { commodity: "Vegetables", category: "Vegetables", area: "302,135", production: "4,376,077", yield: "14.48", demandLevel: "High", bestSellingMarket: "Chitwan", storageTips: "Cold storage", profitabilitySuggestion: "Sell fresh for best prices", priceHistory: [{ year: 2020, price: 50 }, { year: 2021, price: 55 }, { year: 2022, price: 60 }, { year: 2023, price: 65 }] },
  { commodity: "Honey", category: "Others", area: "N/A", production: "4,308", yield: "N/A", demandLevel: "High", bestSellingMarket: "Kathmandu", storageTips: "Glass bottles", profitabilitySuggestion: "Market as organic for premium sales", priceHistory: [{ year: 2020, price: 650 }, { year: 2021, price: 700 }, { year: 2022, price: 750 }, { year: 2023, price: 800 }] }
];

// Track marketplace listings
let marketplaceListings = [
  {
    id: "list-1",
    productName: "Rice (Basmati)",
    quantity: "500",
    quality: "Premium",
    price: "75",
    availability: "2025-03-10",
    location: "Chitwan",
    sellerName: "Ram Bahadur",
    contact: "+977-980-1234567",
    dateAdded: "2025-03-01",
    isSold: false
  },
  {
    id: "list-2", 
    productName: "Potatoes (Red)",
    quantity: "1000",
    quality: "Standard",
    price: "45",
    availability: "2025-03-05",
    location: "Kavre",
    sellerName: "Sita Tamang",
    contact: "+977-984-5678901",
    dateAdded: "2025-02-28",
    isSold: false
  },
  {
    id: "list-3",
    productName: "Ginger (Fresh)",
    quantity: "200",
    quality: "Premium",
    price: "110",
    availability: "2025-03-15",
    location: "Ilam",
    sellerName: "Hari Prasad",
    contact: "+977-986-3456789",
    dateAdded: "2025-03-02",
    isSold: false
  }
];

// API endpoint to get all market prices
app.get('/api/market-prices', async (req, res) => {
  const marketData = await parseMarketData();
  res.json(marketData);
});

// API endpoint to search market prices
app.get('/api/market-prices/search', async (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const marketData = await parseMarketData();
  
  if (!query) {
    return res.json(marketData);
  }
  
  const filteredData = marketData.filter(item => 
    item.commodity.toLowerCase().includes(query)
  );
  
  res.json(filteredData);
});

// API endpoint to get farm produce data
app.get('/api/farm-produce', (req, res) => {
  res.json(farmProduceData);
});

// API endpoint to get farm produce data by category
app.get('/api/farm-produce/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredData = farmProduceData.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
  res.json(filteredData);
});

// API endpoint to get price history for a commodity
app.get('/api/price-history/:commodity', (req, res) => {
  const commodity = req.params.commodity;
  const item = farmProduceData.find(item => 
    item.commodity.toLowerCase() === commodity.toLowerCase()
  );
  
  if (item) {
    res.json(item.priceHistory);
  } else {
    res.status(404).json({ error: "Commodity not found" });
  }
});

// API endpoint to get all marketplace listings
app.get('/api/marketplace', (req, res) => {
  res.json(marketplaceListings);
});

// API endpoint to add a new marketplace listing
app.post('/api/marketplace', (req, res) => {
  const newListing = {
    id: `list-${Date.now()}`,
    ...req.body,
    dateAdded: new Date().toISOString().split('T')[0],
    isSold: false
  };
  
  marketplaceListings.push(newListing);
  res.status(201).json(newListing);
});

// API endpoint to update a marketplace listing
app.put('/api/marketplace/:id', (req, res) => {
  const id = req.params.id;
  const index = marketplaceListings.findIndex(item => item.id === id);
  
  if (index !== -1) {
    marketplaceListings[index] = { ...marketplaceListings[index], ...req.body };
    res.json(marketplaceListings[index]);
  } else {
    res.status(404).json({ error: "Listing not found" });
  }
});

// API endpoint to delete a marketplace listing
app.delete('/api/marketplace/:id', (req, res) => {
  const id = req.params.id;
  const index = marketplaceListings.findIndex(item => item.id === id);
  
  if (index !== -1) {
    const deletedListing = marketplaceListings[index];
    marketplaceListings = marketplaceListings.filter(item => item.id !== id);
    res.json(deletedListing);
  } else {
    res.status(404).json({ error: "Listing not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Create data directory and save the market prices file
const setupDataDirectory = async () => {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.access(dataDir);
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true });
  }
  
  try {
    await fs.access(path.join(dataDir, 'market_prices.txt'));
  } catch (error) {
    // Save the market prices data
    const marketPricesData = `Commodity\tUnit\tMinimum\tMaximum\tAverage
Tomato Big(Nepali)\tKG\tRs 20.00\tRs 25.00\tRs 22.33
Tomato Big(Indian)\tKG\tRs 40.00\tRs 50.00\tRs 45.00
Tomato Small(Terai)\tKG\tRs 14.00\tRs 22.00\tRs 18.00
Potato Red\tKG\tRs 32.00\tRs 34.00\tRs 33.00
Potato Red(Indian)\tKG\tRs 30.00\tRs 32.00\tRs 31.00
Onion Dry (Indian)\tKG\tRs 64.00\tRs 68.00\tRs 66.00
Carrot(Local)\tKG\tRs 30.00\tRs 40.00\tRs 35.00
Carrot(Terai)\tKG\tRs 25.00\tRs 30.00\tRs 27.67
Cabbage(Local)\tKG\tRs 8.00\tRs 12.00\tRs 10.00
Cabbage(Terai)\tKG\tRs 8.00\tRs 12.00\tRs 10.00
Cabbage\tKG\tRs 10.00\tRs 15.00\tRs 12.33
Cauli Local\tKG\tRs 10.00\tRs 15.00\tRs 12.33
Cauli Local(Jyapu)\tKG\tRs 15.00\tRs 20.00\tRs 17.67
Cauli Terai\tKG\tRs 10.00\tRs 15.00\tRs 12.33
Raddish Red\tKG\tRs 30.00\tRs 40.00\tRs 35.00
Raddish White(Local)\tKG\tRs 15.00\tRs 20.00\tRs 17.67
Raddish White(Hybrid)\tKG\tRs 20.00\tRs 30.00\tRs 25.00
Brinjal Long\tKG\tRs 30.00\tRs 40.00\tRs 35.00
Brinjal Round\tKG\tRs 50.00\tRs 60.00\tRs 55.00
Green Peas\tKG\tRs 40.00\tRs 50.00\tRs 45.00
French Bean(Local)\tKG\tRs 40.00\tRs 50.00\tRs 45.00
French Bean(Hybrid)\tKG\tRs 40.00\tRs 50.00\tRs 45.00
French Bean(Rajma)\tKG\tRs 80.00\tRs 90.00\tRs 85.00
Sword Bean\tKG\tRs 70.00\tRs 80.00\tRs 75.00
Bitter Gourd\tKG\tRs 110.00\tRs 130.00\tRs 120.00
Bottle Gourd\tKG\tRs 40.00\tRs 50.00\tRs 45.00
Pointed Gourd(Terai)\tKG\tRs 180.00\tRs 200.00\tRs 190.00
Smooth Gourd\tKG\tRs 80.00\tRs 90.00\tRs 85.00
Sponge Gourd\tKG\tRs 80.00\tRs 90.00\tRs 85.00
Pumpkin\tKG\tRs 40.00\tRs 50.00\tRs 45.00
Squash(Long)\tKG\tRs 10.00\tRs 15.00\tRs 12.33
Squash(Round)\tKG\tRs 10.00\tRs 15.00\tRs 12.33
Okara\tKG\tRs 120.00\tRs 130.00\tRs 125.00
Sweet Potato\tKG\tRs 60.00\tRs 70.00\tRs 65.00
Barela\tKG\tRs 30.00\tRs 40.00\tRs 35.00
Arum\tKG\tRs 110.00\tRs 120.00\tRs 115.00
Christophine\tKG\tRs 30.00\tRs 40.00\tRs 35.00
Brd Leaf Mustard\tKG\tRs 15.00\tRs 20.00\tRs 17.67
Spinach Leaf\tKG\tRs 50.00\tRs 60.00\tRs 55.00
Cress Leaf\tKG\tRs 70.00\tRs 80.00\tRs 75.00
Mustard Leaf\tKG\tRs 30.00\tRs 40.00\tRs 35.00
Fenugreek Leaf\tKG\tRs 50.00\tRs 60.00\tRs 55.00
Onion Green\tKG\tRs 20.00\tRs 30.00\tRs 25.00
Bakula\tKG\tRs 40.00\tRs 50.00\tRs 45.00
Yam\tKG\tRs 80.00\tRs 90.00\tRs 85.00
Mushroom(Kanya)\tKG\tRs 80.00\tRs 120.00\tRs 100.00
Mushroom(Button)\tKG\tRs 250.00\tRs 300.00\tRs 276.67
Asparagus\tKG\tRs 900.00\tRs 1,100.00\tRs 1,000.00
Brocauli\tKG\tRs 30.00\tRs 40.00\tRs 35.00
Sugarbeet\tKG\tRs 50.00\tRs 60.00\tRs 55.00
Drumstick\tKG\tRs 170.00\tRs 180.00\tRs 175.00
Red Cabbbage\tKG\tRs 40.00\tRs 50.00\tRs 45.00
Lettuce\tKG\tRs 40.00\tRs 50.00\tRs 45.00
Celery\tKG\tRs 100.00\tRs 150.00\tRs 126.67
Parseley\tKG\tRs 250.00\tRs 300.00\tRs 276.67
Fennel Leaf\tKG\tRs 70.00\tRs 80.00\tRs 75.00
Mint\tKG\tRs 150.00\tRs 200.00\tRs 176.67
Turnip A\tKG\tRs 50.00\tRs 60.00\tRs 55.00
Tamarind\tKG\tRs 150.00\tRs 160.00\tRs 155.00
Bamboo Shoot\tKG\tRs 90.00\tRs 100.00\tRs 95.00
Tofu\tKG\tRs 110.00\tRs 120.00\tRs 115.00
Gundruk\tKG\tRs 300.00\tRs 350.00\tRs 326.67
Apple(Jholey)\tKG\tRs 230.00\tRs 250.00\tRs 240.00
Apple(Fuji)\tKG\tRs 280.00\tRs 350.00\tRs 320.00
Banana\tPer Dozen\tRs 140.00\tRs 150.00\tRs 145.00
Lime\tKG\tRs 250.00\tRs 260.00\tRs 255.00
Pomegranate\tKG\tRs 300.00\tRs 350.00\tRs 326.67
Grapes(Green)\tKG\tRs 180.00\tRs 200.00\tRs 190.00
Grapes(Black)\tKG\tRs 230.00\tRs 250.00\tRs 240.00
Orange(Indian)\tKG\tRs 140.00\tRs 150.00\tRs 145.00
Water Melon(Green)\tKG\tRs 55.00\tRs 60.00\tRs 57.67
Sweet Orange\tKG\tRs 180.00\tRs 200.00\tRs 190.00
Pineapple\t1 Pc\tRs 180.00\tRs 200.00\tRs 190.00
Cucumber(Local)\tKG\tRs 50.00\tRs 60.00\tRs 55.00
Cucumber(Hybrid)\tKG\tRs 30.00\tRs 40.00\tRs 35.00
Jack Fruit\tKG\tRs 100.00\tRs 110.00\tRs 105.00
Lemon\tKG\tRs 60.00\tRs 70.00\tRs 65.00
Pear(Chinese)\tKG\tRs 240.00\tRs 250.00\tRs 245.00
Papaya(Nepali)\tKG\tRs 40.00\tRs 50.00\tRs 45.00
Papaya(Indian)\tKG\tRs 100.00\tRs 110.00\tRs 105.00
Guava\tKG\tRs 120.00\tRs 140.00\tRs 130.00
Mombin\tKG\tRs 100.00\tRs 120.00\tRs 110.00
Strawberry\tKG\tRs 300.00\tRs 350.00\tRs 326.67
Kiwi\tKG\tRs 350.00\tRs 400.00\tRs 376.67
Amla\tKG\tRs 100.00\tRs 120.00\tRs 110.00
Ginger\tKG\tRs 80.00\tRs 100.00\tRs 90.00
Chilli Dry\tKG\tRs 300.00\tRs 325.00\tRs 315.00
Chilli Green\tKG\tRs 100.00\tRs 110.00\tRs 105.00
Chilli Green(Bullet)\tKG\tRs 110.00\tRs 120.00\tRs 115.00
Chilli Green(Machhe)\tKG\tRs 50.00\tRs 60.00\tRs 55.00
Capsicum\tKG\tRs 70.00\tRs 100.00\tRs 83.33
Garlic Green\tKG\tRs 30.00\tRs 50.00\tRs 40.00
Coriander Green\tKG\tRs 25.00\tRs 35.00\tRs 30.00
Garlic Dry Chinese\tKG\tRs 260.00\tRs 280.00\tRs 270.00
Garlic Dry Nepali\tKG\tRs 220.00\tRs 230.00\tRs 225.00
Clive Dry\tKG\tRs 140.00\tRs 160.00\tRs 150.00
Clive Green\tKG\tRs 60.00\tRs 70.00\tRs 65.00
Fish Fresh(Rahu)\tKG\tRs 360.00\tRs 420.00\tRs 390.00
Fish Fresh(Bachuwa)\tKG\tRs 250.00\tRs 300.00\tRs 276.67
Fish Fresh(Chhadi)\tKG\tRs 250.00\tRs 300.00\tRs 276.67
Tree Tomato\tKg\tRs 170.00\tRs 180.00\tRs 175.00
King Oyster\tKg\tRs 280.00\tRs 300.00\tRs 290.00
Lentinula Edodes\tKg\tRs 700.00\tRs 800.00\tRs 750.00`;

    await fs.writeFile(path.join(dataDir, 'market_prices.txt'), marketPricesData);
  }
};

// Initialize data directory
setupDataDirectory();