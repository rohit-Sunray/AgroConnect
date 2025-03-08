import React, { useState } from 'react';

const Header = ({ currentPage, setCurrentPage, isLoggedIn, onLogout, onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPlantIDMenu, setShowPlantIDMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-cream-100 text-green-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {/* <span className="text-2xl mr-2">🌱</span>
            <h1 className="text-xl font-bold">Agritech</h1> */}
            <h1 className="logo" onClick={() => window.location.reload()}>
  <img 
    src="/text-logo.png" 
    alt="Logo" 
    style={{ height: 'auto', width: '150px' }} 
  />
</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className={`hover:text-green-600 ${currentPage === 'home' ? 'font-bold border-b-2 border-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('home');}}
            >
              Home
            </a>
            <a 
              href="#" 
              className={`hover:text-green-600 ${currentPage === 'market' ? 'font-bold border-b-2 border-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('market');}}
            >
              Market Prices
            </a>
            <a 
              href="#" 
              className={`hover:text-green-600 ${currentPage === 'techniques' ? 'font-bold border-b-2 border-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('techniques');}}
            >
              Farming Techniques
            </a>
            <a 
              href="#" 
              className={`hover:text-green-600 ${currentPage === 'ask' ? 'font-bold border-b-2 border-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('ask');}}
            >
              Ask
            </a>
            <a 
              href="#" 
              className={`hover:text-green-600 ${currentPage === 'weather' ? 'font-bold border-b-2 border-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('weather');}}
            >
              Weather
            </a>
            <a 
              href="#" 
              className={`hover:text-green-600 ${currentPage === 'financial' ? 'font-bold border-b-2 border-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('financial');}}
            >
              Financial Help
            </a>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Camera Menu */}
            <div className="relative">
              <button 
                className="p-2 rounded-full text-xl"
                onClick={() => setShowPlantIDMenu(!showPlantIDMenu)}
              >
                📷
              </button>
              {showPlantIDMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20">
                  <div className="py-1">
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault(); 
                        setCurrentPage('identify');
                        setShowPlantIDMenu(false);
                      }}
                    >
                      Plant Identification
                    </a>
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault(); 
                        setCurrentPage('pest');
                        setShowPlantIDMenu(false);
                      }}
                    >
                      Pest & Disease Detection
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* Notification */}
            <button className="p-2 rounded-full text-xl">
              🔔
            </button>
            
            {/* Sign In / Profile Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  className="p-2 rounded-full text-xl"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  👤
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20">
                    <div className="py-1">
                      <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault(); 
                          setCurrentPage('profile');
                          setShowProfileMenu(false);
                        }}
                      >
                        My Profile
                      </a>
                      <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault(); 
                          setCurrentPage('dashboard');
                          setShowProfileMenu(false);
                        }}
                      >
                        Dashboard
                      </a>
                      <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault(); 
                          setCurrentPage('transactions');
                          setShowProfileMenu(false);
                        }}
                      >
                        My Transactions
                      </a>
                      <div className="border-t border-gray-100"></div>
                      <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowProfileMenu(false);
                          onLogout();
                        }}
                      >
                        Sign Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                onClick={onLoginClick}
              >
                Sign In
              </button>
            )}
            
            {/* Mobile menu toggle */}
            <button 
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-500">
            <nav className="flex flex-col space-y-3">
              <a 
                href="#" 
                className={currentPage === 'home' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('home'); setIsMobileMenuOpen(false);}}
              >
                Home
              </a>
              <a 
                href="#" 
                className={currentPage === 'market' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('market'); setIsMobileMenuOpen(false);}}
              >
                Market Prices
              </a>
              <a 
                href="#" 
                className={currentPage === 'techniques' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('techniques'); setIsMobileMenuOpen(false);}}
              >
                Farming Techniques
              </a>
              <a 
                href="#" 
                className={currentPage === 'ask' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('ask'); setIsMobileMenuOpen(false);}}
              >
                Ask
              </a>
              <a 
                href="#" 
                className={currentPage === 'weather' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('weather'); setIsMobileMenuOpen(false);}}
              >
                Weather
              </a>
              <a 
                href="#" 
                className={currentPage === 'identify' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('identify'); setIsMobileMenuOpen(false);}}
              >
                Plant ID
              </a>
              <a 
                href="#" 
                className={currentPage === 'financial' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('financial'); setIsMobileMenuOpen(false);}}
              >
                Financial Help
              </a>
              {isLoggedIn ? (
                <a 
                  href="#" 
                  className={currentPage === 'profile' ? 'font-bold' : ''}
                  onClick={(e) => {e.preventDefault(); setCurrentPage('profile'); setIsMobileMenuOpen(false);}}
                >
                  My Profile
                </a>
              ) : (
                <a 
                  href="#" 
                  className="text-green-600 font-medium"
                  onClick={(e) => {e.preventDefault(); onLoginClick(); setIsMobileMenuOpen(false);}}
                >
                  Sign In
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;