import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Building,
  Sparkles,
  Mail,
} from "lucide-react";
import { PageHeader } from "@/components/Common/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchAPI } from "@/lib/fetchAPI";
import DOMPurify from "dompurify";

// ─── Skeleton ────────────────────────────────────────────────────────────────

const SkeletonText = ({
  width = "w-full",
  height = "h-4",
  className = "",
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${width} ${height} ${className}`}
  />
);

const SkeletonButton = () => (
  <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
);

const ServiceDetailsSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
    <section className="relative pt-16 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <SkeletonText width="w-3/4" height="h-12" />
            <SkeletonText width="w-full" height="h-6" />
            <SkeletonText width="w-2/3" height="h-6" />
            <div className="flex flex-wrap gap-4 pt-4">
              <SkeletonButton />
              <SkeletonButton />
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-[4/3] bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
      </div>
    </section>
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-3 gap-10 xl:gap-12">
        <div className="lg:col-span-2 space-y-16">
          <section>
            <SkeletonText width="w-64" height="h-8" className="mb-8" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonText key={i} />
              ))}
            </div>
          </section>
          <section className="bg-muted/30 rounded-2xl p-8">
            <SkeletonText width="w-80" height="h-8" className="mx-auto mb-8" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b py-4">
                  <SkeletonText width="w-3/4" height="h-6" />
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-8">
          <div className="bg-muted/40 rounded-xl p-6 border border-border/60">
            <SkeletonText width="w-40" height="h-6" className="mb-6" />
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="rounded-lg overflow-hidden mb-3 aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <SkeletonText width="w-full" height="h-4" className="mb-2" />
                  <SkeletonText width="w-3/4" height="h-3" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-8 text-center h-64 animate-pulse" />
        </aside>
      </div>
    </div>
  </div>
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

interface Service {
  _id: string;
  title: string;
  subTitle?: string;
  shortDescription?: string;
  longDescription?: string;
  slug: string;
  thumbnail?: string;
  parentService: string | null;
  isActive: boolean;
  faqs: FAQ[];
  videoUrl?: string;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  shortDescrip: string;
  date?: string;
  isActive: boolean;
}

interface Team {
  _id: string;
  name: string;
  designation: string;
  thumbnail: string;
  bio?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
}

// ─── useWindowSize hook (SSR-safe) ────────────────────────────────────────────

function useWindowSize() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

// ─── Component ────────────────────────────────────────────────────────────────

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const windowWidth = useWindowSize();

  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [team, setTeam] = useState<Team[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  // ── Visible cards based on real window width ──────────────────────────────
  const visibleCards = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;
  const cardWidthPercent = 100 / visibleCards;

  // ── Fetch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const loadAllData = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);

      try {
        const [serviceRes, teamRes, blogsRes] = await Promise.allSettled([
          fetchAPI<any>(`/services/${slug}`),
          fetchAPI<any>("/teams"),
          fetchAPI<any>("/blog"),
        ]);

        if (serviceRes.status === "fulfilled") {
          const currentService =
            serviceRes.value?.data || serviceRes.value || null;

          if (currentService) {
            setService(currentService);
            try {
              const allRes = await fetchAPI<any>("/services?limit=100");
              const allServices: Service[] =
                allRes?.data || (Array.isArray(allRes) ? allRes : []);
              setRelatedServices(
                allServices
                  .filter((s) => s._id !== currentService._id && s.isActive)
                  .slice(0, 6)
              );
            } catch {
              setRelatedServices([]);
            }
          } else {
            setError("Service not found");
          }
        } else {
          setError("Failed to load service details. Please try again.");
        }

        if (teamRes.status === "fulfilled") {
          const raw: any[] = Array.isArray(teamRes.value)
            ? teamRes.value
            : teamRes.value?.data || [];
          setTeam(raw.filter((m) => m.isActive === true));
        }

        if (blogsRes.status === "fulfilled") {
          const raw: any[] = Array.isArray(blogsRes.value)
            ? blogsRes.value
            : blogsRes.value?.data || [];
          setBlogs(raw.filter((b) => b.isActive === true));
        }
      } catch {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    loadAllData();
  }, [slug]);

  // Reset slider when slug changes
  useEffect(() => {
    setSliderIndex(0);
  }, [slug]);

  const nextSlide = useCallback(() => {
    if (sliderIndex < relatedServices.length - visibleCards) {
      setSliderIndex((p) => p + 1);
    }
  }, [sliderIndex, relatedServices.length, visibleCards]);

  const prevSlide = useCallback(() => {
    if (sliderIndex > 0) setSliderIndex((p) => p - 1);
  }, [sliderIndex]);

  // ── Guards ────────────────────────────────────────────────────────────────

  if (initialLoad || loading) return <ServiceDetailsSkeleton />;

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
        <PageHeader title="Service Not Found" subtitle="" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-4 mb-6">
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-md">
            {error ||
              "The service you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex gap-4">
            <Link to="/services">
              <Button size="lg">Browse All Services</Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasVideo = !!service.videoUrl;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    // FIX 1: removed outer <section> wrapper, overflow-x-hidden on root
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="px-4 py-2 bg-primary/10 text-primary border-primary/20">
                Professional Service
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {service.subTitle ||
                  "Safe, effective & eco-friendly pest solutions for your home and business"}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                  <Button size="lg" className="h-12 px-8">
                    Book Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:+88014055-55822">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    <Phone className="mr-2 h-5 w-5" /> Call Now
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-[4/3]">
              {service.thumbnail ? (
                <img
                  src={service.thumbnail}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                    (img.nextElementSibling as HTMLElement)?.classList.remove(
                      "hidden"
                    );
                  }}
                />
              ) : null}
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center hidden">
                <span className="text-9xl font-black text-primary/20">
                  {service.title.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      {/* FIX 2: w-full + overflow-x-hidden on wrapper */}
      <div className="w-full">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10 xl:gap-12">

            {/* Left/Center column */}
            <div className="lg:col-span-2 space-y-16 md:space-y-20 min-w-0">

              {/* Video */}
              {hasVideo && (
                <section>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
                    Watch Our Process
                  </h2>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50">
                    <iframe
                      src={service.videoUrl!.replace(
                        "youtu.be",
                        "youtube.com/embed"
                      )}
                      title={service.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </section>
              )}

              {/* Description */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  About {service.title}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      service.longDescription || service.shortDescription || ""
                    ),
                  }}
                  className="prose prose-lg max-w-none dark:prose-invert"
                />
              </section>

              {/* FAQs */}
              {service.faqs?.length > 0 && (
                <section className="bg-muted/30 rounded-2xl p-8 md:p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.faqs.map((faq, i) => (
                      <AccordionItem
                        key={faq._id}
                        value={`faq-${i}`}
                        className="border-b last:border-0 py-2"
                      >
                        <AccordionTrigger className="text-left font-medium text-lg">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}

              {/* Related Services Slider */}
              {relatedServices.length > 0 && (
                // FIX 3: removed nested container + extra px, use w-full
                <section className="py-16 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50 rounded-2xl">
                  <div className="px-4 sm:px-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
                      <div>
                        <Badge
                          variant="outline"
                          className="mb-4 px-4 py-2 bg-primary/5 border-primary/20 text-primary font-medium inline-flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          You May Also Need
                        </Badge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                          Related{" "}
                          <span className="text-primary">Services</span>
                        </h2>
                        <p className="text-muted-foreground mt-3 max-w-2xl">
                          Explore our other professional pest control services
                        </p>
                      </div>
                      <div className="hidden sm:flex gap-3 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={prevSlide}
                          disabled={sliderIndex === 0}
                          className="rounded-full h-12 w-12 border-2 hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={nextSlide}
                          disabled={
                            sliderIndex >= relatedServices.length - visibleCards
                          }
                          className="rounded-full h-12 w-12 border-2 hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* FIX 4: slider overflow hidden strictly contained */}
                    <div className="overflow-hidden w-full">
                      <motion.div
                        className="flex"
                        animate={{
                          x: `-${sliderIndex * cardWidthPercent}%`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        {relatedServices.map((item, index) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            // FIX 5: flex-shrink-0 + exact width, no window.innerWidth calls
                            style={{
                              minWidth: `${cardWidthPercent}%`,
                              flexShrink: 0,
                            }}
                            className="px-2"
                          >
                            <Link to={`/services/${item.slug}`}>
                              <Card className="group relative overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                                <div className="relative h-56 overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  {item.thumbnail ? (
                                    <img
                                      src={item.thumbnail}
                                      alt={item.title}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                      <span className="text-8xl font-bold text-primary/20">
                                        {item.title.charAt(0)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="p-6">
                                  <h3 className="font-serif text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {item.title}
                                  </h3>
                                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                                    {item.subTitle ||
                                      "Professional pest control service with certified experts"}
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-primary hover:text-primary-foreground hover:bg-primary group/btn"
                                  >
                                    <span className="text-sm">Details</span>
                                    <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                  </Button>
                                </div>
                              </Card>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Dots */}
                    {relatedServices.length > visibleCards && (
                      <div className="flex justify-center gap-3 mt-10">
                        {Array.from({
                          length: Math.ceil(
                            relatedServices.length / visibleCards
                          ),
                        }).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSliderIndex(idx * visibleCards)}
                            className={`h-2 rounded-full transition-all ${
                              Math.floor(sliderIndex / visibleCards) === idx
                                ? "w-8 bg-primary"
                                : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-primary/50"
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="text-center mt-12">
                      <Link to="/services">
                        <Button
                          size="lg"
                          variant="outline"
                          className="rounded-full px-8 h-12 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group"
                        >
                          <span>View All Services</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </section>
              )}

              {/* Team */}
              {team.length > 0 && (
                <section className="bg-gradient-to-br from-primary/5 to-background rounded-2xl p-8 md:p-12">
                  <div className="text-center my-6">
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      Meet Our Experts
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                      The passionate people who make the magic happen every day
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.map((member, index) => (
                      <motion.div
                        key={member._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                          <img
                            src={member.thumbnail}
                            alt={member.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder-team.jpg";
                            }}
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold mb-1">
                            {member.name}
                          </h3>
                          <p className="text-sm text-blue-600 mb-3">
                            {member.designation}
                          </p>
                          {member.bio && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                              {member.bio}
                            </p>
                          )}
                          <div className="space-y-1 text-sm">
                            {member.phone && (
                              <a
                                href={`tel:${member.phone}`}
                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                              >
                                <Phone className="w-3 h-3" />
                                {member.phone}
                              </a>
                            )}
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                              >
                                <Mail className="w-3 h-3" />
                                {member.email}
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── Right Sidebar ─────────────────────────────────────────── */}
            {/* FIX 6: min-w-0 prevents sidebar from pushing layout */}
            <aside className="space-y-8 lg:sticky lg:top-8 lg:h-fit min-w-0">
              {blogs.length > 0 && (
                <div className="bg-muted/40 rounded-xl p-6 border border-border/60">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Building className="h-6 w-6 text-primary" /> Recent
                    Articles
                  </h3>
                  <div className="space-y-8">
                    {blogs.slice(0, 3).map((blog, idx) => (
                      <Link
                        key={blog._id || idx}
                        to={`/blog/${blog.slug}`}
                        className="group block"
                      >
                        <div className="rounded-lg overflow-hidden mb-3 aspect-video">
                          <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder-blog.jpg";
                            }}
                          />
                        </div>
                        <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {blog.shortDescrip}
                        </p>
                        {blog.date && (
                          <div className="text-xs text-muted-foreground">
                            {blog.date}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Link to="/blog">
                      <Button variant="outline" className="w-full sm:w-auto">
                        View All Articles{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <Card className="bg-primary text-primary-foreground p-8 text-center rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Need Help Fast?</h3>
                <p className="mb-6 opacity-90">
                  Our team is ready 24/7 for emergency pest issues
                </p>
                <a href="tel:+88014055-55822">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full h-14 text-lg"
                  >
                    <Phone className="mr-3 h-6 w-6" /> Call Now
                  </Button>
                </a>
              </Card>
            </aside>
          </div>
        </div>
      </div>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="mt-20 py-20 px-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make Your Space Pest-Free?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Get expert {service.title.toLowerCase()} service today with free
            consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg">
                Book Service <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <a href="tel:+88014055-55822">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-lg border-white hover:bg-white hover:text-primary text-white"
              >
                <Phone className="mr-3 h-6 w-6" /> Call +880 14055-55822
              </Button>
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm opacity-90">
            <Calendar className="h-5 w-5" /> Free consultation • Quick response
            • 100% Satisfaction
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;

// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   Loader2,
//   ArrowRight,
//   Phone,
//   Calendar,
//   Shield,
//   Clock,
//   CheckCircle,
//   Star,
//   Users,
//   Award,
//   Play,
//   ChevronLeft,
//   ChevronRight,
//   User,
//   Building,
//   MapPin,
//   Sparkles,
//   Mail,
// } from "lucide-react";
// import { PageHeader } from "@/components/Common/PageHeader";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { fetchAPI } from "@/lib/fetchAPI";
// import DOMPurify from "dompurify";

// // Skeleton Components
// const SkeletonText = ({ width = "w-full", height = "h-4", className = "" }) => (
//   <div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${width} ${height} ${className}`} />
// );

// const SkeletonButton = () => (
//   <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
// );

// const ServiceDetailsSkeleton = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
//       {/* Hero Section Skeleton */}
//       <section className="relative pt-16 pb-20 px-4">
//         <div className="container mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-6">
//               <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
//               <SkeletonText width="w-3/4" height="h-12" />
//               <SkeletonText width="w-full" height="h-6" />
//               <SkeletonText width="w-2/3" height="h-6" />
//               <div className="flex flex-wrap gap-4 pt-4">
//                 <SkeletonButton />
//                 <SkeletonButton />
//               </div>
//             </div>
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-[4/3] bg-gray-200 dark:bg-gray-700 animate-pulse" />
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-4">
//         <div className="grid lg:grid-cols-3 gap-10 xl:gap-12">
//           <div className="lg:col-span-2 space-y-16 md:space-y-20">
//             {/* Description Skeleton */}
//             <section>
//               <SkeletonText width="w-64" height="h-8" className="mb-8" />
//               <div className="space-y-4">
//                 <SkeletonText width="w-full" height="h-4" />
//                 <SkeletonText width="w-11/12" height="h-4" />
//                 <SkeletonText width="w-full" height="h-4" />
//                 <SkeletonText width="w-10/12" height="h-4" />
//                 <SkeletonText width="w-full" height="h-4" />
//               </div>
//             </section>

//             {/* FAQs Skeleton */}
//             <section className="bg-muted/30 rounded-2xl p-8 md:p-10">
//               <SkeletonText width="w-80" height="h-8" className="mx-auto mb-8" />
//               <div className="space-y-4">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="border-b py-4">
//                     <SkeletonText width="w-3/4" height="h-6" />
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           {/* Sidebar Skeleton */}
//           <aside className="space-y-8">
//             <div className="bg-muted/40 rounded-xl p-6 border border-border/60">
//               <SkeletonText width="w-40" height="h-6" className="mb-6" />
//               <div className="space-y-8">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i}>
//                     <div className="rounded-lg overflow-hidden mb-3 aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />
//                     <SkeletonText width="w-full" height="h-4" className="mb-2" />
//                     <SkeletonText width="w-3/4" height="h-3" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-8 text-center h-64 animate-pulse" />
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface FAQ {
//   _id: string;
//   question: string;
//   answer: string;
// }

// interface Service {
//   _id: string;
//   title: string;
//   subTitle?: string;
//   shortDescription?: string;
//   longDescription?: string;
//   slug: string;
//   thumbnail?: string;
//   parentService: string | null;
//   isActive: boolean;
//   faqs: FAQ[];
//   videoUrl?: string;
//   orderNumber: number;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Blog {
//   _id: string;
//   title: string;
//   slug: string;
//   thumbnail: string;
//   shortDescrip: string;
//   date?: string;
//   isActive: boolean;
// }

// interface Team {
//   _id: string;
//   name: string;
//   designation: string;
//   thumbnail: string;
//   bio?: string;
//   phone?: string;
//   email?: string;
//   isActive: boolean;
// }

// const ServiceDetails = () => {
//   const { slug } = useParams<{ slug: string }>();
//   const [service, setService] = useState<Service | null>(null);
//   const [relatedServices, setRelatedServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [sliderIndex, setSliderIndex] = useState(0);
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [team, setTeam] = useState<Team[]>([]);
//   const [initialLoad, setInitialLoad] = useState(true);

//   // Fetch all data in parallel
//   useEffect(() => {
//     const loadAllData = async () => {
//       if (!slug) return;
      
//       setLoading(true);
//       setError(null);
      
//       try {
//         // Fetch service, team, and blogs in parallel
//         const [serviceRes, teamRes, blogsRes] = await Promise.allSettled([
//           fetchAPI<any>(`/services/${slug}`),
//           fetchAPI<any>("/teams"),
//           fetchAPI<any>("/blog")
//         ]);

//         // Handle Service Data
//         if (serviceRes.status === 'fulfilled') {
//           const currentService = serviceRes.value?.data || serviceRes.value || null;
          
//           if (currentService) {
//             setService(currentService);
            
//             // Fetch related services only after we have the current service
//             try {
//               const allRes = await fetchAPI<any>("/services?limit=100");
//               const allServices: Service[] = allRes?.data || (Array.isArray(allRes) ? allRes : []);
//               const related = allServices
//                 .filter((s) => s._id !== currentService._id && s.isActive)
//                 .slice(0, 6);
//               setRelatedServices(related);
//             } catch (err) {
//               console.error("Failed to fetch related services:", err);
//               setRelatedServices([]);
//             }
//           } else {
//             setError("Service not found");
//             setService(null);
//           }
//         } else {
//           console.error("Failed to fetch service:", serviceRes.reason);
//           setError("Failed to load service details. Please try again.");
//           setService(null);
//         }

//         // Handle Team Data
//         if (teamRes.status === 'fulfilled') {
//           const rawData: any[] = Array.isArray(teamRes.value) ? teamRes.value : teamRes.value?.data || [];
//           const activeTeam = rawData.filter((member) => member.isActive === true);
//           setTeam(activeTeam);
//         } else {
//           console.error("Failed to fetch team:", teamRes.reason);
//           setTeam([]);
//         }

//         // Handle Blogs Data
//         if (blogsRes.status === 'fulfilled') {
//           const rawData: any[] = Array.isArray(blogsRes.value) ? blogsRes.value : blogsRes.value?.data || [];
//           const activeBlogs = rawData.filter((blog) => blog.isActive === true);
//           setBlogs(activeBlogs);
//         } else {
//           console.error("Failed to fetch blogs:", blogsRes.reason);
//           setBlogs([]);
//         }
//       } catch (err) {
//         console.error("Unexpected error:", err);
//         setError("An unexpected error occurred. Please try again.");
//       } finally {
//         setLoading(false);
//         setInitialLoad(false);
//       }
//     };

//     loadAllData();
//   }, [slug]);

//   const formatDescription = (text?: string) => {
//     if (!text) return [];
//     return text
//       .split(/[""]/)
//       .map((p) => p.trim())
//       .filter((p) => p.length > 0 && !p.toLowerCase().includes("creating"));
//   };

//   const nextSlide = () => {
//     const visible = getVisibleCards();
//     if (sliderIndex < relatedServices.length - visible) {
//       setSliderIndex((prev) => prev + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (sliderIndex > 0) {
//       setSliderIndex((prev) => prev - 1);
//     }
//   };

//   const getVisibleCards = () => {
//     if (typeof window === "undefined") return 3;
//     if (window.innerWidth < 640) return 1;
//     if (window.innerWidth < 1024) return 2;
//     return 3;
//   };

//   // Show skeleton on initial load
//   if (initialLoad || loading) {
//     return <ServiceDetailsSkeleton />;
//   }

//   // Show error state
//   if (error || !service) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
//         <PageHeader title="Service Not Found" subtitle="" />
//         <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
//           <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-4 mb-6">
//             <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
//           <p className="text-xl text-muted-foreground mb-6 max-w-md">
//             {error || "The service you're looking for doesn't exist or has been removed."}
//           </p>
//           <div className="flex gap-4">
//             <Link to="/services">
//               <Button size="lg">Browse All Services</Button>
//             </Link>
//             <Link to="/">
//               <Button size="lg" variant="outline">Go Home</Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const descriptionParts = formatDescription(
//     service.longDescription || service.shortDescription,
//   );
//   const hasVideo = !!service.videoUrl;

//   return (
//     <section className="">
//       <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
//         {/* Hero */}
//         <section className="relative pt-16 pb-20 px-4">
//           <div className="container mx-auto">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div className="space-y-6">
//                 <Badge className="px-4 py-2 bg-primary/10 text-primary border-primary/20">
//                   Professional Service
//                 </Badge>
//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                   {service.title}
//                 </h1>
//                 <p className="text-xl text-muted-foreground">
//                   {service.subTitle ||
//                     "Safe, effective & eco-friendly pest solutions for your home and business"}
//                 </p>
//                 <div className="flex flex-wrap gap-4 pt-4">
//                   <Link to="/contact">
//                     <Button size="lg" className="h-12 px-8">
//                       Book Now <ArrowRight className="ml-2 h-5 w-5" />
//                     </Button>
//                   </Link>
//                   <a href="tel:+88014055-55822">
//                     <Button size="lg" variant="outline" className="h-12 px-8">
//                       <Phone className="mr-2 h-5 w-5" /> Call Now
//                     </Button>
//                   </a>
//                 </div>
//               </div>
//               <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-[4/3]">
//                 {service.thumbnail ? (
//                   <img
//                     src={service.thumbnail}
//                     alt={service.title}
//                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).style.display = 'none';
//                       (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
//                     }}
//                   />
//                 ) : null}
//                 <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center hidden">
//                   <span className="text-9xl font-black text-primary/20">
//                     {service.title.charAt(0)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-3 gap-10 xl:gap-12">
//             {/* Main Content - Left + Center */}
//             <div className="lg:col-span-2 space-y-16 md:space-y-20">
//               {/* Video */}
//               {hasVideo && (
//                 <section>
//                   <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
//                     Watch Our Process
//                   </h2>
//                   <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50">
//                     <iframe
//                       src={service.videoUrl!.replace(
//                         "youtu.be",
//                         "youtube.com/embed",
//                       )}
//                       title={service.title}
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                       className="w-full h-full"
//                     />
//                   </div>
//                 </section>
//               )}

//               {/* Description */}
//               <section>
//                 <h2 className="text-3xl md:text-4xl font-bold mb-8">
//                   About {service.title}
//                 </h2>
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: DOMPurify.sanitize(service.longDescription || service.shortDescription || ""),
//                   }}
//                   className="prose prose-lg max-w-none dark:prose-invert"
//                 />
//               </section>

//               {/* FAQs */}
//               {service.faqs?.length > 0 && (
//                 <section className="bg-muted/30 rounded-2xl p-8 md:p-10">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
//                     Frequently Asked Questions
//                   </h2>
//                   <Accordion type="single" collapsible className="w-full">
//                     {service.faqs.map((faq, i) => (
//                       <AccordionItem
//                         key={faq._id}
//                         value={`faq-${i}`}
//                         className="border-b last:border-0 py-2"
//                       >
//                         <AccordionTrigger className="text-left font-medium text-lg">
//                           {faq.question}
//                         </AccordionTrigger>
//                         <AccordionContent className="pt-4 text-muted-foreground">
//                           {faq.answer}
//                         </AccordionContent>
//                       </AccordionItem>
//                     ))}
//                   </Accordion>
//                 </section>
//               )}

//               {/* Related Services */}
//               {relatedServices.length > 0 && (
//                 <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50">
//                   <div className="container mx-auto max-w-7xl">
//                     {/* Header with decorative elements */}
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
//                       <div className="relative">
//                         <div className="absolute -left-4 top-1/2 w-1 h-12 bg-primary/20 rounded-full hidden md:block" />
//                         <Badge
//                           variant="outline"
//                           className="mb-4 px-4 py-2 bg-primary/5 border-primary/20 text-primary font-medium inline-flex items-center gap-2"
//                         >
//                           <Sparkles className="w-4 h-4" />
//                           You May Also Need
//                         </Badge>
//                         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
//                           Related <span className="text-primary">Services</span>
//                         </h2>
//                         <p className="text-muted-foreground mt-3 max-w-2xl">
//                           Explore our other professional pest control services tailored to your needs
//                         </p>
//                       </div>
//                       <div className="hidden sm:flex gap-3">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           onClick={prevSlide}
//                           disabled={sliderIndex === 0}
//                           className="rounded-full h-12 w-12 border-2 hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                         >
//                           <ChevronLeft className="h-5 w-5" />
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           onClick={nextSlide}
//                           disabled={
//                             sliderIndex >=
//                             relatedServices.length -
//                               (typeof window !== "undefined" && window.innerWidth < 768
//                                 ? 1
//                                 : typeof window !== "undefined" && window.innerWidth < 1024
//                                   ? 2
//                                   : 3)
//                           }
//                           className="rounded-full h-12 w-12 border-2 hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                         >
//                           <ChevronRight className="h-5 w-5" />
//                         </Button>
//                       </div>
//                     </div>

//                     {/* Slider Container */}
//                     <div className="overflow-hidden -mx-2 px-2">
//                       <motion.div
//                         className="flex"
//                         animate={{
//                           x: `-${sliderIndex * (100 / (typeof window !== "undefined" && window.innerWidth < 640 ? 1 : typeof window !== "undefined" && window.innerWidth < 768 ? 1.5 : typeof window !== "undefined" && window.innerWidth < 1024 ? 2 : 3))}%`,
//                         }}
//                         transition={{
//                           type: "spring",
//                           stiffness: 300,
//                           damping: 30,
//                         }}
//                       >
//                         {relatedServices.map((service, index) => {
//                           const getCardWidth = () => {
//                             if (typeof window !== "undefined") {
//                               if (window.innerWidth < 640) return "100%";
//                               if (window.innerWidth < 768) return "66.666%";
//                               if (window.innerWidth < 1024) return "50%";
//                               return "33.333%";
//                             }
//                             return "33.333%";
//                           };

//                           return (
//                             <motion.div
//                               key={service._id}
//                               initial={{ opacity: 0, y: 30 }}
//                               whileInView={{ opacity: 1, y: 0 }}
//                               viewport={{ once: true }}
//                               transition={{ duration: 0.5, delay: index * 0.1 }}
//                               style={{
//                                 minWidth: getCardWidth(),
//                                 padding: "0 8px",
//                               }}
//                             >
//                               <Link to={`/services/${service.slug}`}>
//                                 <Card className="group relative overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
//                                   <div className="absolute top-0 left-0 w-16 h-16 bg-primary/5 rounded-br-3xl -translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
//                                   <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary/5 rounded-tl-3xl translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
//                                   <div className="relative h-56 overflow-hidden">
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                                     {service.thumbnail ? (
//                                       <img
//                                         src={service.thumbnail}
//                                         alt={service.title}
//                                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                                       />
//                                     ) : (
//                                       <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
//                                         <span className="text-8xl font-bold text-primary/20">
//                                           {service.title.charAt(0)}
//                                         </span>
//                                       </div>
//                                     )}
//                                     <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
//                                     <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
//                                     <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
//                                     <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
//                                   </div>
//                                   <div className="p-6">
//                                     <h3 className="font-serif text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-1">
//                                       {service.title}
//                                     </h3>
//                                     <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
//                                       {service.subTitle ||
//                                         "Professional pest control service with certified experts and eco-friendly solutions"}
//                                     </p>
//                                     <div className="flex items-center justify-between mt-4">
//                                       <Button
//                                         variant="ghost"
//                                         size="sm"
//                                         className="text-primary hover:text-primary-foreground hover:bg-primary group/btn"
//                                       >
//                                         <span className="text-sm">Details</span>
//                                         <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </Card>
//                               </Link>
//                             </motion.div>
//                           );
//                         })}
//                       </motion.div>
//                     </div>
//                     {relatedServices.length > 3 && (
//                       <div className="flex justify-center gap-3 mt-10">
//                         {Array.from({
//                           length: Math.ceil(relatedServices.length / 3),
//                         }).map((_, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setSliderIndex(idx * 3)}
//                             className={`h-2 rounded-full transition-all ${
//                               Math.floor(sliderIndex / 3) === idx
//                                 ? "w-8 bg-primary"
//                                 : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-primary/50"
//                             }`}
//                             aria-label={`Go to slide ${idx + 1}`}
//                           />
//                         ))}
//                       </div>
//                     )}
//                     <div className="text-center mt-12">
//                       <Link to="/services">
//                         <Button
//                           size="lg"
//                           variant="outline"
//                           className="rounded-full px-8 h-12 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group"
//                         >
//                           <span>View All Services</span>
//                           <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                         </Button>
//                       </Link>
//                     </div>
//                   </div>
//                 </section>
//               )}

//               {/* Team Section */}
//               {team.length > 0 && (
//                 <section className="bg-gradient-to-br from-primary/5 to-background rounded-2xl p-8 md:p-12">
//                   <div className="text-center my-6">
//                     <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
//                       Meet Our Experts
//                     </h2>
//                     <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//                       The passionate people who make the magic happen every day
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {team.map((member, index) => (
//                       <motion.div
//                         key={member._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
//                       >
//                         <div className="aspect-[4/3] overflow-hidden bg-gray-100">
//                           <img
//                             src={member.thumbnail}
//                             alt={member.name}
//                             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = '/placeholder-team.jpg';
//                             }}
//                           />
//                         </div>
//                         <div className="p-5">
//                           <h3 className="text-lg font-semibold mb-1">
//                             {member.name}
//                           </h3>
//                           <p className="text-sm text-blue-600 mb-3">
//                             {member.designation}
//                           </p>
//                           {member.bio && (
//                             <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                               {member.bio}
//                             </p>
//                           )}
//                           <div className="space-y-1 text-sm">
//                             {member.phone && (
//                               <a
//                                 href={`tel:${member.phone}`}
//                                 className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
//                               >
//                                 <Phone className="w-3 h-3" />
//                                 {member.phone}
//                               </a>
//                             )}
//                             {member.email && (
//                               <a
//                                 href={`mailto:${member.email}`}
//                                 className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
//                               >
//                                 <Mail className="w-3 h-3" />
//                                 {member.email}
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </section>
//               )}
//             </div>

//             {/* Right Sidebar - Recent Blog Posts */}
//             <aside className="space-y-8 lg:sticky lg:top-8 lg:h-fit">
//               {blogs.length > 0 && (
//                 <div className="bg-muted/40 rounded-xl p-6 border border-border/60">
//                   <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
//                     <Building className="h-6 w-6 text-primary" /> Recent Articles
//                   </h3>
//                   <div className="space-y-8">
//                     {blogs.slice(0, 3).map((blog, idx) => (
//                       <Link
//                         key={blog._id || idx}
//                         to={`/blog/${blog.slug}`}
//                         className="group block"
//                       >
//                         <div className="rounded-lg overflow-hidden mb-3 aspect-video">
//                           <img
//                             src={blog.thumbnail}
//                             alt={blog.title}
//                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = '/placeholder-blog.jpg';
//                             }}
//                           />
//                         </div>
//                         <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
//                           {blog.title}
//                         </h4>
//                         <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
//                           {blog.shortDescrip}
//                         </p>
//                         {blog.date && (
//                           <div className="text-xs text-muted-foreground">
//                             {blog.date}
//                           </div>
//                         )}
//                       </Link>
//                     ))}
//                   </div>
//                   <div className="mt-8 text-center">
//                     <Link to="/blog">
//                       <Button variant="outline" className="w-full sm:w-auto">
//                         View All Articles <ArrowRight className="ml-2 h-4 w-4" />
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               )}

//               {/* Quick CTA Box */}
//               <Card className="bg-primary text-primary-foreground p-8 text-center rounded-xl shadow-lg">
//                 <h3 className="text-2xl font-bold mb-4">Need Help Fast?</h3>
//                 <p className="mb-6 opacity-90">
//                   Our team is ready 24/7 for emergency pest issues
//                 </p>
//                 <a href="tel:+88014055-55822">
//                   <Button
//                     size="lg"
//                     variant="secondary"
//                     className="w-full h-14 text-lg"
//                   >
//                     <Phone className="mr-3 h-6 w-6" /> Call Now
//                   </Button>
//                 </a>
//               </Card>
//             </aside>
//           </div>
//         </div>

//         {/* Final CTA */}
//         <section className="mt-20 py-20 px-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
//           <div className="container mx-auto max-w-4xl text-center">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Ready to Make Your Space Pest-Free?
//             </h2>
//             <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
//               Get expert {service.title.toLowerCase()} service today with free
//               consultation
//             </p>
//             <div className="flex flex-col sm:flex-row gap-5 justify-center">
//               <Link to="/contact">
//                 <Button
//                   size="lg"
//                   variant="secondary"
//                   className="h-14 px-10 text-lg"
//                 >
//                   Book Service <ArrowRight className="ml-3 h-6 w-6" />
//                 </Button>
//               </Link>
//               <a href="tel:+88014055-55822">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="h-14 px-10 text-lg border-white hover:bg-white hover:text-primary text-white"
//                 >
//                   <Phone className="mr-3 h-6 w-6" /> Call +880 14055-55822
//                 </Button>
//               </a>
//             </div>
//             <div className="mt-8 flex items-center justify-center gap-3 text-sm opacity-90">
//               <Calendar className="h-5 w-5" /> Free consultation • Quick
//               response • 100% Satisfaction
//             </div>
//           </div>
//         </section>
//       </div>
//     </section>
//   );
// };

// export default ServiceDetails;
