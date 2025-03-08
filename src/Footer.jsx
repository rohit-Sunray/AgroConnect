import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">AgroConnect</h3>
            <p className="text-gray-300">Your one-stop resource for farming information, market prices, and agricultural technology.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Market Prices</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Farming Techniques</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Ask Experts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Weather</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Plant Identification</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <ul className="space-y-2">
              <li><a href="https://whatsapp.com/channel/0029Vb8FmoYB4hdPJln80t09" target='blank' className="text-gray-300 hover:text-white">Join WhatsApp Channel</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Instagram</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>support@agroconnect.com</li>
              <li>+977 980-123-4567</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 AgroConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;