// components/Services.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/fetchAPI"; // your fetch helper

// Optional: map icons dynamically if your backend returns icon names
import {
  Home,
  Building2,
  Bug,
  Droplets,
  Rat,
  Bed,
  Sparkles,
  Settings,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Home,
  Building2,
  Bug,
  Droplets,
  Rat,
  Bed,
  Sparkles,
  Settings,
};

export interface Service {
  _id: string;
  title: string;
  subTitle: string;
  slug: string;
  description: string;
  thumbnail?: string;
  icon?: string; // optional, backend can provide icon name
  isActive: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetchAPI<Service[]>("/services"); // your endpoint
        const activeServices = Array.isArray(res)
          ? res.filter((s) => s.isActive)
          : [];
        setServices(activeServices);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) return <p className="text-center py-12">Loading Services...</p>;

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive pest control solutions tailored to your needs, delivered with
            care for the environment and your safety.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
         {services.map((service) => {
  const Icon = service.icon ? iconMap[service.icon] || Settings : Settings;
  return (
    <motion.div
      key={service.slug}
      variants={itemVariants}
      className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border"
    >
      <Link to={`/services/${service.slug}`} className="block">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 relative">
          <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors absolute" />
          <img
            src={service.thumbnail}
            alt={service.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.subTitle}
        </p>
      </Link>
    </motion.div>
  );
})}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button variant="default" size="lg" className="group">
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
