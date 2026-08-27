import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CTA } from "@/components/sections/CTA";
import { Loader2, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/Common/PageHeader";
import { fetchAPI } from "@/lib/fetchAPI";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceAreas } from "@/components/sections/ServiceAreas";

interface Service {
  _id: string;
  title: string;
  subTitle?: string;
  slug: string;
  thumbnail?: string;
  parentService: string | null;
  isActive: boolean;
  faqs: any[];
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: Service[];
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await fetchAPI<Service[]>("/services");

      if (Array.isArray(response)) {
        const sortedServices = response.sort(
          (a, b) => (a.orderNumber || 999) - (b.orderNumber || 999)
        );
        setServices(sortedServices);
      } else {
        setServices([]);
      }

      setError(null);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setError("Failed to load services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  loadServices();
}, []);

  // Function to truncate subtitle
  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return "Professional pest control services for your home and business.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
        <PageHeader
          title="Our Pest Control Services"
          subtitle="Safe, effective, and eco-friendly pest control solutions for homes and businesses."
          backgroundImage="https://cleanhouse.pk/wp-content/uploads/2023/03/garden-pest-control-service-2022-1024x689.jpg"
        />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
        <PageHeader
          title="Our Pest Control Services"
          subtitle="Safe, effective, and eco-friendly pest control solutions for homes and businesses."
          backgroundImage="https://cleanhouse.pk/wp-content/uploads/2023/03/garden-pest-control-service-2022-1024x689.jpg"
        />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <PageHeader
        title="Our Pest Control Services"
        subtitle="Safe, effective, and eco-friendly pest control solutions for homes and businesses."
        backgroundImage="https://cleanhouse.pk/wp-content/uploads/2023/03/garden-pest-control-service-2022-1024x689.jpg"
      />
      
      <main>
        {/* Services Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            {services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No services found.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
                    Our Services
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    We provide {services.length} professional pest control services to meet your needs
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, index) => (
                    <motion.div
                      key={service._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link to={`/services/${service.slug}`}>
                        <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300">
                          {/* Image Section */}
                          <div className="relative h-48 overflow-hidden bg-muted">
                            {service.thumbnail ? (
                              <img
                                src={service.thumbnail}
                                alt={service.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  // If image fails to load, show a fallback
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement!.innerHTML += `
                                    <div class="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                      <span class="text-6xl font-bold text-primary/30">${service.title.charAt(0)}</span>
                                    </div>
                                  `;
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                <span className="text-6xl font-bold text-primary/30">
                                  {service.title.charAt(0)}
                                </span>
                              </div>
                            )}
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          {/* Content Section */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
                              {service.title}
                            </h3>
                            
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                              {truncateText(service.subTitle || "", 120)}
                            </p>

                            {/* Service ID or additional info */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                              <span className="text-xs text-muted-foreground">
                                Service ID: {service._id.slice(-6)}
                              </span>
                              <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                                Learn More 
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>

                            {/* Active Status Badge */}
                            {service.isActive && (
                              <Badge variant="outline" className="mt-3 bg-green-50 text-green-700 border-green-200">
                                Active
                              </Badge>
                            )}
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Total Services Count */}
                <div className="text-center mt-12 text-muted-foreground">
                  <p>Showing {services.length} services</p>
                </div>
              </>
            )}
          </div>
        </section>
<ServiceAreas/>
        <CTA />
      </main>
    </div>
  );
};

export default ServicesPage;