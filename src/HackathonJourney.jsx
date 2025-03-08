import React from 'react';

const HackathonJourney = () => {
  const teamMembers = [
    {
      name: "Santosh",
      role: "Product Manager and Presentor",
      contribution: "API development and Market research / feature prioritization",
      image: "/api/placeholder/100/100",
      quote: "Not every agricultural enthusiast inherits the occupation.",
      social: {
        facebook: "https://facebook.com/santosh",
        instagram: "https://instagram.com/santosh",
        github: "https://github.com/santosh",
        linkedin: "https://linkedin.com/in/santosh"
      }
    },
    {
      name: "Khem Raj",
      role: "UI/UX design",
      contribution: "Frontend Developer and UI/UX Designer",
      image: "/api/placeholder/100/100",
      quote: "Some web fundamentals seem to confuse even those who should guide us.",
      social: {
        facebook: "https://facebook.com/khemraj",
        instagram: "https://instagram.com/khemraj",
        github: "https://github.com/khemraj",
        linkedin: "https://linkedin.com/in/khemraj"
      }
    },
    {
      name: "Bishal",
      role: "Research",
      contribution: "Researc (Nepal Farming and Agriculture)",
      image: "/api/placeholder/100/100",
      quote: "Sometimes presentations skip over the most crucial elements.",
      social: {
        facebook: "https://facebook.com/bishal",
        instagram: "https://instagram.com/bishal",
        github: "https://github.com/bishal",
        linkedin: "https://linkedin.com/in/bishal"
      }
    },
    {
      name: "Rohit",
      role: "Full Stack Developer",
      contribution: "Backend architecture",
      image: "/api/placeholder/100/100",
      quote: "Being silenced during explanations teaches patience better than meditation.",
      social: {
        facebook: "https://facebook.com/rohit",
        instagram: "https://instagram.com/rohit",
        github: "https://github.com/rohit",
        linkedin: "https://linkedin.com/in/rohit"
      }
    }
  ];

  const learnings = [
    {
      title: "Collaboration",
      description: "We learned to leverage each team member's strengths while supporting each other through challenges.",
      icon: "👥"
    },
    {
      title: "Innovation",
      description: "Under time pressure, we found creative solutions to complex problems by thinking outside conventional approaches.",
      icon: "💡"
    },
    {
      title: "Presentation Matters",
      description: "A great product needs effective communication - we learned the importance of storytelling and clear demonstrations.",
      icon: "🎤"
    },
    {
      title: "Growth",
      description: "Each obstacle strengthened our problem-solving skills and resilience as developers and as a team.",
      icon: "📈"
    }
  ];

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Hackathon Journey</h2>
      
      {/* Inside Jokes Section - Elegant Green Design */}
      <div className="mb-10">
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-1 shadow-lg">
          <div className="bg-gray-900 rounded-xl p-8 text-white">
            <h3 className="text-center text-3xl font-bold mb-8 text-green-400">
              HACKATHON JOURNAL: UNTOLD STORIES
            </h3>
            
            <div className="space-y-6">
              {/* Favicon entry */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h4 className="text-green-400 text-2xl font-bold mb-2">Favicon</h4>
                <p className="text-gray-200 text-lg mb-2">Some guides need guidance themselves</p>
                <p className="text-green-300 font-bold italic text-xl">- Especially Khem Raj Knows it</p>
              </div>
              
              {/* node_modules entry */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h4 className="text-green-400 text-2xl font-bold mb-2">node_modules and public folder</h4>
                <p className="text-gray-200 text-lg mb-2">Explaining dependency folders became impossible because conversations had one-way streets. The development world has mysterious ways.</p>
                <p className="text-green-300 font-bold italic text-xl">- Especially Rohit knows it</p>
              </div>
              
              {/* Features entry */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h4 className="text-green-400 text-2xl font-bold mb-2">Adding Every Feature Suggested</h4>
                <p className="text-gray-200 text-lg mb-2">Saying yes to every feature request is like trying to build a skyscraper in a day. Focus matters more than pleasing everyone.</p>
                <p className="text-green-300 font-bold italic text-xl">- Especially We all know it and thanks to our mentors</p>
              </div>
              
              {/* Video entry */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h4 className="text-green-400 text-2xl font-bold mb-2">Presentation Video</h4>
                <p className="text-gray-200 text-lg mb-2">Technical difficulties have perfect timing - especially during the most crucial demonstrations. Murphy's law of presentations.</p>
                <p className="text-green-300 font-bold italic text-xl">- We all know it</p>
              </div>
              
              {/* Father entry */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h4 className="text-green-400 text-2xl font-bold mb-2">My Father is not a Farmer</h4>
                <p className="text-gray-200 text-lg mb-2">Agricultural passion can come from seeing opportunities, not just family tradition</p>
                <p className="text-green-300 font-bold italic text-xl">- Especially Santosh and We all know it</p>
              </div>
              
              {/* Name mistake entry */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h4 className="text-green-400 text-2xl font-bold mb-2">Sujesh or Santosh?</h4>
                <p className="text-gray-200 text-lg mb-2">When your name becomes a variable during a presentation</p>
                <p className="text-green-300 font-bold italic text-xl">- Santosh Knows it</p>
              </div>
              
              {/* Bishal entry */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h4 className="text-green-400 text-2xl font-bold mb-2">Where does Bishal goes?</h4>
                <p className="text-gray-200 text-lg mb-2">On first day of hackathon, a mysterious disappearance</p>
                <p className="text-green-300 font-bold italic text-xl">- Only Bishal knows it</p>
              </div>
            </div>
            
            <div className="mt-8 text-center text-lg text-green-300 font-medium italic">
              Secrets from the 50-hour code marathon that changed everything
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h3 className="text-xl font-bold text-green-700 mb-6">Meet The Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <img 
                src={member.image} 
                alt={`${member.name}`} 
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-green-500"
              />
              <h4 className="font-bold text-gray-800">{member.name}</h4>
              <p className="text-green-600 font-medium text-sm mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm mb-3">{member.contribution}</p>
              <p className="text-gray-500 text-xs italic mb-4">"{member.quote}"</p>
              
              <div className="flex justify-center space-x-3">
                <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Key Learnings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h3 className="text-xl font-bold text-green-700 mb-6">Hackathon Takeaways</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learnings.map((learning, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-2xl">
                  {learning.icon}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">{learning.title}</h4>
                <p className="text-gray-600">{learning.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Original Hackathon Story */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-10 relative overflow-hidden"> 
        <div className="absolute top-0 right-0 opacity-10"> 
          <div className="text-green-600 text-9xl">🚀</div> 
        </div> 
        <div className="relative z-10"> 
          <h3 className="text-3xl font-bold text-green-800 mb-3">Our First 50-Hour Hackathon: From Idea to Innovation 🚀</h3> 
          <div className="prose max-w-3xl text-gray-700"> 
            <p> 
              AgroConnect was born during our first-ever 50-hour hackathon, where our team—<strong>Santosh, Khem Raj, Bishal, and Rohit</strong>—came 
              together to address the challenges faced by Nepali farmers. With a shared vision of empowering the agricultural community, we combined our 
              skills to create a solution that bridges traditional farming wisdom with modern technology. 
            </p> 
            <p> 
              Our journey wasn't without its challenges. Despite our hard work and dedication, we couldn't secure the win due to presentation issues. 
              Unfortunately, we couldn't effectively showcase our main theme and the product we had built to the judges. However, this experience taught 
              us invaluable lessons in communication, preparation, and the importance of delivering a clear message. 
            </p> 
            <p> 
              The hackathon wasn't just a competition—it was the beginning of something bigger. Even though we didn't win, we walked away with a stronger 
              bond, improved skills, and a product that has the potential to make a real impact in the lives of farmers. 
            </p> 
            <p> 
              Now, as we deploy AgroConnect on Vercel, we're excited to share our work with the world. Our journey is a testament to the power of resilience, 
              teamwork, and a vision for change. 
            </p> 
          </div> 
        </div> 
      </div>
      
      {/* The Journey Continues */}
      <div className="bg-green-50 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-green-700 mb-4">The Journey Continues</h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          We're proud of how far we've come and are committed to making AgroConnect a valuable tool for the agricultural community. 
          This is just the beginning of our mission to empower Nepali farmers with technology.
        </p>
        <div className="flex justify-center">
          <a 
            href="https://github.com/agroconnect-team/agroconnect" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 inline-flex items-center"
          >
            <span className="mr-2">Follow Our Progress</span> 
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HackathonJourney;