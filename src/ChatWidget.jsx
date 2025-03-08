import React, { useState } from 'react';

const ChatWidget = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! I can help answer your farming questions. What would you like to know?' }
  ]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { sender: 'user', message }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          message: `Thanks for your question about "${message}". Our farming experts are analyzing this and will respond shortly. For immediate assistance, please check our farming techniques videos.` 
        }
      ]);
    }, 1000);
    
    setMessage('');
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-10">
      <div className="bg-green-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Farming Assistant</h3>
          <button 
            className="text-white hover:text-green-200"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-green-100">AI chatbot for small farming queries</p>
      </div>
      
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        {chatHistory.map((chat, index) => (
          <div 
            key={index} 
            className={`mb-3 ${
              chat.sender === 'user' 
                ? 'ml-auto bg-green-600 text-white' 
                : 'mr-auto bg-white text-gray-800 border border-gray-200'
            } rounded-lg p-3 max-w-xs`}
          >
            {chat.message}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about farming..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;