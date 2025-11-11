import React from 'react';
import { trackCTA } from '../utils/analytics';

export default function StickyCTA() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:hidden">
      <a
        href="#contact"
        className="btn-primary w-full justify-center"
        onClick={() => trackCTA('book_call', 'sticky_mobile')}
      >
        Book a strategy call
      </a>
    </div>
  );
}
