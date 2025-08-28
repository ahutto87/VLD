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

// Service definitions for different button contexts
export const SERVICES = {
  BASIC_BIRTH_SUPPORT: {
    name: 'Basic Birth Support',
    type: 'birth_support' as const
  },
  COMPLETE_BIRTH_EXPERIENCE: {
    name: 'Complete Birth Experience', 
    type: 'birth_support' as const
  },
  FULL_SPECTRUM_SUPPORT: {
    name: 'Complete Birth Experience + HypnoBirthing®',
    type: 'birth_support' as const
  },
  HYPNOBIRTHING_CLASSES: {
    name: 'HypnoBirthing® Classes',
    type: 'hypnobirthing' as const
  },
  MOTHERHOOD_COACHING: {
    name: 'Motherhood Coaching',
    type: 'coaching' as const
  },
  GENERAL_CONSULTATION: {
    name: 'General Consultation',
    type: 'consultation' as const
  }
} as const;

// Analytics tracking (for future use)
export const trackButtonClick = (buttonName: string, service?: string) => {
  console.log(`Button clicked: ${buttonName}${service ? ` - Service: ${service}` : ''}`);
  // Future: Add Google Analytics or other tracking here
};