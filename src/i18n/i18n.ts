import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      }
    },
    // No `lng` here: setting it skips the language detector entirely
    supportedLngs: ['en', 'es'],
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      // ?lang=es (the hreflang URLs in sitemap.xml / seo.ts), then the saved choice, then the browser
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
      // Reduce es-MX, es-419, en-US... to 'es' / 'en' so i18n.language is always
      // exactly one of supportedLngs (components compare it with === 'es')
      convertDetectedLanguage: (lng: string) => lng.split(/[-_]/)[0].toLowerCase()
    }
  });

export default i18n;