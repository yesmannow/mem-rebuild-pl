import React from 'react';
import SystemsTimeline from './SystemsTimeline';

const BrandLineageSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Systems Lineage Timeline</h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          A scroll-driven narrative connecting the design systems that shaped modern identity: from
          IBM's structured approach to NASA's clarity, through the preservation of standards, to
          British Rail's systematic signage, Sutherland's craft collaboration, and Eames' infinite
          curiosity.
        </p>
        <SystemsTimeline />
      </div>
    </section>
  );
};

export default BrandLineageSection;
