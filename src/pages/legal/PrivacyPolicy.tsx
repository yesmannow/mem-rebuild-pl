import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="min-h-screen bg-[var(--ink-900)] text-[var(--parchment-050)] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm md:prose-base max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <p>
            This portfolio exists to showcase work, process, and outcomes. We respect your privacy and
            collect only what is necessary to deliver a quality experience.
          </p>

          <h2>What We Collect</h2>
          <ul>
            <li>Basic browsing data (e.g., pages visited, device type, approximate location).</li>
            <li>Form submissions you choose to send (name, email, and message contents).</li>
          </ul>

          <h2>How We Use It</h2>
          <ul>
            <li>To respond to inquiries and showcase relevant work.</li>
            <li>To improve performance and usability of the site.</li>
          </ul>

          <h2>Storage & Analytics</h2>
          <p>
            We use local storage for preferences and Google Analytics for performance monitoring. No
            data is sold or shared with third parties for advertising.
          </p>

          <h2>Cookies & Preferences</h2>
          <p>
            Optional cookies may be used for remembering preferences. You can decline non-essential
            cookies via the on-page consent banner.
          </p>

          <h2>Data Requests</h2>
          <p>
            To request deletion of any submitted information, email{' '}
            <a href="mailto:hoosierdarling@gmail.com">hoosierdarling@gmail.com</a>.
          </p>

          <h2>Changes</h2>
          <p>
            This policy may be updated periodically. Material changes will be reflected on this page
            with a revised date.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
