import React, { useEffect } from "react";

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
