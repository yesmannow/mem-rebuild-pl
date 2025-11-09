import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import TimelineItem from './TimelineItem';
import NoiseOverlay from './NoiseOverlay';
import GlyphOverlay from './GlyphOverlay';
import milestonesData from '../data/milestones.json';

interface Milestone {
  role: string;
  company: string;
  dates: string;
  highlight: string;
  details: string;
}

const milestones: Milestone[] = milestonesData;

export default function CareerTimelineProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="py-16 bg-white relative">
      <NoiseOverlay />
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Career Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A timeline of professional growth, from early marketing roles to enterprise leadership.
            Click on any milestone to explore the details and achievements.
          </p>
        </div>

        <div className="relative z-10">
          {/* Progress line - amber torchlight effect */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-3 md:left-1/2 top-0 w-1 h-full origin-top bg-amber-500 md:transform md:-translate-x-1/2 shadow-lg"
          />

          {/* Timeline container */}
          <div className="relative">
            {milestones.map((milestone, index) => (
              <TimelineItem
                key={`${milestone.role}-${milestone.company}`}
                milestone={milestone}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
