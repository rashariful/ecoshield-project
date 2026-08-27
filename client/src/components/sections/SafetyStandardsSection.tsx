import React from "react";
import safetyImage from "@/assets/Safety.jpeg"; // এখানে আপনার ছবির পাথ দিন

const SafetyStandardsSection = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 md:px-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="lg:w-1/2 ">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Pest Control Safety and Quality Standards
          </h2>
          <p className="text-red-700 mb-4 text-justify">
            Our quality standards make us different in the pest control industry. 
            We dominate this sector with our high-quality standards and strict safety rules. 
            It makes our treatment more effective, safe, and long-lasting.
          </p>
          <p className="text-gray-700 mb-4 text-justify">
            We use eco-friendly chemicals that are approved by the relevant government authorities. 
            It is 100% safe for children, pets, and the environment. Our certified professionals 
            apply the solutions precisely using modern equipment. They use an advanced control 
            system to avoid unwanted damage or contamination.
          </p>
          <p className="text-gray-700 text-justify">
            We offer a complete pest protection solution to ensure permanent safety. 
            You can take basic inspections to deep cleaning according to your needs. 
            We continuously improve our formula to meet international pest control standards. 
            We confidently offer guarantees for the best results and a pest-free, healthy home experience.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src={safetyImage}
            alt="Pest Control Safety"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default SafetyStandardsSection;