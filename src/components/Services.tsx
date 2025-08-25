import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Heart, Baby, Home, Users } from 'lucide-react';
import { SectionDivider } from './DecorativeElements';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const packages = [
    {
      key: 'basic',
      icon: <Heart className="w-8 h-8" />,
      popular: false
    },
    {
      key: 'complete',
      icon: <Baby className="w-8 h-8" />,
      popular: true
    },
    {
      key: 'postpartum',
      icon: <Home className="w-8 h-8" />,
      popular: false
    },
    {
      key: 'full_spectrum',
      icon: <Users className="w-8 h-8" />,
      popular: false
    }
  ];

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.key}
              className={`relative card hover:shadow-warm transition-all duration-300 ${
                pkg.popular ? 'ring-2 ring-coral-300 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-coral-300 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center space-y-4">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center text-coral-300">
                    {pkg.icon}
                  </div>
                </div>

                {/* Package Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t(`services.${pkg.key}.name`)}
                  </h3>
                  <div className="text-3xl font-bold text-coral-300 mb-2">
                    {t(`services.${pkg.key}.price`)}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t(`services.${pkg.key}.description`)}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {(t(`services.${pkg.key}.features`, { returnObjects: true }) as string[]).map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-coral-300 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-coral-300 hover:bg-coral-200 text-white shadow-warm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}>
                  {t('common.book_now')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Section Divider */}
        <SectionDivider />

        {/* Additional Info */}
        <div className="mt-16 text-center space-y-6">
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Payment Plans Available
            </h3>
            <p className="text-gray-600 mb-6">
              We understand that welcoming a new baby comes with many expenses. 
              That's why we offer flexible payment plans to make our services accessible to all families.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-lg font-semibold text-coral-300">50% Deposit</div>
                <div className="text-sm text-gray-600">At contract signing</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-coral-300">Payment Plan</div>
                <div className="text-sm text-gray-600">Monthly installments available</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-coral-300">Final Payment</div>
                <div className="text-sm text-gray-600">By 37 weeks gestation</div>
              </div>
            </div>
          </div>

          <button className="btn-primary">
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;