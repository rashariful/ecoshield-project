import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Leaf, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/fetchAPI";

export interface Banner {
  _id: string;
  title: string;
  subTitle: string;
  thumbnail: string;
  keywords: string[];
  isActive: boolean;
}

export const Hero = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  
useEffect(() => {
  const loadData = async () => {
    try {
      const res = await fetchAPI<Banner[]>("/banner");

      

      const activeBanners = Array.isArray(res)
        ? res.filter(b => b.isActive === true)
        : [];

      

      setBanners(activeBanners);
    } catch (err) {
      console.error(err);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);


  // auto slide
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000); // 5 sec

    return () => clearInterval(interval);
  }, [banners]);

  if (loading) return <p>Loading...</p>;
  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner._id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={banner.thumbnail}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}



          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6"
          >
            <Leaf className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Safe • Effective • Eco-Friendly
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            key={banner.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            {banner.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={banner.subTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl"
          >
            {banner.subTitle}
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <Link to="/contact">
              <Button variant="heroOutline" size="xl">
                <Shield className="w-5 h-5" />
                Book an Appointment
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="ghost"
                size="xl"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                Get Free Inspection
              </Button>
            </Link>
          </div>

          {/* Highlights */}
                    {/* Dynamic Keywords */}
{banner?.keywords?.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="flex flex-wrap gap-6"
  >
    {banner.keywords.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-accent" />
        <span className="text-primary-foreground/90 font-medium">
          {item} 
        </span>
      </div>
    ))}
  </motion.div>
)}


        </div>
      </div>
    </section>
  );
};


// <section className="relative min-h-screen flex items-center overflow-hidden">
    //   {/* Background Image */}
    //   <div className="absolute inset-0 z-0">
    //     <img
    //       src={heroBg}
    //       alt="Professional pest control service"
    //       className="w-full h-full object-cover"
    //     />
    //     <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
    //   </div>

    //   {/* Content */}
    //   <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
    //     <div className="max-w-3xl">
    //       <motion.div
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.6 }}
    //         className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6"
    //       >
    //         <Leaf className="w-4 h-4 text-primary-foreground" />
    //         <span className="text-sm font-medium text-primary-foreground">
    //           Safe • Effective • Eco-Friendly
    //         </span>
    //       </motion.div>

    //       <motion.h1
    //         initial={{ opacity: 0, y: 30 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.6, delay: 0.1 }}
    //         className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
    //       >
    //         EcoShield{" "}
    //         <span className="relative">
    //           Pest Control
    //           <svg
    //             className="absolute -bottom-2 left-0 w-full"
    //             viewBox="0 0 300 12"
    //             fill="none"
    //           >
    //             <path
    //               d="M2 10C50 4 150 2 298 10"
    //               stroke="currentColor"
    //               strokeWidth="3"
    //               strokeLinecap="round"
    //               className="text-accent"
    //             />
    //           </svg>
    //         </span>{" "}
    //         BD
    //       </motion.h1>

    //       <motion.p
    //         initial={{ opacity: 0, y: 30 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.6, delay: 0.2 }}
    //         className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl"
    //       >
    //         Protect your home and business from harmful pests with environmentally 
    //         responsible pest control services. Trusted by families and businesses 
    //         across Bangladesh.
    //       </motion.p>

    //       <motion.div
    //         initial={{ opacity: 0, y: 30 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.6, delay: 0.3 }}
    //         className="flex flex-wrap gap-4 mb-10"
    //       >
    //         <Link to="/contact">
    //           <Button variant="heroOutline" size="xl" className="group">
    //             <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
    //             Book an Appointment
    //           </Button>
    //         </Link>
    //         <Link to="/contact">
    //           <Button
    //             variant="ghost"
    //             size="xl"
    //             className="text-primary-foreground hover:bg-primary-foreground/10"
    //           >
    //             Get Free Inspection
    //           </Button>
    //         </Link>
    //       </motion.div>

    //       <motion.div
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         transition={{ duration: 0.6, delay: 0.4 }}
    //         className="flex flex-wrap gap-6"
    //       >
    //         {highlights.map((item, index) => (
    //           <motion.div
    //             key={item}
    //             initial={{ opacity: 0, x: -20 }}
    //             animate={{ opacity: 1, x: 0 }}
    //             transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
    //             className="flex items-center gap-2"
    //           >
    //             <CheckCircle className="w-5 h-5 text-accent" />
    //             <span className="text-primary-foreground/90 font-medium">
    //               {item}
    //             </span>
    //           </motion.div>
    //         ))}
    //       </motion.div>
    //     </div>
    //   </div>

    //   {/* Decorative Elements */}
    //   <motion.div
    //     initial={{ opacity: 0, scale: 0.8 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     transition={{ duration: 1, delay: 0.6 }}
    //     className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl hidden lg:block"
    //   />
    // </section>