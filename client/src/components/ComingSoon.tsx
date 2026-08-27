import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PartyPopper,
  Clock,
  Calendar,
  MapPin,
  Bell,
  Sparkles,
  Gift,
  Music,
  Cake,
  Rocket,
  Star,
  ChevronRight,
} from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - new Date().getTime();

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function ComingSoon({ launchTime }: { launchTime: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeLeft(launchTime);
      setTimeLeft(remaining);
      
      // Check if time is exactly 0 or less
      if (!remaining && !showConfetti) {
        setShowConfetti(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchTime, showConfetti]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const timerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-green-900 to-blue-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 20, -20, 20],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo / Brand */}
          <motion.div variants={itemVariants} className="mb-8">
  <motion.div
    animate={floatingAnimation}
    className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/30 backdrop-blur-xl border border-red-400/30"
  >
    {/* Glow Layer */}
    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-600 blur-lg opacity-40"></span>

    <Rocket className="w-6 h-6 text-red-400 relative z-10" />

    <span className="text-2xl font-bold text-white relative z-10 tracking-wide">
      Ecoshield Pest BD
    </span>
  </motion.div>
</motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-red-600 bg-clip-text text-transparent"
          >
            Grand Opening Ceremony
          </motion.h1>

          {/* Event Details */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 text-pink-300" />
              <span className="text-sm text-white/90">03 May, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-pink-300" />
              <span className="text-sm text-white/90">12:00 AM</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-pink-300" />
              <span className="text-sm text-white/90">Global Virtual Event</span>
            </div>
          </motion.div>

          {/* Timer Section */}
          <AnimatePresence mode="wait">
            {timeLeft ? (
              <motion.div
                key="timer"
                variants={timerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-12"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { label: "Days", value: timeLeft.days, icon: Calendar },
                    { label: "Hours", value: timeLeft.hours, icon: Clock },
                    { label: "Minutes", value: timeLeft.minutes, icon: Music },
                    { label: "Seconds", value: timeLeft.seconds, icon: Star },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: idx * 0.1, type: "spring" }}
                      className="relative group"
                    >
                      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
                        <div className="text-4xl md:text-6xl font-bold text-white mb-2 tabular-nums">
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="text-sm text-white/60 uppercase tracking-wider">
                          {item.label}
                        </div>
                        <item.icon className="absolute top-3 right-3 w-4 h-4 text-white/20 group-hover:text-purple-300 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1 }}
                  className="mt-8 max-w-md mx-auto"
                >
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Get ready for the biggest celebration!
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="live"
                variants={timerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-12"
              >
                {/* Celebration Effect when timer ends */}
                <div className="relative">
                  {/* Confetti effect */}
                  {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(50)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0,
                            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                          }}
                          animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            scale: Math.random() * 2 + 1,
                            rotate: Math.random() * 360,
                          }}
                          transition={{
                            duration: 1,
                            delay: Math.random() * 0.5,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Live Content */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white"
                  >
                    <PartyPopper className="w-16 h-16 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                      🎉 We Are LIVE! 🎉
                    </h2>
                    <p className="text-xl mb-6">
                      The website is now officially open!
                    </p>
                    
                    {/* Celebration Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                      <button
                        onClick={() => window.location.href = "/"}
                        className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Enter Website Now
                      </button>
                      <button
                        onClick={() => {
                          // Add share functionality
                          if (navigator.share) {
                            navigator.share({
                              title: "SB Global Launch",
                              text: "Check out the amazing new website!",
                              url: window.location.origin,
                            });
                          }
                        }}
                        className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
                      >
                        Share Celebration 🎊
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative Elements */}
          {timeLeft && (
            <>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full">
                  <Gift className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white/80">Special Launch Offers</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full">
                  <Bell className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white/80">Get Notified</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full">
                  <Cake className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white/80">Opening Celebration</span>
                </div>
              </motion.div>

              {/* Notification Form */}
              <motion.div
                variants={itemVariants}
                className="max-w-md mx-auto"
              >
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email for launch reminder"
                    className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-lg transition-all duration-300"
                  >
                    <Bell className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-xs text-white/40 mt-2">
                  Be the first to know when we launch!
                </p>
              </motion.div>
            </>
          )}

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex justify-center gap-4"
          >
            {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
              <button
                key={social}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-purple-500 transition-colors duration-300"
              >
                <span className="text-white text-xs">{social[0]}</span>
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-8 left-8 z-10">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-white/30 text-sm"
        >
          🎈 Opening Ceremony 🎈
        </motion.div>
      </div>

      <div className="absolute top-8 right-8 z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400/60" />
        </motion.div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";

// function getTimeLeft(target: Date) {
//   const diff = target.getTime() - new Date().getTime();

//   if (diff <= 0) return null;

//   const hours = Math.floor(diff / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//   return { hours, minutes, seconds };
// }

// export default function ComingSoon({ launchTime }: { launchTime: Date }) {
//   const [timeLeft, setTimeLeft] = useState<any>(null);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(getTimeLeft(launchTime));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [launchTime]);

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
//       <h1 className="text-4xl font-bold mb-6">🚀 Website Coming Soon</h1>

//       {timeLeft ? (
//         <div className="text-2xl">
//           {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
//         </div>
//       ) : (
//         <h2 className="text-green-400 text-3xl">Site is Live 🎉</h2>
//       )}
//     </div>
//   );
// }