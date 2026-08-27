'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { fetchAPI } from '@/lib/fetchAPI';
import { PageHeader } from '@/components/Common/PageHeader';

type PortfolioDetails = {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  projectStatus: string;
  slug: string;
  category?: {
    name: string;
  };
  images: string[];
};

export default function PortfolioDetailsPage() {
  const { slug } = useParams<{ slug: string }>();

  const [portfolio, setPortfolio] = useState<PortfolioDetails | null>(null);
  const [loading, setLoading] = useState(true);

 
  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const res = await fetchAPI<any>(`/portfolio/${slug}`);
       
        setPortfolio(res ?? null);
      } catch (error) {
        console.error('Failed to fetch Portfolio:', error);
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadPortfolio();
  }, [slug]);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Portfolio not found
      </div>
    );
  }

  return (
    <>
<PageHeader
        title="Comprehensive Pest Control Solutions"
        subtitle="From residential homes to commercial establishments, we offer a full range of eco-friendly pest control services tailored to your needs."
        backgroundImage="https://bpc.com.bd/wp-content/uploads/2025/11/household-maintenance.jpg"
      />
      {/* ================= HERO ================= */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
          >
            {/* Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={portfolio.images?.[0]}
                alt={portfolio.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div>
              {portfolio.category?.name && (
                <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                  {portfolio.category.name}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-bold mb-5">
                {portfolio.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {portfolio.subTitle}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
                  Status: {portfolio.projectStatus}
                </span>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
              >
                Get Similar Service
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= DESCRIPTION ================= */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Project Overview
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {portfolio.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      {portfolio.images?.length > 1 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Project Gallery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CTA ================= */}
      <section className="py-24 bg-primary text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Protect Your Space?
        </h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Get professional, eco-friendly pest control solutions tailored to your needs.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-semibold rounded-xl shadow-xl hover:scale-105 transition"
        >
          Contact Us Today
          <ArrowRight size={18} />
        </a>
      </section>

    
    </>
  );
}
