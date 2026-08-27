import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Calendar, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      {/* Decorative Leaves */}
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 0.2, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-10 left-10"
      >
        <Leaf className="w-24 h-24 text-primary-foreground" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 20 }}
        whileInView={{ opacity: 0.2, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-10 right-10"
      >
        <Leaf className="w-32 h-32 text-primary-foreground" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6"
          >
            Need Pest Control Today?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-primary-foreground/90 text-lg mb-10"
          >
            Book your inspection now and enjoy a pest-free environment. 
            Our team is ready to help protect your home or business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="tel:+88014055-55822">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </a>
            <Link to="/contact">
              <Button
                size="xl"
                className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Calendar className="w-5 h-5" />
                Book Online
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
