import { Link } from "react-router-dom";
import { Leaf, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.svg"
const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

import { AiFillTikTok } from "react-icons/ai";
import { FaSquareThreads } from "react-icons/fa6";
const services = [
  "Residential Pest Control",
  "Commercial Pest Control",
  "Termite Control",
  "Mosquito Control",
  "Rodent Control",
  "Bed Bug Treatment",
];

const social = [
  {
    name: "facebook",
    url: "https://facebook.com/ECOSHIELDPESTBD",
    icon: Facebook,
  },
  {
    name: "instagram",
    url: "https://instagram.com/ecoshieldpestbd",
    icon: Instagram,
  },
  {
    name: "linkedin",
    url: "https://linkedin.com/in/ecoshield-pest-bd",
    icon: Linkedin,
  },
  {
    name: "threads",
    url: "https://www.threads.com/@ecoshieldpestbd",
    icon: FaSquareThreads, // Threads icon না থাকায় Instagram fallback
  },
  {
    name: "twitter",
    url: "https://x.com/ecoshieldpestbd",
    icon: Twitter,
  },
  {
    name: "tiktok",
    url: "https://tiktok.com/@ecoshield.pest.bd",
    icon: AiFillTikTok, // TikTok icon না থাকায় fallback
  },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-56 h-auto group-hover:scale-110 transition-transform">
            <img src={logo} alt="" />
          </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Safe, effective, and eco-friendly pest control solutions for homes and businesses across Bangladesh.
            </p>
            <div className="flex items-center gap-3">
               {/* Social icons */}
        <div className="hidden lg:flex items-center gap-4">
          {social.map(({ name, url, icon: Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              title={name}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        
            
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href="tel:+88014055-55822"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  +88014055-55822
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:info@ecoshieldpestbd.com"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  info@ecoshieldpestbd.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2026 EcoShield Pest Control BD. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/contact"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
