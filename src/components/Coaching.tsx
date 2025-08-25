import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Heart, Baby, Calendar, Clock } from 'lucide-react';

const Coaching: React.FC = () => {
  const { t } = useTranslation();

  const sessionTypes = [
    {
      key: 'prenatal',
      icon: <Heart className="w-8 h-8" />,
      color: 'bg-coral-100 text-coral-300'
    },
    {
      key: 'postpartum',
      icon: <Baby className="w-8 h-8" />,
      color: 'bg-sage-100 text-sage-300'
    }
  ];

  return (
    <section id="coaching" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('coaching.title')}
          </h2>
          <p className="text-xl text-coral-300 font-medium mb-6">
            {t('coaching.subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('coaching.description')}
          </p>
        </div>

        {/* Session Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sessionTypes.map((session) => (
            <div key={session.key} className="card hover:shadow-warm transition-all duration-300">
              <div className="text-center space-y-4">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${session.color}`}>
                    {session.icon}
                  </div>
                </div>

                {/* Session Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t(`coaching.session_types.${session.key}.name`)}
                  </h3>
                  <div className="text-2xl font-bold text-coral-300 mb-3">
                    {t(`coaching.session_types.${session.key}.price`)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`coaching.session_types.${session.key}.description`)}
                  </p>
                </div>

                {/* CTA Button */}
                <button className="w-full btn-primary">
                  {t('coaching.book_session')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Session Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What to Expect */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              What to Expect in Your Session
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-coral-300 mt-1" />
                <div>
                  <div className="font-medium text-gray-800">60-Minute Sessions</div>
                  <div className="text-sm text-gray-600">Dedicated time focused entirely on your needs</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-coral-300 mt-1" />
                <div>
                  <div className="font-medium text-gray-800">Personalized Support</div>
                  <div className="text-sm text-gray-600">Customized guidance based on your unique situation</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-coral-300 mt-1" />
                <div>
                  <div className="font-medium text-gray-800">Compassionate Care</div>
                  <div className="text-sm text-gray-600">Non-judgmental, supportive environment</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-coral-300 mt-1" />
                <div>
                  <div className="font-medium text-gray-800">Flexible Scheduling</div>
                  <div className="text-sm text-gray-600">Available evenings and weekends</div>
                </div>
              </div>
            </div>
          </div>

          {/* Specialized Areas */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Specialized Coaching Areas
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-coral-300 pl-4">
                <h4 className="font-semibold text-gray-800">Birth Preparation</h4>
                <p className="text-sm text-gray-600">Mental and emotional preparation for labor and delivery</p>
              </div>
              <div className="border-l-4 border-coral-300 pl-4">
                <h4 className="font-semibold text-gray-800">Postpartum Adjustment</h4>
                <p className="text-sm text-gray-600">Navigating the challenges of new motherhood</p>
              </div>
              <div className="border-l-4 border-coral-300 pl-4">
                <h4 className="font-semibold text-gray-800">Breastfeeding Challenges</h4>
                <p className="text-sm text-gray-600">Troubleshooting and optimizing your breastfeeding journey</p>
              </div>
              <div className="border-l-4 border-coral-300 pl-4">
                <h4 className="font-semibold text-gray-800">Partner Support</h4>
                <p className="text-sm text-gray-600">Helping partners understand their supportive role</p>
              </div>
              <div className="border-l-4 border-coral-300 pl-4">
                <h4 className="font-semibold text-gray-800">Birth Trauma Recovery</h4>
                <p className="text-sm text-gray-600">Healing and processing difficult birth experiences</p>
              </div>
              <div className="border-l-4 border-coral-300 pl-4">
                <h4 className="font-semibold text-gray-800">Second Baby Preparation</h4>
                <p className="text-sm text-gray-600">Managing expectations and family dynamics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Sessions Info */}
        <div className="mt-16">
          <div className="card max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Virtual Sessions Available
            </h3>
            <p className="text-gray-600 mb-6">
              All coaching sessions are available both in-person and virtually via secure video call. 
              Virtual sessions provide the same level of support and connection from the comfort of your own home.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="font-semibold text-coral-300">In-Person Sessions</div>
                <div className="text-sm text-gray-600">North Houston, TX area • Travel fee may apply</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-coral-300">Virtual Sessions</div>
                <div className="text-sm text-gray-600">Secure video platform • Available worldwide</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Book a complimentary 15-minute consultation to discuss your needs and see if coaching is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Book Free Consultation
            </button>
            <button className="btn-secondary">
              Schedule Paid Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coaching;