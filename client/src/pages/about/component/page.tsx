"use client";

import {
  Target,
  Eye,
  Users,
  Award,
  Shield,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Leaf,
  Handshake,
  Smile,
  Recycle,
  Search,
  Bug,
  Home,
  Building2,
  Briefcase,
  FlaskConical,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Trophy,
  ThumbsUp,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeamSection from "@/components/sections/Team";

// Static data for EcoShield Pest Control
const companyStats = [
  {
    value: "10+",
    label: "Years of Experience",
    icon: <Calendar className="w-8 h-8" />,
  },
  {
    value: "5000+",
    label: "Happy Customers",
    icon: <Users className="w-8 h-8" />,
  },
  {
    value: "50+",
    label: "Expert Technicians",
    icon: <Award className="w-8 h-8" />,
  },
  {
    value: "99%",
    label: "Success Rate",
    icon: <TrendingUp className="w-8 h-8" />,
  },
];

const services = [
  {
    icon: <Bug className="w-6 h-6" />,
    title: "General Pest Control",
    description: "Comprehensive treatment for common household pests",
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: "Termite Control",
    description: "Advanced termite detection and elimination",
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "Residential Services",
    description: "Safe pest control for your home and family",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Commercial Services",
    description: "Tailored solutions for businesses",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Preventive Maintenance",
    description: "Regular inspections and preventive treatments",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Eco-Friendly Solutions",
    description: "Environmentally responsible pest management",
  },
];

const coreValues = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Safety First",
    description:
      "Your safety and that of your environment is our top priority in every service we provide.",
    color: "bg-blue-600",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Environmental Responsibility",
    description:
      "We use eco-friendly products and methods that protect both people and the planet.",
    color: "bg-green-600",
  },
  {
    icon: <Handshake className="w-8 h-8" />,
    title: "Integrity & Transparency",
    description:
      "Honest pricing, clear communication, and reliable service you can trust.",
    color: "bg-purple-600",
  },
  {
    icon: <Smile className="w-8 h-8" />,
    title: "Customer Satisfaction",
    description:
      "We're not happy until you're completely satisfied with our service.",
    color: "bg-amber-600",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Prompt Service",
    description:
      "Quick response times and efficient service delivery for all pest emergencies.",
    color: "bg-red-600",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Professional Excellence",
    description:
      "Continuously trained experts using the latest pest control technologies.",
    color: "bg-indigo-600",
  },
  {
    icon: <Recycle className="w-8 h-8" />,
    title: "Sustainable Practices",
    description:
      "Committed to sustainable pest management that protects future generations.",
    color: "bg-teal-600",
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Thorough Inspection",
    description:
      "Comprehensive property assessments to identify and address all pest issues.",
    color: "bg-cyan-600",
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Md. Shahidul Islam",
    designation: "Founder & CEO",
    bio: "With over 15 years of experience in pest management, Shahidul leads our team with expertise and dedication to eco-friendly solutions.",
    specialties: ["Termite Specialist", "IPM Expert"],
    social: [
      { platform: "LinkedIn", link: "#" },
      { platform: "Email", link: "#" },
    ],
    message: "Our commitment is to provide pest-free environments while protecting our planet for future generations.",
  },
  {
    id: 2,
    name: "Fatema Begum",
    designation: "Operations Director",
    bio: "Fatema ensures seamless service delivery and maintains our high standards of quality and customer satisfaction.",
    specialties: ["Quality Control", "Customer Relations"],
    social: [
      { platform: "LinkedIn", link: "#" },
      { platform: "Email", link: "#" },
    ],
    message: "Every customer deserves the best service experience, from first call to final inspection.",
  },
  {
    id: 3,
    name: "Dr. Md. Kamal Hossain",
    designation: "Technical Advisor",
    bio: "PhD in Entomology, Dr. Kamal guides our technical approach and ensures we use the most effective and safe methods.",
    specialties: ["Entomology", "Research & Development"],
    social: [
      { platform: "LinkedIn", link: "#" },
      { platform: "Email", link: "#" },
    ],
  },
  {
    id: 4,
    name: "Rafiqul Islam",
    designation: "Training Manager",
    bio: "Rafiq leads our technician training programs, ensuring every team member is certified and up-to-date with latest methods.",
    specialties: ["Team Training", "Safety Protocols"],
    social: [
      { platform: "LinkedIn", link: "#" },
      { platform: "Email", link: "#" },
    ],
  },
];

const whyChooseUs = [
  {
    title: "Certified Experts",
    description: "All technicians are trained, certified, and experienced.",
    icon: <Award className="w-5 h-5 text-primary" />,
  },
  {
    title: "Eco-Friendly Products",
    description: "Safe for children, pets, and the environment.",
    icon: <Leaf className="w-5 h-5 text-primary" />,
  },
  {
    title: "Guaranteed Results",
    description: "We stand by our work with satisfaction guarantees.",
    icon: <ThumbsUp className="w-5 h-5 text-primary" />,
  },
  {
    title: "24/7 Emergency Service",
    description: "Round-the-clock support for urgent pest issues.",
    icon: <Clock className="w-5 h-5 text-primary" />,
  },
  {
    title: "Free Inspections",
    description: "Comprehensive property assessment at no cost.",
    icon: <Search className="w-5 h-5 text-primary" />,
  },
  {
    title: "Competitive Pricing",
    description: "Quality service at affordable, transparent rates.",
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Inspection",
    description: "Thorough property inspection to identify pest issues and entry points.",
  },
  {
    step: "02",
    title: "Analysis",
    description: "Detailed assessment of pest type, infestation level, and recommended solutions.",
  },
  {
    step: "03",
    title: "Treatment",
    description: "Application of targeted, eco-friendly treatments by certified technicians.",
  },
  {
    step: "04",
    title: "Prevention",
    description: "Recommendations and measures to prevent future infestations.",
  },
  {
    step: "05",
    title: "Follow-up",
    description: "Regular follow-ups to ensure long-term effectiveness and satisfaction.",
  },
];

const PageClient = (directorData) => {

  useEffect(() => {
    const scrollToSection = () => {
      const hash = window.location.hash;
      if (!hash) {
        window.scrollTo({ top: 0 });
        return;
      }

      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToSection();
    window.addEventListener("hashchange", scrollToSection);

    return () => window.removeEventListener("hashchange", scrollToSection);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Badge className="mb-6 px-4 py-2 bg-primary/20 text-primary border-primary/30">
            About Us
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Your Trusted Partner in{" "}
            <span className="text-primary">Pest Control</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
            EcoShield Pest Control BD was founded with a mission to provide
            safe, effective, and eco-friendly pest control solutions that
            protect your family, property, and the environment.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y-2 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="flex justify-center text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Background */}
      <section id="company-background" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              Our Story
            </Badge>
            <h2 className="text-4xl font-bold mb-6">Company Background</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Who We Are
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  EcoShield Pest Control BD was established with a clear vision:
                  to revolutionize the pest control industry in Bangladesh by
                  combining modern technology with environmentally responsible
                  practices.
                </p>
                <p>
                  Our team of certified experts brings years of experience and a
                  commitment to excellence in every service we provide. We
                  understand that pest problems can be stressful, which is why we
                  focus on delivering quick, effective, and lasting solutions.
                </p>
                <p>
                  From residential homes to large commercial establishments, we
                  have the expertise and equipment to handle any pest challenge
                  while maintaining our commitment to safety and sustainability.
                </p>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Our Philosophy
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We believe that effective pest control shouldn't come at the
                  expense of environmental health. That's why we've dedicated
                  ourselves to developing and using methods that are both highly
                  effective and environmentally responsible.
                </p>
                <p>
                  Every treatment plan is customized to your specific situation,
                  ensuring maximum effectiveness with minimal environmental
                  impact. We continuously research and adopt the latest
                  eco-friendly technologies and methods.
                </p>
                <p>
                  Our integrated pest management approach focuses on long-term
                  prevention rather than just temporary fixes, saving you time,
                  money, and peace of mind.
                </p>
              </div>
            </Card>
          </div>

          {/* Services Overview */}
          <Card className="p-8 mb-12 hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{service.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Why Choose Us */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Why Choose EcoShield?
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Our Service Process
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg mx-auto mb-3">
                    {step.step}
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission-vision" className="py-16 bg-muted/30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              Our Purpose
            </Badge>
            <h2 className="text-4xl font-bold mb-6">Mission & Vision</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="p-8 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                To deliver reliable, eco-friendly pest control services that
                protect health, property, and the environment. We are committed
                to using sustainable methods that ensure the safety of your
                family while effectively eliminating pest problems.
              </p>
            </Card>

            {/* Vision */}
            <Card className="p-8 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                To become the most trusted pest control brand in Bangladesh
                through innovation, sustainability, and excellence. We envision a
                future where every home and business can be protected from pests
                without compromising environmental health.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="core-values" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              What Drives Us
            </Badge>
            <h2 className="text-4xl font-bold mb-6">What We Stand For</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all hover:border-primary/20 group"
              >
                <div
                  className={`w-12 h-12 ${value.color} rounded-lg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}
                >
                  {value.icon}
                </div>
                <h3 className="font-bold mb-3 text-lg">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="board-of-directors" className="py-16 bg-muted/30 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              Our Team
            </Badge>
            <h2 className="text-4xl font-bold mb-6">Meet Our Experts</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Certified professionals dedicated to your safety and satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {directorData?.data?.map((member) => (
              <Card
                key={member._id}
                className="p-6 lg:p-8 hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Initials Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-2xl">
                      {/* {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")} */}
                        <img src={member.thumbnail} alt="" className="rounded shadow"/>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary font-semibold">
                        {member.designation}
                      </p>
                    </div>

                    <p className="text-muted-foreground mb-4 text-sm">
                      {member.bio}
                    </p>

                    {member.message && (
                      <div className="mb-4 p-4 bg-primary/5 rounded-lg border-l-4 border-primary italic">
                        <p className="text-sm text-muted-foreground">
                          "{member.message}"
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.specialties.map((s, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        {member.social.map((s, idx) => (
                          <a
                            key={idx}
                            href={s.link}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {s.platform}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section>
        <TeamSection/>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready for a Pest-Free Environment?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today for a free inspection and consultation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 h-12 px-8 font-semibold"
              >
                Schedule Free Inspection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary h-12 px-8 font-semibold"
              >
                Explore Our Services
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+88014055-55822</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>info@ecoshieldpestbd.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageClient;