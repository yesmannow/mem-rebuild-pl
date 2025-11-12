/* eslint-disable react/react-in-jsx-scope */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

type State = {
  hasError: boolean;
  error?: Error | null;
};

type Props = {
  children: ReactNode;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error | unknown) {
    // Handle cases where error might not be an Error object
    const errorObj =
      error instanceof Error
        ? error
        : new Error(
            error === undefined || error === null ? 'Unknown error (undefined/null)' : String(error)
          );

    return { hasError: true, error: errorObj };
  }

  componentDidCatch(error: Error | unknown, info: ErrorInfo) {
    // Ensure we always log a proper error object
    const errorObj =
      error instanceof Error
        ? error
        : new Error(
            error === undefined || error === null ? 'Unknown error (undefined/null)' : String(error)
          );

    // Log error to console
    console.error('ErrorBoundary caught:', errorObj, info);

    // Report to external service if available (e.g., Sentry)
    if (typeof window !== 'undefined') {
      const win = window as unknown as Record<string, unknown>;
      if (win.Sentry) {
        try {
          const sentry = win.Sentry as { 
            captureException: (error: Error, context: unknown) => void 
          };
          sentry.captureException(errorObj, {
            contexts: {
              react: {
                componentStack: info.componentStack,
              },
            },
          });
        } catch (sentryError) {
          console.error('Failed to report error to Sentry:', sentryError);
        }
      }
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container} role="alert" aria-live="assertive">
          <div className={styles.card} role="region" aria-labelledby="error-title">
            <h1 id="error-title" className={styles.title}>
              Something went wrong
            </h1>
            <p className={styles.message}>
              We encountered an unexpected error while loading the application. Please try reloading
              the page.
            </p>
            {this.state.error && process.env.NODE_ENV === 'development' && (
              <details className={styles.details}>
                <summary className={styles.detailsToggle}>Error details</summary>
                <pre className={styles.errorText}>{this.state.error.message}</pre>
                {this.state.error.stack && (
                  <pre className={styles.stackTrace}>{this.state.error.stack}</pre>
                )}
              </details>
            )}
            <button
              onClick={this.handleReload}
              className={styles.reloadButton}
              aria-label="Reload page"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
