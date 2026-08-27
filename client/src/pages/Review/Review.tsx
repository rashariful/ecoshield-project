'use client';

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAPI } from "@/lib/fetchAPI";
import { PageHeader } from "@/components/Common/PageHeader";

type Testimonial = {
  _id: string;
  name: string;
  designation: string;
  review: string;
  videoUrl?: string;
  thumbnail: string;
  isActive: boolean;
};

export default function Review() {
  const [mode, setMode] = useState<'image' | 'video'>('video');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const res = await fetchAPI<any>("/testimonial");

        const rawData: Testimonial[] = Array.isArray(res)
          ? res
          : res?.data || [];

        const activeFaqs = rawData.filter(
          faq => faq.isActive === true
        );

        setTestimonials(activeFaqs);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, []);


  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const id = url.includes("v=")
        ? url.split("v=")[1]?.split("&")[0]
        : url.split("/").pop();
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading testimonials...
      </div>
    );
  }

  if (!testimonials.length) return null;

  return (
    <>
    <PageHeader
            title="What Our Clients Say"
            subtitle="Trusted by families and businesses for reliable and eco-safe pest control services"
            backgroundImage="https://img.freepik.com/free-vector/star-emoji-framed-background_53876-89768.jpg"
          />
    <section className="py-24 mt-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Customer Testimonials
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Real feedback from real customers
          </p>
        </div>

        {/* Switcher */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setMode('video')}
            className={`px-7 py-3 rounded-full font-medium transition
              ${mode === 'video'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 border dark:border-gray-700'}
            `}
          >
            Video Reviews
          </button>
          
          <button
            onClick={() => setMode('image')}
            className={`px-7 py-3 rounded-full font-medium transition
              ${mode === 'image'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 border dark:border-gray-700'}
            `}
          >
            Image Reviews
          </button>

          
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(item => (
            <motion.div
              key={item._id}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border dark:border-gray-800"
            >
              {/* Media */}
              <div
                className="relative aspect-video cursor-pointer"
                onClick={() =>
                  mode === 'video' &&
                  item.videoUrl &&
                  setActiveVideo(item.videoUrl)
                }
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                {mode === 'video' && item.videoUrl && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                      <Play size={30} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  “{item.review}”
                </p>

                <h4 className="font-bold text-lg">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-500">
                  {item.designation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 z-10 bg-black/70 p-2 rounded-full"
              >
                <X className="text-white" />
              </button>

              <iframe
                src={getEmbedUrl(activeVideo)}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>
  );
}
