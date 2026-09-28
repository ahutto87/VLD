// Email service using EmailJS for client-side email sending
// Note: EmailJS requires setup at emailjs.com with service ID, template IDs, and public key

import i18n from '../i18n/i18n';
import { HYPNOBIRTHING_CLASS, getClassDetails, type ClassLanguage } from './hypnobirthingClass';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  dueDate?: string;
  service: string;
  message: string;
}

interface HypnoBirthingFormData {
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

export interface ClassRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  dueDate: string; // YYYY-MM-DD from the date input
  partnerName: string;
  firstBaby: '' | 'yes' | 'no';
  birthPlace: '' | 'hospital' | 'birth_center' | 'home' | 'unsure';
  message: string;
  language: ClassLanguage;
}

// EmailJS configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_kd7nnoj',
  TEMPLATE_IDS: {
    CONTACT_FORM: 'contact_template', // Contact form template
    HYPNOBIRTHING_ENROLLMENT: 'hypnobirthing_template', // HypnoBirthing enrollment template
    AUTO_REPLY: 'auto_reply_template', // Auto-reply template (available when paid account activates)
    CLASS_REGISTRATION: 'class_signup_template', // Group class registration → Vio (email-templates/)
    CLASS_WELCOME: 'class_welcome_template' // Group class deposit instructions → registrant (email-templates/)
  },
  PUBLIC_KEY: '9l2ro5MAeErk2Bug4'
};

// Live EmailJS implementation for contact form
export const sendContactForm = async (data: ContactFormData): Promise<boolean> => {
  try {
    console.log('📧 Sending contact form submission:', data);
    
    const emailjs = await import('@emailjs/browser');
    
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone,
      due_date: data.dueDate || 'Not specified',
      service_interest: data.service,
      message: data.message,
      to_name: 'Vio La Doula'
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_IDS.CONTACT_FORM,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('✅ Contact form email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Contact form email failed:', error);
    return false;
  }
};

export const sendHypnoBirthingEnrollment = async (data: HypnoBirthingFormData): Promise<boolean> => {
  try {
    console.log('📧 Sending HypnoBirthing enrollment:', data);
    
    const emailjs = await import('@emailjs/browser');
    
    const templateParams = {
      student_name: data.fullName,
      student_email: data.email,
      student_phone: data.phone,
      due_date: data.dueDate,
      partner_name: data.partnerName || 'Not specified',
      birth_experience: data.birthExperience,
      course_format: data.courseFormat,
      preferred_language: data.preferredLanguage,
      special_accommodations: data.specialAccommodations || 'None',
      how_did_you_hear: data.howDidYouHear,
      additional_comments: data.additionalComments || 'None',
      to_name: 'Vio La Doula'
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_IDS.HYPNOBIRTHING_ENROLLMENT,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('✅ HypnoBirthing enrollment email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ HypnoBirthing enrollment email failed:', error);
    return false;
  }
};

// Send auto-reply confirmation to client (requires paid EmailJS account)
export const sendAutoReply = async (clientEmail: string, clientName: string, formType: 'contact' | 'hypnobirthing'): Promise<boolean> => {
  try {
    console.log(`📧 Sending auto-reply to ${clientName} (${clientEmail})`);
    
    const emailjs = await import('@emailjs/browser');
    
    // Customize message based on form type
    const isHypnoBirthing = formType === 'hypnobirthing';
    const serviceType = isHypnoBirthing ? 'HypnoBirthing® enrollment' : 'consultation request';
    const nextSteps = isHypnoBirthing 
      ? 'I will review your enrollment details and send you course materials and payment information within 24 hours.'
      : 'I will personally review your inquiry and get back to you within 24 hours to schedule your free consultation.';
    
    const templateParams = {
      client_name: clientName,
      client_email: clientEmail,
      service_type: serviceType,
      next_steps: nextSteps,
      from_name: 'Vio La Doula',
      business_email: 'hello@violadoula.com',
      business_phone: '(713) 234-5678',
      website_url: 'https://www.violadoula.com'
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_IDS.AUTO_REPLY,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('✅ Auto-reply email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Auto-reply email failed:', error);
    return false;
  }
};

const formatDueDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// HypnoBirthing® group class registration. Notifies Vio first so a registration is
// never lost, then emails the registrant their deposit instructions.
export const sendClassRegistration = async (
  data: ClassRegistrationData
): Promise<{ registered: boolean; welcomeSent: boolean }> => {
  const emailjs = await import('@emailjs/browser').catch((error) => {
    console.error('❌ EmailJS failed to load:', error);
    return null;
  });
  if (!emailjs) return { registered: false, welcomeSent: false };

  const tEn = i18n.getFixedT('en');
  const tStudent = i18n.getFixedT(data.language);
  const detailsForVio = getClassDetails('en');
  const detailsForStudent = getClassDetails(data.language);
  const firstName = data.fullName.split(/\s+/)[0];
  const { zelle, venmo } = HYPNOBIRTHING_CLASS;

  // Pre-written "your spot is reserved" email in the student's language, opened by
  // the mailto button in Vio's notification
  const confirmationBody = tStudent('hb_class.confirmation.body', {
    ...detailsForStudent,
    name: firstName,
    zelleEmail: zelle.email,
    venmoHandle: venmo.handle
  });

  try {
    console.log('📧 Sending HypnoBirthing class registration');
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_IDS.CLASS_REGISTRATION,
      {
        student_name: data.fullName,
        student_email: data.email,
        student_phone: data.phone,
        due_date: formatDueDate(data.dueDate),
        partner_name: data.partnerName || '—',
        first_baby: data.firstBaby ? tEn(`hb_class.form.first_baby_${data.firstBaby}`) : '—',
        birth_place: data.birthPlace ? tEn(`hb_class.form.birth_place_${data.birthPlace}`) : '—',
        message: data.message || '—',
        language: data.language === 'es' ? 'Spanish' : 'English',
        class_dates: detailsForVio.dates,
        first_class: detailsForVio.firstClass,
        deposit: detailsForVio.deposit,
        balance: detailsForVio.balance,
        confirm_to: encodeURIComponent(data.email).replace('%40', '@'),
        confirm_subject: encodeURIComponent(tStudent('hb_class.confirmation.subject')),
        confirm_body: encodeURIComponent(confirmationBody)
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    console.log('✅ Class registration email sent successfully');
  } catch (error) {
    console.error('❌ Class registration email failed:', error);
    return { registered: false, welcomeSent: false };
  }

  // Zelle/Venmo details are written into the welcome template itself, so nobody
  // calling EmailJS directly can change where deposits go
  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_IDS.CLASS_WELCOME,
      {
        to_email: data.email,
        to_name: firstName,
        is_spanish: data.language === 'es',
        subject: tStudent('hb_class.email.welcome_subject'),
        student_name: data.fullName,
        class_dates: detailsForStudent.dates,
        class_time: detailsForStudent.time,
        first_class: detailsForStudent.firstClass,
        fee: detailsForStudent.fee,
        deposit: detailsForStudent.deposit,
        balance: detailsForStudent.balance
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    console.log('✅ Class welcome email sent successfully');
    return { registered: true, welcomeSent: true };
  } catch (error) {
    console.error('❌ Class welcome email failed:', error);
    return { registered: true, welcomeSent: false };
  }
};

// Initialize EmailJS (to be called once in main app)
export const initializeEmailJS = async () => {
  try {
    const emailjs = await import('@emailjs/browser');
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('✅ EmailJS initialized successfully');
  } catch (error) {
    console.error('❌ EmailJS initialization failed:', error);
  }
};

// Instructions for EmailJS setup
export const EMAIL_SETUP_INSTRUCTIONS = `
🔧 EmailJS Setup Instructions:

1. Go to https://emailjs.com and create a free account (upgrade to paid for auto-reply)
2. Create an email service (Gmail, Outlook, etc.)
3. Create email templates for:
   - Contact form submissions
   - HypnoBirthing enrollment
   - Auto-reply confirmations (paid accounts only)
4. Get your Service ID, Template IDs, and Public Key
5. Replace the placeholder values in EMAILJS_CONFIG

📧 Auto-Reply Template (auto_reply_template):
Subject: "Thank you for contacting Vio La Doula!"

Dear {{client_name}},

Thank you for reaching out regarding your {{service_type}}!

I'm delighted that you're considering my services for this special journey. {{next_steps}}

In the meantime, please feel free to explore my website at {{website_url}} for more information about my services and approach to birth support.

If you have any urgent questions, you can reach me at:
📧 Email: {{business_email}}
📱 Phone: {{business_phone}}

With warm regards,
{{from_name}}
Your Doula Latina

---
Visit www.violadoula.com
Follow @vio_ladoula on Instagram

Templates should include variables like:
- {{from_name}}, {{from_email}}, {{message}} (contact form)
- {{student_name}}, {{due_date}}, {{course_format}} (HypnoBirthing)
- {{client_name}}, {{service_type}}, {{next_steps}} (auto-reply)
`;

console.log(EMAIL_SETUP_INSTRUCTIONS);