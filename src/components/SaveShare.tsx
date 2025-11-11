import React, { useState } from 'react';
import { motion } from 'framer-motion';

type SaveShareProps = {
  tokens: any; // your brand tokens object
};

export default function SaveShare({ tokens }: Readonly<SaveShareProps>) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSave = async () => {
    setSubmitting(true);

    // Example: POST tokens to your API, which returns a unique slug
    const res = await fetch('/api/save-brand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokens),
    });
    const data = await res.json();
    setShareUrl(`${globalThis.location.origin}/brand/${data.slug}`);

    setSubmitting(false);
  };

  const handleGallerySubmit = async () => {
    if (!shareUrl) return;
    await fetch('/api/gallery-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: shareUrl, tokens }),
    });
    alert('Submitted to gallery!');
  };

  return (
    <section className="py-16 bg-white relative">
      <h2 className="text-3xl font-bold text-center mb-8">Save & Share</h2>

      <div className="flex flex-col items-center gap-6">
        <button
          onClick={handleSave}
          disabled={submitting}
          className="px-6 py-3 bg-blue-600 text-white rounded"
        >
          {submitting ? 'Saving...' : 'Save Brand Session'}
        </button>

        {shareUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="mb-2 text-slate-700">Your brand session is saved:</p>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {shareUrl}
            </a>

            <div className="mt-4">
              <button
                onClick={handleGallerySubmit}
                className="px-4 py-2 bg-amber-500 text-white rounded"
              >
                Submit to Gallery
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
