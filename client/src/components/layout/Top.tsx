import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Twitter,
  Linkedin,
} from "lucide-react";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareThreads } from "react-icons/fa6";

import React from "react";

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

function Top() {
  return (
    <div className="bg-blue-950  py-2.5 w-full bg-primary text-primary-foreground text-xs sm:text-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
        {/* Left info */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Middle Halishahr Bandar, Chittagong, PO: 4100</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Mon–Fri 09:00–21:00, Sat–Sun 10:00–22:00</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <a
              href="mailto:ecoshieldpestbd@gmail.com"
              className="hover:text-primary transition-colors"
            >
              ecoshieldpestbd@gmail.com
            </a>
          </div>
        </div>

        {/* Social icons */}
        <div className="hidden lg:flex items-center gap-4">
          {social.map(({ name, url, icon: Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              title={name}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Top;
