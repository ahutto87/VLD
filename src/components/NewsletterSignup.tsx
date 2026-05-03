import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, Send } from 'lucide-react';

const MAILERLITE_FORM_ACTION =
  'https://assets.mailerlite.com/jsonp/2312100/forms/186413592779687690/subscribe';

export type NewsletterVariant = 'card' | 'compact' | 'hero';

interface NewsletterSignupProps {
  variant?: NewsletterVariant;
  showConsent?: boolean;
  utmSource?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  variant = 'card',
  showConsent = true,
  utmSource,
}) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const language = i18n.language?.startsWith('es') ? 'Español' : 'English';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (showConsent && !acceptTerms) {
      setError(t('newsletter.errors.consent'));
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('fields[email]', email);
      formData.append('fields[name]', name);
      formData.append('fields[country]', language);
      if (utmSource) formData.append('fields[last_utm_source]', utmSource);
      formData.append('ml-submit', '1');
      formData.append('anticsrf', 'true');

      await fetch(MAILERLITE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setIsSubmitted(true);
      setEmail('');
      setName('');
      setAcceptTerms(false);
    } catch {
      setError(t('newsletter.errors.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCompact = variant === 'compact';
  const isHero = variant === 'hero';

  if (isSubmitted) {
    return (
      <div
        className={
          isCompact
            ? 'rounded-xl p-4 bg-cream-50 border border-coral-200'
            : 'rounded-2xl p-6 bg-cream-50 border border-coral-200'
        }
      >
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-sage-300 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-terracotta">
              {t('newsletter.success.title')}
            </h4>
            <p className="text-sm text-terracotta/80 mt-1">
              {t('newsletter.success.message')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isHero
          ? 'space-y-4'
          : isCompact
            ? 'space-y-3'
            : 'space-y-4'
      }
    >
      {!isCompact && (
        <div className="flex items-center space-x-2 mb-1">
          <Mail className="w-5 h-5 text-coral-300" />
          <h4 className={isHero ? 'text-2xl font-bold text-terracotta' : 'text-lg font-semibold text-terracotta'}>
            {t('newsletter.title')}
          </h4>
        </div>
      )}

      {!isCompact && (
        <p className={isHero ? 'text-base text-terracotta/80' : 'text-sm text-terracotta/80'}>
          {t('newsletter.description')}
        </p>
      )}

      <div className={isCompact ? 'space-y-2' : 'space-y-3'}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('newsletter.placeholders.name')}
          autoComplete="given-name"
          aria-label={t('newsletter.placeholders.name')}
          className="w-full px-4 py-3 border border-coral-200 rounded-xl bg-white/90 text-terracotta placeholder:text-terracotta/50 focus:ring-2 focus:ring-coral-300 focus:border-transparent"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletter.placeholders.email')}
          autoComplete="email"
          aria-label={t('newsletter.placeholders.email')}
          className="w-full px-4 py-3 border border-coral-200 rounded-xl bg-white/90 text-terracotta placeholder:text-terracotta/50 focus:ring-2 focus:ring-coral-300 focus:border-transparent"
        />
      </div>

      {showConsent && (
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-coral-300 border-coral-200 rounded focus:ring-coral-300"
          />
          <span className={isCompact ? 'text-xs text-cream-50/90' : 'text-xs text-terracotta/80'}>
            {t('newsletter.consent.prefix')}{' '}
            <Link
              to="/terms-of-service"
              target="_blank"
              className={isCompact ? 'underline hover:text-cream-50' : 'underline hover:text-coral-300'}
            >
              {t('newsletter.consent.terms')}
            </Link>{' '}
            {t('newsletter.consent.and')}{' '}
            <Link
              to="/privacy-policy"
              target="_blank"
              className={isCompact ? 'underline hover:text-cream-50' : 'underline hover:text-coral-300'}
            >
              {t('newsletter.consent.privacy')}
            </Link>
            .
          </span>
        </label>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-coral-300 hover:bg-coral-200 text-cream-50 px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cream-50"></div>
            <span>{t('newsletter.submitting')}</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>{t('newsletter.submit')}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default NewsletterSignup;
