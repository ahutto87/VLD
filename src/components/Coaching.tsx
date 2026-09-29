import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Heart, Calendar, Clock } from 'lucide-react';
import { scrollToContact, SERVICES, trackButtonClick } from '../utils/navigation';

interface CoachingItem {
  title: string;
  description: string;
}

// One icon per "What to Expect" item, in the same order as the translations
const expectIcons = [Clock, MessageCircle, Heart, Calendar];

const Coaching: React.FC = () => {
  const { t } = useTranslation();
  const expectItems = t('coaching.what_to_expect.items', { returnObjects: true }) as CoachingItem[];
  const specializedAreas = t('coaching.specialized_areas.items', { returnObjects: true }) as CoachingItem[];

  const handleBookSession = () => {
    trackButtonClick('Coaching Book Session');
    scrollToContact(SERVICES.MOTHERHOOD_COACHING);
  };

  return (
    <section id="coaching" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('coaching.title')}
          </h2>
          <p className="text-xl text-coral-300 font-medium">
            {t('coaching.subtitle')}
          </p>
        </div>

        <div className="card max-w-xl mx-auto mb-16 hover:shadow-warm transition-all duration-300">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-coral-100 text-coral-300">
                <Heart className="w-8 h-8" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {t('coaching.one_on_one.name')}
              </h3>
              <div className="text-2xl font-bold text-coral-300 mb-3">
                {t('coaching.one_on_one.price')}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t('coaching.one_on_one.description')}
              </p>
            </div>

            <button
              onClick={handleBookSession}
              className="w-full btn-primary hover:scale-105 transition-transform duration-300"
            >
              {t('coaching.book_session')}
            </button>
          </div>
        </div>

        {/* Session Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What to Expect */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {t('coaching.what_to_expect.title')}
            </h3>
            <div className="space-y-4">
              {expectItems.map((item, index) => {
                const Icon = expectIcons[index];
                return (
                  <div key={item.title} className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 text-coral-300 mt-1" />
                    <div>
                      <div className="font-medium text-gray-800">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specialized Areas */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {t('coaching.specialized_areas.title')}
            </h3>
            <div className="space-y-4">
              {specializedAreas.map((area) => (
                <div key={area.title} className="border-l-4 border-coral-300 pl-4">
                  <h4 className="font-semibold text-gray-800">{area.title}</h4>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Virtual Sessions Info */}
        <div className="mt-16">
          <div className="card max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t('coaching.virtual.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('coaching.virtual.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="font-semibold text-coral-300">{t('coaching.virtual.in_person_title')}</div>
                <div className="text-sm text-gray-600">{t('coaching.virtual.in_person_details')}</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-coral-300">{t('coaching.virtual.virtual_title')}</div>
                <div className="text-sm text-gray-600">{t('coaching.virtual.virtual_details')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coaching;
