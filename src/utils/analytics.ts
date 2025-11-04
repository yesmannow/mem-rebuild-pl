/**
 * Analytics Tracking Utility
 * Centralized tracking for portfolio engagement metrics
 */

interface AnalyticsEvent {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Initialize analytics
export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Initialize dataLayer if using GTM
    (window as any).dataLayer = (window as any).dataLayer || [];

    // Track page view
    trackEvent({
      event: 'page_view',
      page_path: window.location.pathname,
      page_title: document.title
    });
  }
};

// Track custom events
export const trackEvent = (eventData: AnalyticsEvent) => {
  if (typeof window === 'undefined') return;

  const event = {
    ...eventData,
    timestamp: new Date().toISOString(),
    url: window.location.href
  };

  // Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('event', event.event, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event
    });
  }

  // Google Tag Manager dataLayer
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push(event);
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', event);
  }
};

// Portfolio-specific tracking functions
export const trackPortfolioEngagement = {
  // Resume interactions
  resumeView: () => trackEvent({
    event: 'resume_view',
    category: 'Portfolio',
    label: 'Resume Page View'
  }),

  resumeDownload: (format: 'pdf' | 'docx' = 'pdf') => trackEvent({
    event: 'resume_download',
    category: 'Portfolio',
    label: `Resume Download - ${format.toUpperCase()}`,
    resume_format: format
  }),

  resumeSectionView: (section: string) => trackEvent({
    event: 'resume_section_view',
    category: 'Portfolio',
    label: section
  }),

  // Case study interactions
  caseStudyView: (caseStudyId: string, caseStudyTitle: string) => trackEvent({
    event: 'case_study_view',
    category: 'Portfolio',
    label: caseStudyTitle,
    case_study_id: caseStudyId
  }),

  caseStudyTimeSpent: (caseStudyId: string, timeSpent: number) => trackEvent({
    event: 'case_study_time_spent',
    category: 'Portfolio',
    label: caseStudyId,
    value: timeSpent
  }),

  // Contact form
  contactFormStart: () => trackEvent({
    event: 'contact_form_start',
    category: 'Lead Generation',
    label: 'Contact Form Started'
  }),

  contactFormSubmit: (reason: string) => trackEvent({
    event: 'contact_form_submit',
    category: 'Lead Generation',
    label: reason,
    contact_reason: reason
  }),

  contactFormError: (error: string) => trackEvent({
    event: 'contact_form_error',
    category: 'Lead Generation',
    label: error
  }),

  // Application/Demo interactions
  applicationView: (appId: string, appName: string) => trackEvent({
    event: 'application_view',
    category: 'Portfolio',
    label: appName,
    application_id: appId
  }),

  applicationInteraction: (appId: string, interactionType: string) => trackEvent({
    event: 'application_interaction',
    category: 'Portfolio',
    label: interactionType,
    application_id: appId
  }),

  // Navigation tracking
  navigationClick: (destination: string, source: string) => trackEvent({
    event: 'navigation_click',
    category: 'Navigation',
    label: destination,
    source: source
  }),

  // Skills/Toolbox interactions
  skillView: (skillName: string) => trackEvent({
    event: 'skill_view',
    category: 'Portfolio',
    label: skillName
  }),

  // Time on page tracking
  timeOnPage: (pagePath: string, timeSpent: number) => trackEvent({
    event: 'time_on_page',
    category: 'Engagement',
    label: pagePath,
    value: Math.round(timeSpent)
  }),

  // Inspiration/Design interactions
  inspirationView: () => trackEvent({
    event: 'inspiration_view',
    category: 'Portfolio',
    label: 'Inspiration Page'
  }),

  paletteInteraction: (paletteId: string) => trackEvent({
    event: 'palette_interaction',
    category: 'Portfolio',
    label: paletteId
  })
};

// Time tracking helper
export const createTimeTracker = (pagePath: string) => {
  const startTime = Date.now();

  return {
    stop: () => {
      const timeSpent = (Date.now() - startTime) / 1000; // seconds
      if (timeSpent > 3) { // Only track if user spent more than 3 seconds
        trackPortfolioEngagement.timeOnPage(pagePath, timeSpent);
      }
    }
  };
};

// Export for use in components
export default trackPortfolioEngagement;
