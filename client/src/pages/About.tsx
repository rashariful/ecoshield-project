import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTA } from "@/components/sections/CTA";
import { Target, Eye, Heart, Shield, Users, Award } from "lucide-react";
import { PageHeader } from "@/components/Common/PageHeader";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Your safety and that of your environment is our top priority in every service we provide.",
  },
  {
    icon: Heart,
    title: "Environmental Responsibility",
    description: "We use eco-friendly products and methods that protect both people and the planet.",
  },
  {
    icon: Users,
    title: "Integrity & Transparency",
    description: "Honest pricing, clear communication, and reliable service you can trust.",
  },
  {
    icon: Award,
    title: "Customer Satisfaction",
    description: "We're not happy until you're completely satisfied with our service.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
       <PageHeader
                  title="About EcoShield Pest Control BD"
                  subtitle="Committed to protecting your home and business with environmentally responsible pest solutions"
                  backgroundImage="https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?semt=ais_wordcount_boost&w=740&q=80"
                />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                About Us
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Your Trusted Partner in{" "}
                <span className="text-gradient">Pest Control</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                EcoShield Pest Control BD was founded with a mission to provide safe, 
                effective, and eco-friendly pest control solutions that protect your 
                family, property, and the environment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Company Background
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    EcoShield Pest Control BD was established with a clear vision: to 
                    revolutionize the pest control industry in Bangladesh by combining 
                    modern technology with environmentally responsible practices.
                  </p>
                  <p>
                    Our team of certified experts brings years of experience and a 
                    commitment to excellence in every service we provide. We understand 
                    that pest problems can be stressful, which is why we focus on delivering 
                    quick, effective, and lasting solutions.
                  </p>
                  <p>
                    From residential homes to large commercial establishments, we have the 
                    expertise and equipment to handle any pest challenge while maintaining 
                    our commitment to safety and sustainability.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                  <div className="text-4xl font-heading font-bold mb-2">10+</div>
                  <div className="text-primary-foreground/80">Years of Experience</div>
                </div>
                <div className="bg-accent rounded-2xl p-8 text-accent-foreground">
                  <div className="text-4xl font-heading font-bold mb-2">5000+</div>
                  <div className="text-accent-foreground/80">Happy Customers</div>
                </div>
                <div className="bg-secondary rounded-2xl p-8">
                  <div className="text-4xl font-heading font-bold text-foreground mb-2">50+</div>
                  <div className="text-muted-foreground">Expert Technicians</div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-8">
                  <div className="text-4xl font-heading font-bold text-foreground mb-2">99%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-2xl p-10 border border-border"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver reliable, eco-friendly pest control services that protect 
                  health, property, and the environment. We are committed to using 
                  sustainable methods that ensure the safety of your family while 
                  effectively eliminating pest problems.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-primary rounded-2xl p-10 text-primary-foreground"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Our Vision
                </h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  To become the most trusted pest control brand in Bangladesh through 
                  innovation, sustainability, and excellence. We envision a future 
                  where every home and business can be protected from pests without 
                  compromising environmental health.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                What We Stand For
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Core Values
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-medium transition-shadow"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
     
    </div>
  );
};

export default About;
