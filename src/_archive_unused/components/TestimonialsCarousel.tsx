import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

type Testimonial = { quote: string; author: string; role?: string; logoSrc?: string; id: string };
const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Jacob turned chaos into a scalable system that just works.',
    author: 'Product Lead, Healthcare',
  },
  {
    id: '2',
    quote: 'Our support load dropped dramatically after his automation rollout.',
    author: 'Ops Director, EdTech',
  },
  {
    id: '3',
    quote: 'Clear strategy, clean execution, measurable impact.',
    author: 'Managing Partner, Legal',
  },
];

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section className="py-16 bg-slate-50 testimonials-carousel">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {testimonials.map(t => (
              <motion.div
                key={t.id}
                className="embla__slide min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pr-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <figure className="h-full p-6 bg-white rounded-lg shadow-sm">
                  <blockquote className="text-slate-700">“{t.quote}”</blockquote>
                  <figcaption className="mt-3 text-sm text-slate-500">
                    — {t.author}
                    {t.role ? `, ${t.role}` : ''}
                  </figcaption>
                </figure>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
