import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ArrowRight,
  Shield,
  Sparkles,
  MessageCircle,
  CheckCircle
} from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SecontBanner: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const socialLinks = [
    // { icon: FaWhatsapp, href: "https://wa.me/+88014055-55822", color: "bg-green-500", hoverColor: "hover:bg-green-600", label: "WhatsApp" },
    { icon: FaFacebookF, href: "https://facebook.com/ECOSHIELDPESTBD", color: "bg-blue-600", hoverColor: "hover:bg-blue-700", label: "Facebook" },
    { icon: FaInstagram, href: "https://instagram.com/ecoshieldpestbd", color: "bg-gradient-to-br from-purple-500 to-pink-500", hoverColor: "hover:from-purple-600 hover:to-pink-600", label: "Instagram" },
    { icon: FaYoutube, href: "https://www.youtube.com/@ECOSHIELDPESTBD", color: "bg-red-600", hoverColor: "hover:bg-red-700", label: "YouTube" },
    { icon: FaLinkedinIn, href: "https://linkedin.com/in/ecoshield-pest-bd", color: "bg-blue-700", hoverColor: "hover:bg-blue-800", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://x.com/ecoshieldpestbd", color: "bg-sky-500", hoverColor: "hover:bg-sky-600", label: "Twitter" },
    { icon: FaSquareThreads , href: "https://www.threads.com/@ecoshieldpestbd", color: "bg-black", hoverColor: "hover:bg-black/90", label: "threads" },
  ];

  const features = [
    "24/7 Emergency Service",
    "Certified Experts",
    "Eco-Friendly Solutions",
    "100% Satisfaction",
  ];

  return (
    <section className="container mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 rounded-b-3xl overflow-hidden shadow-2xl"
      >
        {/* LEFT SIDE - Contact Info */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white px-8 md:px-12 py-12 flex flex-col justify-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div variants={itemVariants}>
              <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                24/7 Support Available
              </Badge>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              Need Help?
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/80">
                We're here 24/7
              </span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <a
                href="tel:+88014055-55822"
                className="text-3xl md:text-4xl font-bold hover:text-white/90 transition-colors inline-block"
              >
                +88014055-55822
              </a>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-white/70">Email Us</p>
                  <a href="mailto:info@ecoshieldpestbd.com" className="hover:underline">
                    info@ecoshieldpestbd.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-white/70">Alternative Email</p>
                  <a href="mailto:ecoshieldpestbd@gmail.com" className="hover:underline">
                    ecoshieldpestbd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-white/70">Service Area</p>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={itemVariants}>
              <p className="text-sm text-white/70 mb-4">Connect with us</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 ${social.color} ${social.hoverColor} rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:shadow-xl`}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - CTA */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white px-8 md:px-12 py-12 flex flex-col justify-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10">
              <Shield className="w-32 h-32 text-white" />
            </div>
            <div className="absolute bottom-10 left-10">
              <Sparkles className="w-24 h-24 text-white" />
            </div>
          </div>

          <div className="relative z-10">
            <motion.div variants={itemVariants}>
              <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Professional Pest Control
              </Badge>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Get Professional Pest Control Services
              <span className="block text-2xl font-normal mt-3 text-white/90">
                at Your Doorstep Today
              </span>
            </motion.h3>

            {/* Features */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  <span className="text-sm text-white/90">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-white/90 mb-8 leading-relaxed"
            >
              To solve this problem, we bring a wide range of pest control services.
              Our complete solution will make your space clean and hygienic.
              A clean home is highly essential to ensure good health.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-white/90 hover:scale-105 transition-all duration-300 group shadow-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat with Expert
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-4 text-sm text-white/70"
            >
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Licensed & Insured</span>
              </div>
              <div className="w-1 h-1 bg-white/30 rounded-full" />
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Fast Response</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SecontBanner;