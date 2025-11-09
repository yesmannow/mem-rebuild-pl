import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component for the application.
 * Handles global meta tags and theme configuration.
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Helmet>
        {/* Theme Color Meta Tag */}
        {/*
          Browser Compatibility Note:
          The theme-color meta tag is not supported by Firefox, Firefox for Android, and Opera.
          This is intentional and expected behavior. We use CSS color-scheme property for those browsers instead.
          The ThemeProvider component sets document.documentElement.style.colorScheme dynamically.
          This meta tag is kept for Chrome, Edge, and Safari which do support it.

          See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
        */}
        <meta name="theme-color" content="#0D0D0F" />

        {/* Additional meta tags can be added here */}
      </Helmet>
      {children}
    </>
  );
}
