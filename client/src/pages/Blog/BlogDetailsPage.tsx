"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Tag,
  FolderOpen,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Clock,
  User,
  Eye,
  ChevronRight,
  Hash,
  BookOpen,
  TrendingUp,
  Sparkles,
  Share2,
  Linkedin, 
  MessageCircle,
  Heart,
  Bookmark,
  Newspaper,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import ServicesSection from "@/components/sections/ServicesSection";
import { Services } from "@/components/sections/Services";
import { fetchAPI } from "@/lib/fetchAPI";

import { AiFillTikTok } from "react-icons/ai";
// import { FaSquareThreads } from "react-icons/fa";

// Social array
const social = [
  {
    name: "facebook",
    url: "https://facebook.com/ECOSHIELDPESTBD",
    icon: Facebook,
  },
  {
    name: "instagram",
    url: "https://instagram.com/ecoshieldpestbd",
    icon: Instagram,
  },
  {
    name: "linkedin",
    url: "https://linkedin.com/in/ecoshield-pest-bd",
    icon: Linkedin,
  },
  {
    name: "threads",
    url: "https://www.threads.com/@ecoshieldpestbd",
    icon: AiFillTikTok,
  },
  {
    name: "twitter",
    url: "https://x.com/ecoshieldpestbd",
    icon: Twitter,
  },
  {
    name: "tiktok",
    url: "https://tiktok.com/@ecoshield.pest.bd",
    icon: AiFillTikTok,
  },
];

interface Blog {
  _id: string;
  title: string;
  shortDescrip: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  createdAt: string;
  slug: string;
  isActive: boolean;
  readTime?: number;
  views?: number;
  likes?: number;
}

const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<Blog[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [latestPosts, setLatestPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await fetchAPI(`/blog/${slug}`);
        const blogData = res?.data || res;

        if (blogData?.isActive) {
          setPost(blogData);

          // Load all blogs for related content
          const allBlogsRes = await fetchAPI(`/blog`);
          const allBlogs = Array.isArray(allBlogsRes)
            ? allBlogsRes
            : allBlogsRes?.data || [];

          // Filter active blogs
          const activeBlogs = allBlogs.filter((b: Blog) => b.isActive);

          // Related posts (same category, exclude current)
          const related = activeBlogs
            .filter(
              (b: Blog) =>
                b.category === blogData.category &&
                b.slug !== blogData.slug
            )
            .slice(0, 4);
          setRelatedPosts(related);

          // Category posts (for category section)
          const categoryRelated = activeBlogs
            .filter(
              (b: Blog) =>
                b.category === blogData.category &&
                b.slug !== blogData.slug
            )
            .slice(0, 3);
          setCategoryPosts(categoryRelated);

          // Latest posts (most recent, exclude current)
          const latest = activeBlogs
            .filter((b: Blog) => b.slug !== blogData.slug)
            .sort((a: Blog, b: Blog) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 5);
          setLatestPosts(latest);

          // Extract all unique tags
          const tags = activeBlogs
            .flatMap((b: Blog) => b.tags || [])
            .filter((tag, index, self) => self.indexOf(tag) === index)
            .slice(0, 15);
          setAllTags(tags);
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  // Calculate read time (assuming 200 words per minute)
  const calculateReadTime = (htmlContent: string): number => {
    const text = htmlContent?.replace(/<[^>]*>/g, '');
    const wordCount = text?.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <a href="/blog" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Back to Blog <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  const readTime = post.readTime || calculateReadTime(post.description);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO SECTION - Enhanced */}
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay - More dramatic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat opacity-20" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FolderOpen className="w-4 h-4" />
              {post.category}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
                  ES
                </div>
                <span>EcoShield Pest Control</span>
              </div>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readTime} min read
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT CONTENT */}
          <div className="lg:w-2/3">
            <div className="flex gap-6">
              {/* SOCIAL STICKY - Enhanced */}
              <div className="hidden lg:block">
                <div className="sticky top-24 flex flex-col items-center gap-4">

                <div className="flex items-center flex-col gap-3">
  {social.map((item) => {
    const Icon = item.icon;
    const colorClass =
      item.name === "facebook"
        ? "hover:text-blue-600"
        : item.name === "instagram"
        ? "hover:text-pink-600"
        : item.name === "linkedin"
        ? "hover:text-blue-700"
        : item.name === "threads"
        ? "hover:text-black"
        : item.name === "twitter"
        ? "hover:text-sky-600"
        : item.name === "tiktok"
        ? "hover:text-black"
        : "hover:text-gray-600";

    return (
      <a
        key={item.name}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 transition-all hover:-translate-y-1 ${colorClass}`}
        title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      >
        <Icon className="w-5 h-5" />
      </a>
    );
  })}
</div>
                  <div className="w-px h-16 bg-gradient-to-b from-gray-300 to-transparent" />
                  <span className="text-xs font-medium text-gray-400 rotate-90 whitespace-nowrap mt-4 tracking-wider">
                    SHARE
                  </span>
                </div>
              </div>

              {/* ARTICLE */}
              <div className="flex-1">
                {/* Author & Interaction Bar */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl">
                      ES
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        EcoShield Pest Control BD
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>Author</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>12+ Years Experience</span>
                      </div>
                    </div>
                  </div>

                  {/* Interaction Buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setLiked(!liked)}
                      className={`p-2 rounded-full transition-all ${liked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'}`}
                    >
                      <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`p-2 rounded-full transition-all ${bookmarked ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'}`}
                    >
                      <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* SHORT DESCRIPTION - Enhanced */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-8 border-l-4 border-blue-600">
                  <p className="text-lg text-gray-700 italic">
                    "{post.shortDescrip}"
                  </p>
                </div>

                {/* FULL DESCRIPTION */}
                <article
                  className="prose prose-lg max-w-none text-justify prose-headings:text-gray-900 prose-p:text-gray-600 prose-img:rounded-xl prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.description),
                  }}
                />

                {/* TAGS SECTION - Enhanced */}
                {/* <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Hash className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-800">Related Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag, index) => (
                      <a
                        key={index}
                        href={`/blog?tag=${tag}`}
                        className="group px-4 py-2 bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white rounded-full text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                      >
                        #{tag.trim()}
                      </a>
                    ))}
                  </div>
                </div> */}

                

                {/* MOBILE SHARE */}
                <div className="lg:hidden mt-8 pt-8 border-t border-gray-200">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <span className="text-sm font-medium text-gray-500">
      Share this article:
    </span>
    <div className="flex flex-wrap items-center gap-3">
      {social.map((item) => {
        const Icon = item.icon;
        const colorClass =
          item.name === "facebook"
            ? "hover:text-blue-600"
            : item.name === "instagram"
            ? "hover:text-pink-600"
            : item.name === "linkedin"
            ? "hover:text-blue-700"
            : item.name === "threads"
            ? "hover:text-black"
            : item.name === "twitter"
            ? "hover:text-sky-600"
            : item.name === "tiktok"
            ? "hover:text-black"
            : "hover:text-gray-600";

        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 transition-all hover:-translate-y-1 ${colorClass}`}
            title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
</div>


                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR - Enhanced Eye-catching UI */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              
              {/* READ TIME & STATS CARD */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Estimated Read Time</p>
                    <p className="text-2xl font-bold">{readTime} minutes</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <Eye className="w-4 h-4 mb-1" />
                    <p className="text-xs text-white/80">Views</p>
                    <p className="text-lg font-bold">{post.views || '1.2K'}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <Heart className="w-4 h-4 mb-1" />
                    <p className="text-xs text-white/80">Likes</p>
                    <p className="text-lg font-bold">{post.likes || 156}</p>
                  </div>
                </div>
              </div>
                   {/* LATEST POSTS SECTION - New Addition */}
              {latestPosts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Newspaper className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Latest Posts</h3>
                  </div>
                  <div className="space-y-4">
                    {latestPosts.map((post, index) => (
                      <a
                        key={post._id}
                        href={`/blog/${post.slug}`}
                        className="group block p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
                      >
                       <div className="relative aspect-video">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full   rounded object-cover"
                />
              </div>
                        <h4 className="font-semibold mt-4 text-gray-800 group-hover:text-blue-600 transition line-clamp-2 mb-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a 
                      href="/blog" 
                      className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition group"
                    >
                      View All Posts
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              )}


              {/* TABLE OF CONTENTS */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-800">Table of Contents</h3>
                </div>
                <ul className="space-y-2">
                  {['Introduction', 'Key Benefits', 'Our Approach', 'Why Choose Us', 'Conclusion'].map((item, idx) => (
                    <li key={idx}>
                      <a href={`#section-${idx}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition group">
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        <span className="text-sm">{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

         
              {/* RELATED POSTS - Enhanced */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-800">You May Also Like</h3>
                  </div>
                  <div className="space-y-4">
                    {relatedPosts.map((item) => (
                      <a
                        key={item._id}
                        href={`/blog/${item.slug}`}
                        className="group flex gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition line-clamp-2 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* CATEGORIES SECTION */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <FolderOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-800">Popular Categories</h3>
                </div>
                <div className="space-y-2">
                  {['Industrial Pest Control', 'Commercial', 'Residential', 'Termite Control', 'Mosquito Control'].map((cat, idx) => (
                    <a
                      key={idx}
                      href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <span className="text-gray-600 group-hover:text-blue-600">{cat}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {12 + idx}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* POPULAR TAGS CLOUD */}
              {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-800">Popular Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 12).map((tag, idx) => (
                    <a
                      key={idx}
                      href={`/blog?tag=${tag}`}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-lg text-xs font-medium transition-all hover:scale-105"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div> */}

              {/* NEWSLETTER - Enhanced */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Need Professional Pest Control?</h3>
                <p className="text-sm text-white/90 mb-4">
                  Get expert service with written guarantee in Gazipur. Free consultation available!
                </p>
                <div className="space-y-3">
                  <Link to="/contact">
                  <button className="w-full px-4 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2">
                    Contact EcoShield <ArrowRight className="w-4 h-4" />
                  </button>
                  </Link>
                  <p className="text-xs text-white/70 text-center">
                    ✓ 24/7 Support • ✓ Free Site Visit • ✓ Best Price
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <ServicesSection />
      <Services />
    </div>
  );
};

export default BlogDetailsPage;