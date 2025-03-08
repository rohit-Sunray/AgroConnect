import React from 'react';

const AskExperts = () => {
  const recentQuestions = [
    { 
      id: 1, 
      question: "How to control tomato leaf curl virus?", 
      answer: "Use resistant varieties, apply neem oil, and maintain proper plant spacing for better air circulation.",
      askedBy: "Ramesh Kumar",
      answeredBy: "Dr. Priya Singh",
      date: "2 days ago"
    },
    { 
      id: 2, 
      question: "Best time to sow wheat in northern Nepal?", 
      answer: "Late October to mid-November is ideal for most varieties in the northern plains.",
      askedBy: "Sukhwinder Singh",
      answeredBy: "Dr. Amit Verma",
      date: "4 days ago"
    },
    { 
      id: 3, 
      question: "How to improve soil fertility naturally?", 
      answer: "Use compost, practice crop rotation, grow legumes, and incorporate green manures into your soil.",
      askedBy: "Lakshmi Devi",
      answeredBy: "Dr. Rajesh Patel",
      date: "1 week ago"
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ask Farming Experts</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">Post Your Question</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Question Title</label>
                <input
                  type="text"
                  placeholder="E.g., How to control tomato leaf curl virus?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Details</label>
                <textarea
                  placeholder="Provide more details about your farming problem..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Pest Control</option>
                  <option>Disease Management</option>
                  <option>Soil Health</option>
                  <option>Irrigation</option>
                  <option>Crop Selection</option>
                  <option>Weather Related</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Attach Images (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                  <p className="text-gray-500 mb-2">Upload images to help experts better understand your issue</p>
                  <button type="button" className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200">
                    Select Files
                  </button>
                </div>
              </div>
              <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700">
                Submit Question
              </button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">Recent Questions</h3>
            <div className="space-y-6">
              {recentQuestions.map(question => (
                <div key={question.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-bold text-gray-800 mb-2">{question.question}</h4>
                  <p className="text-gray-600 text-sm mb-2">{question.answer}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Asked by: {question.askedBy}</span>
                    <span>{question.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 text-green-600 font-medium flex items-center">
              View More Questions <span className="ml-1">→</span>
            </button>
          </div>
          
          <div className="bg-green-50 rounded-xl shadow-md overflow-hidden p-6 mt-6">
            <h3 className="text-lg font-bold text-green-700 mb-3">Get Expert Advice Faster</h3>
            <p className="text-gray-600 mb-4">Join our WhatsApp channel for quick responses from our farming experts.</p>
            <button className="bg-green-600 text-white w-full font-bold py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center">
              <span className="mr-2">Join WhatsApp Channel</span> 📱
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskExperts;