import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../shared/MotionVariants';
import FeaturedProjectCard, { FeaturedProjectCardProps } from './FeaturedProjectCard';

export interface FeaturedProjectsGridProps {
  items: FeaturedProjectCardProps[];
}

const FeaturedProjectsGrid: React.FC<FeaturedProjectsGridProps> = ({ items }) => {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div key={item.slug || index} variants={fadeInUp}>
            <FeaturedProjectCard {...item} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturedProjectsGrid;

