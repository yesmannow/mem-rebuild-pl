// Ensure React loads first and is available globally
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

// Verify React is loaded before proceeding
if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
  throw new Error('React or ReactDOM failed to load. Check your build configuration.');
}

// Make React available globally IMMEDIATELY for any code that needs it (for third-party libs)
// This must happen before any chunks load to prevent "Cannot read properties of undefined (reading 'forwardRef')" errors
if (typeof window !== 'undefined') {
  // Set React on window immediately - chunks may load before this module fully executes
  // Replace any placeholder with the real React object
  (window as any).React = React;

  // Ensure React.forwardRef and all React APIs are available
  // Some libraries/chunks access React.forwardRef directly and need it immediately
  if (React && typeof React === 'object') {
    // Update the placeholder with full React object including forwardRef
    Object.assign((window as any).React, React);
  }
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });

      registration.update().catch(error => {
        console.warn('Service worker update check failed:', error);
      });

      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.addEventListener('statechange', () => {
          if (
            installingWorker.state === 'installed' &&
            navigator.serviceWorker.controller &&
            registration.waiting
          ) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  };

  window.addEventListener('load', () => {
    void registerServiceWorker();

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}

// Enhanced error suppression for TinyMCE and external script conflicts
// This must run IMMEDIATELY before any other scripts to catch early registrations
// Set up error suppression BEFORE any imports to catch early errors
if (typeof window !== 'undefined') {
  // Note: Removed aggressive error suppression
  // Vite 5.4.21 should have fixed HMR overlay issues

  // Backup protection layer (index.html has primary protection)
  // This ensures protection even if index.html script runs late or fails
  // Vite 5.4.21 should have fixed HMR overlay issues, but this is a safety net
  if (window.customElements && !(window.customElements as any)._defineBackupInstalled) {
    const originalDefine = window.customElements.define;
    if (originalDefine) {
      (window.customElements as any)._defineBackupInstalled = true;

      // Check if already wrapped by index.html script
      const isAlreadyWrapped = originalDefine.toString().includes('__defineGuardInstalled') ||
                                (window.customElements as any).__defineGuardInstalled;

      if (!isAlreadyWrapped) {
        window.customElements.define = function(name, constructor, options) {
          // Recommended pattern: Check if element is NOT already defined
          if (!customElements.get(name)) {
            try {
              // Element doesn't exist - safe to define
              return originalDefine.call(this, name, constructor, options);
            } catch (error: unknown) {
              // Handle race conditions where element might be defined between check and call
              const errorMsg = error ? ((error as Error).message || String(error)) : '';
              if (typeof errorMsg === 'string' &&
                  (errorMsg.includes('has already been used') ||
                   errorMsg.includes('has already been defined'))) {
                // Race condition - element was defined by another script between check and call
                if (process.env.NODE_ENV === 'development') {
                  console.warn(`[main.tsx] Custom element "${name}" was defined during registration. Skipping.`);
                }
                return; // Silently skip duplicate definitions
              }
              // Re-throw other errors (not duplicate registration errors)
              throw error;
            }
          }
          // Element already exists - skip registration
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[main.tsx] Custom element "${name}" is already registered. Skipping.`);
          }
        };
      }
    }
  }
}

// Set a timeout to show error if React doesn't mount within 10 seconds
const mountTimeout = setTimeout(() => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const firstChild = rootElement.children.length > 0 ? rootElement.children[0] : null;
    // Check if we're still showing the loading spinner
    if (firstChild && firstChild.classList && firstChild.classList.contains('initial-loader')) {
      console.error('React app failed to mount within timeout');
      const errorStyles = `
        <style>
          .error-boundary-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #0A0A0A;
            color: #FFFFFF;
            padding: 2rem;
          }
          .error-boundary-content {
            text-align: center;
            max-width: 600px;
          }
          .error-boundary-title {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #3B82F6;
          }
          .error-boundary-message {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            opacity: 0.9;
          }
          .error-boundary-details {
            font-size: 0.9rem;
            opacity: 0.7;
            margin-top: 1rem;
          }
          .error-boundary-button {
            margin-top: 2rem;
            padding: 0.75rem 2rem;
            background: #3B82F6;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
          }
          .error-boundary-button:hover {
            background: #2563EB;
          }
        </style>
      `;
      rootElement.innerHTML = errorStyles + `
        <div class="error-boundary-container">
          <div class="error-boundary-content">
            <h2 class="error-boundary-title">Loading Timeout</h2>
            <p class="error-boundary-message">
              The application is taking longer than expected to load. This might be due to a network issue or a JavaScript error.
            </p>
            <p class="error-boundary-details">
              Please check your browser console (F12) for errors and try refreshing the page.
            </p>
            <button
              onclick="window.location.reload()"
              class="error-boundary-button"
            >
              Reload Page
            </button>
          </div>
        </div>
      `;
    }
  }
}, 10000);

// Verify React and ReactDOM are available before proceeding
if (!React || !ReactDOM) {
  console.error('React or ReactDOM is not available', { React, ReactDOM });
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div class="error-boundary-container">
        <div class="error-boundary-content">
          <h2 class="error-boundary-title">React Not Loaded</h2>
          <p class="error-boundary-message">
            React library failed to load. Please check your network connection and try refreshing the page.
          </p>
          <button onclick="window.location.reload()" class="error-boundary-button">
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
  clearTimeout(mountTimeout);
} else {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('Root element not found');
      clearTimeout(mountTimeout);
    } else {
      // Always log initialization in production for debugging
      console.log('Initializing React app...');
      console.log('React version:', React.version);
      console.log('ReactDOM available:', !!ReactDOM);
      console.log('Environment:', process.env.NODE_ENV || 'unknown');

      // Log script loading status
      const scripts = document.querySelectorAll('script[type="module"]');
      console.log('Module scripts found:', scripts.length);
      scripts.forEach((script, i) => {
        console.log(`Script ${i}:`, (script as HTMLScriptElement).src || 'inline');
      });

      const root = ReactDOM.createRoot(rootElement);

      // Verify React.createElement exists
      if (!React.createElement) {
        throw new Error('React.createElement is not available');
      }

      // Wrap in error boundary at the root level
      // Add React Router v7 future flags to suppress warnings and prepare for migration
      root.render(
        React.createElement(React.StrictMode, null,
          React.createElement(BrowserRouter, {
            future: {
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }
          },
            React.createElement(App)
          )
        )
      );

      // Clear timeout once React mounts
      setTimeout(() => {
        clearTimeout(mountTimeout);
        if (process.env.NODE_ENV === 'development') {
          console.log('React app initialized successfully');
        }
      }, 100);
    }
  } catch (error) {
    clearTimeout(mountTimeout);
    console.error('Failed to initialize React app:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    console.error('React availability check:', {
      React: !!React,
      ReactDOM: !!ReactDOM,
      ReactCreateElement: !!(React && React.createElement),
      ReactStrictMode: !!(React && React.StrictMode)
    });

    // Show error in the UI
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const errorStyles = `
        <style>
          .error-boundary-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #0A0A0A;
            color: #FFFFFF;
            padding: 2rem;
          }
          .error-boundary-content {
            text-align: center;
            max-width: 600px;
          }
          .error-boundary-title {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #EF4444;
          }
          .error-boundary-message {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            opacity: 0.9;
          }
          .error-boundary-details {
            font-size: 0.9rem;
            opacity: 0.7;
            margin-top: 1rem;
            font-family: monospace;
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            word-break: break-all;
          }
          .error-boundary-button {
            margin-top: 2rem;
            padding: 0.75rem 2rem;
            background: #3B82F6;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
          }
          .error-boundary-button:hover {
            background: #2563EB;
          }
        </style>
      `;
      rootElement.innerHTML = errorStyles + `
        <div class="error-boundary-container">
          <div class="error-boundary-content">
            <h2 class="error-boundary-title">Application Error</h2>
            <p class="error-boundary-message">Failed to load the portfolio application.</p>
            <p class="error-boundary-details">${error instanceof Error ? error.message : 'Unknown error'}</p>
            <button onclick="window.location.reload()" class="error-boundary-button">
              Reload Page
            </button>
          </div>
        </div>
      `;
    }
  }
}
