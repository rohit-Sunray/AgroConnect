import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

// World Clock Component
const WorldClock = () => {
  const [time, setTime] = useState(new Date());
  const [showAllTimezones, setShowAllTimezones] = useState(false);
  
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Function to calculate time in different timezones
  const calculateTime = useCallback((offsetHours, offsetMinutes = 0) => {
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const offsetMillis = ((offsetHours * 60) + offsetMinutes) * 60000;
    return new Date(utc + offsetMillis);
  }, [time]);
  
  // Calculate times for different regions
  const timeZones = useMemo(() => [
    { name: 'Nepal', abbr: 'NPT', time: calculateTime(5, 45), emoji: '🇳🇵' },
    { name: 'UTC/GMT', abbr: 'UTC', time: calculateTime(0), emoji: '🌐' },
    { name: 'London', abbr: 'GMT', time: calculateTime(0), emoji: '🇬🇧' },
    { name: 'New York', abbr: 'EST', time: calculateTime(-5), emoji: '🇺🇸' },
    { name: 'Tokyo', abbr: 'JST', time: calculateTime(9), emoji: '🇯🇵' },
    { name: 'Sydney', abbr: 'AEST', time: calculateTime(10), emoji: '🇦🇺' },
    { name: 'Dubai', abbr: 'GST', time: calculateTime(4), emoji: '🇦🇪' },
    { name: 'Delhi', abbr: 'IST', time: calculateTime(5, 30), emoji: '🇮🇳' }
  ], [calculateTime]);
  
  // Always show Nepal time and UTC, plus a few others if expanded
  const displayTimezones = showAllTimezones ? timeZones : timeZones.slice(0, 3);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-3 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800 flex items-center">
          <span className="mr-2">🕒</span> World Clock
        </h4>
        <button 
          onClick={() => setShowAllTimezones(!showAllTimezones)}
          className="text-green-600 text-sm hover:text-green-800"
        >
          {showAllTimezones ? 'Show Less' : 'Show More'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {displayTimezones.map((zone, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-2">{zone.emoji}</span>
            <div>
              <div className="font-medium">{zone.time.toLocaleTimeString()}</div>
              <div className="text-xs text-gray-500">{zone.name} ({zone.abbr})</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState('Kathmandu');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'fb98a8aada6ee849e1a493f942e22239';
  
  // Map OpenWeatherMap conditions to our simplified conditions
  const mapWeatherCondition = useCallback((condition) => {
    switch(condition.toLowerCase()) {
      case 'clear':
        return 'sunny';
      case 'clouds':
        return 'partly-cloudy';
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        return 'rainy';
      case 'snow':
        return 'snowy';
      default:
        return 'partly-cloudy';
    }
  }, []);
  
  // Process the forecast data to get one entry per day
  const processForecastData = useCallback((forecastList) => {
    const dailyData = [];
    const today = new Date().getDate();
    
    // Get unique dates (one forecast per day)
    const uniqueDates = new Set();
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.getDate();
      
      // Skip today as we already have current weather
      if (day !== today && !uniqueDates.has(day) && dailyData.length < 5) {
        uniqueDates.add(day);
        
        // Get day name
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        dailyData.push({
          day: dayName,
          temp: `${Math.round(item.main.temp)}°C`,
          condition: mapWeatherCondition(item.weather[0].main),
          description: item.weather[0].description,
          icon: item.weather[0].icon
        });
      }
    });
    
    return dailyData;
  }, [mapWeatherCondition]);
  
  useEffect(() => {
    // Fetch current weather
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        
        // Also fetch 5-day forecast
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
        );
        
        // Process forecast data to get daily data (OpenWeatherMap free tier returns 3-hour intervals)
        const dailyData = processForecastData(forecastResponse.data.list);
        setForecastData(dailyData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Unable to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, processForecastData]);

  const renderWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny':
        return <div className="weather-icon">☀️</div>;
      case 'partly-cloudy':
        return <div className="weather-icon">⛅</div>;
      case 'rainy':
        return <div className="weather-icon">🌧️</div>;
      case 'snowy':
        return <div className="weather-icon">❄️</div>;
      default:
        return <div className="weather-icon">⛅</div>;
    }
  };

  const handleLocationChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setLocation(e.target.value);
    }
  };

  // If still loading or error
  if (loading && !weatherData) {
    return (
      <section className="text-center py-12">
        <div className="text-4xl mb-4">⏳</div>
        <h2 className="text-2xl font-bold text-gray-800">Loading weather data...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Data Unavailable</h2>
        <p className="text-gray-600">{error}</p>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Try another location (e.g., Kathmandu)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            defaultValue={location}
            onKeyDown={handleLocationChange}
          />
        </div>
      </section>
    );
  }

  // After data is loaded
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mr-4">Weather Forecast</h2>
        <div className="relative mt-3 md:mt-0">
          <input
            type="text"
            placeholder="Search location..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            defaultValue={location}
            onKeyDown={handleLocationChange}
          />
        </div>
      </div>
      
      {/* Premium Weather Features Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 mb-6 border border-purple-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-3xl mr-4">⚡</div>
            <div>
              <h3 className="text-lg font-bold text-purple-800">Premium Weather Services for Farmers</h3>
              <p className="text-gray-700">Get precise agricultural forecasting, historical analysis, and SMS alerts</p>
            </div>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg text-sm font-medium">
            Upgrade to Premium
          </button>
        </div>
      </div>
      
      <WorldClock />
      
      {weatherData && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {weatherData.name}, {weatherData.sys.country}
                </h3>
                <p className="text-gray-500">Updated just now</p>
              </div>
              <div className="flex items-center">
                <button className="bg-green-50 hover:bg-green-100 text-green-600 font-medium py-2 px-4 rounded-lg text-sm">
                  Subscribe to Alerts
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="text-4xl mr-4">
                    {renderWeatherIcon(mapWeatherCondition(weatherData.weather[0].main))}
                  </div>
                  <div>
                    <h4 className="text-4xl font-bold text-gray-800">{Math.round(weatherData.main.temp)}°C</h4>
                    <p className="text-gray-600">{weatherData.weather[0].description}</p>
                  </div>
                </div>
                
                <div className="flex space-x-6">
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">Humidity</p>
                    <p className="font-bold text-gray-800">{weatherData.main.humidity}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">Wind</p>
                    <p className="font-bold text-gray-800">{Math.round(weatherData.wind.speed * 3.6)} km/h</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">Feels Like</p>
                    <p className="font-bold text-gray-800">{Math.round(weatherData.main.feels_like)}°C</p>
                  </div>
                </div>
              </div>
            </div>
            
            <h4 className="font-bold text-gray-800 mb-3">5-Day Forecast</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {forecastData.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="font-medium text-gray-800">{day.day}</p>
                  <div className="my-2 text-3xl">
                    {renderWeatherIcon(day.condition)}
                  </div>
                  <p className="font-bold text-gray-800">{day.temp}</p>
                  <p className="text-xs text-gray-500">{day.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weather Alerts Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="flex items-center text-xl font-bold text-gray-800 mb-3">
            <span className="mr-2">⚠️</span>
            Weather Alerts
          </h3>
          {weatherData && (
            <>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">3-5 Day Forecast Warnings:</h4>
                <div className="space-y-2">
                  {/* Example warning conditions - these would be dynamic based on actual API data */}
                  {weatherData.main.temp > 32 && (
                    <div className="bg-orange-100 border-l-4 border-orange-500 p-3 rounded">
                      <p className="font-bold text-orange-700">Heat Wave Alert</p>
                      <p className="text-sm text-gray-600">Temperatures expected to remain above 32°C for the next 3 days. Protect sensitive crops with shade cloth and increase irrigation.</p>
                    </div>
                  )}
                  {weatherData.weather[0].main === 'Rain' && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
                      <p className="font-bold text-blue-700">Heavy Rainfall Warning</p>
                      <p className="text-sm text-gray-600">Sustained rainfall expected. Clear drainage channels and protect harvested crops from moisture. Risk of flooding in low-lying fields.</p>
                    </div>
                  )}
                  {/* More dynamic conditions would be added based on real forecast data */}
                  {weatherData.wind.speed > 8 && (
                    <div className="bg-purple-100 border-l-4 border-purple-500 p-3 rounded">
                      <p className="font-bold text-purple-700">Strong Winds Expected</p>
                      <p className="text-sm text-gray-600">Wind speeds of 20-30 km/h predicted. Secure young plants and consider delaying pesticide application.</p>
                    </div>
                  )}
                  {/* If no alerts, show this message */}
                  {weatherData.main.temp <= 32 && weatherData.weather[0].main !== 'Rain' && weatherData.wind.speed <= 8 && (
                    <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded">
                      <p className="font-bold text-green-700">No Severe Weather Warnings</p>
                      <p className="text-sm text-gray-600">Favorable conditions expected for the next 3-5 days. Good opportunity for regular field activities.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                <p className="flex items-center font-medium text-purple-800 mb-2">
                  <span className="mr-2">✨</span>Premium Alert Features:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Hourly SMS alerts in Nepali for illiterate farmers
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Voice messages for critical weather warnings
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    Crop-specific impact assessments for each alert
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <button className="bg-green-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-green-700">
                  Subscribe to SMS Alerts
                </button>
                <span className="text-xs text-gray-500">Coming soon: SMS Notifications</span>
              </div>
            </>
          )}
        </div>
        
        {/* Farming Advisory Section */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="flex items-center text-xl font-bold text-gray-800 mb-3">
            <span className="mr-2">🌱</span>
            Farming Advisory
          </h3>
          {weatherData && (
            <>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Weather-Based Recommendations:</h4>
                <ul className="space-y-2 text-gray-700">
                  {weatherData.weather[0].main === 'Rain' ? (
                    <>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✖</span>
                        Avoid applying fertilizers or pesticides as they will wash away
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Good time to transplant seedlings (after rain stops)
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Check field drainage to prevent waterlogging
                      </li>
                    </>
                  ) : weatherData.main.temp > 30 ? (
                    <>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✖</span>
                        Avoid midday field operations to prevent heat stress
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Increase irrigation frequency for young plants
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Apply mulch to conserve soil moisture
                      </li>
                    </>
                  ) : weatherData.wind.speed > 20 ? (
                    <>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✖</span>
                        Delay spraying operations due to wind drift
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Secure young plants with stakes if needed
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Check for potential damage to crop structures
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Ideal conditions for most field activities
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Good time for soil preparation and planting
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Favorable for fertilizer application
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="mt-3 bg-purple-50 rounded-lg p-3 border border-purple-200">
                <p className="flex items-center font-medium text-purple-800 mb-2">
                  <span className="mr-2">💧</span>Smart Irrigation Premium Feature:
                </p>
                <div className="flex items-center bg-white p-2 rounded-lg mb-2">
                  <div className="w-1/2">
                    <div className="text-2xl font-bold text-blue-600">4.3 L/m²</div>
                    <div className="text-xs text-gray-500">Calculated water needs</div>
                  </div>
                  <div className="w-1/2 text-right">
                    <div className="text-sm font-medium">Based on:</div>
                    <div className="text-xs text-gray-500">Rainfall, humidity, temperature, crop type</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 italic">AI calculates precise water requirements based on current weather conditions, soil moisture levels, and specific crop needs.</p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Premium Long-term Weather Forecast */}
      <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Long-term Weather Planning</h3>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
            PREMIUM FEATURE
          </span>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-8 text-center relative overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/40 to-blue-100/40"></div>
          <div className="relative">
            <img src="/Weather-Icon.png" alt="Long-term weather forecast" className="mx-auto rounded-lg opacity-40 max-w-full h-20" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
              <h4 className="text-xl font-bold text-purple-800 mb-2">6-Month Agricultural Forecast</h4>
              <p className="text-gray-700 mb-4">Plan your farming activities with confidence using our 6-month to 1-year weather predictions</p>
              <button className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 font-medium">
                Unlock Premium Access
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 flex items-center mb-3">
              <span className="text-xl mr-2">📈</span>Historical Weather Trends
            </h4>
            <p className="text-gray-600 mb-3">Access 10+ years of weather data for your location to identify patterns and make informed farming decisions.</p>
            <div className="border-t border-gray-100 pt-3 mt-2">
              <button className="text-purple-600 font-medium flex items-center text-sm">
                View Historical Analysis <span className="ml-1">→</span>
              </button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 flex items-center mb-3">
              <span className="text-xl mr-2">🚜</span>Seasonal Planning Guide
            </h4>
            <p className="text-gray-600 mb-3">Get customized planting and harvesting schedules based on long-term weather predictions for your specific crops.</p>
            <div className="border-t border-gray-100 pt-3 mt-2">
              <button className="text-purple-600 font-medium flex items-center text-sm">
                Generate Custom Calendar <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Crop Calendar Section */}
      <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h3 className="flex items-center text-xl font-bold text-gray-800 mb-4">
          <span className="mr-2">🗓️</span>
          Seasonal Crop Calendar
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planting Season</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvesting Season</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Rice */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">Rice (Paddy)</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">June - July</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">October - November</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date().getMonth() >= 5 && new Date().getMonth() <= 6 ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Planting Time</span>
                  ) : new Date().getMonth() >= 9 && new Date().getMonth() <= 10 ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Harvesting Soon</span>
                  ) : (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Growing</span>
                  )}
                </td>
              </tr>
              
              {/* Wheat */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">Wheat</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">November - December</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">April - May</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date().getMonth() >= 10 || new Date().getMonth() <= 11 ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Planting Time</span>
                  ) : new Date().getMonth() >= 3 && new Date().getMonth() <= 4 ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Harvesting Soon</span>
                  ) : (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Growing</span>
                  )}
                </td>
              </tr>
              
              {/* Maize */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">Maize</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">March - April</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">August - September</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date().getMonth() >= 2 && new Date().getMonth() <= 3 ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Planting Time</span>
                  ) : new Date().getMonth() >= 7 && new Date().getMonth() <= 8 ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Harvesting Soon</span>
                  ) : (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Growing</span>
                  )}
                </td>
              </tr>
              
              {/* Lentils */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">Lentils</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">October - November</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">February - March</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date().getMonth() >= 9 && new Date().getMonth() <= 10 ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Planting Time</span>
                  ) : new Date().getMonth() >= 1 && new Date().getMonth() <= 2 ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Harvesting Soon</span>
                  ) : (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Growing</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
            View Complete Crop Calendar →
          </button>
        </div>
      </div>
      
      {/* Future Updates Banner */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-3 md:mb-0">
          <span className="text-2xl mr-3">📱</span>
          <div>
            <h4 className="font-bold text-gray-800">Coming Soon: Weather SMS Alerts in Nepali</h4>
            <p className="text-sm text-gray-600">Get timely weather alerts and farming advice in Nepali directly on your mobile phone.</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium">
          Join Waiting List
        </button>
      </div>
    </section>
  );
};

export default WeatherForecast;