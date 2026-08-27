import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/fetchAPI";

type Partner = {
  _id: string;
  name: string;
  thumbnail: string;
  isActive: boolean;
};

export default function PartnerLogos() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadPartners = async () => {
      try {
        const res = await fetchAPI<any>("/logos"); // API endpoint
        const rawData: Partner[] = Array.isArray(res)
          ? res
          : res?.data || [];
        const activePartners = rawData.filter(p => p.isActive);
        setPartners(activePartners);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };
    loadPartners();
  }, []);

  if (loading || partners.length === 0) return null;

 const logos = partners.map(p => p.thumbnail); // ✅ use thumbnail
const doubledLogos = [...logos, ...logos];

console.log(doubledLogos); // should show your 4 image URLs


  console.log(doubledLogos)
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
              Trusted By Leading Companies
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400">
            We proudly partner with top organizations across Bangladesh
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* First row - right to left */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee-right whitespace-nowrap py-6">
              {doubledLogos.map((logo, index) => (
                <div key={`row1-${index}`} className="flex-shrink-0 mx-6 md:mx-10">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center p-6 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
                    <img
                      src={logo}
                      alt={`Partner logo ${index + 1}`}
                      className="max-w-full max-h-full object-contain transition-all duration-300"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second row - left to right */}
          <div className="overflow-hidden mt-8 md:mt-12">
            <div className="flex animate-marquee-left whitespace-nowrap py-6">
              {doubledLogos.map((logo, index) => (
                <div key={`row2-${index}`} className="flex-shrink-0 mx-6 md:mx-10">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center p-6 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
                    <img
                      src={logo}
                      alt={`Partner logo ${index + 1}`}
                      className="max-w-full max-h-full object-contain transition-all duration-300"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind animation classes */}
      <style jsx global>{`
        @keyframes marquee-right {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-left {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }

        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }

        .animate-marquee-right:hover,
        .animate-marquee-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
