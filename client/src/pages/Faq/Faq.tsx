// components/AdvancedFAQ.tsx
'use client';
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from 'react';
import { 
  Search, ChevronDown, ChevronUp, Copy, 
  ThumbsUp, ThumbsDown, Sparkles, MessageCircleQuestion, Loader2, 
  Check
} from 'lucide-react';
import { PageHeader } from "@/components/Common/PageHeader";
import { fetchAPI } from "@/lib/fetchAPI";
import ServiceArea from "../ServiceArea/ServiceArea";


type FAQItem = {
  _id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type FAQItemWithRelated = FAQItem & {
  related?: string[]; // Optional for related questions functionality
};

const PRIMARY = 'indigo';

export default function AdvancedFAQ() {
  const [faqs, setFaqs] = useState<FAQItemWithRelated[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [helpful, setHelpful] = useState<Record<string, 'yes' | 'no' | null>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch FAQs from backend
  useEffect(() => {
    const loadFaqs = async () => {
      try {
        setLoading(true);
        const res = await fetchAPI<any>("/faq");
        
        // Handle different response formats
        const rawData: FAQItem[] = Array.isArray(res) 
          ? res 
          : res?.data || [];
        
        // Filter only active FAQs
        const activeFaqs = rawData.filter(faq => faq.isActive === true);
        
        // Transform to include related questions (you can implement logic here)
        // For now, just use as is
        setFaqs(activeFaqs);
        
        // Set first category as active if available
        if (activeFaqs.length > 0) {
          const categories = Array.from(new Set(activeFaqs.map(faq => faq.category)));
          setActiveCategory(categories[0]);
          // Open first item by default
          if (activeFaqs.length > 0) {
            setOpenItems(new Set([activeFaqs[0]._id]));
          }
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && e.target !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Get unique categories from fetched FAQs
  const categories = Array.from(new Set(faqs.map(item => item.category)));

  // Filter FAQs based on search or category
  const filteredFAQs = faqs.filter(item => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term)
      );
    }
    return item.category === activeCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const copyAnswer = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleHelpful = (id: string, type: 'yes' | 'no') => {
    setHelpful(prev => ({
      ...prev,
      [id]: prev[id] === type ? null : type
    }));
    
    // Here you could send feedback to backend
    console.log(`FAQ ${id} marked as ${type}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <PageHeader
          title="Frequently Asked Questions"
          subtitle="Loading our comprehensive FAQ database..."
          backgroundImage="https://www.shutterstock.com/image-illustration/white-question-mark-on-dark-260nw-2104087481.jpg"
        />
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Quick answers to the questions we get asked most often"
        backgroundImage="https://www.shutterstock.com/image-illustration/white-question-mark-on-dark-260nw-2104087481.jpg"
      />
      
      <main className="pt-16 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Header Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3 mt-24">
              FAQ
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Got Questions? We've Got Answers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Search our comprehensive FAQ database or browse by category
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative max-w-3xl mx-auto mb-12">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search size={22} className="text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search questions... (press / anywhere to focus)"
              className={`w-full pl-14 pr-5 py-5 bg-white/80 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-${PRIMARY}-500/40 shadow-lg backdrop-blur-sm text-lg transition-all`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Categories - Only show when not searching */}
          {!searchTerm && categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenItems(new Set()); // Close all when changing category
                  }}
                  className={`
                    px-7 py-3 rounded-full text-base font-medium tracking-tight transition-all duration-300
                    ${activeCategory === cat 
                      ? `bg-primary text-white shadow-lg scale-105` 
                      : `bg-white dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-700`}
                  `}
                >
                  {cat} ({faqs.filter(f => f.category === cat).length})
                </button>
              ))}
            </div>
          )}

          {/* Results count */}
          {filteredFAQs.length > 0 && (
            <div className="text-sm text-gray-500 mb-4">
              Showing {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'}
            </div>
          )}

          {/* Questions */}
          <div className="space-y-5">
            {filteredFAQs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <MessageCircleQuestion size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-6" />
                <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  No matching questions found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try different keywords or browse all categories
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory(categories[0] || '');
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View all FAQs
                </button>
              </motion.div>
            ) : (
              filteredFAQs.map((item, index) => {
                const isOpen = openItems.has(item._id);
                
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      rounded-2xl border overflow-hidden transition-all duration-300
                      ${isOpen 
                        ? `border-${PRIMARY}-500/50 bg-white dark:bg-gray-900/80 shadow-xl` 
                        : `border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-700`}
                    `}
                  >
                    <button
                      onClick={() => toggleItem(item._id)}
                      className="w-full px-7 py-6 flex items-center justify-between text-left group"
                    >
                      <span className={`text-xl md:text-2xl font-medium text-gray-900 dark:text-white transition-colors group-hover:text-${PRIMARY}-700 dark:group-hover:text-${PRIMARY}-300 pr-10`}>
                        {item.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className={`flex-shrink-0 w-7 h-7 text-${PRIMARY}-600 dark:text-${PRIMARY}-400 transition-transform`} />
                      ) : (
                        <ChevronDown className="flex-shrink-0 w-7 h-7 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-transform" />
                      )}
                    </button>

                    <div
                      className={`
                        transition-all duration-500 ease-in-out overflow-hidden
                        ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      <div className="px-7 pb-8 pt-2 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-200">
                        {/* Answer */}
                        <div className="text-base leading-relaxed">
                          {item.answer.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4">
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {/* Metadata */}
                        <div className="mt-4 text-xs text-gray-400">
                          Last updated: {new Date(item.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>

                        {/* Helpful + Copy */}
                        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                          <button
                            onClick={() => copyAnswer(item.answer, item._id)}
                            className={`flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-${PRIMARY}-600 dark:text-gray-400 dark:hover:text-${PRIMARY}-400 transition-colors`}
                          >
                            {copiedId === item._id ? (
                              <>
                                <Check size={18} className="text-green-500" />
                                <span className="text-green-500">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={18} />
                                <span>Copy answer</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-4 sm:ml-auto">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Was this helpful?</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleHelpful(item._id, 'yes')}
                                className={`p-2 rounded-lg transition-colors ${
                                  helpful[item._id] === 'yes' 
                                    ? 'bg-green-100 dark:bg-green-900/40 text-green-600' 
                                    : 'hover:bg-green-50 dark:hover:bg-green-950/30 text-gray-500'
                                }`}
                              >
                                <ThumbsUp size={18} />
                              </button>
                              <button 
                                onClick={() => handleHelpful(item._id, 'no')}
                                className={`p-2 rounded-lg transition-colors ${
                                  helpful[item._id] === 'no' 
                                    ? 'bg-red-100 dark:bg-red-900/40 text-red-600' 
                                    : 'hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-500'
                                }`}
                              >
                                <ThumbsDown size={18} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Category tag */}
                        <div className="mt-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          <ServiceArea/>

          {/* Final CTA */}
          {faqs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-20 text-center"
            >
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Still have questions? We're here to help!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:bg-primary/90 transition-all transform hover:-translate-y-1"
              >
                <MessageCircleQuestion size={22} />
                Contact us now →
              </a>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}