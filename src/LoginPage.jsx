import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newsItems] = useState([
    {
      id: 1,
      title: "Global Initiative Aims to Reduce Agricultural Carbon Footprint by 30% by 2030",
      summary: "World leaders and agricultural organizations join forces to combat climate change through sustainable farming practices.",
      date: "March 5, 2025"
    },
    {
      id: 2,
      title: "Drought-Resistant Crop Varieties Show Promising Results Across Asian Markets",
      summary: "New genetically modified seeds have shown 40% higher yields in water-stressed conditions compared to traditional varieties.",
      date: "March 3, 2025"
    },
    {
      id: 3,
      title: "Nepal's Agricultural Exports Grow by 15% Despite Global Market Challenges",
      summary: "Strategic investments in farming technology and market access have strengthened Nepal's position in regional agricultural trade.",
      date: "March 1, 2025"
    }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Simulate authentication delay
    setTimeout(() => {
      if (username === 'Happyfarmer' && password === 'teamSrk') {
        // Successful login
        if (onLogin) {
          onLogin();
        } else {
          // For standalone use or demo
          alert('Login successful! Redirecting to home page...');
          window.location.href = "/home"; 
        }
      } else {
        // Failed login
        setErrorMsg('Invalid username or password. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌱</span>
              <h1 className="text-2xl font-bold">AgriTech Hub</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Login Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4 flex justify-center">
                  <img src="/api/placeholder/100/100" alt="AgriTech Logo" className="h-20 w-20 rounded-full" />
                </div>
                <h2 className="text-2xl font-bold text-green-800">Welcome to AgriTech</h2>
                <p className="text-gray-600 mt-2">Sign in to connect with Nepal's farming community</p>
              </div>

              <form onSubmit={handleLogin}>
                {errorMsg && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {errorMsg}
                  </div>
                )}
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-green-600 hover:text-green-800">
                    Forgot password?
                  </a>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                    Register Now
                  </a>
                </p>
              </div>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-center text-sm text-gray-600">
                  For demo, use <span className="font-medium">Happyfarmer</span> and password <span className="font-medium">teamSrk</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* News Section */}
        <div className="w-full md:w-1/2 bg-green-50 p-6">
          <div className="max-w-lg mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-green-800">Global Farming News</h2>
              <p className="text-gray-600">Stay updated with the latest agricultural trends and innovations</p>
            </div>
            
            <div className="space-y-6">
              {newsItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{item.summary}</p>
                    <a href="#" className="mt-3 inline-block text-green-600 hover:text-green-800 text-sm font-medium">
                      Read more →
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-green-100 rounded-lg p-6">
              <h3 className="font-bold text-green-800 mb-2">Announcing AgriTech 2.0</h3>
              <p className="text-gray-700 text-sm">
                Our new version includes direct government subsidy connections, 
                marketplace integration, and AI-powered plant identification. 
                Log in to explore these exciting features!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">&copy; 2025 AgriTech Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;