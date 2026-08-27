import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchAPI } from "@/lib/fetchAPI";
import { Calendar, User, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  author?: string;
  publishedAt?: string;
  readingTime?: number;
  category?: string;
  isActive: boolean;
};

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetchAPI<any>("/blog");
        const rawData: BlogPost[] = Array.isArray(res) ? res : res?.data || [];
        const activeBlogs = rawData.filter(blog => blog.isActive === true);
        setBlogs(activeBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => 
      Math.min(blogs.length - itemsPerView, prev + 1)
    );
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading blogs...</div>
        </div>
      </section>
    );
  }

  if (!blogs.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Blogs</h2>
            <p className="text-gray-600">Tips, guides & news from our experts</p>
          </div>
          
          {/* Navigation */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext}
              disabled={currentIndex >= blogs.length - itemsPerView}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden" ref={sliderRef}>
          <motion.div 
            className="flex gap-6"
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {blogs.map((blog) => (
              <div
                key={blog._id}
                style={{ minWidth: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 24 / itemsPerView}px)` }}
              >
                <Link to={`/blog/${blog.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Image */}
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      {blog.thumbnail ? (
                        <img
                          src={blog.thumbnail}
                          alt={blog.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-4xl text-gray-400">
                            {blog.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        {blog.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </span>
                        )}
                        {blog.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.readingTime} min read
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      {blog.excerpt && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {blog.excerpt}
                        </p>
                      )}

                      {/* Author */}
                      {blog.author && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          <span>{blog.author}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        {blogs.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(blogs.length / itemsPerView) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * itemsPerView)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / itemsPerView) === idx
                    ? "w-8 bg-blue-600"
                    : "w-2 bg-gray-300 hover:bg-blue-400"
                }`}
              />
            ))}
          </div>
        )}

        {/* View All */}
        <div className="text-center mt-10">
          <Link to="/blog">
            <Button variant="outline" className="rounded-full px-8">
              View All Blogs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}