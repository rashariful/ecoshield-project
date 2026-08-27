import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  labels?: Record<string, string>;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage = "/images/default-banner.jpg",
  labels = {},
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  const segments = pathname.split("/").filter(Boolean);

  const paths = segments.map((seg, index) => ({
    name:
      labels[seg] ||
      seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));

  const currentTitle =
    title || (paths.length ? paths[paths.length - 1].name : "Home");

  return (
    <section className="relative h-[220px] sm:h-[320px] lg:h-[480px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1.5px]" />
      </div>

      <motion.div
        className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto text-white"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-6">
          {currentTitle}
        </h1>

        <nav className="flex flex-wrap items-center justify-center gap-1.5 text-sm mb-4">
          <Link to="/" className="hover:text-[#d7d55d]">
            Home
          </Link>

          {paths.map((p, i) => (
            <React.Fragment key={p.href}>
              <ChevronRight className="w-4 h-4" />
              {i === paths.length - 1 ? (
                <span className="font-medium">{p.name}</span>
              ) : (
                <Link to={p.href} className="hover:text-[#d7d55d]">
                  {p.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {subtitle && (
          <p className="text-lg max-w-3xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
    </section>
  );
};
