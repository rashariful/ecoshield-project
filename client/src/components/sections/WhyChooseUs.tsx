import { motion } from "framer-motion";
import { Leaf, Award, DollarSign, Zap, ShieldCheck, Heart } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Eco-Friendly & Safe",
    description: "We use environmentally responsible products that are safe for your family and pets.",
  },
  {
    icon: Award,
    title: "Certified Technicians",
    description: "Our team is trained and certified with the latest pest control techniques.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description: "Quality pest control services at competitive prices with no hidden fees.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Quick response times and dependable service you can count on.",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Protection",
    description: "Our treatments provide lasting protection against pest reinfestation.",
  },
  {
    icon: Heart,
    title: "100% Satisfaction",
    description: "Your satisfaction is guaranteed. We'll make it right if you're not happy.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Why EcoShield?
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose{" "}
              <span className="text-gradient">EcoShield?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're committed to providing the best pest control experience while 
              protecting your family, property, and the environment. Here's what 
              sets us apart.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.slice(0, 4).map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-primary rounded-3xl p-10 text-primary-foreground relative overflow-hidden">
              {/* Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="currentColor" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <h3 className="font-heading text-2xl font-bold mb-8">
                  Trusted by Thousands
                </h3>

                <div className="grid grid-cols-2 gap-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="text-5xl font-heading font-bold mb-2">5K+</div>
                    <div className="text-primary-foreground/80 text-sm">Happy Customers</div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="text-5xl font-heading font-bold mb-2">10+</div>
                    <div className="text-primary-foreground/80 text-sm">Years Experience</div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="text-5xl font-heading font-bold mb-2">50+</div>
                    <div className="text-primary-foreground/80 text-sm">Expert Technicians</div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="text-5xl font-heading font-bold mb-2">99%</div>
                    <div className="text-primary-foreground/80 text-sm">Success Rate</div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-strong border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-bold text-primary">
                    A
                  </div>
                  <div className="w-10 h-10 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center text-xs font-bold text-accent">
                    R
                  </div>
                  <div className="w-10 h-10 rounded-full bg-leaf/20 border-2 border-card flex items-center justify-center text-xs font-bold text-leaf">
                    S
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">4.9/5 Rating</div>
                  <div className="text-muted-foreground text-sm">Customer Reviews</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
