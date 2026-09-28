// Upcoming HypnoBirthing® group class — powers /hypnobirthing-class, the homepage
// banner, and the registration emails. For a new cohort, update the values below.

export type ClassLanguage = 'en' | 'es';

export const HYPNOBIRTHING_CLASS = {
  // Registration closes when the first class starts (Central Time).
  firstClassStartsAt: '2026-11-04T18:30:00-06:00',
  fee: 350,
  deposit: 100,
  // Payment details are also written into email-templates/class-welcome.html
  zelle: {
    email: 'viomar.g@gmail.com',
    name: 'Viomar Güerere',
  },
  venmo: {
    handle: 'Viomar-Guerere',
    url: 'https://venmo.com/u/Viomar-Guerere',
  },
  schedule: {
    en: {
      dates: 'Wednesdays, November 4 – December 9, 2026',
      time: '6:30 – 9:00 PM Central Time',
      firstClass: 'Wednesday, November 4',
    },
    es: {
      dates: 'Miércoles, del 4 de noviembre al 9 de diciembre de 2026',
      time: '6:30 – 9:00 p. m. (hora del centro)',
      firstClass: 'miércoles 4 de noviembre',
    },
  },
} as const;

export const isClassRegistrationOpen = (now: Date = new Date()) =>
  now < new Date(HYPNOBIRTHING_CLASS.firstClassStartsAt);

export const toClassLanguage = (language: string | undefined): ClassLanguage =>
  language?.startsWith('es') ? 'es' : 'en';

// Display strings shared by the page, the banner, and the emails
export const getClassDetails = (language: ClassLanguage) => ({
  ...HYPNOBIRTHING_CLASS.schedule[language],
  fee: `$${HYPNOBIRTHING_CLASS.fee}`,
  deposit: `$${HYPNOBIRTHING_CLASS.deposit}`,
  balance: `$${HYPNOBIRTHING_CLASS.fee - HYPNOBIRTHING_CLASS.deposit}`,
});
