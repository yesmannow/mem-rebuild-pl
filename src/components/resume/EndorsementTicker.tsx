import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Endorsement {
  name: string;
  role: string;
  quote: string;
}

const endorsements: Endorsement[] = [
  {
    name: 'Jesse Wey',
    role: 'Web Development | IT | Marketing',
    quote: 'He thrives in fast-paced environments and is always eager to explore new tools. Jacob has a great balance of strategic thinking and hands-on execution.',
  },
  {
    name: 'Andrew Bastnagel, MBA',
    role: 'Financial Services Consultant',
    quote: "He's constantly learning new technologies and figuring out how to put them to work... That curiosity makes him not just effective, but always evolving.",
  },
  {
    name: 'Kevin Martin See',
    role: 'Strategic Partnerships',
    quote: 'Jacob displays a combination of creative and analytical skills, with proven ability to implement marketing strategies that produce a positive ROI.',
  },
  {
    name: 'Nick Brown',
    role: 'DMA, Inc.',
    quote: 'He is hardworking, creative and a pleasure to work with. Jacob has skills in web design, branding, and personal communication.',
  },
  {
    name: 'Ben Worrell',
    role: 'Senior Admin Assistant',
    quote: "Jacob's energy and ingenuity are extremely valuable assets. He expanded our vision and implemented many new projects.",
  },
];

export const EndorsementTicker: React.FC = () => {
  // Duplicate the list for seamless loop
  const duplicatedEndorsements = [...endorsements, ...endorsements];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes endorsement-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .endorsement-track {
          animation: endorsement-scroll 40s linear infinite;
        }
        .endorsement-track.paused {
          animation-play-state: paused;
        }
      `}</style>
      <div className="w-full">
        {/* Ticker Container with Fade Edges */}
        <motion.div
          className="w-full overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated Track */}
          <div className={`flex gap-6 endorsement-track ${isHovered ? 'paused' : ''}`}>
            {duplicatedEndorsements.map((endorsement, index) => (
              <div
                key={`${endorsement.name}-${index}`}
                className="flex-shrink-0 w-[350px] bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative hover:border-brand-teal/40 transition-colors duration-300"
              >
                {/* Watermark Quote Icon */}
                <Quote
                  className="absolute top-4 right-4 opacity-10 text-brand-teal"
                  size={48}
                />

                {/* Quote Text */}
                <p className="italic text-brand-muted mb-4 relative z-10">{endorsement.quote}</p>

                {/* Author Info */}
                <div className="relative z-10">
                  <p className="font-bold text-white mb-1">{endorsement.name}</p>
                  <p className="text-xs text-brand-teal uppercase tracking-wider">{endorsement.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};
