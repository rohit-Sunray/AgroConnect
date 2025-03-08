import React from 'react';

const PlantIdentification = () => {
  const recentIdentifications = [
    {
      id: 1,
      plant: "Rice (Oryza sativa)",
      image: "/api/placeholder/100/100",
      user: "Anil Sharma",
      location: "Chitwan",
      date: "2 hours ago"
    },
    {
      id: 2,
      plant: "Maize (Zea mays)",
      image: "/api/placeholder/100/100",
      user: "Sarita Thapa",
      location: "Pokhara",
      date: "1 day ago"
    },
    {
      id: 3,
      plant: "Mustard (Brassica juncea)",
      image: "/api/placeholder/100/100",
      user: "Binod Gurung",
      location: "Terai",
      date: "2 days ago"
    },
    {
      id: 4,
      plant: "Wheat (Triticum aestivum)",
      image: "/api/placeholder/100/100",
      user: "Manisha Bhandari",
      location: "Dang",
      date: "3 days ago"
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Plant Identification</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-8">
          <div className="mb-4 text-5xl">
            📷
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Identify Any Plant</h3>
          <p className="text-gray-600 max-w-md mx-auto">Take or upload a photo of any plant, crop, or weed to instantly identify it and get detailed information.</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
            <p className="text-gray-500 mb-4">Tap to take a photo or upload from gallery</p>
            <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700">
              Take Photo
            </button>
          </div>
          
          <div className="mt-6 flex space-x-3">
            <button className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200">
              Upload Image
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200">
              Browse History
            </button>
          </div>
        </div>
        
        <div className="mt-10">
          <h4 className="font-bold text-gray-800 mb-4">Recent Identifications</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recentIdentifications.map(item => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow">
                <img src={item.image} alt={item.plant} className="w-full h-24 object-cover rounded-lg mb-2" />
                <p className="font-medium text-sm text-gray-800">{item.plant}</p>
                <p className="text-xs text-gray-500">Identified by {item.user}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantIdentification;