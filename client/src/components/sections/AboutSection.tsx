import { Check } from 'lucide-react';
import residentialImage from '@/assets/residential-clean.jpg';
import { Button } from '../ui/button';

const features = [
  'Daily office cleaning for many types of offices',
  'Carpet cleaning and flooring maintenance',
  'Friendly 24/7 customer service',
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-cream">
      <div className="container mx-auto py-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={residentialImage}
                alt="Clean living space"
                className="rounded-2xl shadow-card w-full"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg z-20">
              <p className="text-4xl font-heading font-bold">12+</p>
              <p className="text-sm font-medium">Years of<br />Experience</p>
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-sky/20 rounded-full blur-2xl" />
          </div>

          {/* Content Side */}
          <div>
            <p className="text-primary font-semibold mb-2">More than 12 Years of Experience</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Certified Sanitizing Company
            </h2>
            
            <blockquote className="border-l-4 border-primary pl-6 py-4 mb-8 bg-background rounded-r-lg">
              <p className="text-muted-foreground italic text-lg">
                "We're a one-stop shop offering a vast range of both contract and specialist cleaning services for commercial clients. We're flexible and don't lock clients into long contracts."
              </p>
            </blockquote>

            <div className="mb-8">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                Cleaning You Can See & Feel
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our sanitizing services go beyond the basic services and provide you with a comprehensive clean that will reenergize your home and enhance your life. From everyday housekeeping to routine cleanings, our professional team members can provide you with an unrivaled experience.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button  className="bg-primary inline-block">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
