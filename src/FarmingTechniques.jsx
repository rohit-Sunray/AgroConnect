import React, { useState } from "react";

const FarmingTechniques = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);

  const farmingVideos = [
    {
      id: 1,
      title: "Modern Drip Irrigation Techniques",
      thumbnail: "/thumbnail/mdit.jpeg",
      duration: "12:45",
      free: true,
      youtubeLink: "https://www.youtube.com/watch?v=k-7N8cWTt-8",
    },
    {
      id: 2,
      title: "Organic Pest Control Methods",
      thumbnail: "/thumbnail/opcm.webp",
      duration: "08:30",
      free: true,
      youtubeLink: "https://www.youtube.com/watch?v=gSLfKT86JI8",
    },
    {
      id: 3,
      title: "Hydroponics for Beginners",
      thumbnail: "/thumbnail/hfb.webp",
      duration: "15:20",
      free: false,
    },
    {
      id: 4,
      title: "Sustainable Crop Rotation",
      thumbnail: "/thumbnail/scr.jpg",
      duration: "10:15",
      free: true,
      youtubeLink: "https://www.youtube.com/watch?v=UVB1MtNoAqo",
    },
    {
      id: 5,
      title: "Advanced Composting Techniques",
      thumbnail: "/thumbnail/act.jpg",
      duration: "14:30",
      free: false,
    },
    {
      id: 6,
      title: "Water Management in Dry Season",
      thumbnail: "/thumbnail/wmids.jpg",
      duration: "11:45",
      free: false,
    },
  ];

  const cropInformation = [
    {
      id: 1,
      name: "Rice (धान)",
      image: "/src/assets/rice.jpg",
      seasons:
        "Planting: June-July (Asadh-Shrawan); Harvesting: October-November (Kartik-Mangsir)",
      fertilizers:
        "NPK 100:30:30 kg/ha. Apply urea in 3 splits: basal, tillering, and panicle initiation stages.",
      description:
        "Rice is Nepal's staple crop, with different varieties for different elevations. Prefers well-irrigated and clay soil with good water retention capability.",
    },
    {
      id: 2,
      name: "Maize (मकै)",
      image: "/src/assets/Maize.jpg",
      seasons: "Terai: Feb-April; Hills: March-May; Mountains: April-June",
      fertilizers:
        "NPK 120:60:40 kg/ha. Apply nitrogen in 3 splits for better yield.",
      description:
        "Second major crop in Nepal, widely grown in hills. Requires well-drained fertile soil with good organic matter and regular rainfall.",
    },
    {
      id: 3,
      name: "Wheat (गहुँ)",
      image: "/src/assets/wheat.jpg",
      seasons:
        "Planting: November-December (Kartik-Mangsir); Harvesting: March-April (Chaitra-Baisakh)",
      fertilizers:
        "NPK 100:50:25 kg/ha. Apply nitrogen in two splits: at sowing and before first irrigation.",
      description:
        "Third most important cereal crop in Nepal. Optimal temperatures are 15-20°C for growing and needs 4-6 irrigations depending on soil type.",
    },
    {
      id: 4,
      name: "Potato (आलु)",
      image: "/src/assets/Potatoe.jpg",
      seasons:
        "Terai: Oct-Nov; Hills: Feb-March and Sept-Oct; Mountains: March-April",
      fertilizers:
        "FYM/compost 20-25 ton/ha and NPK 100:80:60 kg/ha. Extra potassium benefits tuber quality.",
      description:
        "Important cash crop grown across all ecological zones. Prefers well-drained, loose, sandy-loam soil rich in organic matter.",
    },
  ];

  const successStories = [
    {
      id: 1,
      farmer: "Ram Bahadur Tamang",
      location: "Kavre District",
      crop: "Tomatoes",
      title: "From Traditional to Commercial Farming",
      story:
        "Ram Bahadur switched from traditional cereal farming to commercial tomato farming using drip irrigation and tunnel technology. His income increased from NPR 50,000 to NPR 300,000 annually, allowing him to send his children to better schools.",
      image: "/api/placeholder/200/200",
    },
    {
      id: 2,
      farmer: "Sarita Devi",
      location: "Chitwan",
      crop: "Mushrooms",
      title: "Women-Led Mushroom Enterprise",
      story:
        "Starting with just two mushroom bags in her shed, Sarita now manages a cooperative of 25 women farmers producing over 500 kg of mushrooms monthly. The business has created jobs for local women and improved household nutrition in the community.",
      image: "/api/placeholder/200/200",
    },
    {
      id: 3,
      farmer: "Krishna Prasad Sharma",
      location: "Syangja",
      crop: "Kiwi",
      title: "Pioneering Kiwi Farming in Nepal",
      story:
        "Krishna was among the first farmers to introduce kiwi farming in Nepal. Despite initial challenges, his determination led to success, and he now harvests 1.5 tons of kiwi annually from his farm. He trains other farmers and has helped establish kiwi farming as a profitable enterprise.",
      image: "/api/placeholder/200/200",
    },
  ];

  // Expert consultants data
  const experts = [
    {
      id: 1,
      name: "Dr. Rajendra Uprety",
      specialty: "Organic Farming & Sustainable Agriculture",
      experience: "15+ years",
      qualifications: "PhD in Agricultural Sciences",
      price: 2500, // NPR per day
      availability: "Available Mon-Fri",
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Bishnu Maya Sharma",
      specialty: "Crop Disease Management & Pest Control",
      experience: "12+ years",
      qualifications: "MSc in Plant Pathology",
      price: 2200, // NPR per day
      availability: "Available Wed-Sun",
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Kumar Shrestha",
      specialty: "Soil Health & Fertilizer Management",
      experience: "10+ years",
      qualifications: "BSc in Soil Science",
      price: 1800, // NPR per day
      availability: "Available all week",
      image: "/api/placeholder/100/100"
    }
  ];

  return (
    <section>
      {/* Nepali Farming Tips Book Highlight */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/3 flex justify-center">
          <img
            src="/Book.jpeg"
            alt="कृषिमा क्षमता अभिवृद्धि"
            className="h-auto max-h-72 object-contain border border-gray-200 shadow-sm"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            कृषिमा क्षमता अभिवृद्धि
          </h2>
          <p className="text-gray-700 mb-4">
            नेपाली किसानहरूका लागि विशेष रूपमा तयार गरिएको यो पुस्तकले कृषि
            प्रविधिहरूबारे सरल भाषामा जानकारी प्रदान गर्दछ। यसले साक्षर तथा
            निरक्षर किसानहरूलाई सहायता गर्ने गरी चित्रहरू समेत समावेश गरिएको छ।
          </p>
          <p className="text-gray-600 italic mb-4">
            (This Nepali language book is specially prepared for Nepali farmers,
            providing information about agricultural techniques in simple
            language. It includes illustrations to assist both literate and
            illiterate farmers.)
          </p>
          <div className="flex gap-3">
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              अहिले डाउनलोड गर्नुहोस्
            </button>
            <button className="border border-green-600 text-green-700 py-2 px-4 rounded-lg hover:bg-green-50">
              थप जानकारी
            </button>
          </div>
        </div>
      </div>

      {/* Expert Consultation Banner */}
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-amber-800 mb-2">
              Need Expert Advice on Farming?
            </h3>
            <p className="text-gray-700">
              Get personalized consultation on fertilizers, pest control, soil health, 
              or any farming-related questions from our certified agricultural experts.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowExpertModal(true)}
              className="bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700"
            >
              Hire an Expert
            </button>
            <button className="border border-amber-600 text-amber-700 py-2 px-4 rounded-lg hover:bg-amber-50">
              Ask a Question
            </button>
          </div>
        </div>
      </div>

      {/* Research Resource Section */}
      <div className="bg-green-50 p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold text-green-800 mb-3">
              Agricultural Research and Innovation for Food and Nutrition
              Security in Nepal
            </h3>
            <p className="text-gray-700 mb-4">
              This comprehensive research paper by Dr. Devendra Gauchan and
              colleagues explores agricultural research and innovation
              approaches to improve food and nutrition security in Nepal. The
              paper addresses critical issues like food crisis, escalating
              agricultural imports, and gaps in research and innovation.
            </p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <h4 className="font-bold text-gray-800 mb-2">Key Highlights:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Current status of food and nutrition security in Nepal</li>
                <li>Agricultural import growth trends and challenges</li>
                <li>
                  Role of agricultural research and innovation in food security
                </li>
                <li>Promising farming technologies and productivity gaps</li>
                <li>Research and investment priorities for Nepal</li>
              </ul>
            </div>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              Download Research Paper
            </button>
          </div>
          <div className="md:w-1/3 bg-white p-4 rounded-lg shadow-sm">
            <img
              src="/PDF.png"
              alt="Agricultural Research Document"
              className="w-30 h-50 mb-3 rounded"
            />
            <div className="text-sm text-gray-600">
              <p>
                <strong>Authors:</strong> Devendra Gauchan, Ram Krishna
                Shrestha, Krishna Timsina, et al.
              </p>
              <p>
                <strong>Presented at:</strong> 7th SAS Convention, Kathmandu
              </p>
              <p>
                <strong>Date:</strong> April 4, 2022
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Videos, Crop Information, Success Stories */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "videos"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Farming Videos
          </button>
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "crops"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
            onClick={() => setActiveTab("crops")}
          >
            Crop Information
          </button>
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "success"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
            onClick={() => setActiveTab("success")}
          >
            Success Stories
          </button>
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "experts"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
            onClick={() => setActiveTab("experts")}
          >
            Expert Consultation
          </button>
        </div>
      </div>

      {/* Videos Tab Content */}
      {activeTab === "videos" && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Modern Farming Technique Videos
          </h2>

          <div className="flex mb-4 items-center justify-between">
            <div className="flex gap-3">
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                <span className="h-2 w-2 bg-green-600 rounded-full mr-1"></span>
                Free Videos
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-1"></span>
                Premium Content
              </span>
            </div>
            <button className="text-sm text-green-700 hover:text-green-800 font-medium flex items-center">
              Subscribe for Premium <span className="ml-1">✨</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {farmingVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full object-cover h-40"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {!video.free && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      PREMIUM
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2">
                    {video.title}
                  </h3>
                  {video.free ? (
                    <a
                      href={video.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center font-medium text-green-600 hover:text-green-700"
                    >
                      Watch Free Video <span className="ml-1">▶️</span>
                    </a>
                  ) : (
                    <button
                      className="text-sm flex items-center font-medium text-purple-600"
                      onClick={() => setShowPremiumModal(true)}
                    >
                      Unlock Premium Content <span className="ml-1">▶️</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors">
              Load More Videos <span className="ml-2">⌄</span>
            </button>
          </div>
        </>
      )}

      {/* Crop Information Tab Content */}
      {activeTab === "crops" && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Major Crops Information
          </h2>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-purple-800 mb-1">
                Unlock Premium Crop Information
              </h3>
              <p className="text-gray-700">
                Access detailed growing guides, advanced cultivation techniques,
                pest management calendars, and expert advice for 30+ crops.
              </p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-medium">
              Subscribe for Premium Access
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {cropInformation.map((crop) => (
              <div
                key={crop.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/3">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-4">
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    {crop.name}
                  </h3>

                  <div className="mb-3">
                    <h4 className="text-sm font-bold text-gray-700">
                      Growing Season:
                    </h4>
                    <p className="text-sm text-gray-600">{crop.seasons}</p>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-sm font-bold text-gray-700">
                      Recommended Fertilizers:
                    </h4>
                    <p className="text-sm text-gray-600">{crop.fertilizers}</p>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-sm font-bold text-gray-700">
                      Cultivation Notes:
                    </h4>
                    <p className="text-sm text-gray-600">{crop.description}</p>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-1 flex justify-between">
                    <button className="text-purple-600 text-sm font-medium flex items-center">
                      Unlock Premium Details <span className="ml-1">✨</span>
                    </button>
                    <button 
                      onClick={() => setShowExpertModal(true)}
                      className="text-amber-600 text-sm font-medium flex items-center"
                    >
                      Ask Expert <span className="ml-1">👨‍🌾</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ask Expert about Fertilizers Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-amber-800 mb-4">
              Ask an Expert about Fertilizers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 mb-4">
                  Not sure which fertilizers to use for your crops? Our agricultural experts can 
                  provide personalized recommendations based on your soil type, crop variety, 
                  and local conditions.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>Get advice on organic and chemical fertilizers</li>
                  <li>Learn about proper application timing and methods</li>
                  <li>Understand nutrient requirements for specific crops</li>
                  <li>Solve nutrient deficiency issues in your fields</li>
                </ul>
                <button 
                  onClick={() => setShowExpertModal(true)}
                  className="bg-amber-600 text-white py-2 px-6 rounded-lg hover:bg-amber-700"
                >
                  Ask Fertilizer Questions
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">Recently Answered Questions</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-amber-500 pl-3">
                    <p className="text-sm text-gray-700 font-medium">When is the best time to apply urea for rice fields?</p>
                    <p className="text-xs text-gray-500">Answered by Kumar Shrestha • 2 days ago</p>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-3">
                    <p className="text-sm text-gray-700 font-medium">Which organic fertilizers work best for vegetable farms?</p>
                    <p className="text-xs text-gray-500">Answered by Dr. Rajendra Uprety • 1 week ago</p>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-3">
                    <p className="text-sm text-gray-700 font-medium">How can I fix iron deficiency in my fruit trees?</p>
                    <p className="text-xs text-gray-500">Answered by Bishnu Maya Sharma • 3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Premium Features for Serious Farmers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="text-xl mr-2">📊</span>
                  <h4 className="font-bold text-gray-800">
                    Detailed Growth Analytics
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Track crop growth stages with day-by-day guidance and
                  environmental condition monitoring.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="text-xl mr-2">🦠</span>
                  <h4 className="font-bold text-gray-800">
                    Pest & Disease Library
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Comprehensive guide to identifying and treating 100+ common
                  crop pests and diseases with organic solutions.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="text-xl mr-2">👨‍🌾</span>
                  <h4 className="font-bold text-gray-800">
                    Expert Consultation
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Direct access to agricultural experts for personalized advice
                  and troubleshooting for your specific field conditions.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="text-xl mr-2">🌡️</span>
                  <h4 className="font-bold text-gray-800">
                    Climate Adaptation
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Specialized guidance for adapting farming practices to
                  changing climate conditions in your region.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Success Stories Tab Content */}
      {activeTab === "success" && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Farmer Success Stories
          </h2>

          <div className="space-y-6 mb-6">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-xl shadow-md overflow-hidden p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/6 flex justify-center">
                    <img
                      src={story.image}
                      alt={story.farmer}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  </div>
                  <div className="md:w-5/6">
                    <h3 className="text-xl font-bold text-green-700 mb-1">
                      {story.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                      <span className="text-sm text-gray-600">
                        {story.farmer}
                      </span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">
                        {story.location}
                      </span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">
                        Crop: {story.crop}
                      </span>
                    </div>
                    <p className="text-gray-700">{story.story}</p>
                    <button className="mt-3 text-green-600 font-medium text-sm">
                      Read Full Story →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700">
              Share Your Success Story
            </button>
          </div>
        </>
      )}

      {/* Expert Consultation Tab Content */}
      {activeTab === "experts" && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Expert Consultation Services
          </h2>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-amber-800 mb-3">
                  Hire an Agricultural Expert for Personalized Guidance
                </h3>
                <p className="text-gray-700 mb-4">
                  Our experts provide on-site consultation for your farm, helping you solve 
                  specific issues, optimize your farming practices, and increase yields through 
                  personalized recommendations.
                </p>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">Expert services include:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Soil testing and fertilizer recommendations</li>
                    <li>Pest and disease identification and treatment plans</li>
                    <li>Crop selection for your specific soil and climate</li>
                    <li>Water management and irrigation system optimization</li>
                    <li>Post-harvest handling and storage advice</li>
                    <li>Farm layout planning and crop rotation schedules</li>
                    <li>Market linkage and value addition opportunities</li>
                  </ul>
                </div>
                <button 
                  onClick={() => setShowExpertModal(true)}
                  className="bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700"
                >
                  Book a Consultation
                </button>
              </div>
              <div className="md:w-1/3 bg-white rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-3">Consultation Packages</h4>
                <div className="space-y-3">
                  <div className="border border-amber-100 rounded-lg p-3">
                    <h5 className="font-bold text-amber-800">Half Day Visit</h5>
                    <p className="text-sm text-gray-600">4 hours on-site consultation</p>
                    <p className="font-medium text-amber-700 mt-1">NPR 1,500</p>
                  </div>
                  <div className="border border-amber-100 rounded-lg p-3 bg-amber-50">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-amber-800">Full Day Visit</h5>
                      <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded">Popular</span>
                    </div>
                    <p className="text-sm text-gray-600">8 hours on-site consultation with report</p>
                    <p className="font-medium text-amber-700 mt-1">NPR 2,500</p>
                  </div>
                  <div className="border border-amber-100 rounded-lg p-3">
                    <h5 className="font-bold text-amber-800">Weekly Support</h5>
                    <p className="text-sm text-gray-600">1 full day visit + phone support for 1 week</p>
                    <p className="font-medium text-amber-700 mt-1">NPR 4,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Meet Our Expert Consultants
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {experts.map((expert) => (
              <div 
                key={expert.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={expert.image} 
                      alt={expert.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{expert.name}</h4>
                      <p className="text-amber-700 text-sm font-medium">{expert.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start">
                      <span className="text-gray-500 mr-2">🎓</span>
                      <span className="text-sm text-gray-600">{expert.qualifications}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 mr-2">⏱️</span>
                      <span className="text-sm text-gray-600">{expert.experience} experience</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 mr-2">📅</span>
                      <span className="text-sm text-gray-600">{expert.availability}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 mr-2">💰</span>
                      <span className="text-sm text-gray-600">NPR {expert.price} per day</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <button className="bg-amber-600 text-white text-sm py-1.5 px-3 rounded hover:bg-amber-700">
                      Book Now
                    </button>
                    <button className="border border-amber-600 text-amber-700 text-sm py-1.5 px-3 rounded hover:bg-amber-50">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-bold text-gray-800 mb-2">How does the expert consultation work?</h4>
                <p className="text-gray-600">
                  After booking, our expert will contact you to schedule a visit to your farm. 
                  During the visit, they'll assess your specific situation, answer questions, 
                  and provide tailored recommendations. You'll receive a written report following the consultation.
                </p>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-bold text-gray-800 mb-2">What areas do your experts cover?</h4>
                <p className="text-gray-600">
                  Our experts provide services in most districts of Nepal, with particular focus 
                  on the Kathmandu Valley, Chitwan, Pokhara, and major agricultural regions. 
                  Travel costs may apply for remote locations.
                </p>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-bold text-gray-800 mb-2">Can I request a specific expert?</h4>
                <p className="text-gray-600">
                  Yes, you can request a specific expert when booking. If that expert is not 
                  available, we'll suggest alternatives with similar expertise in your area of interest.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600">
                  We accept cash, mobile payment services (eSewa, Khalti), and bank transfers. 
                  Payment is due at the time of booking, with a 50% refund available for 
                  cancellations made at least 48 hours in advance.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Recommended Farming Methods */}
      <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Recommended Farming Methods
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800">Sustainable Agriculture</h4>
            <p className="text-gray-600 mt-2">
              Learn how to implement sustainable farming practices that reduce
              environmental impact while maintaining productivity.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800">Precision Farming</h4>
            <p className="text-gray-600 mt-2">
              Use technology to optimize field-level management with regard to
              crop farming by matching seed and fertilizer inputs to specific
              soil conditions.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800">Vertical Farming</h4>
            <p className="text-gray-600 mt-2">
              Discover how to grow crops in vertically stacked layers, often
              incorporating controlled-environment agriculture technology.
            </p>
          </div>
        </div>
      </div>

      {/* Expert Consultation Modal */}
      {showExpertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Book an Expert Consultation
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowExpertModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-3">
                Fill out the form below to schedule a consultation with one of our agricultural experts.
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="District, Municipality"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select a consultation type</option>
                    <option value="half-day">Half Day Visit (NPR 1,500)</option>
                    <option value="full-day">Full Day Visit (NPR 2,500)</option>
                    <option value="weekly">Weekly Support (NPR 4,000)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description of Issue</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    rows="3"
                    placeholder="Briefly describe what you need help with"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </form>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-amber-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-amber-700"
                onClick={() => setShowExpertModal(false)}
              >
                Submit Request
              </button>
              <button
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
                onClick={() => setShowExpertModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Content Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Premium Content
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowPremiumModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-3">
                Unlock premium content to access our full library of educational
                farming videos, detailed guides, and expert support.
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">
                  Premium Benefits:
                </h4>
                <ul className="text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Access to all premium videos and training materials
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Downloadable farming guides and resources
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Direct expert consultation for your farming queries
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Early access to new agricultural technologies
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700"
                onClick={() => setShowPremiumModal(false)}
              >
                Subscribe Now
              </button>
              <button
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
                onClick={() => setShowPremiumModal(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FarmingTechniques;