import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, ExternalLink, Clock, MapPin, Globe } from 'lucide-react';
import { sendHypnoBirthingEnrollment, sendAutoReply } from '../utils/emailService';
import { FloralDecor } from './DecorativeElements';

interface FormData {
  fullName: string;
  email: string;
  dueDate: string;
  courseFormat: string;
  message?: string;
  agreeToTerms: boolean;
}

const HypnobirthingForm: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setSubmitError(false);
    try {
      await sendHypnoBirthingEnrollment({
        fullName: data.fullName,
        email: data.email,
        phone: '',
        dueDate: data.dueDate,
        partnerName: '',
        birthExperience: '',
        courseFormat: data.courseFormat,
        preferredLanguage: '',
        specialAccommodations: '',
        howDidYouHear: '',
        additionalComments: data.message || '',
        acceptTerms: data.agreeToTerms,
      });
      await sendAutoReply(data.email, data.fullName, 'hypnobirthing');
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-2xl border ${hasError ? 'border-red-400 bg-red-50' : 'border-coral-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-coral-300 transition-colors`;

  return (
    <section id="hypnobirthing-form" className="relative section-padding overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/watercolor-pattern-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="card">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              {t('hypnobirthing_form.title')}
            </h2>
            <p className="text-xl text-coral-300 font-medium mb-5">
              {t('hypnobirthing_form.subtitle')}
            </p>
            <a
              href="https://hypnobirthing.com/directory/hypnobirthing/the-woodlands/viomar-guerere/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-coral-100 text-coral-400 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-coral-200 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              {t('hypnobirthing_form.directory_badge')}
            </a>
            <div className="flex justify-center mt-6">
              <FloralDecor color="#FCA669" className="w-12 h-12 opacity-30" />
            </div>
          </div>

          {/* HypnoBirthing Description */}
          <div className="mb-8">
            <p className="text-gray-600 leading-relaxed text-center mb-6">
              {t('hypnobirthing.description')}
            </p>

            {/* Course Info */}
            <div className="bg-coral-50 rounded-2xl p-5 mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-coral-300 flex-shrink-0" />
                <span className="text-gray-600">{t('hypnobirthing.course_info.duration')}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-coral-300 flex-shrink-0" />
                <span className="text-gray-600">{t('hypnobirthing.course_info.format')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-coral-300 flex-shrink-0" />
                <span className="text-gray-600">{t('hypnobirthing.course_info.language')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-coral-300 flex-shrink-0" />
                <span className="text-gray-600 font-semibold">{t('hypnobirthing.course_info.price')}</span>
              </div>
            </div>

            {/* What You'll Learn */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {t('hypnobirthing.what_you_learn')}
              </h3>
              <ul className="space-y-2">
                {(t('hypnobirthing.benefits', { returnObjects: true }) as string[]).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-coral-300 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-coral-100 mb-8"></div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {t('hypnobirthing_form.success_title')}
              </h3>
              <p className="text-gray-500 text-lg">{t('hypnobirthing_form.success_message')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t('hypnobirthing_form.full_name')} *
                </label>
                <input
                  type="text"
                  placeholder={t('hypnobirthing_form.full_name_placeholder')}
                  className={inputClass(!!errors.fullName)}
                  {...register('fullName', { required: true })}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t('hypnobirthing_form.email')} *
                </label>
                <input
                  type="email"
                  placeholder={t('hypnobirthing_form.email_placeholder')}
                  className={inputClass(!!errors.email)}
                  {...register('email', { required: true })}
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <Calendar className="inline w-4 h-4 mr-1 text-coral-300" />
                  {t('hypnobirthing_form.due_date')} *
                </label>
                <input
                  type="date"
                  className={inputClass(!!errors.dueDate)}
                  {...register('dueDate', { required: true })}
                />
              </div>

              {/* Course Format */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t('hypnobirthing_form.course_format')} *
                </label>
                <select
                  className={inputClass(!!errors.courseFormat)}
                  {...register('courseFormat', { required: true })}
                >
                  <option value="">{t('hypnobirthing_form.select_format')}</option>
                  <option value="in-person">{t('hypnobirthing_form.format_inperson')}</option>
                  <option value="virtual">{t('hypnobirthing_form.format_virtual')}</option>
                  <option value="hybrid">{t('hypnobirthing_form.format_hybrid')}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t('hypnobirthing_form.message')}
                </label>
                <textarea
                  rows={4}
                  placeholder={t('hypnobirthing_form.message_placeholder')}
                  className="w-full px-4 py-3 rounded-2xl border border-coral-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral-300 transition-colors resize-none"
                  {...register('message')}
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  className="mt-0.5 w-4 h-4 accent-coral-300 cursor-pointer"
                  {...register('agreeToTerms', { required: true })}
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-500 cursor-pointer leading-relaxed">
                  {t('hypnobirthing_form.agree_prefix')}{' '}
                  <Link to="/terms-of-service" className="text-coral-300 underline underline-offset-2 hover:text-coral-400">
                    {t('hypnobirthing_form.terms_link')}
                  </Link>{' '}
                  {t('hypnobirthing_form.and')}{' '}
                  <Link to="/privacy-policy" className="text-coral-300 underline underline-offset-2 hover:text-coral-400">
                    {t('hypnobirthing_form.privacy_link')}
                  </Link>. *
                </label>
              </div>

              {submitError && (
                <p className="text-red-500 text-sm text-center">{t('common.error')}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-coral-300 text-white font-semibold rounded-2xl hover:bg-coral-400 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-lg mt-2"
              >
                {isLoading ? t('common.loading') : t('hypnobirthing_form.submit')}
              </button>

            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default HypnobirthingForm;
