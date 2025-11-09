import React from 'react';

interface TestimonialItem {
  quote: string;
  name: string;
  title?: string;
  company?: string;
  avatar?: string;
}

interface TestimonialsProps {
  items: TestimonialItem[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  return (
    <section className="container-px mx-auto max-w-6xl py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-display mb-10">What clients say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="card p-6 prose prose-invert max-w-none">
            <blockquote className="text-base mb-4 italic opacity-90">"{item.quote}"</blockquote>
            <div className="flex items-center gap-3 mt-4">
              {item.avatar && (
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <div>
                <div className="font-medium">{item.name}</div>
                {(item.title || item.company) && (
                  <div className="text-sm opacity-70">
                    {item.title}
                    {item.title && item.company && ', '}
                    {item.company}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
