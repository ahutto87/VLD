// Email service using EmailJS for client-side email sending
// Note: EmailJS requires setup at emailjs.com with service ID, template IDs, and public key

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

// EmailJS configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_kd7nnoj',
  TEMPLATE_IDS: {
    CONTACT_FORM: 'contact_template', // Contact form template
    HYPNOBIRTHING_ENROLLMENT: 'hypnobirthing_template', // HypnoBirthing enrollment template
    AUTO_REPLY: 'auto_reply_template' // Auto-reply template (available when paid account activates)
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

1. Go to https://emailjs.com and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create email templates for:
   - Contact form submissions
   - HypnoBirthing enrollment
   - Auto-reply confirmations
4. Get your Service ID, Template IDs, and Public Key
5. Replace the placeholder values in EMAILJS_CONFIG
6. Uncomment the actual EmailJS code in the functions above

Templates should include variables like:
- {{from_name}}, {{from_email}}, {{message}} (contact form)
- {{student_name}}, {{due_date}}, {{course_format}} (HypnoBirthing)
`;

console.log(EMAIL_SETUP_INSTRUCTIONS);