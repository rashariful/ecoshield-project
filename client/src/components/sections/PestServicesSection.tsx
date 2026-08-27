import React from "react";

const PestServicesSection = () => {
  const services = [
    {
      title: "Cockroach Control Service",
      description: "In Dhaka, most people face cockroach issues. It spreads quickly and contaminates your home, especially kitchen and food storage areas. We use baits, residual sprays and secret formulas to permanently remove cockroaches and clean all hiding spots, ensuring long-lasting hygiene."
    },
    {
      title: "Termite Control Services",
      description: "Termites damage valuable furniture and building foundations. We offer pre- and post-construction termite control using drilling, injection, and soil barrier methods to eliminate active colonies and protect your property from future attacks."
    },
    {
      title: "Bed Bug Control Service",
      description: "Bed bugs cause painful bites and sleepless nights. We eliminate all stages of bed bugs using heat-friendly and eco-friendly insecticides. Mattresses, sofas, headboards, and cracks are treated to ensure complete hygiene."
    },
    {
      title: "Rodent / Rat Control Service",
      description: "Rat infestations are increasing in Dhaka, contaminating food and spreading germs. We use trapping, baiting, and sealing entry points to remove rodents and prevent them from returning, ensuring permanent protection."
    },
    {
      title: "Ant Control Service",
      description: "Ants can cause allergies and discomfort, especially to children. Our expert team identifies colonies and applies secret treatments to destroy them at the root, ensuring long-term prevention."
    },
    {
      title: "Mosquito Control Service",
      description: "Dengue and Chikungunya are spread by mosquitoes. We use fogging, residual sprays, and indoor/outdoor treatments to reduce mosquito populations, keeping homes and workplaces safe."
    },
    {
      title: "Fly Control Service",
      description: "Flies spread germs and contaminate food. We use traps, bait stations, and sprays to minimize flies and maintain a hygienic environment in homes and restaurants."
    },
    {
      title: "Spider Control Service",
      description: "Spiders create cleaning challenges. We remove spiders and nests from corners, ceilings, and outdoors using safe residual sprays to keep spaces permanently pest-free."
    },
    {
      title: "General Pest Control Service",
      description: "Our general pest control service provides a complete solution for common pests like cockroaches, ants, and mosquitoes. This routine protection package ensures your residential or commercial area remains pest-free."
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-6 md:px-20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8 text-center">
          Our Pest Control Services in Bangladesh
        </h2>

        {services.map((service, index) => (
          <div key={index} className="mb-8 border-l-4 border-green-600 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <h3 className="text-2xl font-semibold text-green-800 mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}

        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <a
            href="/contact"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all"
          >
            📞 Contact Us Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default PestServicesSection;