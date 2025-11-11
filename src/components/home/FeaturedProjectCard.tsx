import React from 'react';
import { motion } from 'framer-motion';
import { hoverLift } from '../shared/MotionVariants';

export interface FeaturedProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  link?: string;
  slug?: string;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  title,
  description,
  image,
  tags = [],
  link,
  slug,
}) => {
  const href = link || (slug ? `/projects/${slug}` : '#');
  const ariaLabel = `View project: ${title}`;

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      className="group block focus-ring rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover min-h-[16rem] md:min-h-[20rem] transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-brand-accent transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
          {description}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
};

export default FeaturedProjectCard;

