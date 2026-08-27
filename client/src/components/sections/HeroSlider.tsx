import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage1 from '@/assets/hero-sanitizing.jpg';
import heroImage2 from '@/assets/hero-commercial.jpg';

const slides = [
  {
    image: heroImage1,
    subtitle: 'Industry-Leading Guarantee',
    title: 'Residential',
    titleHighlight: '& Commercial Sanitizing',
    description: 'Imagine your home so clean, it\'s clinically clean. Free from bacteria and viruses, free from mold and mildew.',
  },
  {
    image: heroImage2,
    subtitle: 'Professional Sanitizing Service',
    title: 'Disinfecting & Deodorizing',
    titleHighlight: 'Spray Services',
    description: 'Our expert cleaners are carefully selected and then fully trained to give them a deep understanding of procedures.',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000  ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center "
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
          
          <div className="relative h-full container-custom flex items-center">
            <div className={`max-w-2xl ${index === currentSlide ? 'animate-fade-up' : ''}`}>
              <p className="text-primary font-semibold mb-4 text-lg">{slide.subtitle}</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
                {slide.title}
                <br />
                <span className="text-primary">{slide.titleHighlight}</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-lg">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#services" className="btn-primary">
                  Our Services
                </a>
                <a href="#contact" className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-navy">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary-foreground/20 hover:bg-primary rounded-full flex items-center justify-center text-primary-foreground transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary-foreground/20 hover:bg-primary rounded-full flex items-center justify-center text-primary-foreground transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-primary w-8' : 'bg-primary-foreground/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
