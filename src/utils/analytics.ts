import React, { useEffect } from "react";

let analyticsInitialized = false;

// Analytics event tracking
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window === "undefined") return;

  // Custom event for internal tracking
  window.dispatchEvent(
    new CustomEvent("bc:analytics", {
      detail: { name: eventName, data: eventData },
    })
  );

  // Vercel Analytics (if available)
  if (window.va) {
    window.va("event", eventName, eventData);
  }

  // Console log in development
  if (process.env.NODE_ENV === "development") {
    console.log("📊 Analytics Event:", eventName, eventData);
  }
}

// CTA click tracking
export function trackCTA(id: string, location?: string) {
  trackEvent("cta_click", { id, location });
  window.dispatchEvent(
    new CustomEvent("bc:cta", {
      detail: { id, location },
    })
  );
}

// Case study view tracking
export function trackCaseStudy(slug: string) {
  trackEvent("case_study_view", { slug });
}

export const trackPortfolioEngagement = {
  resumeView: () => trackEvent("portfolio_resume_view"),
  resumeSectionView: (section: string) =>
    trackEvent("portfolio_resume_section_view", { section }),
  resumeDownload: (format: string) =>
    trackEvent("portfolio_resume_download", { format }),
  caseStudyView: (slug: string, title?: string) =>
    trackEvent("portfolio_case_study_view", { slug, title }),
  contactFormStart: () => trackEvent("portfolio_contact_start"),
  contactFormSubmit: (reason: string) =>
    trackEvent("portfolio_contact_submit", { reason }),
  contactFormError: (message: string) =>
    trackEvent("portfolio_contact_error", { message }),
};

export function initAnalytics() {
  if (analyticsInitialized || typeof window === "undefined") {
    return;
  }

  analyticsInitialized = true;

  // Initial page view track when the app boots
  trackEvent("app_init", { path: window.location.pathname });
}

export function createTimeTracker(path: string) {
  const start = Date.now();
  let stopped = false;

  return {
    stop() {
      if (stopped) return;
      stopped = true;

      const durationSeconds = Math.round((Date.now() - start) / 1000);
      trackEvent("portfolio_time_spent", { path, durationSeconds });
    },
  };
}

// Initialize analytics
export function useAnalytics() {
  useEffect(() => {
    // Track page view
    trackEvent("page_view", { path: window.location.pathname });

    // Listen for custom events
    const handleCTAClick = (e: CustomEvent) => {
      trackEvent("cta_click", e.detail);
    };

    window.addEventListener("bc:cta", handleCTAClick as EventListener);

    return () => {
      window.removeEventListener("bc:cta", handleCTAClick as EventListener);
    };
  }, []);
}
