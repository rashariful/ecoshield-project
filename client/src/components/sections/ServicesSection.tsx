import { useState } from 'react';
import { Bed, Sofa, Sparkles, Home, Building2, GraduationCap, Warehouse, Factory } from 'lucide-react';
import residentialImage from '@/assets/residential-clean.jpg';
import commercialImage from '@/assets/commercial-clean.jpg';
import { Button } from '../ui/button';

const residentialServices = [
  { icon: Bed, title: 'Mattress', subtitle: 'Sanitizing' },
  { icon: Sofa, title: 'Furniture', subtitle: 'Sanitizing' },
  { icon: Sparkles, title: 'Carpet', subtitle: 'Sanitizing' },
  { icon: Home, title: 'Whole Home', subtitle: 'Sanitizing' },
];

const commercialServices = [
  { icon: Building2, title: 'Building', subtitle: 'Cleaning' },
  { icon: GraduationCap, title: 'Education', subtitle: 'Centre' },
  { icon: Warehouse, title: 'Warehouse', subtitle: 'Cleaning' },  
  { icon: Factory, title: 'Factory', subtitle: 'Cleaning' },
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial'>('residential');

  const currentServices = activeTab === 'residential' ? residentialServices : commercialServices;
  const currentImage = activeTab === 'residential' ? residentialImage : commercialImage;
  const currentTitle = activeTab === 'residential' ? 'Residential Sanitizing' : 'Commercial Sanitizing';
  const currentDescription = activeTab === 'residential'
    ? 'Sanitizing your living space requires utmost effort, patience and sufficient knowledge about the cleaning products. Once you hire our service, you can leave all the issues on your back seat.'
    : 'Our Commercial Sanitizing & Disinfecting Services incorporate specialized treatment processes using EPA Registered Products to disinfect a variety of surfaces.';

  return (
    <section id="services" className="section-padding mt-5">
      <div className="container mx-auto py-10">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted rounded-full p-1">
            <button
              onClick={() => setActiveTab('residential')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'residential'
                  ? 'bg-primary text-primary-foreground shadow-button'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'commercial'
                  ? 'bg-primary text-primary-foreground shadow-button'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <img
              src={currentImage}
              alt={currentTitle}
              className="rounded-2xl shadow-card w-full transition-all duration-500"
            />
          </div>

          {/* Details */}
          <div className="order-1 lg:order-2">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {currentTitle}
            </h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              {currentDescription}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentServices.map((service, index) => (
                <div
                  key={index}
                  className=" shadow-xl rounded-xl bg-white flex flex-col items-center text-center py-6"
                >
                  <div className="icon-circle bg-green-900 text-white rounded-full p-5 mb-4">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-foreground">{service.title}</h4>
                  <p className="text-muted-foreground text-sm">{service.subtitle}</p>
                </div>
              ))}
            </div>

            <Button className="btn-primary inline-block">
              Get Service Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
