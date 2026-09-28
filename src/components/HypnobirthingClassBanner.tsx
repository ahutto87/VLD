import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { getClassDetails, isClassRegistrationOpen, toClassLanguage } from '../utils/hypnobirthingClass';

// Homepage callout for the upcoming group class; hides itself once registration closes
const HypnobirthingClassBanner: React.FC = () => {
  const { t, i18n } = useTranslation();

  if (!isClassRegistrationOpen()) return null;

  const details = getClassDetails(toClassLanguage(i18n.language));

  return (
    <div className="mb-8 rounded-2xl border border-coral-200 bg-cream-100 shadow-warm p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
      <div className="flex-1">
        <span className="inline-block text-xs font-semibold uppercase tracking-wide bg-coral-300 text-cream-50 rounded-full px-3 py-1 mb-3">
          {t('hb_class.banner.badge')}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-terracotta mb-2">{t('hb_class.banner.title')}</h3>
        <p className="flex items-start gap-2 text-terracotta">
          <Calendar className="w-5 h-5 text-coral-300 mt-0.5 flex-shrink-0" />
          <span>
            {details.dates} · {details.time}
          </span>
        </p>
        <p className="text-sm text-terracotta/80 mt-2">
          {t('hb_class.banner.summary', { fee: details.fee, deposit: details.deposit })}
        </p>
      </div>
      <Link
        to="/hypnobirthing-class"
        className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
      >
        {t('hb_class.banner.cta')}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default HypnobirthingClassBanner;
