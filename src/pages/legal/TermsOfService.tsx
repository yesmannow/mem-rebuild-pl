import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <main className="min-h-screen bg-[var(--ink-900)] text-[var(--parchment-050)] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
        <div className="prose prose-invert prose-sm md:prose-base max-w-none">
          <p>By accessing this site, you agree to the following terms.</p>

          <h2>Portfolio Content</h2>
          <p>
            Portfolio projects are for demonstration purposes only. Case studies summarize past work and
            outcomes and may reference third-party brands, platforms, or tools.
          </p>

          <h2>Code & Assets</h2>
          <p>
            All code and design assets on this site are provided &quot;as-is&quot; without warranty of
            any kind. Do not use or redistribute without explicit permission.
          </p>

          <h2>Availability</h2>
          <p>
            Uptime is not guaranteed. Features may change or be removed at any time without notice.
          </p>

          <h2>Liability</h2>
          <p>
            In no event will the site owner be liable for any damages arising from the use or inability
            to use this site or its content.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, email{' '}
            <a href="mailto:hoosierdarling@gmail.com">hoosierdarling@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
