import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import SEOHead from './SEOHead';
import { getClassDetails, toClassLanguage } from '../utils/hypnobirthingClass';
import type { CheckoutItem } from '../utils/checkout';

// Stripe Checkout returns here after a card payment (success_url in server/server.js),
// with ?item= naming what was paid for
const PaymentSuccessPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = toClassLanguage(i18n.language);
  const isSpanish = language === 'es';
  const [searchParams] = useSearchParams();
  const item = searchParams.get('item') as CheckoutItem | null;
  const classDetails = getClassDetails(language);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const message =
    item === 'hypnobirthing_class_deposit'
      ? t('payment_success.class', {
          deposit: classDetails.deposit,
          balance: classDetails.balance,
          firstClass: classDetails.firstClass
        })
      : item === 'doula_deposit'
        ? t('payment_success.doula')
        : t('payment_success.generic');

  return (
    <>
      <SEOHead pageKey="payment-success" />
      <div className="min-h-screen" style={{ backgroundColor: '#FAF3E3' }}>
        <header className="py-6 px-4" style={{ backgroundColor: '#FBEBD2' }}>
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-terracotta hover:text-coral-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isSpanish ? 'Volver al Inicio' : 'Back to Home'}</span>
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-12">
          <div className="card text-center" role="status">
            <img
              src="/VD_ARCH-LOGO_CREAM.png"
              alt="Vio La Doula"
              className="w-24 h-24 object-contain mx-auto mb-4"
              width="96"
              height="96"
            />
            <CheckCircle className="w-12 h-12 text-sage-300 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-terracotta mb-4">{t('payment_success.title')}</h1>
            <p className="text-lg text-terracotta leading-relaxed mb-4">{message}</p>
            <p className="text-terracotta/80 mb-6">{t('payment_success.receipt')}</p>
            <p className="text-sm text-terracotta/80 rounded-xl bg-cream-100 p-4">
              {t('payment_success.questions')}{' '}
              <a
                href="mailto:violadoula@gmail.com"
                className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:text-coral-200"
              >
                <Mail className="w-4 h-4" />
                violadoula@gmail.com
              </a>
            </p>
          </div>
        </main>

        <footer className="py-6 px-4 text-center" style={{ backgroundColor: '#D17D44', color: '#FAF3E3' }}>
          <p className="text-sm">{t('footer.copyright')}</p>
        </footer>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
