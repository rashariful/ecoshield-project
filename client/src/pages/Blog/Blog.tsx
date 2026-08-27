'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/fetchAPI";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/Common/PageHeader";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  shortDescrip?: string;
  thumbnail: string;
  category?: string;
  isActive?: boolean;
  createdAt: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const res = await fetchAPI<any>("/blog");
        const rawData: Blog[] = Array.isArray(res)
          ? res
          : res?.data || [];

        const activeFaqs = rawData.filter(
          faq => faq.isActive === true
        );

        setBlogs(activeFaqs);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, []);


  if (loading) return <div className="py-20 text-center">Loading blogs...</div>;
  if (!blogs.length) return <div className="py-20 text-center">No blogs found</div>;

  return (
    <>
 
<PageHeader
        title="Pest Control Insights & Tips"
        subtitle="Expert advice, prevention tips, and the latest updates from EcoShield Pest Control BD"
        backgroundImage="https://files.123freevectors.com/wp-content/original/148077-abstract-glowing-cool-blue-wave-background-design.jpg"
      />
      <section className="py-24 mt-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Blog</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Read the latest news and insights from our team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <Link to={`/blog/${blog.slug}`}>

            <motion.div
              key={blog._id}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border dark:border-gray-800 cursor-pointer"
              // onClick={() => navigate(`/blog/${blog.slug}`)}
            >
              <div className="relative aspect-video">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-sm text-primary capitalize font-semibold">
                  {blog.category || "General"}
                </span>
                <h3 className="text-xl font-bold my-2 capitalize">{blog.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-400 mt-3 line-clamp-3">
                  {blog.shortDescrip}
                </p>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
        </div>
      </section>

   
    </>
  );
}
