/**
 * Accessibility Utilities
 * Helper functions for improving accessibility
 */

/**
 * Announce a message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Skip to main content link
 */
export function createSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #3B82F6;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
    border-radius: 0 0 4px 0;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Initialize accessibility enhancements
 */
export function initAccessibility() {
  // Create skip link
  createSkipLink();

  // Add main content landmark if it doesn't exist
  const mainContent = document.getElementById('main-content');
  if (!mainContent) {
    const main = document.querySelector('main');
    if (main) {
      main.id = 'main-content';
      main.setAttribute('role', 'main');
    }
  }

  // Announce page changes for SPA
  if (typeof window !== 'undefined') {
    let lastPath = window.location.pathname;
    const observer = new MutationObserver(() => {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        const pageTitle = document.title;
        announceToScreenReader(`Navigated to ${pageTitle}`, 'assertive');
        lastPath = currentPath;
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}
