import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import axios from "axios";

const services = [
  "Residential Sanitizing",
  "Commercial Sanitizing",
  "Carpet Cleaning",
  "Office Cleaning",
  "Deep Cleaning",
  "Emergency Service",
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // from .env
      const res = await axios.post(`${API_BASE_URL}/contact`, formData);
      setSuccess("Thank you! Your request has been submitted.");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setError("Failed to submit. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-navy">
      <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Side - Contact Info + Google Map */}
        <div className="space-y-6 text-primary-foreground">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-primary" />
              <span>+88014055-55822</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <span>ecoshieldpestbd@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span>Middle Halishahr, Bandar, Chittagong, PO: 4100</span>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-primary" />
              <span>Mon–Fri 09:00–21:00, Sat–Sun 10:00–22:00</span>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.123456!2d91.811234!3d22.347890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd1e7b0f5a0cd%3A0x123456789abcdef!2sMiddle%20Halishahr%2C%20Chittagong!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ecoshield Pest Control Map"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {success && <p className="text-green-500 font-medium">{success}</p>}
            {error && <p className="text-red-500 font-medium">{error}</p>}

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-5 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-5 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-5 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a Service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message (Optional)"
              rows={4}
              className="w-full px-5 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? "Submitting..." : "Submit Request"}
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
