import React from 'react';
import { useTranslation } from 'react-i18next';
import { FloatingDecor } from './DecorativeElements';
import { scrollToContact, SERVICES, trackButtonClick } from '../utils/navigation';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const handleBookConsultation = () => {
    trackButtonClick('Hero Book Consultation');
    scrollToContact(SERVICES.GENERAL_CONSULTATION);
  };

  const handleLearnMore = () => {
    trackButtonClick('Hero Learn More');
    const aboutElement = document.querySelector('#about');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-16 min-h-screen flex items-center overflow-hidden">
      
      
      {/* Floating Decorative Elements */}
      <FloatingDecor />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: '#D17D44' }}>
                {t('hero.title')}
              </h1>
              <h2 className="text-xl sm:text-2xl text-coral-300 font-medium">
                {t('hero.subtitle')}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#D17D44' }}>
                {t('hero.description')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleBookConsultation}
                className="btn-primary text-center hover:scale-105 transition-transform duration-300"
              >
                {t('hero.cta_consultation')}
              </button>
              <button 
                onClick={handleLearnMore}
                className="btn-secondary text-center hover:scale-105 transition-transform duration-300"
              >
                {t('hero.cta_learn_more')}
              </button>
            </div>

          </div>

          {/* Image/Visual Content */}
          <div className="relative">
            <div className="relative">
              {/* Brand Logo Feature */}
              <div className="aspect-[3/4] flex items-center justify-center">
                <img 
                  src="/VD_ARCH-LOGO_CREAM.png" 
                  alt="Vio La Doula - Professional Full-Spectrum Doula and HypnoBirthing Educator serving Greater North Houston area"
                  className="w-full h-full object-contain logo-transparent"
                  width="500"
                  height="500"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;