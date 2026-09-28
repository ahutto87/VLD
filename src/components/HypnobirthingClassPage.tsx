import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Globe,
  Calendar,
  Clock,
  Video,
  Users,
  Wallet,
  CheckCircle,
  Copy,
  Check,
  ExternalLink,
  Send
} from 'lucide-react';
import SEOHead from './SEOHead';
import NewsletterSignup from './NewsletterSignup';
import { sendClassRegistration, type ClassRegistrationData } from '../utils/emailService';
import {
  HYPNOBIRTHING_CLASS,
  getClassDetails,
  isClassRegistrationOpen,
  toClassLanguage
} from '../utils/hypnobirthingClass';

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  dueDate: string;
  partnerName: string;
  firstBaby: ClassRegistrationData['firstBaby'];
  birthPlace: ClassRegistrationData['birthPlace'];
  message: string;
  acceptTerms: boolean;
  company: string; // honeypot — hidden from people, filled in by bots
}

interface Registration {
  fullName: string;
  email: string;
  welcomeSent: boolean;
}

const todayIso = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 border rounded-xl bg-white/90 text-terracotta placeholder:text-terracotta/50 focus:outline-none focus:ring-2 focus:ring-coral-300 focus:border-transparent ${
    hasError ? 'border-red-400' : 'border-coral-200'
  }`;

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ id, label, required, hint, error, children }) => {
  const { t } = useTranslation();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-terracotta mb-1.5">
        {label}{' '}
        {required ? '*' : <span className="font-normal text-terracotta/70">{t('hb_class.form.optional')}</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-terracotta/70">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const CopyButton: React.FC<{ value: string }> = ({ value }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // In-app browsers (e.g. Instagram's) can block the Clipboard API; fall back to
      // the legacy copy command. If that fails too, the value is on screen to copy by hand.
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copiedWithFallback = document.execCommand('copy');
      textarea.remove();
      if (!copiedWithFallback) return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-coral-200 bg-cream-50 text-sm font-medium text-terracotta hover:bg-cream-100 transition-colors flex-shrink-0"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? t('hb_class.success.copied') : t('hb_class.success.copy')}
    </button>
  );
};

const HypnobirthingClassPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = toClassLanguage(i18n.language);
  const isSpanish = language === 'es';
  const details = getClassDetails(language);
  const { zelle, venmo } = HYPNOBIRTHING_CLASS;
  const isOpen = isClassRegistrationOpen();

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [submitError, setSubmitError] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: { firstBaby: '', birthPlace: '' }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (registration) {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [registration]);

  const onSubmit = async (values: FormValues) => {
    setSubmitError(false);
    const fullName = values.fullName.trim();
    const email = values.email.trim();

    // Bots fill the hidden honeypot field; show success without sending anything
    if (values.company) {
      setRegistration({ fullName, email, welcomeSent: true });
      return;
    }

    const { registered, welcomeSent } = await sendClassRegistration({
      fullName,
      email,
      phone: values.phone.trim(),
      dueDate: values.dueDate,
      partnerName: values.partnerName.trim(),
      firstBaby: values.firstBaby,
      birthPlace: values.birthPlace,
      message: values.message.trim(),
      language
    });

    if (!registered) {
      setSubmitError(true);
      return;
    }
    setRegistration({ fullName, email, welcomeSent });
  };

  const detailItems = [
    { icon: Calendar, text: details.dates },
    { icon: Clock, text: details.time },
    { icon: Video, text: t('hb_class.page.online') },
    { icon: Users, text: t('hb_class.page.fee', { fee: details.fee }) },
    { icon: Wallet, text: t('hb_class.page.deposit', { deposit: details.deposit }) }
  ];

  const steps = [
    t('hb_class.page.step_1'),
    t('hb_class.page.step_2', { deposit: details.deposit }),
    t('hb_class.page.step_3')
  ];

  const renderForm = () => (
    <div className="card">
      <h2 className="text-3xl font-bold text-terracotta mb-6">{t('hb_class.form.title')}</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <Field id="hb-full-name" label={t('hb_class.form.full_name')} required error={errors.fullName?.message}>
          <input
            id="hb-full-name"
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder={t('hb_class.form.full_name_placeholder')}
            aria-invalid={!!errors.fullName}
            className={inputClass(!!errors.fullName)}
            {...register('fullName', {
              validate: (value) => !!value.trim() || t('hb_class.form.errors.required')
            })}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="hb-email" label={t('hb_class.form.email')} required error={errors.email?.message}>
            <input
              id="hb-email"
              type="email"
              autoComplete="email"
              placeholder={t('hb_class.form.email_placeholder')}
              aria-invalid={!!errors.email}
              className={inputClass(!!errors.email)}
              {...register('email', {
                required: t('hb_class.form.errors.required'),
                pattern: { value: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/, message: t('hb_class.form.errors.email') }
              })}
            />
          </Field>

          <Field id="hb-phone" label={t('hb_class.form.phone')} required error={errors.phone?.message}>
            <input
              id="hb-phone"
              type="tel"
              autoComplete="tel"
              placeholder={t('hb_class.form.phone_placeholder')}
              aria-invalid={!!errors.phone}
              className={inputClass(!!errors.phone)}
              {...register('phone', {
                required: t('hb_class.form.errors.required'),
                validate: (value) => value.replace(/\D/g, '').length >= 10 || t('hb_class.form.errors.phone')
              })}
            />
          </Field>
        </div>

        <Field id="hb-due-date" label={t('hb_class.form.due_date')} required error={errors.dueDate?.message}>
          <input
            id="hb-due-date"
            type="date"
            min={todayIso()}
            aria-invalid={!!errors.dueDate}
            className={inputClass(!!errors.dueDate)}
            {...register('dueDate', {
              required: t('hb_class.form.errors.required'),
              validate: (value) => value >= todayIso() || t('hb_class.form.errors.due_date')
            })}
          />
        </Field>

        <Field id="hb-partner-name" label={t('hb_class.form.partner_name')} hint={t('hb_class.form.partner_hint')}>
          <input
            id="hb-partner-name"
            type="text"
            maxLength={100}
            className={inputClass(false)}
            {...register('partnerName')}
          />
        </Field>

        <Field id="hb-first-baby" label={t('hb_class.form.first_baby')}>
          <select id="hb-first-baby" className={inputClass(false)} {...register('firstBaby')}>
            <option value="">{t('hb_class.form.select')}</option>
            <option value="yes">{t('hb_class.form.first_baby_yes')}</option>
            <option value="no">{t('hb_class.form.first_baby_no')}</option>
          </select>
        </Field>

        <Field id="hb-birth-place" label={t('hb_class.form.birth_place')}>
          <select id="hb-birth-place" className={inputClass(false)} {...register('birthPlace')}>
            <option value="">{t('hb_class.form.select')}</option>
            <option value="hospital">{t('hb_class.form.birth_place_hospital')}</option>
            <option value="birth_center">{t('hb_class.form.birth_place_birth_center')}</option>
            <option value="home">{t('hb_class.form.birth_place_home')}</option>
            <option value="unsure">{t('hb_class.form.birth_place_unsure')}</option>
          </select>
        </Field>

        <Field id="hb-message" label={t('hb_class.form.message')}>
          <textarea
            id="hb-message"
            rows={4}
            maxLength={2000}
            placeholder={t('hb_class.form.message_placeholder')}
            className={`${inputClass(false)} resize-none`}
            {...register('message')}
          />
        </Field>

        {/* Honeypot: off-screen, skipped by keyboard and screen readers */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor="hb-company">Company</label>
          <input id="hb-company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 accent-coral-300 cursor-pointer"
              aria-invalid={!!errors.acceptTerms}
              {...register('acceptTerms', { required: t('hb_class.form.errors.consent') })}
            />
            <span className="text-sm text-terracotta/90 leading-relaxed">
              {t('hb_class.form.agree_prefix')}{' '}
              <Link to="/terms-of-service" target="_blank" className="underline underline-offset-2 hover:text-coral-200">
                {t('hb_class.form.terms_link')}
              </Link>{' '}
              {t('hb_class.form.and')}{' '}
              <Link to="/privacy-policy" target="_blank" className="underline underline-offset-2 hover:text-coral-200">
                {t('hb_class.form.privacy_link')}
              </Link>
              . *
            </span>
          </label>
          {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>}
        </div>

        <p className="text-xs text-terracotta/70 leading-relaxed">{t('hb_class.form.no_payment')}</p>

        {submitError && (
          <p role="alert" className="text-sm text-red-600">{t('hb_class.form.errors.submit')}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>{t('hb_class.form.submitting')}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{t('hb_class.form.submit')}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );

  const renderSuccess = (result: Registration) => (
    <div ref={successRef} className="card scroll-mt-6" role="status">
      <CheckCircle className="w-12 h-12 text-sage-300 mx-auto mb-4" />
      <h2 className="text-3xl font-bold text-terracotta text-center mb-3">
        {t('hb_class.success.title', { name: result.fullName.split(/\s+/)[0] })}
      </h2>
      <p className="text-terracotta text-center mb-6">
        {t('hb_class.success.intro', { deposit: details.deposit })}
      </p>

      <div className="space-y-3 mb-6">
        <div className="rounded-2xl border border-coral-200 bg-white/80 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-terracotta/70">Zelle</p>
            <p className="text-lg font-semibold text-terracotta break-words">{zelle.email}</p>
            <p className="text-xs text-terracotta/70">{t('hb_class.success.zelle_hint', { name: zelle.name })}</p>
          </div>
          <CopyButton value={zelle.email} />
        </div>

        <div className="rounded-2xl border border-coral-200 bg-white/80 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-terracotta/70">Venmo</p>
            <p className="text-lg font-semibold text-terracotta whitespace-nowrap">@{venmo.handle}</p>
          </div>
          <a
            href={venmo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-coral-300 text-sm font-medium text-white hover:bg-coral-200 transition-colors flex-shrink-0"
          >
            {t('hb_class.success.open_venmo')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <p className="text-terracotta font-semibold mb-4">
        {t('hb_class.success.note', { name: result.fullName })}
      </p>
      <p className="text-terracotta leading-relaxed mb-6">
        {t('hb_class.success.next', {
          fee: details.fee,
          balance: details.balance,
          firstClass: details.firstClass
        })}
      </p>
      <p className="text-sm text-terracotta/80 rounded-xl bg-cream-100 p-4">
        {result.welcomeSent
          ? t('hb_class.success.email_sent', { email: result.email })
          : t('hb_class.success.email_failed')}
      </p>
    </div>
  );

  const renderClosed = () => (
    <div className="card space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-terracotta mb-3">{t('hb_class.closed.title')}</h2>
        <p className="text-terracotta">{t('hb_class.closed.message')}</p>
      </div>
      <NewsletterSignup variant="card" />
      <p className="text-center">
        <a
          href="mailto:violadoula@gmail.com"
          className="text-sm text-terracotta underline underline-offset-2 hover:text-coral-200"
        >
          {t('hb_class.closed.contact')}
        </a>
      </p>
    </div>
  );

  return (
    <>
      <SEOHead pageKey="hypnobirthing-class" />
      <div className="min-h-screen" style={{ backgroundColor: '#FAF3E3' }}>
        <header className="py-6 px-4" style={{ backgroundColor: '#FBEBD2' }}>
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-gray-700 hover:text-coral-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isSpanish ? 'Volver al Inicio' : 'Back to Home'}</span>
            </Link>
            <button
              type="button"
              onClick={() => i18n.changeLanguage(isSpanish ? 'en' : 'es')}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-terracotta hover:bg-cream-50 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span lang={isSpanish ? 'en' : 'es'}>{t('hb_class.page.language_toggle')}</span>
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-coral-300 mb-3">
              {t('hb_class.page.eyebrow')}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-terracotta mb-4">{t('hb_class.page.title')}</h1>
            <p className="text-lg text-terracotta/80 max-w-2xl mx-auto">{t('hb_class.page.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-bold text-terracotta mb-4">{t('hb_class.page.details_title')}</h2>
                <ul className="space-y-3">
                  {detailItems.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-coral-300 mt-0.5 flex-shrink-0" />
                      <span className="text-terracotta">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {isOpen && (
                <div className="card">
                  <h2 className="text-2xl font-bold text-terracotta mb-4">{t('hb_class.page.steps_title')}</h2>
                  <ol className="space-y-4">
                    {steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-coral-300 text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-terracotta leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="lg:row-span-2">
              {!isOpen ? renderClosed() : registration ? renderSuccess(registration) : renderForm()}
            </div>

            <div className="card">
              <img
                src="/hypnobirthing-logo.png"
                alt="HypnoBirthing International — The Mongan Method"
                className="w-full max-w-xs mx-auto mb-6 logo-transparent"
              />
              <h2 className="text-2xl font-bold text-terracotta mb-4">{t('hypnobirthing.what_you_learn')}</h2>
              <ul className="space-y-2 mb-6">
                {(t('hypnobirthing.benefits', { returnObjects: true }) as string[]).map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-coral-300 mt-1 flex-shrink-0" />
                    <span className="text-terracotta">{benefit}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://hypnobirthing.com/directory/hypnobirthing/the-woodlands/viomar-guerere/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta underline underline-offset-2 hover:text-coral-200"
              >
                <ExternalLink className="w-4 h-4" />
                {t('hypnobirthing_form.directory_badge')}
              </a>
            </div>
          </div>
        </main>

        <footer className="py-6 px-4 text-center" style={{ backgroundColor: '#D17D44', color: '#FAF3E3' }}>
          <p className="text-sm">{t('footer.copyright')}</p>
        </footer>
      </div>
    </>
  );
};

export default HypnobirthingClassPage;
