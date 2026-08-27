// components/PricingSection.tsx
'use client';

import { Check, Shield, Home, Building2, Factory, Star, Zap, Award, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

type PricingPlan = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  price: string;
  frequency?: string;
  features: string[];
  highlighted?: boolean;
  note?: string;
  gradient: string;
  accentColor: string;
  tag?: string;
};


const pricingPlans: PricingPlan[] = [
  {
    id: 'residential',
    name: "Home",
    icon: <Home size={36} />,
    description: "Complete protection against cockroaches, bedbugs, and rodents.",
    price: "৳ 2499",
    frequency: "Starting from",
    features: [
      "​Home size: max 1200 sq. ft",
      "Full home inspection + treatment",
      "Cockroach, ant & spider control",
      "Eco-friendly & pet-safe chemicals",
      "30–90 days service guarantee",
      "Free follow-up visit",
     
      "24/7 Emergency response",
    ],
    gradient: "from-blue-500 to-cyan-400",
    accentColor: "text-blue-600",
    // tag: "Family Safe"
  },
  {
    id: 'quarterly',
    name: "Eco Guardian",
    icon: <Shield size={36} />,
    description: "Complete protection against cockroaches, bedbugs, and rodents.",
    price: "৳ 4,599",
    frequency: "Every 3 months",
    features: [
      // "4 treatments per year",
      // "All common pests covered",
      // "Priority emergency support",
      // "Yearly discount on extra services",
      // "Digital service reports",
      // "Free re-treatment guarantee"
       "​Office size: max 2500 sq. ft",
      "​Advance booking required",
      "​One-time service only",
      "​Flexible payment options",
      "​Annual contract offers",
      "​Eco-friendly chemicals",
      "24/7 Emergency response",
    ],
    highlighted: true,
    note: "Save up to 40% vs one-time treatments",
    gradient: "from-emerald-500 to-green-400",
    accentColor: "text-emerald-600",
    // tag: "Most Popular"
  },
  {
    id: 'commercial',
    name: "Business Pro",
    icon: <Building2 size={36} />,
    description: "Termite control, flying insects, and heavy-duty pest management.",
    price: "৳ 8,999",
    frequency: "Starting from",
    features: [
      // "Complete premises treatment",
      // "Rodent proofing & monitoring",
      // "Food safety compliant methods",
      // "Minimal business disruption",
      // "Pest audit report",
      // "Flexible contracts"
      "​Office size: max 5000 sq. ft",
      "​Discount if you take multiple services",
      "​Exclusive discounts on yearly contracts",
      "​Pre-booking required (at least 24 hours in advance)",
      "​24/7 Emergency response",
  
    ],
    gradient: "from-purple-500 to-pink-400",
    accentColor: "text-purple-600",
    // tag: "Hygiene Certified"
  },
 
];

export default function PricingSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-6">
            <Star size={18} className="text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-300 font-medium">Transparent Pricing</span>
            <BadgeCheck size={18} className="text-green-600 dark:text-green-400" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
              Choose Your Perfect Plan
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Eco-friendly pest control solutions tailored for every need. 
            <span className="block mt-2 font-semibold text-green-600 dark:text-green-400">
              Start with a FREE site inspection!
            </span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                relative group h-full transform transition-all duration-500 
                ${plan.highlighted ? 'lg:-translate-y-4' : ''}
                ${hoveredCard === plan.id ? 'scale-[1.02]' : ''}
              `}
            >
              {/* Card Background */}
              <div className={`
                absolute inset-0 rounded-3xl opacity-20 group-hover:opacity-30 
                bg-gradient-to-br ${plan.gradient} transition-opacity duration-500
              `}></div>

              {/* Main Card */}
              <div className={`
                relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm 
                rounded-3xl border-2 h-full overflow-hidden
                ${plan.highlighted 
                  ? 'border-emerald-500 shadow-2xl shadow-emerald-500/20' 
                  : 'border-gray-200/50 dark:border-gray-700/50'}
                group-hover:shadow-2xl group-hover:shadow-emerald-500/10 transition-all duration-500
              `}>
                {/* Top Badge */}
                {plan.tag && (
                  <div className={`
                    absolute top-6 right-6 px-4 py-1.5 rounded-full text-sm font-bold
                    ${plan.highlighted 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300'}
                  `}>
                    {plan.tag}
                  </div>
                )}

                {/* Ribbon for highlighted card */}
                {plan.highlighted && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-1 text-sm font-bold rotate-45 transform origin-top-right">
                    <div className="flex items-center gap-1">
                      <Zap size={14} />
                      <span>Best Value</span>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className={`
                    w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center
                    bg-gradient-to-br ${plan.gradient} text-white
                    shadow-lg shadow-emerald-500/30
                    group-hover:scale-110 transition-transform duration-500
                  `}>
                    {plan.icon}
                  </div>

                  {/* Plan Name */}
                  <h3 className={`
                    text-2xl font-bold text-center mb-2
                    ${plan.highlighted 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-800 dark:text-gray-200'}
                  `}>
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-8 relative">
                    <div className={`
                      text-5xl font-bold mb-2
                      ${plan.highlighted 
                        ? 'bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600' 
                        : plan.accentColor}
                    `}>
                      {plan.price}
                    </div>
                    {plan.frequency && (
                      <div className="text-gray-500 dark:text-gray-400">
                        {plan.frequency}
                      </div>
                    )}
                    
                    {/* Animated underline */}
                    <div className={`
                      absolute bottom-0 left-1/2 transform -translate-x-1/2 
                      w-16 h-1 rounded-full bg-gradient-to-r ${plan.gradient}
                      transition-all duration-500 group-hover:w-24
                    `}></div>
                  </div>

                  {/* Features */}
                  <div className="mb-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className={`
                          w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                          bg-gradient-to-br ${plan.gradient} text-white
                          group-hover/item:scale-110 transition-transform duration-300
                        `}>
                          <Check size={14} />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Note */}
                  {plan.note && (
                    <div className={`
                      p-4 rounded-xl mb-6 text-center
                      ${plan.highlighted 
                        ? 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 text-emerald-700 dark:text-emerald-300' 
                        : 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400'}
                    `}>
                      <div className="flex items-center justify-center gap-2">
                        <Award size={16} className={plan.highlighted ? 'text-emerald-600' : 'text-gray-500'} />
                        <span className="font-medium">{plan.note}</span>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <a
                    href="/contact"
                    className={`
                      block w-full py-4 px-6 rounded-xl font-bold text-center
                      transition-all duration-500 transform group-hover:-translate-y-1
                      ${plan.highlighted
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-2xl hover:shadow-emerald-500/30 hover:from-emerald-700 hover:to-green-700'
                        : 'bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-white hover:shadow-xl hover:shadow-gray-500/20'}
                    `}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>Book Now</span>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 ${plan.highlighted ? 'text-white' : 'text-gray-300'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison & Guarantee Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Comparison Table */}
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What's Included in All Plans
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Free Site Inspection",
                "Eco-Friendly Chemicals",
                "Expert Technicians",
                "Service Guarantee",
                "Follow-up Support",
                "Digital Certificate"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Box */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Shield size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Guarantee</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-white">100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-white">30-Day Money Back Promise</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-white">Free Re-treatment if Pests Return</span>
                </div>
              </div>
              
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span>Book Free Inspection</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 dark:text-white">Need Help Choosing?</p>
                <p className="text-gray-600 dark:text-gray-400">Our experts are ready to help</p>
              </div>
            </div>
            
            <div className="md:ml-auto">
              <a
                href="tel:+88014055-55822"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Now: +88014055-55822</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}