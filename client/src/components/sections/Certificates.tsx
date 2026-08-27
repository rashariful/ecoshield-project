// components/NishiCertificates.tsx
'use client';

import { useState } from 'react';
import { Shield, Verified, FileText } from 'lucide-react';

type LicenseItem = {
  id: string;
  title: string;
  issuer: string;
  validity: string;
  category: string;
  description: string;
  imageUrl: string; // real certificate/photo placeholder
  verified: boolean;
};

const licenses: LicenseItem[] = [
  {
    id: '1',
    title: "Trade License",
    issuer: "Dhaka North City Corporation / Relevant Municipal Authority",
    validity: "Valid till 30 June 2026",
    category: "Business Permission",
    description: "Official license to legally operate pest control services in Dhaka and surrounding areas. Renewed annually as per Municipal Taxation Rules.",
    imageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEhpoGZPDYye0AFcp3r0bOc4p9rhIxMc4iALjdTvlnTKBfXOneiT-jQiW-L9kCKhgW7suxeLU3VEUHaYE5nZuhDTNMSnAcU2i_j16X8HtSsLB3lRKWOQlpVkEv9n_dIo0aRfeYNxQnesQ7lBd9Z7XekaHqQ19NOoWZROyhSSdkpki650SPOkaNATC1j-T7B-=w1200-h630-p-k-no-nu", // generic official document style
    verified: true
  },
  {
    id: '2',
    title: "Tax Identification Number (TIN)",
    issuer: "National Board of Revenue (NBR)",
    validity: "Lifetime (e-TIN)",
    category: "Tax Compliance",
    description: "Electronic TIN certificate for income tax filing and legal business operations in Bangladesh.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmNDiomUofRJXTHpx379ohUzG50QfV_k8C3w&s",
    verified: true
  },
  {
    id: '3',
    title: "Business Identification Number (BIN) / VAT Registration",
    issuer: "National Board of Revenue (NBR)",
    validity: "Active",
    category: "VAT & Taxation",
    description: "VAT registration certificate (e-BIN) required for service-based businesses. Ensures proper VAT collection and compliance.",
    imageUrl: "https://segunbagicha.com/wp-content/uploads/2025/09/vat.webp",
    verified: true
  },
  {
    id: '4',
    title: "Pest Control Operation License (Commercial Basis)",
    issuer: "Department of Agricultural Extension (DAE), Ministry of Agriculture",
    validity: "Valid till 2026",
    category: "Industry Specific License",
    description: "Government-approved license to carry out commercial pest control operations in buildings, warehouses, hotels and infested places.",
    imageUrl: "https://protectpestbd.com/wp-content/uploads/al_opt_content/IMAGE/protectpestbd.com/wp-content/uploads/2025/07/Dhaka_North_City_Corporation_Logo.svg-300x300.png.bv.webp?bv_host=protectpestbd.com",
    verified: true
  },
  {
    id: '5',
    title: "Fire License",
    issuer: "Bangladesh Fire Service and Civil Defence",
    validity: "Valid till 2026",
    category: "Safety & Compliance",
    description: "Mandatory license for safe handling and storage of pest control chemicals and equipment.",
    imageUrl: "https://protectpestbd.com/wp-content/uploads/al_opt_content/IMAGE/protectpestbd.com/wp-content/uploads/2025/08/Fire.png.bv.webp?bv_host=protectpestbd.com",
    verified: true
  },
  {
    id: '6',
    title: "Environment Clearance Certificate",
    issuer: "Department of Environment (DoE)",
    validity: "Active",
    category: "Environmental Compliance",
    description: "Certificate confirming eco-friendly use of pesticides and compliance with environmental protection rules.",
    imageUrl: "https://protectpestbd.com/wp-content/uploads/al_opt_content/IMAGE/protectpestbd.com/wp-content/uploads/2025/07/Government_of_Bangladesh-300x298.png.bv.webp?bv_host=protectpestbd.com",
    verified: true
  },
];

const categories = ['All', ...Array.from(new Set(licenses.map(l => l.category)))];

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredLicenses = activeCategory === 'All'
    ? licenses
    : licenses.filter(l => l.category === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
              Our Official Licenses & Certifications
            </span>
          </h2>
          <p className="mt-5 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Fully compliant with all Bangladesh government requirements for safe, legal & professional pest control services
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-700'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Licenses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredLicenses.map((item) => (
            <div
              key={item.id}
              className="
                group relative bg-white dark:bg-gray-900/70 rounded-2xl overflow-hidden 
                border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl 
                transition-all duration-500 hover:-translate-y-3 hover:border-green-500/50
              "
            >
              {/* Image / Badge Area */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-8 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                {item.verified && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Verified size={14} className="fill-white" />
                    Verified
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold px-4 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.validity}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issued by: {item.issuer}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note & CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
            All licenses are regularly renewed and verified. We operate 100% legally with government-approved chemicals & methods — your safety is our priority.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:-translate-y-1"
          >
            Get Safe Pest Control Service →
          </a>
        </div>
      </div>
    </section>
  );
}