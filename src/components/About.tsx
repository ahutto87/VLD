import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Languages } from 'lucide-react';
import { FloralDecor } from './DecorativeElements';

const About: React.FC = () => {
  const { t } = useTranslation();

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
                  alt="Viomar Güerere (Vio) - Certified Birth Doula, HypnoBirthing Instructor, and Motherhood Coach in Houston, Texas"
                  className="w-full h-full object-cover object-center"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
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
                <li>• Certified Full-Spectrum Doula</li>
                <li>• <a href="https://hypnobirthing.com/directory/hypnobirthing/the-woodlands/viomar-guerere/" target="_blank" rel="noopener noreferrer" className="text-coral-300 hover:underline">Certified HypnoBirthing® Educator</a></li>
                <li>• Certified Motherhood Coach</li>
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

      </div>
    </section>
  );
};

export default About;