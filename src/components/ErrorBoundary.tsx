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

    // You can log error to an external service here
    console.error('ErrorBoundary caught:', errorObj, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>Loading profile....</h1>
            <p className={styles.message}>
              Something went wrong while loading the profile. Try reloading the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
