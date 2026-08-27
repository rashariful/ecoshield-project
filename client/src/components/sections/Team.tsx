import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { fetchAPI } from "@/lib/fetchAPI";
import { 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Phone, 
  Linkedin, 
  Twitter,
  Quote,
  Star,
  Award,
  Sparkles,
  Heart,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/* ================= TYPES ================= */

type TeamMember = {
  _id: string;
  name: string;
  designation: string;
  bio?: string;
  email?: string;
  phone?: string;
  thumbnail: string;
  isActive: boolean;
  experience?: string;
  specialties?: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
  };
};

/* ================= COMPONENT ================= */

export default function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [direction, setDirection] = useState(0);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const res = await fetchAPI<any>("/teams");

        const rawData: TeamMember[] = Array.isArray(res)
          ? res
          : res?.data || [];

        const activeTeam = rawData.filter(
          member => member.isActive === true
        );

        setTeam(activeTeam);
      } catch (error) {
        console.error("Failed to fetch team:", error);
        setTeam([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, []);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!autoplay || team.length <= itemsPerView) return;

    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, currentIndex, team.length, itemsPerView]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, team.length - itemsPerView) : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => 
      prev >= team.length - itemsPerView ? 0 : prev + 1
    );
  };

  const visibleTeam = team.slice(currentIndex, currentIndex + itemsPerView);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <Users className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!team.length) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header with decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-primary/20 animate-pulse" />
              <Sparkles className="w-4 h-4 text-primary/40 absolute top-2 left-2 animate-ping" />
            </div>
          </div>

          <Badge variant="outline" className="mb-4 px-4 py-2 bg-primary/5 border-primary/20">
            <Award className="w-4 h-4 mr-2 text-primary" />
            Expert Team
          </Badge>
          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Meet Our Experts
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The passionate people who make the magic happen every day
          </p>

          {/* Team stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold">{team.length}+ Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">Certified Experts</span>
            </div>
          </div>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {team.length > itemsPerView && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border-2 border-primary/20 hover:border-primary transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border-2 border-primary/20 hover:border-primary transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Slider */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {visibleTeam.map((member, index) => (
                <TeamCard 
                  key={member._id} 
                  member={member} 
                  index={index}
                  isHovered={hoveredMember === member._id}
                  onHover={() => setHoveredMember(member._id)}
                  onLeave={() => setHoveredMember(null)}
                />
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          {team.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(team.length / itemsPerView) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex / itemsPerView ? 1 : -1);
                    setCurrentIndex(idx * itemsPerView);
                  }}
                  onMouseEnter={() => setAutoplay(false)}
                  onMouseLeave={() => setAutoplay(true)}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerView) === idx
                      ? "w-8 bg-primary"
                      : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Autoplay indicator */}
        {autoplay && team.length > itemsPerView && (
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground animate-pulse">
              Auto-scrolling • Hover to pause
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================= CARD ================= */

function TeamCard({ 
  member, 
  index,
  isHovered,
  onHover,
  onLeave 
}: { 
  member: TeamMember; 
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const { name, designation, bio, thumbnail, email, phone, experience, specialties, social } = member;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group"
    >
      <Card className="relative overflow-hidden bg-white dark:bg-gray-800/90 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/5]">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Social Icons - Appear on hover */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            {social?.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {social?.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Experience Badge */}
          {experience && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary/90 text-white border-0 backdrop-blur-sm">
                {experience}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-6 text-center">
          {/* Quote icon - appears on hover */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Quote className="w-4 h-4" />
            </div>
          </motion.div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
            {name}
          </h3>

          <p className="text-sm font-medium text-primary mb-2">
            {designation}
          </p>

          {/* Bio with animation */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {bio && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {bio}
              </p>
            )}
          </motion.div>

          {/* Specialties */}
          {specialties && specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center mt-3">
              {specialties.slice(0, 2).map((spec, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
              {specialties.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{specialties.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Contact buttons - appear on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-2"
          >
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                <Phone className="w-3 h-3" />
                {phone}
              </a>
            )}
          </motion.div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </Card>
    </motion.div>
  );
}
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { fetchAPI } from "@/lib/fetchAPI";

// /* ================= TYPES ================= */

// type TeamMember = {
//   _id: string;
//   name: string;
//   designation: string;
//   bio?: string;
//   email?: string;
//   phone?: string;
//   thumbnail: string;
//   isActive: boolean;
// };

// /* ================= COMPONENT ================= */

// export default function TeamSection() {
//   const [team, setTeam] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadTeam = async () => {
//       try {
//         const res = await fetchAPI<any>("/teams");

//         // API safe handling (array OR { data: [] })
//         const rawData: TeamMember[] = Array.isArray(res)
//           ? res
//           : res?.data || [];

//         const activeTeam = rawData.filter(
//           member => member.isActive === true
//         );

//         setTeam(activeTeam);
//       } catch (error) {
//         console.error("Failed to fetch team:", error);
//         setTeam([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTeam();
//   }, []);

//   if (loading || !team.length) return null;

//   return (
//     <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
//       <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
//             Our Team
//           </h2>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             The passionate people who make the magic happen every day
//           </p>
//         </motion.div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
//           {team.map(member => (
//             <TeamCard key={member._id} member={member} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ================= CARD ================= */

// function TeamCard({ member }: { member: TeamMember }) {
//   const { name, designation, bio, thumbnail } = member;

//   return (
//     <div className="group relative bg-white dark:bg-gray-800/70 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 dark:border-gray-700/60">
//       {/* Image */}
//       <div className="relative overflow-hidden aspect-[4/5]">
//         <img
//           src={thumbnail}
//           alt={name}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       </div>

//       {/* Info */}
//       <div className="p-6 text-center">
//         <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//           {name}
//         </h3>

//         <p className="mt-1.5 text-sm font-medium text-primary">
//           {designation}
//         </p>

//         {bio && (
//           <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
//             {bio}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
