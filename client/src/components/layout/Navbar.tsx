import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Leaf,
  Phone,
  ChevronDown,
  Users,
  Target,
  Shield,
  Building2,
  Grid,
  ArrowRight,
} from "lucide-react";
import { IoCall } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Top from "./Top";
import { fetchAPI } from "@/lib/fetchAPI";
import logo from "@/assets/logo.svg";

interface Service {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  orderNumber: number;
  children?: any[];
}

const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "Services",
    hasDropdown: true,
    type: "services",
  },
  {
    label: "About",
    hasDropdown: true,
    dropdownItems: [
      {
        href: "/about#company-background",
        label: "Company Profile",
        icon: <Building2 className="w-4 h-4" />,
        section: "company-background",
      },
      {
        href: "/about#mission-vision",
        label: "Mission & Vision",
        icon: <Target className="w-4 h-4" />,
        section: "mission-vision",
      },
      {
        href: "/about#core-values",
        label: "Core Values",
        icon: <Shield className="w-4 h-4" />,
        section: "core-values",
      },
      {
        href: "/about#board-of-directors",
        label: "Board of Directors",
        icon: <Users className="w-4 h-4" />,
        section: "board-of-directors",
      },
    ],
  },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/review", label: "Review" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "Faq" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false);
  const [mobileServicesDropdownOpen, setMobileServicesDropdownOpen] =
    useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Fetch services
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const res = await fetchAPI<any[]>("/services");
        setServices(res || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    setAboutDropdownOpen(false);
    setMobileAboutDropdownOpen(false);

    if (location.pathname !== "/about") {
      window.location.href = `/about#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleDropdownItemClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border"
    >
      <div className="bg-blue-900">
        {" "}
        <Top />
      </div>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-64 h-auto group-hover:scale-110 transition-transform">
              <img src={logo} alt="" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              // Services Dropdown
              if (link.label === "Services") {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 font-medium transition-colors hover:text-primary ${
                        location.pathname === "/services"
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-card rounded-lg shadow-xl border border-border overflow-hidden"
                        >
                          {/* Services Grid */}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3 px-2">
                              <h3 className="font-semibold text-lg">
                                Our Services
                              </h3>
                              <Link
                                to="/services"
                                className="text-sm text-primary hover:underline flex items-center gap-1"
                                onClick={() => setServicesDropdownOpen(false)}
                              >
                                View All <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>

                            {loading ? (
                              <div className="py-8 text-center text-muted-foreground">
                                Loading services...
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-3">
                                {services.slice(0, 6).map((service) => (
                                  <Link
                                    key={service._id}
                                    to={`/services/${service.slug}`}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-all group"
                                    onClick={() =>
                                      setServicesDropdownOpen(false)
                                    }
                                  >
                                    {service.thumbnail && (
                                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                          src={service.thumbnail}
                                          alt={service.title}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                      </div>
                                    )}
                                    <span className="font-medium text-sm group-hover:text-primary transition-colors">
                                      {service.title}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            )}

                            {services.length > 6 && (
                              <div className="mt-3 pt-3 border-t border-border text-center">
                                <Link
                                  to="/services"
                                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                                  onClick={() => setServicesDropdownOpen(false)}
                                >
                                  View {services.length - 6} more services
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // About Dropdown
              if (link.hasDropdown && link.label === "About") {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 font-medium transition-colors hover:text-primary ${
                        location.pathname === "/about"
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          aboutDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {aboutDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
                        >
                          {link.dropdownItems?.map((item, index) => (
                            <a
                              key={index}
                              href={item.href}
                              onClick={(e) =>
                                handleDropdownItemClick(e, item.section)
                              }
                              className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-foreground hover:text-primary group"
                            >
                              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                                {item.icon}
                              </span>
                              <span className="font-medium">{item.label}</span>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Regular Links
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative font-medium transition-colors hover:text-primary ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+8801405555822"
              className="flex items-center gap-3 pl-2 pr-5 py-2 bg-white rounded-full border border-gray-200 border-primary/50 shadow-md transition-all duration-300 group"
            >
              {/* Simple Phone Icon */}
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center transition-colors duration-300">
                <IoCall className="w-4 h-4 text-primary text-white transition-colors duration-300 animate-pulse-slow" />
              </div>

              {/* Simple Text Content */}
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-gray-500 leading-tight">
                  Contact Us
                </span>
                <span className="text-sm font-semibold text-gray-800 text-primary transition-colors duration-300 leading-tight">
                  +880 14055-55822
                </span>
              </div>
            </a>
            {/* <Link to="/contact">
              <Button variant="hero" size="default">
                Book Now
              </Button>
            </Link> */}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link, index) => {
                // Mobile Services Dropdown
                if (link.label === "Services") {
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col"
                    >
                      <button
                        onClick={() =>
                          setMobileServicesDropdownOpen(
                            !mobileServicesDropdownOpen,
                          )
                        }
                        className={`flex items-center justify-between w-full py-2 font-medium transition-colors ${
                          location.pathname.includes("/services")
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileServicesDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileServicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {loading ? (
                              <div className="py-2 text-muted-foreground">
                                Loading...
                              </div>
                            ) : (
                              <>
                                {services.map((service) => (
                                  <Link
                                    key={service._id}
                                    to={`/services/${service.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                                  >
                                    {service.thumbnail && (
                                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                          src={service.thumbnail}
                                          alt={service.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    )}
                                    <span>{service.title}</span>
                                  </Link>
                                ))}
                                <Link
                                  to="/services"
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-2 px-4 py-2 text-primary font-medium"
                                >
                                  View All Services{" "}
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                // Mobile About Dropdown
                if (link.label === "About") {
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col"
                    >
                      <button
                        onClick={() =>
                          setMobileAboutDropdownOpen(!mobileAboutDropdownOpen)
                        }
                        className={`flex items-center justify-between w-full py-2 font-medium transition-colors ${
                          location.pathname === "/about"
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileAboutDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileAboutDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {link.dropdownItems?.map((item, idx) => (
                              <a
                                key={idx}
                                href={item.href}
                                onClick={(e) =>
                                  handleDropdownItemClick(e, item.section)
                                }
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-foreground hover:text-primary"
                              >
                                <span className="text-muted-foreground">
                                  {item.icon}
                                </span>
                                <span>{item.label}</span>
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                // Regular Mobile Links
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 font-medium transition-colors ${
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Button variant="hero" className="w-full">
                    Book Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Leaf, Phone, ChevronDown, Users, Target, Shield, Building2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Top from "./Top";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/services", label: "Services" },
//   {
//     label: "About",
//     hasDropdown: true,
//     dropdownItems: [
//       { href: "/about#company-background", label: "Company Profile", icon: <Building2 className="w-4 h-4" />, section: "company-background" },
//       { href: "/about#mission-vision", label: "Mission & Vision", icon: <Target className="w-4 h-4" />, section: "mission-vision" },
//       { href: "/about#core-values", label: "Core Values", icon: <Shield className="w-4 h-4" />, section: "core-values" },
//       { href: "/about#board-of-directors", label: "Board of Directors", icon: <Users className="w-4 h-4" />, section: "board-of-directors" },
//     ]
//   },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/review", label: "Review" },
//   { href: "/faq", label: "Faq" },
//   { href: "/blog", label: "Blog" },
//   { href: "/contact", label: "Contact" },
// ];

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
//   const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false);
//   const location = useLocation();

//   const scrollToSection = (sectionId: string) => {
//     // Close all dropdowns and mobile menu
//     setIsOpen(false);
//     setAboutDropdownOpen(false);
//     setMobileAboutDropdownOpen(false);

//     // If we're not on the about page, navigate to it first
//     if (location.pathname !== '/about') {
//       // Navigate to about page and then scroll after navigation
//       window.location.href = `/about#${sectionId}`;
//       return;
//     }

//     // If we're already on about page, scroll to section
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const headerOffset = 120; // Adjust based on your header height
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth"
//       });
//     }
//   };

//   const handleDropdownItemClick = (e: React.MouseEvent, sectionId: string) => {
//     e.preventDefault();
//     scrollToSection(sectionId);
//   };

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border"
//     >
//       <div className="bg-blue-900"> <Top/></div>
//       <div className="container mx-auto px-4">
//         <nav className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
//               <Leaf className="w-6 h-6 text-primary-foreground" />
//             </div>
//             <div className="flex flex-col">
//               <span className="font-heading font-bold text-lg text-foreground leading-tight">
//                 EcoShield
//               </span>
//               <span className="text-xs text-muted-foreground">Pest Control BD</span>
//             </div>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => {
//               if (link.hasDropdown) {
//                 return (
//                   <div
//                     key={link.label}
//                     className="relative"
//                     onMouseEnter={() => setAboutDropdownOpen(true)}
//                     onMouseLeave={() => setAboutDropdownOpen(false)}
//                   >
//                     <button
//                       className={`flex items-center gap-1 font-medium transition-colors hover:text-primary ${
//                         location.pathname === '/about' ? "text-primary" : "text-foreground"
//                       }`}
//                     >
//                       {link.label}
//                       <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
//                         aboutDropdownOpen ? "rotate-180" : ""
//                       }`} />
//                     </button>

//                     <AnimatePresence>
//                       {aboutDropdownOpen && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           transition={{ duration: 0.2 }}
//                           className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
//                         >
//                           {link.dropdownItems?.map((item, index) => (
//                             <a
//                               key={index}
//                               href={item.href}
//                               onClick={(e) => handleDropdownItemClick(e, item.section)}
//                               className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-foreground hover:text-primary group"
//                             >
//                               <span className="text-muted-foreground group-hover:text-primary transition-colors">
//                                 {item.icon}
//                               </span>
//                               <span className="font-medium">{item.label}</span>
//                             </a>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 );
//               }

//               return (
//                 <Link
//                   key={link.href}
//                   to={link.href}
//                   className={`relative font-medium transition-colors hover:text-primary ${
//                     location.pathname === link.href
//                       ? "text-primary"
//                       : "text-foreground"
//                   }`}
//                 >
//                   {link.label}
//                   {location.pathname === link.href && (
//                     <motion.div
//                       layoutId="activeNav"
//                       className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
//                     />
//                   )}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* CTA */}
//           <div className="hidden md:flex items-center gap-3">
//             <a href="tel:+88014055-55822" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
//               <Phone className="w-4 h-4" />
//               <span className="text-sm font-medium">+88014055-55822</span>
//             </a>
//             <Link to="/contact">
//               <Button variant="hero" size="default">
//                 Book Now
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </nav>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-card border-b border-border overflow-hidden"
//           >
//             <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
//               {navLinks.map((link, index) => {
//                 if (link.hasDropdown) {
//                   return (
//                     <motion.div
//                       key={link.label}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex flex-col"
//                     >
//                       <button
//                         onClick={() => setMobileAboutDropdownOpen(!mobileAboutDropdownOpen)}
//                         className={`flex items-center justify-between w-full py-2 font-medium transition-colors ${
//                           location.pathname === '/about' ? "text-primary" : "text-foreground"
//                         }`}
//                       >
//                         <span>{link.label}</span>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
//                           mobileAboutDropdownOpen ? "rotate-180" : ""
//                         }`} />
//                       </button>

//                       <AnimatePresence>
//                         {mobileAboutDropdownOpen && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="ml-4 mt-2 space-y-2"
//                           >
//                             {link.dropdownItems?.map((item, idx) => (
//                               <a
//                                 key={idx}
//                                 href={item.href}
//                                 onClick={(e) => handleDropdownItemClick(e, item.section)}
//                                 className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-foreground hover:text-primary"
//                               >
//                                 <span className="text-muted-foreground">{item.icon}</span>
//                                 <span>{item.label}</span>
//                               </a>
//                             ))}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </motion.div>
//                   );
//                 }

//                 return (
//                   <motion.div
//                     key={link.href}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     <Link
//                       to={link.href}
//                       onClick={() => setIsOpen(false)}
//                       className={`block py-2 font-medium transition-colors ${
//                         location.pathname === link.href
//                           ? "text-primary"
//                           : "text-foreground"
//                       }`}
//                     >
//                       {link.label}
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: navLinks.length * 0.1 }}
//               >
//                 <Link to="/contact" onClick={() => setIsOpen(false)}>
//                   <Button variant="hero" className="w-full">
//                     Book Now
//                   </Button>
//                 </Link>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };
