// JSON-LD structured data schemas for VioLaDoula website
import { businessHours } from './seo';

// Person schema for Viomar Güerere
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Viomar Güerere',
  alternateName: 'Vio',
  description: 'Certified full-spectrum doula, HypnoBirthing® educator, and motherhood coach serving the Greater North Houston area',
  image: 'https://www.violadoula.com/Viomar_Professional_Portrait.jpg',
  url: 'https://www.violadoula.com',
  sameAs: [
    'https://www.violadoula.com',
    // Add social media URLs when available
  ],
  jobTitle: 'Full-Spectrum Doula & HypnoBirthing® Educator',
  worksFor: {
    '@type': 'Organization',
    name: 'Vio La Doula'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'The Woodlands',
    addressRegion: 'TX',
    addressCountry: 'US',
    areaServed: 'Greater North Houston Area'
  },
  knowsLanguage: [
    {
      '@type': 'Language',
      name: 'English',
      alternateName: 'en'
    },
    {
      '@type': 'Language',
      name: 'Spanish',
      alternateName: 'es'
    }
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certified Full-Spectrum Doula',
      credentialCategory: 'Certification'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certified HypnoBirthing® Educator',
      credentialCategory: 'Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'HypnoBirthing® Institute'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certified Motherhood Coach',
      credentialCategory: 'Certification'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'CPR & First Aid Certified',
      credentialCategory: 'Certification'
    }
  ]
};

// Professional Service schema for doula services
export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Vio La Doula',
  description: 'Professional doula services including birth support, postpartum care, HypnoBirthing® education, and motherhood coaching',
  url: 'https://www.violadoula.com',
  logo: 'https://www.violadoula.com/VD_ARCH-LOGO_CREAM.png',
  image: 'https://www.violadoula.com/VD_ARCH-LOGO_CREAM.png',
  telephone: '+1-XXX-XXX-XXXX', // Add actual phone number
  email: 'info@violadoula.com', // Add actual email
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'The Woodlands',
    addressRegion: 'TX',
    addressCountry: 'US',
    areaServed: {
      '@type': 'Place',
      name: 'The Woodlands and Greater North Houston Area'
    }
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.1588,
    longitude: -95.4892
  },
  openingHoursSpecification: businessHours.map(hours => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${hours.dayOfWeek}`,
    opens: hours.opens,
    closes: hours.closes
  })),
  serviceType: [
    'Birth Doula Services',
    'Postpartum Doula Services',
    'HypnoBirthing® Classes',
    'Motherhood Coaching',
    'Prenatal Support',
    'Labor Support',
    'Birth Plan Assistance'
  ],
  availableLanguage: ['English', 'Spanish'],
  priceRange: '$350 - $1,800',
  paymentAccepted: ['Cash', 'Credit Card', 'Check', 'Bank Transfer'],
  currenciesAccepted: 'USD',
  founder: {
    '@type': 'Person',
    name: 'Viomar Güerere',
    alternateName: 'Vio'
  },
  employee: {
    '@type': 'Person',
    name: 'Viomar Güerere',
    alternateName: 'Vio',
    jobTitle: 'Full-Spectrum Doula & HypnoBirthing® Educator'
  }
};

// Service schemas for specific offerings
export const birthSupportServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Birth Doula Services',
  description: 'Comprehensive birth support including prenatal visits, labor support, and postpartum care',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Vio La Doula'
  },
  serviceType: 'Birth Doula Support',
  areaServed: {
    '@type': 'Place',
    name: 'The Woodlands and Greater North Houston Area'
  },
  availableLanguage: ['English', 'Spanish'],
  offers: [
    {
      '@type': 'Offer',
      name: 'Basic Birth Support',
      description: 'Essential support for your birth experience including 1 prenatal visit, continuous support, labor support, 1 postpartum visit, and birth plan creation',
      price: '1300',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString()
    },
    {
      '@type': 'Offer',
      name: 'Complete Birth Experience',
      description: 'Comprehensive support from pregnancy to postpartum including 2 prenatal visits, continuous support, labor support, 2 postpartum visits, and birth plan creation',
      price: '1500',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString()
    },
    {
      '@type': 'Offer',
      name: 'Complete Birth Experience + HypnoBirthing®',
      description: 'Complete birth support plus HypnoBirthing® education',
      price: '1800',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString()
    }
  ]
};

export const hypnobirthingCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'HypnoBirthing® Classes',
  description: 'Learn relaxation and mindfulness techniques to reduce fear and pain while increasing confidence and control during childbirth',
  provider: {
    '@type': 'Person',
    name: 'Viomar Güerere',
    alternateName: 'Vio'
  },
  courseMode: ['In-person', 'Virtual', 'Hybrid'],
  educationalCredentialAwarded: 'HypnoBirthing® Completion Certificate',
  timeRequired: 'P5W', // 5 weeks
  availableLanguage: ['English', 'Spanish'],
  location: {
    '@type': 'Place',
    name: 'The Woodlands and Greater North Houston Area'
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Group HypnoBirthing® Course',
      description: '5-week group course for couples',
      price: '350',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    {
      '@type': 'Offer',
      name: 'Individual HypnoBirthing® Sessions',
      description: 'One-on-one HypnoBirthing® training for couples',
      price: '650',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  ],
  syllabusSections: [
    {
      '@type': 'Syllabus',
      name: 'Deep relaxation techniques'
    },
    {
      '@type': 'Syllabus',
      name: 'Breathing methods for labor'
    },
    {
      '@type': 'Syllabus',
      name: 'Visualization and affirmations'
    },
    {
      '@type': 'Syllabus',
      name: 'Partner support techniques'
    },
    {
      '@type': 'Syllabus',
      name: 'Understanding the birth process'
    },
    {
      '@type': 'Syllabus',
      name: 'Creating a positive birth environment'
    }
  ]
};

export const coachingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Motherhood Coaching',
  description: 'Personalized support for your parenting journey through one-on-one coaching sessions',
  provider: {
    '@type': 'Person',
    name: 'Viomar Güerere',
    alternateName: 'Vio'
  },
  serviceType: 'Life Coaching',
  category: 'Motherhood & Parenting',
  areaServed: {
    '@type': 'Place',
    name: 'The Woodlands and Greater North Houston Area'
  },
  availableLanguage: ['English', 'Spanish'],
  offers: [
    {
      '@type': 'Offer',
      name: 'Prenatal Coaching Session',
      description: 'Prepare mentally and emotionally for birth and parenthood',
      price: '75',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    {
      '@type': 'Offer',
      name: 'Postpartum Coaching Session',
      description: 'Navigate the challenges of early motherhood with confidence',
      price: '75',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  ]
};

// Website schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vio La Doula',
  url: 'https://www.violadoula.com',
  description: 'Professional doula services and HypnoBirthing® education with Viomar Güerere serving Greater North Houston area',
  publisher: {
    '@type': 'Person',
    name: 'Viomar Güerere',
    alternateName: 'Vio'
  },
  inLanguage: ['en', 'es'],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.violadoula.com/?s={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

// Local Business schema (comprehensive)
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
  '@id': 'https://www.violadoula.com/#business',
  name: 'Vio La Doula',
  alternateName: 'VioLaDoula',
  description: 'Professional birth doula, HypnoBirthing® instructor, and motherhood coach serving families in Greater North Houston area with bilingual support',
  url: 'https://www.violadoula.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.violadoula.com/VD_ARCH-LOGO_CREAM.png',
    width: 500,
    height: 500
  },
  image: [
    'https://www.violadoula.com/VD_ARCH-LOGO_CREAM.png',
    'https://www.violadoula.com/Viomar_Professional_Portrait.jpg'
  ],
  telephone: '+1-XXX-XXX-XXXX', // Add actual phone
  email: 'info@violadoula.com', // Add actual email
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'The Woodlands',
    addressRegion: 'TX',
    addressCountry: 'US',
    areaServed: [
      {
        '@type': 'City',
        name: 'Houston',
        containedInPlace: {
          '@type': 'State',
          name: 'Texas'
        }
      },
      {
        '@type': 'Place',
        name: 'The Woodlands and Greater North Houston Area'
      }
    ]
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.1588,
    longitude: -95.4892
  },
  openingHoursSpecification: businessHours.map(hours => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${hours.dayOfWeek}`,
    opens: hours.opens,
    closes: hours.closes
  })),
  priceRange: '$350 - $1,800',
  paymentAccepted: ['Cash', 'Credit Card', 'Check', 'Bank Transfer'],
  currenciesAccepted: 'USD',
  availableLanguage: ['English', 'Spanish'],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 29.7604,
      longitude: -95.3698
    },
    geoRadius: '50' // 50 mile radius
  },
  founder: personSchema,
  employee: personSchema,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Doula Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Birth Support Services',
        itemListElement: birthSupportServiceSchema.offers
      },
      {
        '@type': 'OfferCatalog',
        name: 'HypnoBirthing® Classes',
        itemListElement: hypnobirthingCourseSchema.offers
      },
      {
        '@type': 'OfferCatalog',
        name: 'Motherhood Coaching',
        itemListElement: coachingServiceSchema.offers
      }
    ]
  },
  sameAs: [
    // Add social media URLs when available
    'https://www.violadoula.com'
  ]
};

// Breadcrumb list schema generator
export const generateBreadcrumbSchema = (path: string[], language: 'en' | 'es') => {
  const translations = {
    en: {
      'home': 'Home',
      'about': 'About',
      'services': 'Services',
      'hypnobirthing': 'HypnoBirthing®',
      'coaching': 'Coaching',
      'contact': 'Contact'
    },
    es: {
      'home': 'Inicio',
      'about': 'Acerca de',
      'services': 'Servicios',
      'hypnobirthing': 'HypnoBirthing®',
      'coaching': 'Coaching',
      'contact': 'Contacto'
    }
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: path.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: translations[language][item as keyof typeof translations[typeof language]] || item,
      item: `https://www.violadoula.com${index === 0 ? '' : `/${item}`}`
    }))
  };
};

export default {
  personSchema,
  professionalServiceSchema,
  birthSupportServiceSchema,
  hypnobirthingCourseSchema,
  coachingServiceSchema,
  websiteSchema,
  localBusinessSchema,
  generateBreadcrumbSchema
};