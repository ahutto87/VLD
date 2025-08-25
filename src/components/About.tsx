import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Languages, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { FloralDecor } from './DecorativeElements';

const About: React.FC = () => {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Martinez",
      text: "Viomar's support during my labor was incredible. She helped me stay calm and focused, and her bilingual skills were so valuable when I needed to communicate with my Spanish-speaking family.",
      rating: 5,
      birth: "Natural birth, 2023"
    },
    {
      name: "Jennifer Smith", 
      text: "The HypnoBirthing® techniques Viomar taught us completely transformed our birth experience. I felt empowered and in control throughout the entire process.",
      rating: 5,
      birth: "Hospital birth, 2023"
    },
    {
      name: "Maria González",
      text: "Como madre primeriza, el apoyo de Viomar fue invaluable. Su conocimiento y compasión me dieron la confianza que necesitaba durante el parto.",
      rating: 5,
      birth: "Primer bebé, 2024"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Subtle watercolor background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/watercolor-pattern-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-coral-300 font-medium mb-6">
            {t('about.subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('about.intro')}
          </p>
          
          {/* Decorative divider */}
          <div className="flex justify-center mt-8">
            <FloralDecor color="#FCA669" className="w-12 h-12 opacity-30" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Photo and Stats */}
          <div className="space-y-8">
            {/* Professional Photo */}
            <div className="relative">
              <div className="aspect-square rounded-3xl shadow-warm overflow-hidden">
                <img 
                  src="/Viomar_Professional_Portrait.jpg" 
                  alt="Vio - Professional Doula Portrait"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="w-6 h-6 text-coral-300 mr-2" />
                {t('about.credentials')}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Certified Birth Doula (Doulas of Discernment)</li>
                <li>• HypnoBirthing® Instructor (HypnoBirthing® Institute)</li>
                <li>• Postpartum Support Specialist</li>
                <li>• Certified Mama Rising Facilitator</li>
                <li>• CPR & First Aid Certified</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Languages className="w-6 h-6 text-coral-300 mr-2" />
                {t('about.languages')}
              </h3>
              <div className="flex space-x-4">
                <span className="px-3 py-1 bg-coral-100 text-coral-300 rounded-full text-sm font-medium">
                  English (Fluent)
                </span>
                <span className="px-3 py-1 bg-coral-100 text-coral-300 rounded-full text-sm font-medium">
                  Español (Native)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="card max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Client Testimonials
          </h3>
          
          <div className="relative">
            <div className="text-center space-y-6">
              {/* Stars */}
              <div className="flex justify-center space-x-1">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-coral-300 text-coral-300" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-lg text-gray-600 italic leading-relaxed max-w-2xl mx-auto">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              {/* Author */}
              <div className="space-y-1">
                <div className="font-semibold text-gray-800">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonials[currentTestimonial].birth}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-coral-300 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-coral-300 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-coral-300' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;