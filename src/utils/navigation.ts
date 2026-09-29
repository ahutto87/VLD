// Navigation utilities for smooth scrolling and service pre-population

export interface ServiceInfo {
  name: string;
  type: 'birth_support' | 'hypnobirthing' | 'coaching' | 'consultation';
}

export const scrollToContact = (service?: ServiceInfo) => {
  const contactElement = document.querySelector('#contact');
  if (contactElement) {
    contactElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });

    // Pre-populate service if provided
    if (service) {
      // Dispatch custom event to notify Contact component
      const event = new CustomEvent('prePopulateService', {
        detail: service
      });
      window.dispatchEvent(event);
    }
  }
};

export const scrollToHypnoBirthing = () => {
  const element = document.querySelector('#hypnobirthing');
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};

// Services a visitor can pick in the contact form, in dropdown order. Buttons
// across the site pre-select one of these, and the form builds its options from
// this list, so the two can't drift apart.
export const SERVICES = {
  ESSENTIALS_PACKAGE: {
    name: 'The Essentials Package',
    type: 'birth_support' as const
  },
  PREMIUM_PACKAGE: {
    name: 'The Premium Package',
    type: 'birth_support' as const
  },
  DOULA_PLUS_HYPNOBIRTHING: {
    name: 'Doula Package + HypnoBirthing®',
    type: 'birth_support' as const
  },
  HYPNOBIRTHING_COURSE: {
    name: 'HypnoBirthing® Course',
    type: 'hypnobirthing' as const
  },
  MOTHERHOOD_COACHING: {
    name: 'Motherhood Coaching',
    type: 'coaching' as const
  },
  DISCOVERY_CALL: {
    name: 'Discovery Call',
    type: 'consultation' as const
  }
} as const;

// Analytics tracking (for future use)
export const trackButtonClick = (buttonName: string, service?: string) => {
  console.log(`Button clicked: ${buttonName}${service ? ` - Service: ${service}` : ''}`);
  // Future: Add Google Analytics or other tracking here
};