import React from 'react';

const PestDisease = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pest & Disease Detection AI</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-8">
          <div className="mb-4 text-5xl">
            🔍
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Identify Plant Problems</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Take or upload a photo of your affected plant and our AI will identify pests, diseases, 
            and nutrient deficiencies with treatment recommendations.
          </p>
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
          <h4 className="font-bold text-gray-800 mb-4">Common Plant Issues</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow">
              <img src="/api/placeholder/100/100" alt="Leaf Blight" className="w-full h-24 object-cover rounded-lg mb-2" />
              <p className="font-medium text-sm text-gray-800">Leaf Blight</p>
              <p className="text-xs text-gray-500">Common in rice</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow">
              <img src="/api/placeholder/100/100" alt="Aphids" className="w-full h-24 object-cover rounded-lg mb-2" />
              <p className="font-medium text-sm text-gray-800">Aphids</p>
              <p className="text-xs text-gray-500">Affects vegetables</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow">
              <img src="/api/placeholder/100/100" alt="Powdery Mildew" className="w-full h-24 object-cover rounded-lg mb-2" />
              <p className="font-medium text-sm text-gray-800">Powdery Mildew</p>
              <p className="text-xs text-gray-500">Fungal disease</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow">
              <img src="/api/placeholder/100/100" alt="Nitrogen Deficiency" className="w-full h-24 object-cover rounded-lg mb-2" />
              <p className="font-medium text-sm text-gray-800">Nitrogen Deficiency</p>
              <p className="text-xs text-gray-500">Nutrient issue</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PestDisease;