import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'cookie-consent';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'declined') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, choice);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 z-[100]">
      <div className="max-w-xl ml-auto rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl p-4 md:p-5 text-sm text-slate-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-semibold text-white">We use cookies to enhance the experience.</p>
            <p className="text-slate-300/80">
              Accept to enable preferences and analytics. Decline to continue with essentials only.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleChoice('declined')}
              className="px-4 py-2 rounded-lg border border-white/15 text-slate-200 hover:bg-white/10 transition"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => handleChoice('accepted')}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
