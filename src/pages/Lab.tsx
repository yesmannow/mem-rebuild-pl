import React from 'react';
import { TrendingUp, Microscope, Stethoscope, Scan } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BentoGrid, BentoCard } from '../components/ui/BentoGrid';
import SEOHead from '../components/seo/SEOHead';

interface LabTile {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  accent: 'teal' | 'orange';
}

const tiles: LabTile[] = [
  {
    title: 'Growth Engine',
    description: 'Interactive ROI Modeler & CPQ System',
    icon: <TrendingUp className="text-brand-teal" size={22} />,
    href: '/apps/growth-engine',
    accent: 'teal',
  },
  {
    title: 'License Hub',
    description: '50-state CEU intelligence for PT/OT/DC/AT/MT',
    icon: <Microscope className="text-brand-orange" size={22} />,
    href: '/apps/license-hub',
    accent: 'orange',
  },
  {
    title: 'SEO Scanner',
    description: 'Edge HTMLRewriter audit for titles, metas, and OG tags',
    icon: <Scan className="text-brand-teal" size={22} />,
    href: '/apps/seo-scanner',
    accent: 'teal',
  },
  {
    title: 'Clinical Compass',
    description: 'Multi-step clinical protocol wizard',
    icon: <Stethoscope className="text-brand-teal" size={22} />,
    href: '/apps/clinical-compass',
    accent: 'teal',
  },
];

const Lab: React.FC = () => {
  return (
    <>
      <SEOHead
        title="The Lab | Marketing Systems"
        description="Ocean Pearl lab: interactive ROI, licensing, and clinical tools."
      />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-brand-text">
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">The Lab</p>
            <h1 className="text-4xl md:text-5xl font-bold">Applied Growth Systems</h1>
            <p className="text-brand-muted mt-3">
              Director-grade tools built for revenue, compliance, and clinical rigor.
            </p>
          </motion.div>

          <BentoGrid className="auto-rows-[minmax(180px,_1fr)]">
            {tiles.map((tile, idx) => (
              <BentoCard
                key={tile.title}
                className="relative overflow-hidden"
                span="2"
                rowSpan="1"
              >
                <div
                  className={`absolute inset-0 opacity-20 blur-3xl ${
                    tile.accent === 'teal' ? 'bg-brand-teal' : 'bg-brand-orange'
                  }`}
                  aria-hidden
                />
                <Link to={tile.href} className="relative block h-full">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-teal/30 bg-slate-900/70">
                        {tile.icon}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold">{tile.title}</h3>
                        <p className="text-sm text-brand-muted">{tile.description}</p>
                      </div>
                    </div>
                    <span className="text-brand-teal text-sm font-semibold">Open -&gt;</span>
                  </div>
                  <div className="mt-auto text-sm text-brand-muted">
                    Built with the Ocean Pearl system. Click to launch the experience.
                  </div>
                </Link>
              </BentoCard>
            ))}
          </BentoGrid>
        </div>
      </main>
    </>
  );
};

export default Lab;

