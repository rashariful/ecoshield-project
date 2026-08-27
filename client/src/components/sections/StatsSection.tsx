import { Users, Award, Shield, Star } from 'lucide-react';

const stats = [
  { value: '100K+', label: 'Cleans', icon: Shield },
  { value: '50+', label: 'Team Members', icon: Users },
  { value: '12+', label: 'Years Experience', icon: Award },
  { value: '99%', label: 'Customer Satisfaction', icon: Star },
];

const features = [
  { title: 'Customized Cleaning Schedule', description: 'Tailored to your specific needs' },
  { title: 'Security Protection', description: 'Fully insured and bonded' },
  { title: 'Trusted & Experienced', description: '12+ years in the industry' },
  { title: '24-Hour Warranty', description: 'Satisfaction guaranteed' },
  { title: 'Client Support', description: '24/7 customer service' },
];

const StatsSection = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto py-24">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2">What to Expect</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready for Your Home or Office<br />
            <span className="text-primary">to Feel Rejuvenated?</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Our team is well trained and highly qualified experts in professional cleaning and disinfect services to keep all types of premises clean and safe.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-4 text-center"
            >
            <div className="bg-green-800 flex items-center justify-center mx-auto mb-4 w-12 h-12 rounded-full">
  <stat.icon className="w-6 h-6 text-white" />
</div>

              <p className="font-heading text-4xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-background rounded-xl hover:shadow-card transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
