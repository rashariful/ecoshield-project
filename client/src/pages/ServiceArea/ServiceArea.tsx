'use client';
import { fetchAPI } from "@/lib/fetchAPI";
import { motion } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";


interface ServiceAreaType {
  _id: string;
  name: string;
  isActive: boolean;
  priority: number;
}

function ServiceArea() {
  const [areas, setAreas] = useState<ServiceAreaType[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadAreas = async () => {
    try {
      const res = await fetchAPI<any>("/area"); // fetch from your backend

      // Check if response is array or wrapped inside data
      const rawData: ServiceAreaType[] = Array.isArray(res)
        ? res
        : res?.data || [];

      // Only active areas and sort by priority (lower = higher)
      const activeAreas = rawData
        .filter(area => area.isActive)
        .sort((a, b) => a.priority - b.priority);

      setAreas(activeAreas);
    } catch (error) {
      console.error("Failed to fetch service areas:", error);
      setAreas([]);
    } finally {
      setLoading(false);
    }
  };

  loadAreas();
}, []);

  if (loading) return <div className="py-20 text-center">Loading service areas...</div>;
  if (!areas.length) return <div className="py-20 text-center">No service areas found</div>;

  return (
    <>
      <main className="py-24 mt-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <section className="">
          <div className="container mx-auto px-4 space-y-12">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Service Areas
              </h1>
              <p className="text-muted-foreground text-lg">
                We proudly provide services across multiple cities in Bangladesh. 
                Check below if your area is covered, or contact us for any other location inquiries.
              </p>
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative max-w-5xl mx-auto"
            >
              <div className="w-full h-96 sm:h-80 md:h-96 lg:h-80 rounded-3xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.123456!2d90.412345!3d23.810345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e7b0f5a0cd%3A0x123456789abcdef!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Service Areas Map"
                />
              </div>
            </motion.div>

            {/* Areas List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {areas.map((area, index) => (
                <motion.div
                  key={area._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    area.priority === 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  <CheckCircle
                    className={`w-5 h-5 ${area.priority === 1 ? "" : "text-primary"}`}
                  />
                  <span className="font-medium capitalize">{area.name}</span>
                </motion.div>
              ))}
            </motion.div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              * And surrounding areas not listed above. Contact us for availability.
            </p>
          </div>
        </section>
      </main>
    
    </>
  );
}

export default ServiceArea;
