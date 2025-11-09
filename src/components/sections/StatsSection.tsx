import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import './StatsSection.css';

interface Stat {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'minimal' | 'gradient';
  className?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  title,
  subtitle,
  variant = 'default',
  className = '',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      className={`stats-section stats-section--${variant} ${className}`}
    >
      <div className="stats-section__container">
        {(title || subtitle) && (
          <motion.div
            className="stats-section__header"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <div className="stats-section__subtitle">{subtitle}</div>
            )}
            {title && <h2 className="stats-section__title">{title}</h2>}
          </motion.div>
        )}

        <motion.div
          className="stats-section__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              stat={stat}
              variants={itemVariants}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface StatItemProps {
  stat: Stat;
  variants: any;
  isInView: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ stat, variants, isInView }) => {
  const numericValue = typeof stat.value === 'number' ? stat.value : null;

  const { number } = useSpring({
    number: isInView && numericValue ? numericValue : 0,
    from: { number: 0 },
    config: { tension: 50, friction: 30 },
  });

  return (
    <motion.div className="stats-section__item" variants={variants}>
      <div className="stats-section__value">
        {numericValue !== null ? (
          <>
            {stat.prefix}
            <animated.span>
              {number.to((n) => Math.floor(n))}
            </animated.span>
            {stat.suffix}
          </>
        ) : (
          <>
            {stat.prefix}
            {stat.value}
            {stat.suffix}
          </>
        )}
      </div>
      <div className="stats-section__label">{stat.label}</div>
    </motion.div>
  );
};

export default StatsSection;

