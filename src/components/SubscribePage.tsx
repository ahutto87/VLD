import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Mail } from 'lucide-react';
import SEOHead from './SEOHead';
import NewsletterSignup from './NewsletterSignup';

const SubscribePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';
  const [searchParams] = useSearchParams();
  const [utmSource, setUtmSource] = useState<string | undefined>();

  useEffect(() => {
    const src = searchParams.get('utm_source') || undefined;
    setUtmSource(src);
  }, [searchParams]);

  return (
    <>
      <SEOHead pageKey="subscribe" />
      <div className="min-h-screen" style={{ backgroundColor: '#FAF3E3' }}>
        <header className="py-6 px-4" style={{ backgroundColor: '#FBEBD2' }}>
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-gray-700 hover:text-coral-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isSpanish ? 'Volver al Inicio' : 'Back to Home'}</span>
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <img
              src="/VD_ARCH-LOGO_CREAM.png"
              alt="Vio La Doula"
              className="w-28 h-28 object-contain mx-auto mb-6"
              width="112"
              height="112"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-terracotta mb-4">
              {t('newsletter.page.title')}
            </h1>
            <p className="text-lg text-terracotta/80 max-w-xl mx-auto">
              {t('newsletter.page.subtitle')}
            </p>
          </div>

          <div className="card mb-8">
            <NewsletterSignup variant="hero" utmSource={utmSource} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="card">
              <Heart className="w-8 h-8 text-coral-300 mx-auto mb-3" />
              <h3 className="font-semibold text-terracotta mb-2">
                {t('newsletter.page.benefits.0.title')}
              </h3>
              <p className="text-sm text-terracotta/70">
                {t('newsletter.page.benefits.0.description')}
              </p>
            </div>
            <div className="card">
              <Sparkles className="w-8 h-8 text-coral-300 mx-auto mb-3" />
              <h3 className="font-semibold text-terracotta mb-2">
                {t('newsletter.page.benefits.1.title')}
              </h3>
              <p className="text-sm text-terracotta/70">
                {t('newsletter.page.benefits.1.description')}
              </p>
            </div>
            <div className="card">
              <Mail className="w-8 h-8 text-coral-300 mx-auto mb-3" />
              <h3 className="font-semibold text-terracotta mb-2">
                {t('newsletter.page.benefits.2.title')}
              </h3>
              <p className="text-sm text-terracotta/70">
                {t('newsletter.page.benefits.2.description')}
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SubscribePage;
