import React from "react";
import CertifiedBadge from "@/assets/certified.jpeg";

const PestControlSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-8">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
            Our pest control services are effective, safe, and eco-friendly
          </h2>

          <p className="text-primary mb-4 text-base sm:text-lg md:text-xl">
            আপনার পরিবার, পোষা প্রাণী এবং পরিবেশকে সুরক্ষিত রেখে উপভোগ করুন একটি
            পোকামাকড়মুক্ত নিরাপদ জীবন!
          </p>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed text-justify">
            We provide{" "}
            <span className="text-orange-500 font-medium">
              all types of insect control services
            </span>
            , including{" "}
            <span className="text-orange-500 font-medium">
              termite control
            </span>
            ,{" "}
            <span className="text-orange-500 font-medium">
              cockroach control
            </span>
            ,{" "}
            <span className="text-orange-500 font-medium">
              bed bug control
            </span>
            ,{" "}
            <span className="text-orange-500 font-medium">
              rodent control
            </span>
            ,{" "}
            <span className="text-orange-500 font-medium">
              ant control
            </span>
            ,{" "}
            <span className="text-orange-500 font-medium">
              mosquito control
            </span>
            , as well as{" "}
            <span className="text-orange-500 font-medium">
              spider and lizard control
            </span>
            . Our{" "}
            <span className="font-semibold">
              Pest Control in Dhaka
            </span>{" "}
            is the best pest control service ever.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={CertifiedBadge}
            alt="Certified Badge"
            className=" rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default PestControlSection;