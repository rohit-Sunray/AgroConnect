import React from 'react';

const FinancialHelp = () => {
  const subsidyData = [
    { 
      id: 1, 
      name: "Krishi Bikas Karyakram", 
      provider: "Ministry of Agriculture",
      type: "Subsidy",
      benefit: "50% discount on agricultural equipment",
      eligibility: "Small-scale farmers with land less than 2 bighas",
      deadline: "April 15, 2025"
    },
    { 
      id: 2, 
      name: "Agricultural Modernization Project", 
      provider: "Nepal Agricultural Research Council",
      type: "Grant",
      benefit: "Up to NPR 500,000 for farm modernization",
      eligibility: "Farmer cooperatives with at least 25 members",
      deadline: "May 30, 2025"
    },
    { 
      id: 3, 
      name: "Kisan Credit Card Scheme", 
      provider: "Nepal Rastra Bank",
      type: "Loan",
      benefit: "Low-interest loans up to NPR 300,000",
      eligibility: "All registered farmers with citizenship certificate",
      deadline: "Ongoing"
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Government Schemes & Agricultural Loan Assistance</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">Available Subsidies & Loans</h3>
            
            <div className="space-y-6">
              {subsidyData.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">{item.name}</h4>
                      <p className="text-gray-600 text-sm">Provider: {item.provider}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'Subsidy' ? 'bg-green-100 text-green-800' : 
                      item.type === 'Grant' ? 'bg-blue-100 text-blue-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Benefit:</p>
                      <p className="text-sm font-medium">{item.benefit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Eligibility:</p>
                      <p className="text-sm font-medium">{item.eligibility}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Deadline: <span className="font-medium">{item.deadline}</span>
                    </p>
                    <button className="bg-green-600 text-white text-sm font-medium py-1 px-3 rounded hover:bg-green-700">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
            <h3 className="text-lg font-bold text-green-700 mb-4">Loan Eligibility Checker</h3>
            <p className="text-gray-600 text-sm mb-4">
              Our AI-based system analyzes your profile and farming details to suggest the best loan options available for you.
            </p>
            
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Farming Area (in Bigha)</label>
                <input
                  type="number"
                  placeholder="Enter area"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Primary Crop</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Rice</option>
                  <option>Wheat</option>
                  <option>Maize</option>
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Annual Income (NPR)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
                Check Eligibility
              </button>
            </form>
          </div>
          
          <div className="bg-green-50 rounded-xl shadow-md overflow-hidden p-6">
            <h3 className="text-lg font-bold text-green-700 mb-3">Application Tracker</h3>
            <p className="text-gray-600 text-sm mb-4">
              Track the status of your subsidy and loan applications in real-time.
            </p>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">Krishi Bikas Karyakram</p>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">In Review</span>
                </div>
                <p className="text-xs text-gray-500">Applied: February 15, 2025</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">Kisan Credit Card</p>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">Approved</span>
                </div>
                <p className="text-xs text-gray-500">Applied: January 10, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h3 className="text-xl font-bold text-green-700 mb-4">Nepal Government Agricultural Support</h3>
        <p className="text-gray-600 mb-6">
          The Government of Nepal offers various supports to farmers through different programs and initiatives to boost agricultural productivity and farmer incomes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">Subsidy Programs</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Seed and fertilizer subsidies
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Agricultural equipment discounts
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Irrigation development support
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Insurance premium subsidies
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">Eligibility Requirements</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Citizenship certificate
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Land ownership documents
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Local government recommendation
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Bank account details
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialHelp;