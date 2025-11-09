import React, { useEffect } from 'react';

let analyticsInitialized = false;

// Analytics event tracking
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Custom event for internal tracking
  window.dispatchEvent(
    new CustomEvent('bc:analytics', {
      detail: { name: eventName, data: eventData },
    })
  );

  // Vercel Analytics (if available)
  if (window.va) {
    window.va('event', eventName, eventData);
  }

  // Google Analytics 4 (if available)
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, eventData);
  }
}

// CTA click tracking
export function trackCTA(id: string, location?: string) {
  trackEvent('cta_click', { id, location });
  window.dispatchEvent(
    new CustomEvent('bc:cta', {
      detail: { id, location },
    })
  );
}

// Case study view tracking
export function trackCaseStudy(slug: string) {
  trackEvent('case_study_view', { slug });
}

// Scroll depth tracking
export function trackScrollDepth(depth: number, path: string) {
  const milestones = [25, 50, 75, 90, 100];
  const milestone = milestones.find(m => depth >= m && depth < m + 10);

  if (milestone) {
    trackEvent('scroll_depth', { depth: milestone, path });
  }
}

// Time on page tracking
export function trackTimeOnPage(path: string, seconds: number) {
  const milestones = [10, 30, 60, 120, 300]; // 10s, 30s, 1m, 2m, 5m
  const milestone = milestones.find(m => seconds >= m && seconds < m + 10);

  if (milestone) {
    trackEvent('time_on_page', { seconds: milestone, path });
  }
}

// Form field interaction tracking
export function trackFormInteraction(
  formId: string,
  fieldName: string,
  action: 'focus' | 'blur' | 'change'
) {
  trackEvent('form_interaction', { formId, fieldName, action });
}

// Image load tracking
export function trackImageLoad(src: string, loadTime?: number) {
  trackEvent('image_load', { src, loadTime });
}

// Error tracking
export function trackError(error: Error, context?: string) {
  trackEvent('error', {
    message: error.message,
    stack: error.stack,
    context,
  });
}

export const trackPortfolioEngagement = {
  resumeView: () => trackEvent('portfolio_resume_view'),
  resumeSectionView: (section: string) => trackEvent('portfolio_resume_section_view', { section }),
  resumeDownload: (format: string) => trackEvent('portfolio_resume_download', { format }),
  caseStudyView: (slug: string, title?: string) =>
    trackEvent('portfolio_case_study_view', { slug, title }),
  contactFormStart: () => trackEvent('portfolio_contact_start'),
  contactFormSubmit: (reason: string) => trackEvent('portfolio_contact_submit', { reason }),
  contactFormError: (message: string) => trackEvent('portfolio_contact_error', { message }),
  metricsView: (caseStudySlug: string) => trackEvent('portfolio_metrics_view', { caseStudySlug }),
  galleryImageClick: (imageId: string, category: string) =>
    trackEvent('portfolio_gallery_image_click', { imageId, category }),
  searchQuery: (query: string, resultsCount: number) =>
    trackEvent('portfolio_search', { query, resultsCount }),
};

export function initAnalytics() {
  if (analyticsInitialized || typeof window === 'undefined') {
    return;
  }

  analyticsInitialized = true;

  // Initial page view track when the app boots
  trackEvent('app_init', { path: window.location.pathname });

  // Track scroll depth
  let maxScroll = 0;
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      trackScrollDepth(scrollPercent, window.location.pathname);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Track time on page
  const startTime = Date.now();
  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(window.location.pathname, timeSpent);
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Track errors
  window.addEventListener('error', event => {
    trackError(event.error || new Error(event.message), 'global_error');
  });

  window.addEventListener('unhandledrejection', event => {
    trackError(
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      'unhandled_rejection'
    );
  });
}

export function createTimeTracker(path: string) {
  const start = Date.now();
  let stopped = false;

  return {
    stop() {
      if (stopped) return;
      stopped = true;

      const durationSeconds = Math.round((Date.now() - start) / 1000);
      trackEvent('portfolio_time_spent', { path, durationSeconds });
      trackTimeOnPage(path, durationSeconds);
    },
  };
}

// Initialize analytics
export function useAnalytics() {
  useEffect(() => {
    // Track page view
    trackEvent('page_view', { path: window.location.pathname });

    // Listen for custom events
    const handleCTAClick = (e: CustomEvent) => {
      trackEvent('cta_click', e.detail);
    };

    window.addEventListener('bc:cta', handleCTAClick as EventListener);

    return () => {
      window.removeEventListener('bc:cta', handleCTAClick as EventListener);
    };
  }, []);
}

// Type declarations for window analytics
declare global {
  interface Window {
    va?: (action: string, eventName: string, eventData?: Record<string, any>) => void;
    gtag?: (command: string, eventName: string, eventData?: Record<string, any>) => void;
  }
}
