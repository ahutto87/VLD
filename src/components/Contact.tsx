import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Calendar,
  Heart,
  Plus,
  Minus
} from 'lucide-react';
import { FloralBorder } from './DecorativeElements';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  dueDate?: string;
  service: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Contact form submitted:', data);
      setIsSubmitted(true);
      reset();
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const serviceOptions = [
    'Basic Birth Support',
    'Complete Birth Experience', 
    'Postpartum Care Package',
    'Full Spectrum Support',
    'HypnoBirthing® Classes',
    'Motherhood Coaching',
    'General Consultation'
  ];

  const faqs = [
    {
      question: 'When should I hire a doula?',
      answer: 'The best time to hire a doula is during your second trimester (around 20-24 weeks), but I accept clients throughout pregnancy and even during labor if needed.'
    },
    {
      question: 'Do you attend births at all hospitals?',
      answer: 'Yes, I support births at all hospitals, birth centers, and home births throughout the Greater Austin area. I work collaboratively with your medical team.'
    },
    {
      question: 'What if my baby comes early or late?',
      answer: 'I am on call 24/7 starting at 37 weeks gestation until your baby arrives, regardless of timing. There are no additional fees for early or late births.'
    },
    {
      question: 'Do you provide virtual support?',
      answer: 'Yes! I offer virtual prenatal visits, labor support via video call, and postpartum consultations for families who prefer remote support or live far away.'
    },
    {
      question: 'What languages do you speak?',
      answer: 'I provide full doula services in both English and Spanish, ensuring comfortable communication throughout your journey.'
    },
    {
      question: 'Do you accept insurance?',
      answer: 'While I don\'t directly bill insurance, I can provide receipts for potential reimbursement. Many HSA/FSA accounts cover doula services. I also offer payment plans.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
          
          {/* Decorative border */}
          <FloralBorder className="mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Send a Message
              </h3>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">
                      {t('common.success')}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.due_date')}
                    </label>
                    <input
                      {...register('dueDate')}
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.service')}
                  </label>
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-300 focus:border-transparent"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-300 focus:border-transparent resize-none"
                    placeholder="Tell me about your birth vision and how I can support you..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('contact.form.submit')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-coral-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{t('contact.info.phone')}</h4>
                    <p className="text-gray-600">(512) 555-DOULA</p>
                    <p className="text-sm text-gray-500 mt-1">Call or text anytime</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-sage-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{t('contact.info.email')}</h4>
                    <p className="text-gray-600">hello@violadoula.com</p>
                    <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-lavender-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Service Area</h4>
                    <p className="text-gray-600">{t('contact.info.location')}</p>
                    <p className="text-sm text-gray-500 mt-1">Travel fees may apply outside metro area</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cream-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Availability</h4>
                    <p className="text-gray-600">{t('contact.info.hours')}</p>
                    <p className="text-sm text-gray-500 mt-1">On-call for active labor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-800 pr-4">
                        {faq.question}
                      </span>
                      {openFAQ === index ? (
                        <Minus className="w-5 h-5 text-coral-300 flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-coral-300 flex-shrink-0" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="card bg-gradient-to-r from-coral-100 to-sage-100">
              <div className="text-center">
                <Heart className="w-12 h-12 text-coral-300 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Ready to Begin?
                </h4>
                <p className="text-gray-600 mb-4">
                  Schedule your free 30-minute consultation to discuss your birth vision and see if we're a good fit.
                </p>
                <button className="btn-primary">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;