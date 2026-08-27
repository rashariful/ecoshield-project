import { Link } from "react-router-dom";
import { Shield, Leaf, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";

const Banner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // small delay so page paints first (removes lag feel)
    const t = setTimeout(() => {
      setMounted(true);
    }, 200);

    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-6">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-medium">
              Safe • Effective • Eco-Friendly
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Pest Control Service in Bangladesh – EcoShield Pest Control Bd
          </h1>
          {/* <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Ecoshield Pest Control Services BD{" "}
            <span className="text-primary inline-block min-w-[180px]">
              {mounted ? (
                <Typewriter
                  options={{
                    strings: [
                      "Cockroaches",
                      "Termites",
                      "Mosquitoes",
                      "Bed Bugs",
                      "Rats",
                      "Ants",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 70,
                    deleteSpeed: 40,
                    pauseFor: 2000,
                    cursor: "|",
                  }}
                />
              ) : (
                "Loading..."
              )}
            </span>
          </h1> */}

          {/* SUBTITLE */}
          <p className="text-gray-600 text-lg mb-8">
            EcoShield Pest BD delivers professional, safe, and effective pest
            control services across Bangladesh, protecting homes, offices, and
            businesses from termites, cockroaches, bed bugs, rodents,
            mosquitoes, and other harmful pests. Backed by 12+ years of
            experience, 100,000+ successful treatments, and a team of certified
            experts, we provide reliable pest management solutions with
            long-lasting results and a 99% customer satisfaction rate.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mb-10 relative z-10">
            <Link to="/contact">
              <Button size="lg">
                <Shield className="w-5 h-5" />
                Book Appointment
              </Button>
            </Link>

            <Link to="/contact">
              <Button variant="outline" size="lg">
                Free Inspection
              </Button>
            </Link>
          </div>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-6">
            {[
              "24/7 Customer Care",
              "100% Customer Satisfaction Guaranteed",
              "Best Pest Control Service in Bangladesh",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="text-green-600 w-5 h-5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="bg-gray-100 rounded-2xl h-[300px] shadow-lg flex items-center justify-center overflow-hidden">
            {/* <span className="text-gray-400">Banner Image / Video</span>
             */}
            <img
              src="https://res.cloudinary.com/di1dhidtu/image/upload/v1772473416/banner1772473415970.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 bg-white shadow-lg rounded-xl px-6 py-4 z-10">
            <p className="text-sm text-gray-500">Trusted Service</p>
            <p className="text-xl font-bold text-primary">10,000+ Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Shield, Leaf, CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { fetchAPI } from "@/lib/fetchAPI";
// import Typewriter from "typewriter-effect";

// export interface Banner {
//   _id: string;
//   title: string;
//   subTitle: string;
//   keywords: string[];
//   isActive: boolean;
// }

// const Banner = () => {
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [current] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await fetchAPI<Banner[]>("/banner");
//         const active = Array.isArray(res)
//           ? res.filter((b) => b.isActive)
//           : [];
//         setBanners(active);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   const banner = banners[current];

//   // ✅ Skeleton Loader (no layout shift)
//   if (loading) {
//     return (
//       <section className="bg-white py-24">
//         <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
//           <div className="space-y-5 animate-pulse">
//             <div className="h-6 w-40 bg-gray-200 rounded"></div>
//             <div className="h-14 w-full bg-gray-200 rounded"></div>
//             <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
//             <div className="h-12 w-40 bg-gray-200 rounded"></div>

//             <div className="flex gap-4 mt-6">
//               <div className="h-6 w-32 bg-gray-200 rounded"></div>
//               <div className="h-6 w-32 bg-gray-200 rounded"></div>
//             </div>
//           </div>

//           <div className="h-[300px] bg-gray-200 rounded-2xl"></div>
//         </div>
//       </section>
//     );
//   }

//   if (!banner) return null;

//   return (
//     <section className="bg-white py-24">
//       <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

//         {/* LEFT */}
//         <div className="max-w-xl">
//           <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-6">
//             <Leaf className="w-4 h-4" />
//             <span className="text-sm font-medium">
//               Safe • Effective • Eco-Friendly
//             </span>
//           </div>

//           <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
//             {banner.title}{" "}
//             <span className="text-primary">
//               <Typewriter
//                 options={{
//                   strings: [
//                     "Cockroaches",
//                     "Termites",
//                     "Mosquitoes",
//                     "Bed Bugs",
//                     "Rats",
//                     "Ants",
//                   ],
//                   autoStart: true,
//                   loop: true,
//                   delay: 80,
//                   deleteSpeed: 50,
//                   pauseFor: 2000,
//                   cursor: "|",
//                 }}
//               />
//             </span>
//           </h1>

//           <p className="text-gray-600 text-lg mb-8">
//             {banner.subTitle}
//           </p>

//           <div className="flex flex-wrap gap-4 mb-10">
//             <Link to="/contact">
//               <Button size="lg">
//                 <Shield className="w-5 h-5" />
//                 Book Appointment
//               </Button>
//             </Link>

//             <Link to="/contact">
//               <Button variant="outline" size="lg">
//                 Free Inspection
//               </Button>
//             </Link>
//           </div>

//           <div className="flex flex-wrap gap-6">
//             {banner?.keywords?.map((item, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <CheckCircle className="text-green-600 w-5 h-5" />
//                 <span className="text-gray-700">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative"
//         >
//           <div className="bg-gray-100 rounded-2xl h-[300px] shadow-lg" />

//           <div className="absolute -bottom-6 -left-6 bg-white shadow-lg rounded-xl px-6 py-4">
//             <p className="text-sm text-gray-500">Trusted Service</p>
//             <p className="text-xl font-bold text-primary">
//               10,000+ Clients
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Banner;

// // Hero.tsx
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Shield, Leaf, CheckCircle, Play } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { fetchAPI } from "@/lib/fetchAPI";
// import Typewriter from "typewriter-effect";

// export interface Banner {
//   _id: string;
//   title: string;
//   subTitle: string;
//   keywords: string[];
//   isActive: boolean;
// }

// const Banner = () => {
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await fetchAPI<Banner[]>("/banner");
//         const active = Array.isArray(res) ? res.filter((b) => b.isActive) : [];
//         setBanners(active);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     loadData();
//   }, []);

//   const banner = banners[current];

//   if (!banner) return null;

//   return (
//     <section className="bg-white py-24">
//       <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
//         {/* LEFT CONTENT */}
//         <div className="max-w-xl">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-6">
//             <Leaf className="w-4 h-4" />
//             <span className="text-sm font-medium">
//               Safe • Effective • Eco-Friendly
//             </span>
//           </div>

//           {/* Title */}
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
//             {banner.title}{" "}
//             <span className="text-primary">
//               <Typewriter
//                 options={{
//                   strings: [
//                     "Cockroaches",
//                     "Termites",
//                     "Mosquitoes",
//                     "Bed Bugs",
//                     "Bees",
//                     "Ants",
//                     "Flies",
//                     "Wasps",
//                     "Rodents",
//                     "Rats",
//                     "Mice",
//                     "Ticks",
//                     "Snakes",
//                     "Spiders",
//                   ],
//                   autoStart: true,
//                   loop: true,
//                   delay: 80,
//                   deleteSpeed: 50,
//                   pauseFor: 2000,
//                   cursor: "|",
//                 }}
//               />
//             </span>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-gray-600 text-lg mb-8">{banner.subTitle}</p>

//           {/* Buttons */}
//           <div className="flex flex-wrap gap-4 mb-10">
//             <Link to="/contact">
//               <Button size="lg">
//                 <Shield className="w-5 h-5" />
//                 Book Appointment
//               </Button>
//             </Link>

//             <Link to="/contact">
//               <Button variant="outline" size="lg">
//                 Free Inspection
//               </Button>
//             </Link>
//           </div>

//           {/* Keywords */}
//           <div className="flex flex-wrap gap-6">
//             {banner?.keywords?.map((item, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <CheckCircle className="text-green-600 w-5 h-5" />
//                 <span className="text-gray-700">{item}</span>
//               </div>
//             ))}
//           </div>

//           {/* Typewriter line */}
//           {/* <div className="flex items-center gap-2 mt-6">
//             <CheckCircle className="text-green-600 w-5 h-5" />
//             <span className="text-gray-700 font-medium">
//               We are{" "}
//               <span className="text-primary font-bold">
//                 <Typewriter
//                   options={{
//                     strings: [
//                       "24/7 Available",
//                       "Quick Response",
//                       "Always Ready",
//                       "Fully Licensed",
//                     ],
//                     autoStart: true,
//                     loop: true,
//                   }}
//                 />
//               </span>
//             </span>
//           </div> */}
//         </div>

//         {/* RIGHT VIDEO CARD */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative"
//         >
//           {/* <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border">
//             <div className="aspect-video w-full">
//               <iframe
//                 className="w-full h-full"
//                 src="https://www.youtube.com/embed/8LjaPHTLpPU?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=8LjaPHTLpPU"
//                 title="YouTube video"
//                 frameBorder="0"
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           </div> */}

//           {/* floating badge */}
//           <div className="absolute -bottom-6 -left-6 bg-white shadow-lg rounded-xl px-6 py-4">
//             <p className="text-sm text-gray-500">Trusted Service</p>
//             <p className="text-xl font-bold text-primary">10,000+ Clients</p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Banner;
