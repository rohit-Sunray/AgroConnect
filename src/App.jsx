import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import Header from './Header';
import Footer from './Footer';
import HomeContent from './HomeContent';
import MarketPrices from './MarketPrices';
import FarmingTechniques from './FarmingTechniques';
import AskExperts from './AskExperts';
import WeatherForecast from './WeatherForecast';
import PlantIdentification from './PlantIdentification';
import PestDisease from './PestDisease';
import FinancialHelp from './FinancialHelp';
import ProfileSection from './ProfileSection';
import ChatWidget from './ChatWidget';
import LoadingScreen from './LoadingScreen';
import PricingPage from './PricingPage';
import HackathonJourney from './HackathonJourney';
// import FutureUpdates from './FutureUpdates';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    
    // Show ad popup 5 seconds after login
    setTimeout(() => {
      setShowAd(true);
    }, 5000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return <HomeContent setCurrentPage={setCurrentPage} />;
      case 'market':
        return <MarketPrices />;
      case 'techniques':
        return <FarmingTechniques />;
      case 'ask':
        return <AskExperts />;
      case 'weather':
        return <WeatherForecast />;
      case 'identify':
        return <PlantIdentification />;
      case 'pest':
        return <PestDisease />;
      case 'financial':
        return <FinancialHelp />;
      case 'profile':
        return isLoggedIn ? <ProfileSection /> : <LoginPage onLogin={handleLogin} />;
      case 'hackathonJourney':
        return <HackathonJourney />;
      case 'futureUpdates':
        return <FutureUpdates />;
      default:
        return <HomeContent setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <LoadingScreen />}
      
      {/* Header Banner */}
      <div className="bg-green-700 text-white py-2 text-center text-sm">
        Financial help this nav redirects to the page where Government Schemes & Agricultural Loan Assistance
      </div>
      
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
        
        {/* Floating Chat Button */}
        <div className="fixed bottom-6 right-6">
          <button 
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            💬
          </button>
        </div>
        
        {/* Chat Widget */}
        {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
      </main>
      
      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-800">Sign In</h2>
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Sign in to access premium features and personalized content.
              </p>
              <LoginForm onLogin={handleLogin} />
            </div>
          </div>
        </div>
      )}

      {/* Advertisement Popup */}
      {showAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full overflow-hidden relative">
            <button 
              onClick={() => setShowAd(false)}
              className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <div className="p-2">
              <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-4 text-center">
                <h3 className="text-xl font-bold">SPECIAL OFFER</h3>
                <p>For Nepali Farmers</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src="/api/placeholder/300/150" alt="Agricultural Equipment" className="rounded-lg" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                  30% OFF Modern Farming Equipment
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  Exclusive discount on drip irrigation systems and agricultural tools! Available for all AgriTech premium members.
                </p>
                <div className="flex flex-col space-y-2">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700">
                    Learn More
                  </button>
                  <button 
                    className="text-green-600 hover:text-green-800 py-2 px-4 font-medium"
                    onClick={() => setShowAd(false)}
                  >
                    No Thanks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple Login Form Component
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate authentication
    setTimeout(() => {
      if (username === 'Happyfarmer' && password === 'teamSrk') {
        onLogin();
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your username"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your password"
          required
        />
      </div>
      
      <div className="flex items-center justify-between mb-4">
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
        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
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
      
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-green-600 hover:text-green-800 font-medium">
            Register Now
          </a>
        </p>
      </div>
      
      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="text-center text-sm text-gray-600">
          For demo, use <span className="font-medium">Happyfarmer</span> and password <span className="font-medium">teamSrk</span>
        </p>
      </div>
    </form>
  );
};

export default App;