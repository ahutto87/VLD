// SEO utilities and configurations for VioLaDoula website
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  lang?: 'en' | 'es';
}

// Base SEO configuration
export const baseSEOConfig = {
  siteName: 'Vio La Doula',
  siteUrl: 'https://www.violadoula.com',
  defaultImage: '/VD_ARCH-LOGO_CREAM.png',
  defaultKeywords: [
    'doula',
    'birth doula',
    'postpartum doula',
    'HypnoBirthing',
    'motherhood coach',
    'birth support',
    'pregnancy support',
    'The Woodlands doula',
    'Woodlands doula',
    'Houston doula',
    'North Houston doula',
    'Spring doula',
    'Conroe doula',
    'bilingual doula',
    'Spanish doula',
    'Latina doula',
    'Viomar Guerere'
  ]
};

// SEO configurations for different pages/sections
export const seoConfigs: Record<string, Record<'en' | 'es', SEOConfig>> = {
  home: {
    en: {
      title: 'Professional Doula Services | The Woodlands & Houston | Vio La Doula',
      description: 'Professional doula services in The Woodlands, Spring, and Greater North Houston area. Birth support, HypnoBirthing® classes, and motherhood coaching with Vio - your bilingual Latina doula.',
      keywords: [
        'The Woodlands doula',
        'Woodlands doula',
        'Spring doula',
        'Conroe doula',
        'Houston doula',
        'North Houston doula',
        'birth doula The Woodlands',
        'HypnoBirthing The Woodlands',
        'bilingual doula',
        'Latina doula',
        'pregnancy support Woodlands',
        'birth support Texas'
      ],
      ogType: 'website',
      ogImage: '/VD_ARCH-LOGO_CREAM.png',
      lang: 'en'
    },
    es: {
      title: 'Servicios Profesionales de Doula | The Woodlands y Houston | Vio La Doula',
      description: 'Servicios profesionales de doula en The Woodlands, Spring y el área del Norte de Houston. Apoyo de parto, clases de HypnoBirthing® y coaching de maternidad con Vio - tu doula Latina bilingüe.',
      keywords: [
        'doula The Woodlands',
        'doula Woodlands',
        'doula Spring',
        'doula Conroe',
        'doula Houston',
        'doula Norte de Houston',
        'doula de parto The Woodlands',
        'HypnoBirthing The Woodlands',
        'doula bilingüe',
        'doula Latina',
        'apoyo embarazo Woodlands',
        'apoyo parto Texas'
      ],
      ogType: 'website',
      ogImage: '/VD_ARCH-LOGO_CREAM.png',
      lang: 'es'
    }
  },
  about: {
    en: {
      title: 'About Vio La Doula | Professional Birth Doula | Houston, TX',
      description: 'Meet Viomar Güerere (Vio), a certified full-spectrum doula and HypnoBirthing® educator serving Greater North Houston. Bilingual support in English and Spanish.',
      keywords: [
        'Viomar Guerere',
        'Vio La Doula',
        'certified full-spectrum doula',
        'HypnoBirthing educator',
        'motherhood coach',
        'bilingual doula Houston'
      ],
      ogType: 'profile',
      ogImage: '/Viomar_Professional_Portrait.jpg',
      lang: 'en'
    },
    es: {
      title: 'Acerca de Vio La Doula | Doula Profesional de Parto | Houston, TX',
      description: 'Conoce a Viomar Güerere (Vio), doula certificada de parto e instructora de HypnoBirthing® sirviendo al área del Norte de Houston. Apoyo bilingüe en inglés y español.',
      keywords: [
        'Viomar Guerere',
        'Vio La Doula',
        'doula certificada de parto',
        'instructora HypnoBirthing',
        'Doulas of Discernment',
        'Facilitadora Mama Rising',
        'doula bilingüe The Woodlands'
      ],
      ogType: 'profile',
      ogImage: '/Viomar_Professional_Portrait.jpg',
      lang: 'es'
    }
  },
  services: {
    en: {
      title: 'Birth & Postpartum Doula Services | The Woodlands | Vio La Doula',
      description: 'Comprehensive doula support packages in The Woodlands and Houston area. Birth support, postpartum care, and complete packages starting at $1,300. Bilingual services available.',
      keywords: [
        'birth doula services The Woodlands',
        'postpartum doula The Woodlands',
        'doula packages Woodlands',
        'labor support',
        'birth plan assistance',
        'prenatal support',
        'postpartum support'
      ],
      ogType: 'website',
      lang: 'en'
    },
    es: {
      title: 'Servicios de Doula de Parto y Postparto | The Woodlands | Vio La Doula',
      description: 'Paquetes integrales de apoyo de doula en The Woodlands y área de Houston. Apoyo de parto, cuidado postparto y paquetes completos desde $1,300. Servicios bilingües disponibles.',
      keywords: [
        'servicios doula parto The Woodlands',
        'doula postparto The Woodlands',
        'paquetes doula Woodlands',
        'apoyo labor parto',
        'asistencia plan parto',
        'apoyo prenatal',
        'apoyo postparto'
      ],
      ogType: 'website',
      lang: 'es'
    }
  },
  hypnobirthing: {
    en: {
      title: 'HypnoBirthing® Classes | Certified Instructor | The Woodlands, TX',
      description: 'HypnoBirthing® classes in The Woodlands and Houston area with certified instructor Vio. Group courses $350, individual sessions $595. Available in English and Spanish.',
      keywords: [
        'HypnoBirthing classes The Woodlands',
        'HypnoBirthing instructor The Woodlands',
        'birth preparation classes',
        'natural birth techniques',
        'pain-free birth Houston',
        'relaxation techniques birth'
      ],
      ogType: 'website',
      lang: 'en'
    },
    es: {
      title: 'Clases de HypnoBirthing® | Instructora Certificada | The Woodlands, TX',
      description: 'Clases de HypnoBirthing® en The Woodlands y área de Houston con la instructora certificada Vio. Cursos grupales $350, sesiones individuales $595. Disponible en inglés y español.',
      keywords: [
        'clases HypnoBirthing The Woodlands',
        'instructora HypnoBirthing The Woodlands',
        'clases preparación parto',
        'técnicas parto natural',
        'parto sin dolor Houston',
        'técnicas relajación parto'
      ],
      ogType: 'website',
      lang: 'es'
    }
  },
  coaching: {
    en: {
      title: 'Motherhood Coaching Services | The Woodlands | Vio La Doula',
      description: 'Personalized motherhood coaching in The Woodlands and Houston area. Prenatal and postpartum coaching sessions $75 each. Support for your parenting journey.',
      keywords: [
        'motherhood coaching The Woodlands',
        'prenatal coaching',
        'postpartum coaching',
        'parenting support The Woodlands',
        'pregnancy coaching',
        'new mom support'
      ],
      ogType: 'website',
      lang: 'en'
    },
    es: {
      title: 'Servicios de Coaching de Maternidad | The Woodlands | Vio La Doula',
      description: 'Coaching personalizado de maternidad en The Woodlands y área de Houston. Sesiones de coaching prenatal y postparto $75 cada una. Apoyo para tu viaje de crianza.',
      keywords: [
        'coaching maternidad The Woodlands',
        'coaching prenatal',
        'coaching postparto',
        'apoyo crianza The Woodlands',
        'coaching embarazo',
        'apoyo nueva mamá'
      ],
      ogType: 'website',
      lang: 'es'
    }
  },
  contact: {
    en: {
      title: 'Contact Vio La Doula | Free Consultation | The Woodlands, TX',
      description: 'Contact Vio La Doula for professional birth support in The Woodlands and Greater North Houston area. Schedule your free consultation today. Bilingual services available.',
      keywords: [
        'contact doula The Woodlands',
        'free doula consultation Woodlands',
        'The Woodlands birth support',
        'doula consultation',
        'birth doula contact'
      ],
      ogType: 'website',
      lang: 'en'
    },
    es: {
      title: 'Contacta Vio La Doula | Consulta Gratuita | The Woodlands, TX',
      description: 'Contacta a Vio La Doula para apoyo profesional de parto en The Woodlands y el área del Norte de Houston. Programa tu consulta gratuita hoy. Servicios bilingües disponibles.',
      keywords: [
        'contactar doula The Woodlands',
        'consulta gratuita doula Woodlands',
        'apoyo parto The Woodlands',
        'consulta doula',
        'contacto doula parto'
      ],
      ogType: 'website',
      lang: 'es'
    }
  },
  terms: {
    en: {
      title: 'Terms of Service | Vida Buena Vibra LLC | Vio La Doula',
      description: 'Terms of Service for Vida Buena Vibra LLC, doing business as Vio La Doula. Professional doula services in The Woodlands and Greater North Houston area.',
      keywords: [
        'terms of service',
        'Vida Buena Vibra LLC',
        'Vio La Doula terms',
        'doula service agreement'
      ],
      ogType: 'website',
      noindex: true,
      lang: 'en'
    },
    es: {
      title: 'Términos de Servicio | Vida Buena Vibra LLC | Vio La Doula',
      description: 'Términos de Servicio de Vida Buena Vibra LLC, operando como Vio La Doula. Servicios profesionales de doula en The Woodlands y el área del Norte de Houston.',
      keywords: [
        'términos de servicio',
        'Vida Buena Vibra LLC',
        'términos Vio La Doula',
        'acuerdo servicio doula'
      ],
      ogType: 'website',
      noindex: true,
      lang: 'es'
    }
  },
  privacy: {
    en: {
      title: 'Privacy Policy | Vida Buena Vibra LLC | Vio La Doula',
      description: 'Privacy Policy for Vida Buena Vibra LLC, doing business as Vio La Doula. Learn how we protect your personal information.',
      keywords: [
        'privacy policy',
        'Vida Buena Vibra LLC',
        'Vio La Doula privacy',
        'data protection doula'
      ],
      ogType: 'website',
      noindex: true,
      lang: 'en'
    },
    es: {
      title: 'Política de Privacidad | Vida Buena Vibra LLC | Vio La Doula',
      description: 'Política de Privacidad de Vida Buena Vibra LLC, operando como Vio La Doula. Aprenda cómo protegemos su información personal.',
      keywords: [
        'política de privacidad',
        'Vida Buena Vibra LLC',
        'privacidad Vio La Doula',
        'protección datos doula'
      ],
      ogType: 'website',
      noindex: true,
      lang: 'es'
    }
  }
};

// Generate meta tags for a specific page
export const generateSEOTags = (pageKey: keyof typeof seoConfigs, language: 'en' | 'es') => {
  const config = seoConfigs[pageKey]?.[language] || seoConfigs.home[language];
  const canonical = config.canonical || `${baseSEOConfig.siteUrl}${pageKey === 'home' ? '' : `/${pageKey}`}`;
  
  return {
    title: config.title,
    meta: [
      { name: 'description', content: config.description },
      { name: 'keywords', content: [...config.keywords, ...baseSEOConfig.defaultKeywords].join(', ') },
      { name: 'author', content: 'Viomar Güerere (Vio La Doula)' },
      { name: 'robots', content: config.noindex ? 'noindex, nofollow' : 'index, follow' },
      { name: 'language', content: language },
      { name: 'geo.region', content: 'US-TX' },
      { name: 'geo.placename', content: 'The Woodlands, Texas' },
      { name: 'geo.position', content: '30.1588;-95.4892' },
      { name: 'ICBM', content: '30.1588, -95.4892' },
      
      // Open Graph tags
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:type', content: config.ogType || 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: `${baseSEOConfig.siteUrl}${config.ogImage || baseSEOConfig.defaultImage}` },
      { property: 'og:image:alt', content: 'Vio La Doula - Professional Doula Services' },
      { property: 'og:site_name', content: baseSEOConfig.siteName },
      { property: 'og:locale', content: language === 'en' ? 'en_US' : 'es_US' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: `${baseSEOConfig.siteUrl}${config.ogImage || baseSEOConfig.defaultImage}` },
      { name: 'twitter:image:alt', content: 'Vio La Doula - Professional Doula Services' }
    ],
    link: [
      { rel: 'canonical', href: canonical },
      { rel: 'alternate', hreflang: language === 'en' ? 'es' : 'en', href: `${canonical}?lang=${language === 'en' ? 'es' : 'en'}` },
      { rel: 'alternate', hreflang: 'x-default', href: canonical }
    ]
  };
};

// Local business hours for schema
export const businessHours = [
  { dayOfWeek: 'Monday', opens: '09:00', closes: '17:00' },
  { dayOfWeek: 'Tuesday', opens: '09:00', closes: '17:00' },
  { dayOfWeek: 'Wednesday', opens: '09:00', closes: '17:00' },
  { dayOfWeek: 'Thursday', opens: '09:00', closes: '17:00' },
  { dayOfWeek: 'Friday', opens: '09:00', closes: '17:00' },
  { dayOfWeek: 'Saturday', opens: '10:00', closes: '16:00' }
];

export default {
  baseSEOConfig,
  seoConfigs,
  generateSEOTags,
  businessHours
};