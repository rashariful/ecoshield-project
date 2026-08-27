'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchAPI } from '@/lib/fetchAPI';
import { PageHeader } from '@/components/Common/PageHeader';

type Portfolio = {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  slug: string;
  location: string;
  projectStatus: string;
 isActive: boolean;
  category?: {
    name: string;
  };
  images: string[];
};

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  /* ================= FETCH DATA ================= */
    useEffect(() => {
      const loadFaqs = async () => {
        try {
          const res = await fetchAPI<any>("/portfolio");
  
          const rawData: Portfolio[] = Array.isArray(res)
            ? res
            : res?.data || [];
  
          const activePortfolio = rawData.filter(
            portfolio => portfolio.isActive === true
          );
  
          setPortfolios(activePortfolio);
        } catch (error) {
          console.error("Failed to fetch Portfolio:", error);
          setPortfolios([]);
        } finally {
          setLoading(false);
        }
      };
  
      loadFaqs();
    }, []);
  

  /* ================= CATEGORY LIST ================= */
  const categories = useMemo(() => {
    const cats = portfolios
      .map(p => p.category?.name)
      .filter(Boolean) as string[];

    return ['All', ...Array.from(new Set(cats))];
  }, [portfolios]);

  /* ================= SEARCH → FILTER ================= */
  const filteredPortfolios = useMemo(() => {
    let data = portfolios;

    // Search first
    if (search.trim()) {
      data = data.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Then category filter
    if (activeCategory !== 'All') {
      data = data.filter(p => p.category?.name === activeCategory);
    }

    return data;
  }, [search, activeCategory, portfolios]);
  if (loading || !portfolios.length) return null;
  return (
    <>
     <PageHeader
        title="Our Work & Success Stories"
        subtitle="Real projects showcasing our expertise in pest control across Bangladesh"
        backgroundImage="https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg?semt=ais_hybrid&w=740&q=80"
      />

      <section className="py-24 mt-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Successful Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real projects delivered with eco-friendly, long-lasting pest control solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* ========== LEFT SIDE FILTER ========== */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Search */}
              <input
                type="text"
                placeholder="Search portfolio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              />

              {/* Categories */}
              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition
                        ${activeCategory === cat
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                      `}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* ========== RIGHT SIDE PORTFOLIOS ========== */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredPortfolios.map((p) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.images?.[0] || '/placeholder.jpg'}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-sm text-primary font-semibold">
                      {p.category?.name} • {p.location}
                    </span>

                    <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-primary transition">
                      <Link to={`/portfolio/${p.slug}`}>
                        {p.title}
                      </Link>
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {p.description}
                    </p>

                    <Link
                      to={`/portfolio/${p.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-medium"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}

              {!filteredPortfolios.length && (
                <p className="col-span-full text-center text-muted-foreground">
                  No portfolio found
                </p>
              )}

            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}
