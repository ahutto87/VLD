import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, MapPin, Globe, CheckCircle } from 'lucide-react';
import { sendHypnoBirthingEnrollment } from '../utils/emailService';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  dueDate: string;
  partnerName?: string;
  birthExperience: string;
  courseFormat: string;
  preferredLanguage: string;
  specialAccommodations?: string;
  howDidYouHear: string;
  additionalComments?: string;
  acceptTerms: boolean;
}

const HypnobirthingForm: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const success = await sendHypnoBirthingEnrollment(data);
      if (success) {
        setIsSubmitted(true);
        reset();
      } else {
        console.error('Failed to send enrollment email');
        // Could add error state here in the future
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isSubmitted) {
    return (
      <section id="hypnobirthing" className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Enrollment Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for enrolling in our HypnoBirthing® course. We'll contact you within 24 hours to confirm your spot and provide additional details.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Enroll Another Person
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hypnobirthing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Course Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {t('hypnobirthing.title')}
              </h2>
              <p className="text-xl text-coral-300 font-medium mb-6">
                {t('hypnobirthing.subtitle')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('hypnobirthing.description')}
              </p>
            </div>

            {/* Course Details */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Course Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-coral-300" />
                  <span className="text-gray-600">{t('hypnobirthing.course_info.duration')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-coral-300" />
                  <span className="text-gray-600">{t('hypnobirthing.course_info.format')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-coral-300" />
                  <span className="text-gray-600">{t('hypnobirthing.course_info.language')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-coral-300" />
                  <span className="text-gray-600 font-semibold text-lg">{t('hypnobirthing.course_info.price')}</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t('hypnobirthing.what_you_learn')}
              </h3>
              <ul className="space-y-2">
                {(t('hypnobirthing.benefits', { returnObjects: true }) as string[]).map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-coral-300 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enrollment Form */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Course Enrollment Form
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('fullName', { required: 'Full name is required' })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email'
                    }
                  })}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  {...register('phone', { required: 'Phone number is required' })}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <input
                  {...register('dueDate', { required: 'Due date is required' })}
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                />
                {errors.dueDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
                )}
              </div>

              {/* Partner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner's Name (Optional)
                </label>
                <input
                  {...register('partnerName')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                  placeholder="Partner's full name"
                />
              </div>

              {/* Birth Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Birth Experience *
                </label>
                <select
                  {...register('birthExperience', { required: 'Please select your birth experience' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                >
                  <option value="">Select your experience</option>
                  <option value="first-baby">First baby</option>
                  <option value="second-baby">Second baby</option>
                  <option value="third-plus">Third baby or more</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.birthExperience && (
                  <p className="text-red-500 text-sm mt-1">{errors.birthExperience.message}</p>
                )}
              </div>

              {/* Course Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Course Format *
                </label>
                <select
                  {...register('courseFormat', { required: 'Please select a format' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                >
                  <option value="">Select format</option>
                  <option value="in-person">In-person</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                {errors.courseFormat && (
                  <p className="text-red-500 text-sm mt-1">{errors.courseFormat.message}</p>
                )}
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Language for Course *
                </label>
                <select
                  {...register('preferredLanguage', { required: 'Please select a language' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                >
                  <option value="">Select language</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="both">Both English and Spanish</option>
                </select>
                {errors.preferredLanguage && (
                  <p className="text-red-500 text-sm mt-1">{errors.preferredLanguage.message}</p>
                )}
              </div>

              {/* How did you hear */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about us? *
                </label>
                <select
                  {...register('howDidYouHear', { required: 'Please let us know how you found us' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="google">Google search</option>
                  <option value="social-media">Social media</option>
                  <option value="referral">Friend/family referral</option>
                  <option value="healthcare-provider">Healthcare provider</option>
                  <option value="birth-center">Birth center</option>
                  <option value="other">Other</option>
                </select>
                {errors.howDidYouHear && (
                  <p className="text-red-500 text-sm mt-1">{errors.howDidYouHear.message}</p>
                )}
              </div>

              {/* Special Accommodations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Accommodations Needed
                </label>
                <textarea
                  {...register('specialAccommodations')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                  placeholder="Please describe any accommodations you may need..."
                />
              </div>

              {/* Additional Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Questions or Comments
                </label>
                <textarea
                  {...register('additionalComments')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                  placeholder="Any questions or additional information you'd like to share..."
                />
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start space-x-3">
                  <input
                    {...register('acceptTerms', { required: 'You must accept the terms and conditions' })}
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-coral-300 border-gray-300 rounded focus:ring-coral-300"
                  />
                  <span className="text-sm text-gray-600">
                    I accept the terms and conditions and understand the course policies including payment terms and cancellation policy. *
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-sm mt-1">{errors.acceptTerms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Enroll in Course'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HypnobirthingForm;