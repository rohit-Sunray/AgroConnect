import React from "react";

const HomeContent = ({ setCurrentPage }) => {
  const weatherData = {
    location: "Kathmandu, Nepal",
    temperature: "24°C",
    condition: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "12 km/h",
    forecast: [
      { day: "Today", temp: "24°C", condition: "partly-cloudy" },
      { day: "Tomorrow", temp: "26°C", condition: "sunny" },
      { day: "Wednesday", temp: "22°C", condition: "rainy" },
      { day: "Thursday", temp: "23°C", condition: "partly-cloudy" },
      { day: "Friday", temp: "25°C", condition: "sunny" },
    ],
  };

  const renderWeatherIcon = (condition) => {
    switch (condition) {
      case "sunny":
        return <div className="weather-icon">☀️</div>;
      case "partly-cloudy":
        return <div className="weather-icon">⛅</div>;
      case "rainy":
        return <div className="weather-icon">🌧️</div>;
      default:
        return <div className="weather-icon">⛅</div>;
    }
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold text-green-800 mb-6">About Us</h1>
          <p className="text-gray-700 text-lg mb-6">
            AgroConnect empowers Nepali farmers with real-time market data,
            modern farming techniques, and expert advice. We bridge traditional
            wisdom with cutting-edge technology to help farmers make informed
            decisions, increase yields, and boost profitability sustainably. Our
            mission is to create a hassle-free market by minimizing middlemen,
            ensuring farmers get fair prices through direct connections with
            buyers. We are committed to transforming Nepal’s agricultural sector
            with technology, knowledge, and seamless market access.{" "}
          </p>
          <button className="bg-green-700 text-white font-bold py-2 px-6 rounded-full hover:bg-green-800">
            Learn More
          </button>
        </div>
        <div className="md:w-1/2">
          <div className="rounded-full overflow-hidden w-100 h-100 mx-auto">
            <img
              src="/logo.png"
              alt="Agriculture"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-gray-500 mt-3">
            Empowering farmers with technology
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-green-700 mb-3">
            Market Prices
          </h3>
          <p className="text-gray-600 mb-4">
            Get real-time updates on crop and vegetable prices from markets
            across Nepal.
          </p>
          <button
            className="text-green-600 font-medium flex items-center"
            onClick={() => setCurrentPage("market")}
          >
            View Market Prices <span className="ml-1">→</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-green-700 mb-3">
            Farming Techniques
          </h3>
          <p className="text-gray-600 mb-4">
            Learn modern, efficient farming methods through our curated video
            collection.
          </p>
          <button
            className="text-green-600 font-medium flex items-center"
            onClick={() => setCurrentPage("techniques")}
          >
            Explore Techniques <span className="ml-1">→</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-green-700 mb-3">Ask Experts</h3>
          <p className="text-gray-600 mb-4">
            Connect with agricultural experts to solve your farming challenges.
          </p>
          <button
            className="text-green-600 font-medium flex items-center"
            onClick={() => setCurrentPage("ask")}
          >
            Ask a Question <span className="ml-1">→</span>
          </button>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Latest Weather Updates
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <div className="text-4xl mr-4">⛅</div>
              <div>
                <p className="text-xl font-bold">{weatherData.location}</p>
                <p className="text-3xl font-bold">{weatherData.temperature}</p>
                <p>{weatherData.condition}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            {weatherData.forecast.slice(0, 3).map((day, index) => (
              <div key={index} className="text-center">
                <p className="font-medium">{day.day}</p>
                <div className="my-2 text-2xl">
                  {renderWeatherIcon(day.condition)}
                </div>
                <p className="font-bold">{day.temp}</p>
              </div>
            ))}
          </div>

          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            onClick={() => setCurrentPage("weather")}
          >
            Full Forecast
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">📊</span>
            <h3 className="text-xl font-bold text-green-700">
              Financial Assistance
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Find government subsidies, grants, and loan opportunities
            specifically designed for Nepali farmers.
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium">Krishi Bikas Karyakram</h4>
              <p className="text-sm text-gray-600">
                50% subsidy on agricultural equipment
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium">Kisan Credit Card Scheme</h4>
              <p className="text-sm text-gray-600">
                Low-interest loans up to NPR 300,000
              </p>
            </div>
          </div>
          <button
            className="mt-4 text-green-600 font-medium flex items-center"
            onClick={() => setCurrentPage("financial")}
          >
            Explore All Programs <span className="ml-1">→</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">📱</span>
            <h3 className="text-xl font-bold text-green-700">
              Marketplace Access
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Connect directly with buyers and eliminate middlemen to get better
            prices for your produce.
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Digital Ecosystem Benefits:</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Direct farmer-to-vendor transactions
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Fair pricing through transparency
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Integrated transportation solutions
              </li>
            </ul>
          </div>
          <button
            className="mt-4 text-green-600 font-medium flex items-center"
            onClick={() => setCurrentPage("marketplace")}
          >
            Access Marketplace <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
