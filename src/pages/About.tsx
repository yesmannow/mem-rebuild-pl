import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import TechProfile from '../components/TechProfile';
import AwardsRow from '../components/AwardsRow';
import { Search, Ruler, Hammer, Rocket, LucideIcon } from 'lucide-react';
import GlowEffect from '../components/ui/GlowEffect';
import FloatingParticles from '../components/ui/FloatingParticles';
import TestimonialWall from '../components/ui/TestimonialWall';
import InteractiveProcessFlow from '../components/ui/InteractiveProcessFlow';

// Process Card Component with 3D Tilt
interface ProcessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'teal' | 'orange';
  delay: number;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, color, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    mouseX.set((e.clientX - rect.left) / width - 0.5);
    mouseY.set((e.clientY - rect.top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className="bg-brand-surface p-6 rounded-xl border border-brand-teal/10 hover:border-brand-teal/50 transition-all relative overflow-hidden group"
    >
      <GlowEffect intensity="low" color={color} />
      <div className="relative z-10">
        <motion.div
          className={`w-12 h-12 bg-brand-dark rounded-lg flex items-center justify-center mb-4 ${
            color === 'teal' ? 'text-brand-teal' : 'text-brand-orange'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon size={24} />
        </motion.div>
        <h3 className="text-xl font-bold text-brand-text mb-2">{title}</h3>
        <p className="text-sm text-brand-muted">{description}</p>
      </div>
    </motion.div>
  );
};

// Timeline Item Component
interface TimelineItemProps {
  period: string;
  title: string;
  company: string;
  description: string;
  isActive: boolean;
  delay: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  period,
  title,
  company,
  description,
  isActive,
  delay,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <motion.span
        className={`absolute -left-[41px] top-2 w-5 h-5 rounded-full border-4 border-brand-dark ${
          isActive ? 'bg-brand-teal' : 'bg-brand-surface'
        }`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.2, type: 'spring' }}
      />
      <div className={`mb-1 font-mono text-sm ${isActive ? 'text-brand-teal' : 'text-brand-muted'}`}>
        {period}
      </div>
      <h3 className="text-2xl font-bold text-brand-text">{title}</h3>
      <div className={`font-medium mb-4 ${isActive ? 'text-brand-orange' : 'text-brand-muted'}`}>
        {company}
      </div>
      <p className="text-brand-muted">{description}</p>
    </motion.div>
  );
};

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const processRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 relative overflow-hidden">
      <FloatingParticles count={20} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Split: Narrative + Holographic Profile */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <div className="order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-brand-text mb-6 leading-tight"
            >
              The Architect in the{' '}
              <motion.span
                className="text-brand-teal inline-block"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(90deg, #40E0D0, #FF6B35, #40E0D0)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Marketing Room
              </motion.span>
              .
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 text-lg text-brand-muted leading-relaxed"
            >
              <p>
                Great marketing ideas often break at the handoff—the critical point where a creative vision meets the complex reality of technical execution.
              </p>
              <p>
                My career has been built to solve this problem. I operate as both a <strong className="text-brand-text">brand strategist</strong> and a <strong className="text-brand-text">systems architect</strong>. On one side, I direct bold rebrands and craft compelling narratives. On the other, I build the CRM logic, automation workflows, and web architecture that makes those campaigns scalable.
              </p>
              <p>
                I thrive on turning abstract goals into powerful, revenue-focused marketing engines.
              </p>
            </motion.div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* This is the Holographic Component we built */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <TechProfile />
            </motion.div>
          </div>
        </motion.div>

        {/* The Process: From Insight to Impact - Interactive Version */}
        <motion.div
          ref={processRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <InteractiveProcessFlow />
        </motion.div>

        {/* Professional Journey Timeline */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-brand-text mb-12"
          >
            Professional Journey
          </motion.h2>
          <div className="space-y-12 border-l-2 border-brand-teal/20 pl-8 ml-4">
            {/* Role 1 */}
            <TimelineItem
              period="2023 – Present"
              title="Marketing Director & System Architect"
              company="Graston Technique®"
              description="Full-stack marketing leadership. Led a complete digital transformation, reducing support tickets by 70% via AI and increasing conversions by 40% through checkout innovation."
              isActive={true}
              delay={0.1}
            />

            {/* Role 2 */}
            <TimelineItem
              period="2023"
              title="Interim Director of Marketing"
              company="Ultimate Technologies Group"
              description="Stabilized operations during transition. Streamlined lead generation workflows resulting in a 40% improvement in campaign production timelines."
              isActive={false}
              delay={0.2}
            />

            {/* Role 3 */}
            <TimelineItem
              period="2015 – 2023"
              title="Marketing Manager"
              company="Riley Bennett Egloff, LLP"
              description="Managed digital rebrand and SEO overhaul leading to a 35% increase in qualified client inquiries."
              isActive={false}
              delay={0.3}
            />
          </div>
        </motion.div>

        {/* Awards Section (Using the rescued Gold Key) */}
        <AwardsRow />

        {/* Wall of Trust - Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-brand-text mb-12 text-center"
          >
            Trusted by Leaders
          </motion.h2>
          <TestimonialWall />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
