import React from 'react';

const ProfileSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Farmer Profile</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-green-50 p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img src="/api/placeholder/200/200" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Raju Sharma</h3>
            <p className="text-gray-600 mb-4">Member since January 2024</p>
            
            <div className="w-full space-y-2">
              <button className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700">
                Edit Profile
              </button>
              <button className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200">
                Change Photo
              </button>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">Farmer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Personal Details</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">Raju Sharma</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">Chitwan, Nepal</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">+977 9800123456</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Farming Details</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Land Size</p>
                    <p className="font-medium">3.5 Bigha</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Main Crops</p>
                    <p className="font-medium">Rice, Wheat, Vegetables</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Farming Method</p>
                    <p className="font-medium">Mixed (Traditional & Modern)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-500 mb-3">Preferences</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Organic Farming</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Crop Rotation</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Drip Irrigation</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Pesticide-Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h3 className="text-lg font-bold text-green-700 mb-4">Personalized Tips</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <p className="font-medium text-gray-800">Optimal planting time for rice in your region is approaching</p>
              <p className="text-sm text-gray-600">Consider preparing seedbeds by April 10th</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-1">
              <p className="font-medium text-gray-800">Weather alert: Reduced rainfall predicted</p>
              <p className="text-sm text-gray-600">Plan your irrigation strategy accordingly</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <p className="font-medium text-gray-800">New subsidy available for organic farmers</p>
              <p className="text-sm text-gray-600">Check the Financial Help section for details</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h3 className="text-lg font-bold text-green-700 mb-4">Transaction History</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <p className="font-medium text-gray-800">Sold Rice (35 kg)</p>
                <p className="text-xs text-gray-500">February 28, 2025</p>
              </div>
              <p className="font-medium text-green-600">+ ₹1,750</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <p className="font-medium text-gray-800">Purchased Seeds</p>
                <p className="text-xs text-gray-500">February 15, 2025</p>
              </div>
              <p className="font-medium text-red-600">- ₹450</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <p className="font-medium text-gray-800">Sold Vegetables</p>
                <p className="text-xs text-gray-500">February 10, 2025</p>
              </div>
              <p className="font-medium text-green-600">+ ₹920</p>
            </div>
          </div>
          <button className="mt-4 text-green-600 font-medium text-sm">
            View All Transactions →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;