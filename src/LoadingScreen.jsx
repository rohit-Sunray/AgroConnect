import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-green-600 flex items-center justify-center z-50">
      <div className="text-center">
        {/* <div className="text-6xl mb-4">🌱</div>
        <h1 className="text-white text-2xl font-bold">AgroConnect</h1> */}
        <h1 className="logo" onClick={() => window.location='#'}>
  <img 
    src="/favicon/text-logo.png" 
    alt="Logo" 
    style={{ height: 'auto', width: '500px' }} 
  />
</h1>
        <p className="text-green-100 mt-2">Loading your farming assistant...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;