import { Shield, Bug, Wind, AlertTriangle } from 'lucide-react';

const protections = [
  { icon: Bug, title: 'Germs', subtitle: '' },
  { icon: Shield, title: 'Viruses', subtitle: '& Bacteria' },
  { icon: Wind, title: 'Odors', subtitle: '' },
  { icon: AlertTriangle, title: 'Harmful', subtitle: 'Allergens' },
];

const ProtectionSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary-foreground/80 font-semibold mb-2">Protecting Our Environment</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Scientifically Proven<br />
            <span className="text-primary-foreground/90">Effective Against</span>
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            With customizable cleaning options and competitive rates, our services cover a large range of clients, from schools, medical offices, shopping centers, warehouses, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {protections.map((item, index) => (
            <div
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-primary-foreground/20 transition-all group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-foreground/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary-foreground">{item.title}</h3>
              {item.subtitle && (
                <p className="text-primary-foreground/80">{item.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#contact" className="bg-primary-foreground text-primary px-8 py-4 rounded-full font-semibold inline-block hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Request A Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProtectionSection;
