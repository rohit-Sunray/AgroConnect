import React, { useState } from 'react';

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  
  const plans = [
    {
      name: 'Basic',
      description: 'Essential tools for small-scale farmers',
      monthlyPrice: 200,
      yearlyPrice: 2000,
      features: [
        'Market price updates',
        'Basic weather forecast',
        'Limited marketplace listings (5/month)',
        'Email support'
      ],
      recommended: false,
      buttonText: 'Get Started'
    },
    {
      name: 'Premium',
      description: 'Advanced features for serious farmers',
      monthlyPrice: 500,
      yearlyPrice: 5000,
      features: [
        'Everything in Basic',
        'Unlimited marketplace listings',
        'Transportation network access',
        'SMS weather & market alerts',
        'Direct vendor connections',
        'Priority support'
      ],
      recommended: true,
      buttonText: 'Upgrade Now'
    },
    {
      name: 'Enterprise',
      description: 'Complete solution for farming cooperatives',
      monthlyPrice: 1000,
      yearlyPrice: 10000,
      features: [
        'Everything in Premium',
        'Cooperative management tools',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'API access',
        'Custom integrations'
      ],
      recommended: false,
      buttonText: 'Contact Sales'
    }
  ];

  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly');
  };
  
  const getPrice = (plan) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };
  
  const handleSubscribe = (plan) => {
    alert(`Thank you for choosing the ${plan.name} plan! Subscription process will begin.`);
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Premium Plans for Farmers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to enhance your farming experience with advanced tools and features.
          </p>
          
          <div className="mt-8 inline-flex items-center p-1 bg-gray-100 rounded-lg">
            <button
              className={`px-6 py-2 rounded-lg ${
                billingPeriod === 'monthly' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-700'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-lg ${
                billingPeriod === 'yearly' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-700'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md overflow-hidden relative ${
                plan.recommended ? 'border-2 border-green-500' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  RECOMMENDED
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-800">₹{getPrice(plan)}</span>
                  <span className="text-gray-600">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 rounded-lg font-medium ${
                    plan.recommended 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-green-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Something Custom?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We understand that every farming operation is unique. Contact us to discuss a custom plan tailored to your specific needs.
          </p>
          <button className="bg-green-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-green-700">
            Contact Our Team
          </button>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-bold text-gray-800 mb-2">Can I change plans later?</h4>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-bold text-gray-800 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">We accept mobile payments (eSewa, Khalti), credit/debit cards, and bank transfers.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-bold text-gray-800 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600">Yes, we offer a 7-day money-back guarantee if you're not satisfied with our services.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-bold text-gray-800 mb-2">Can I share my account with others?</h4>
              <p className="text-gray-600">Basic and Premium plans are for individual farmers. For cooperatives and groups, please consider our Enterprise plan.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;