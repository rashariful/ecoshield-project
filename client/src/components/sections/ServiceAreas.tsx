"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchAPI } from "@/lib/fetchAPI";

type ServiceAreaType = {
  _id: string;
  name: string;
  isActive: boolean;
  priority: number;
};

export const ServiceAreas = () => {
  const [areas, setAreas] = useState<ServiceAreaType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAreas = async () => {
      try {
        const res = await fetchAPI<any>("/area");
        const rawData: ServiceAreaType[] = Array.isArray(res)
          ? res
          : res?.data || [];

        const activeAreas = rawData
          .filter((area) => area.isActive)
          .sort((a, b) => a.priority - b.priority)
          .slice(0, 8);

        setAreas(activeAreas);
      } catch (error) {
        console.error("Failed to fetch service areas:", error);
        setAreas([]);
      } finally {
        setLoading(false);
      }
    };

    loadAreas();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-200 rounded-2xl h-[400px]" />
              <div className="space-y-6">
                <div className="bg-gray-200 h-4 w-32 rounded-full" />
                <div className="bg-gray-200 h-10 w-64 rounded-lg" />
                <div className="bg-gray-200 h-20 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            <span>Our Coverage</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Service <span className="text-primary">Areas</span>
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We proudly serve homes and businesses across major cities in
            Bangladesh. Contact us to confirm availability in your area.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              
              {/* Map Header */}
              <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-700 font-medium">
                    Dhaka, Bangladesh
                  </span>
                </div>
                <Navigation className="w-5 h-5 text-primary" />
              </div>

              {/* Map Body */}
              <div className="aspect-square w-full overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.123456!2d90.412345!3d23.810345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e7b0f5a0cd%3A0x123456789abcdef!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  title="Service Areas Map"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <p className="text-3xl font-bold text-primary mb-2">
                  {areas.length}+
                </p>
                <p className="text-gray-600 text-sm">Areas Covered</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <p className="text-3xl font-bold text-primary mb-2">24/7</p>
                <p className="text-gray-600 text-sm">Service Available</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border shadow-sm col-span-2 md:col-span-1">
                <p className="text-3xl font-bold text-primary mb-2">100%</p>
                <p className="text-gray-600 text-sm">Satisfaction</p>
              </div>
            </div>

            {/* Areas */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                EcoShield Pest BD Service Areas
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {areas.map((area, index) => (
                  <motion.div
                    key={area._id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-white rounded-xl border hover:border-primary/40 hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-semibold capitalize text-gray-900">
                        {area.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link to="/service-area">
                <button className="w-full mt-6 h-12 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition">
                  See More Service Areas
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Safe Background */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { MapPin, CheckCircle, ChevronRight, Navigation } from "lucide-react";
// import { Link } from "react-router-dom";
// import { fetchAPI } from "@/lib/fetchAPI";

// type ServiceAreaType = {
//   _id: string;
//   name: string;
//   isActive: boolean;
//   priority: number;
// };

// export const ServiceAreas = () => {
//   const [areas, setAreas] = useState<ServiceAreaType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadAreas = async () => {
//       try {
//         const res = await fetchAPI<any>("/area");
//         const rawData: ServiceAreaType[] = Array.isArray(res)
//           ? res
//           : res?.data || [];

//         const activeAreas = rawData
//           .filter((area) => area.isActive)
//           .sort((a, b) => a.priority - b.priority)
//           .slice(0, 8);

//         setAreas(activeAreas);
//       } catch (error) {
//         console.error("Failed to fetch service areas:", error);
//         setAreas([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAreas();
//   }, []);

//   if (loading) {
//     return (
//       <section className="py-24 bg-gradient-to-b from-white to-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="animate-pulse space-y-8">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div className="bg-gray-200 rounded-2xl h-[400px]" />
//               <div className="space-y-6">
//                 <div className="bg-gray-200 h-4 w-32 rounded-full" />
//                 <div className="bg-gray-200 h-10 w-64 rounded-lg" />
//                 <div className="bg-gray-200 h-20 w-full rounded-lg" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
//       <div className="container mx-auto px-4">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
//             <MapPin className="w-4 h-4" />
//             <span>Our Coverage</span>
//           </div>
//           <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
//             Service <span className="text-primary">Areas</span>
//           </h2>
//           <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//             We proudly serve homes and businesses across major cities in
//             Bangladesh. Contact us to confirm service availability in your area.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Map Section */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             className="relative group"
//           >
//             <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-leaf/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//             <div className="relative bg-white rounded-2xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
//               <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-red-500 rounded-full" />
//                     <div className="w-3 h-3 bg-yellow-500 rounded-full" />
//                     <div className="w-3 h-3 bg-green-500 rounded-full" />
//                     <span className="text-gray-700 font-medium">
//                       Dhaka, Bangladesh
//                     </span>
//                   </div>
//                   <Navigation className="w-5 h-5 text-primary" />
//                 </div>
//               </div>

//               <div className="aspect-square bg-gradient-to-br from-primary/5 via-accent/5 to-leaf/5">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.123456!2d90.412345!3d23.810345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e7b0f5a0cd%3A0x123456789abcdef!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
//                   width="100%"
//                   height="100%"
//                   className="border-0"
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="Service Areas Map"
//                 />
//               </div>

//               <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
//                     <MapPin className="w-4 h-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Headquarters</p>
//                     <p className="font-semibold text-gray-900">Dhaka, BD</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Content Section */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             className="space-y-8"
//           >
//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//                 <p className="text-3xl font-bold text-primary mb-2">
//                   {areas.length}+
//                 </p>
//                 <p className="text-gray-600 text-sm">Areas Covered</p>
//               </div>
//               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//                 <p className="text-3xl font-bold text-primary mb-2">24/7</p>
//                 <p className="text-gray-600 text-sm">Service Available</p>
//               </div>
//               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-1 col-span-2">
//                 <p className="text-3xl font-bold text-primary mb-2">100%</p>
//                 <p className="text-gray-600 text-sm">Satisfaction Rate</p>
//               </div>
//             </div>

//             {/* Areas List */}
//             <div className="space-y-6">
//               <h3 className="text-2xl font-bold text-gray-900">
//              EcoShield Pest bd Service Areas
//               </h3>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {areas.map((area, index) => {
//                   const isPrimary = area.priority === 1;
//                   const isSecondary = area.priority === 2;

//                   return (
//                     <motion.div
//                       key={area._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.3, delay: index * 0.05 }}
//                       whileHover={{ scale: 1.02 }}
//                       className={`relative group cursor-pointer p-4 rounded-xl transition-all duration-300 ${
//                         isPrimary
//                           ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/25"
//                           : isSecondary
//                             ? "bg-gradient-to-r from-accent to-accent/90 text-white shadow-lg shadow-accent/25"
//                             : "bg-white hover:bg-gray-50 border border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                               isPrimary
//                                 ? "bg-white/20"
//                                 : isSecondary
//                                   ? "bg-white/20"
//                                   : "bg-primary/10"
//                             }`}
//                           >
//                             <CheckCircle
//                               className={`w-5 h-5 ${
//                                 isPrimary || isSecondary
//                                   ? "text-white"
//                                   : "text-primary"
//                               }`}
//                             />
//                           </div>
//                           <span
//                             className={`font-semibold capitalize ${
//                               isPrimary || isSecondary
//                                 ? "text-white"
//                                 : "text-gray-900"
//                             }`}
//                           >
//                             {area.name}
//                           </span>
//                         </div>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//                 <div className="mt-8"></div>
//               </div>
//               <Link to="/service-area">
//                 <button
//                   className="w-full h-12 rounded-xl border border-primary text-primary font-semibold 
//                  hover:bg-primary hover:text-primary-foreground transition"
//                 >
//                   See More Service Areas
//                 </button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Decorative Elements */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
//     </section>
//   );
// };
