import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Calendar,
  Baby,
  Users,
  MessageCircle
} from 'lucide-react';
import { trackButtonClick } from '../utils/navigation';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'hypnobirthing', href: '#hypnobirthing' },
    { key: 'coaching', href: '#coaching' },
    { key: 'calculator', href: '#calculator' }
  ];

  const serviceLinks = [
    { name: 'Birth Support', href: '#services' },
    { name: 'Postpartum Care', href: '#services' },
    { name: 'HypnoBirthing® Classes', href: '#hypnobirthing' },
    { name: 'Motherhood Coaching', href: '#coaching' },
    { name: 'Due Date Calculator', href: '#calculator' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFreeConsultation = () => {
    trackButtonClick('Footer Free Consultation');
    scrollToSection('#contact');
  };

  return (
    <footer style={{ backgroundColor: '#D17D44', color: '#FAF3E3' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/VD_SECONDARY-LOGO_CREAM.png" 
                alt="Vio La Doula - Professional Doula Services Houston"
                className="w-12 h-12 object-contain mr-3"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3 className="text-xl font-bold" style={{ color: '#FAF3E3' }}>Vio La Doula</h3>
                <p className="text-sm" style={{ color: '#FAF3E3', opacity: 0.8 }}>Full Spectrum Doula</p>
              </div>
            </div>
            <p className="text-cream-50 mb-6 leading-relaxed">
              {t('footer.tagline')}
            </p>
            
            {/* Social Media Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-cream-50">{t('footer.follow_us')}</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/vio_ladoula" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-coral-300 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/vio.ladoula" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-coral-300 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com/@vio_ladoula" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-coral-300 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-cream-50 mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream-50 hover:text-coral-300 transition-colors duration-300 text-left"
                  >
                    {t(`nav.${link.key}`)}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="text-cream-50 hover:text-coral-300 transition-colors duration-300"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-cream-50 mb-4">{t('footer.services_links')}</h4>
            <ul className="space-y-2">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-cream-50 hover:text-coral-300 transition-colors duration-300 text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-cream-50 mb-4">{t('footer.contact_info')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-coral-300 flex-shrink-0" />
                <div>
                  <p className="text-cream-50">(346) 380-8476</p>
                  <p className="text-xs text-cream-50">Available 24/7</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-coral-300 flex-shrink-0" />
                <div>
                  <p className="text-cream-50">violadoula@gmail.com</p>
                  <p className="text-xs text-cream-50">Response within 24hrs</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-coral-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-cream-50">{t('contact.info.location')}</p>
                  <p className="text-xs text-cream-50">Virtual support available</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <button
                onClick={handleFreeConsultation}
                className="w-full bg-coral-300 hover:bg-coral-200 text-cream-50 px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                <span>Free Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-cream-50 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Link
                  to="/privacy-policy"
                  className="text-cream-50 hover:text-coral-300 transition-colors duration-300"
                >
                  {t('footer.privacy')}
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  to="/terms-of-service"
                  className="text-cream-50 hover:text-coral-300 transition-colors duration-300"
                >
                  {t('footer.terms')}
                </Link>
              </div>
            </div>

            {/* Professional Badges */}
            <div className="flex items-center space-x-4 text-xs text-cream-50">
              <div className="flex items-center space-x-1">
                <Baby className="w-3 h-3" />
                <span>Certified Doula</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>Bilingual Support</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Strip */}
      <div style={{ backgroundColor: '#F48EAB' }} className="text-cream-50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Heart className="w-4 h-4" />
            <span className="font-medium">In active labor? Call or text (346) 380-8476 immediately</span>
            <Heart className="w-4 h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;