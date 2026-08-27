import React from "react";
import { 
  Building2, 
  Factory, 
  Warehouse, 
  Stethoscope, 
  Utensils, 
  Hotel, 
  Coffee, 
  Truck, 
  Briefcase, 
  Store, 
  ShoppingBasket, 
  GraduationCap,
  ArrowRight,
  Shield,
  Clock,
  Award
} from "lucide-react";

import epz from "@/assets/EPZ.jpeg";
import garment from "@/assets/Garments.jpeg";
import werehouse from "@/assets/Warehouses.jpeg";
import hospital from "@/assets/Hospitals.jpeg";
import restaurant from "@/assets/Restaurants.jpeg";
import hotel from "@/assets/Hotels.jpeg";
import food from "@/assets/Food.jpeg";
import logistic from "@/assets/Logistic.jpeg";
import corporate from "@/assets/Corporate.jpeg";
import shopping from "@/assets/Shopping.jpeg";
import supermartet from "@/assets/Supermarkets.jpeg";

// Service icons mapping
const serviceIcons = [
  <Factory className="h-8 w-8" />,
  <Building2 className="h-8 w-8" />,
  <Warehouse className="h-8 w-8" />,
  <Stethoscope className="h-8 w-8" />,
  <Utensils className="h-8 w-8" />,
  <Hotel className="h-8 w-8" />,
  <Coffee className="h-8 w-8" />,
  <Truck className="h-8 w-8" />,
  <Briefcase className="h-8 w-8" />,
  <Store className="h-8 w-8" />,
  <ShoppingBasket className="h-8 w-8" />,
  <GraduationCap className="h-8 w-8" />
];

const servicesData = [
  {
    img: epz,
    icon: serviceIcons[0],
    title: "Export Processing Zones (EPZ)",
    description: "Protect Pest Control Services provides specialized industrial pest control for factories, warehouses, and businesses in EPZ areas.",
    stats: "50+ EPZ Clients"
  },
  {
    img: garment,
    icon: serviceIcons[1],
    title: "Garments Factories",
    description: "Industrial pest control for garment factories including cockroaches, rodents, and other insects, ensuring safe working conditions.",
    stats: "100+ Factories"
  },
  {
    img: werehouse,
    icon: serviceIcons[2],
    title: "Warehouses",
    description: "Protect Pest Control ensures pest-free storage in warehouses, maintaining hygienic conditions for products.",
    stats: "200+ Warehouses"
  },
  {
    img: hospital,
    icon: serviceIcons[3],
    title: "Hospitals & Clinics",
    description: "We provide safe and effective pest control for healthcare facilities, ensuring patient and staff safety.",
    stats: "75+ Healthcare"
  },
  {
    img: restaurant,
    icon: serviceIcons[4],
    title: "Restaurants & Cafes",
    description: "Comprehensive pest management for kitchens, dining areas, and storage to ensure hygiene and safety.",
    stats: "300+ Restaurants"
  },
  {
    img: hotel,
    icon: serviceIcons[5],
    title: "Hotels & Resorts",
    description: "Protect Pest Control Services ensures pest-free environments in hotels and resorts for guest comfort.",
    stats: "150+ Hotels"
  },
  {
    img: food,
    icon: serviceIcons[6],
    title: "Food Processing Units",
    description: "Industrial pest control services for food production units, maintaining hygiene and compliance.",
    stats: "80+ Food Units"
  },
  {
    img: logistic,
    icon: serviceIcons[7],
    title: "Logistic & Transportation",
    description: "Pest control solutions for logistics centers, transport hubs, and warehouses to prevent contamination.",
    stats: "40+ Logistics"
  },
  {
    img: corporate,
    icon: serviceIcons[8],
    title: "Corporate Offices",
    description: "Professional pest control for offices ensuring clean, safe, and productive working environments.",
    stats: "200+ Offices"
  },
  {
    img: shopping,
    icon: serviceIcons[9],
    title: "Shopping Malls",
    description: "Maintain hygiene and safety in shopping malls with our specialized pest control solutions.",
    stats: "25+ Malls"
  },
  {
    img: supermartet,
    icon: serviceIcons[10],
    title: "Supermarkets",
    description: "Protect Pest Control Services keeps supermarkets free from pests to maintain food safety.",
    stats: "150+ Supermarkets"
  },
  {
    img: "https://protectpestbd.com/wp-content/uploads/al_opt_content/IMAGE/protectpestbd.com/wp-content/uploads/2025/08/1-2.jpg.bv.webp?bv_host=protectpestbd.com",
    icon: serviceIcons[11],
    title: "Universities & Institutions",
    description: "We provide effective pest control services in educational institutions for a safe and healthy campus.",
    stats: "60+ Institutions"
  },
];

const ServicesSectionSecond = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🏭 Our Services
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Industrial & Commercial
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional pest control solutions tailored for your industry
          </p>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Building2 />, label: "Industries Served", value: "12+" },
            { icon: <Shield />, label: "Happy Clients", value: "1500+" },
            { icon: <Clock />, label: "Years Experience", value: "10+" },
            { icon: <Award />, label: "Certified Experts", value: "50+" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-green-600 flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Icon on Image */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-green-600">
                  {service.icon}
                </div>
                
                {/* Stats Badge */}
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {service.stats}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {service.description}
                </p>
                
                {/* Learn More Link */}
                {/* <a 
                  href="#" 
                  className="inline-flex items-center text-green-600 font-semibold text-sm hover:text-green-700 transition-colors group/link"
                >
                  Learn More 
                  <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </a> */}
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Why Choose Protect Pest Control?</h3>
            <p className="text-white/90">We provide the best pest control solutions for your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "ISO Certified",
                description: "Internationally recognized quality standards"
              },
              {
                title: "Eco-Friendly Solutions",
                description: "Safe for humans, pets, and the environment"
              },
              {
                title: "24/7 Emergency Service",
                description: "Round-the-clock support for urgent needs"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center mt-12">
          <a
            href="/contact"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-10 py-5 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3"
          >
            <span>📞</span>
            Contact Us Now for Free Consultation
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="text-gray-500 mt-4 text-sm">
            ✓ Free site visit • ✓ Customized solutions • ✓ Best price guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSectionSecond;