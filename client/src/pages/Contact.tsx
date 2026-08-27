import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import axios from "axios";
import { PageHeader } from "@/components/Common/PageHeader";
import { useRef } from "react";
const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+88014055-55822",
    href: "tel:+8801405555822",
  },
  {
    icon: Mail,
    title: "Email",
    content: "ecoshieldpestbd@gmail.com",
    href: "mailto:ecoshieldpestbd@gmail.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Middle Halishahr, Bandar, Chittagong, PO: 4100",
    href: "#",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon–Fri: 09:00–21:00, Sat–Sun: 10:00–22:00",
    href: "#",
  },
];

const services = [
  "Residential Pest Control",
  "Commercial Pest Control",
  "Termite Control",
  "Mosquito Control",
  "Rodent Control",
  "Bed Bug Treatment",
  "Disinfection & Sanitization",
  "Cockroach Control",
  "Other",
];

const Contact = () => {
  const dateTimeRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    dateTime: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      await axios.post(`${API_BASE_URL}/contact`, formData);

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        dateTime: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Get in Touch with EcoShield"
        subtitle="Contact us today for expert pest control solutions and a free consultation"
        backgroundImage="https://img.freepik.com/free-photo/young-woman-working-office-with-laptop-headphones-white-wall-customer-service-call-center_231208-8601.jpg?semt=ais_hybrid&w=740&q=80"
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
                Contact Us
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Have questions or need service? We are here to help. Reach out
                to us and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Ready to protect your home or business from pests? Get in
                  touch with our team for a free consultation and quote.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {contactInfo.map((info, idx) => (
                    <motion.a
                      key={idx}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:shadow-soft transition-shadow"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-foreground mb-1">
                          {info.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {info.content}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Google Map */}
                <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.123456!2d91.811234!3d22.347890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd1e7b0f5a0cd%3A0x123456789abcdef!2sMiddle%20Halishahr%2C%20Chittagong!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    className="border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ecoshield Map"
                  />
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Your message has been received. We'll get back to you
                        within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                        Send us a Message
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                          <Input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <div className="grid sm:grid-cols-2 gap-4">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select a service</option>
                            {services.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                          {/* <Input
                            type="datetime-local"
                            name="dateTime"
                            value={formData.dateTime}
                            onChange={handleChange}
                            required
                          /> */}
                          <Input
                            ref={dateTimeRef}
                            type="datetime-local"
                            name="dateTime"
                            value={formData.dateTime}
                            onChange={handleChange}
                            required
                            onClick={() => dateTimeRef.current?.showPicker()}
                          />
                        </div>
                        <Textarea
                          name="message"
                          placeholder="Tell us about your pest problem..."
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          required
                        />
                        <Button
                          type="submit"
                          variant="hero"
                          size="lg"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="w-5 h-5" /> Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
