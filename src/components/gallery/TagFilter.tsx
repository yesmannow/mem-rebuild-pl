import React from 'react';
import { motion } from 'framer-motion';
import './TagFilter.css';

interface TagFilterProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
  colorMap?: Record<string, string>;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, activeTag, onTagChange, colorMap = {} }) => {
  const defaultColors = {
    All: '#667eea',
    landscape: '#4facfe',
    portrait: '#43e97b',
    nature: '#38ef7d',
    creative: '#fa709a',
    artistic: '#fee140',
    digital: '#667eea',
    branding: '#f093fb',
    logo: '#4facfe',
    marketing: '#43e97b',
    design: '#fa709a',
  };

  const getTagColor = (tag: string): string => {
    return colorMap[tag] || defaultColors[tag as keyof typeof defaultColors] || '#667eea';
  };

  return (
    <motion.div
      className="tag-filter-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="tag-filter-grid">
        {tags.map((tag, index) => (
          <motion.button
            key={tag}
            className={`tag-filter-pill ${activeTag === tag ? 'active' : ''}`}
            onClick={() => onTagChange(tag)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: `0 8px 25px ${getTagColor(tag)}40`,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background:
                activeTag === tag
                  ? `linear-gradient(135deg, ${getTagColor(tag)}, ${getTagColor(tag)}cc)`
                  : 'rgba(255, 255, 255, 0.1)',
              borderColor: activeTag === tag ? getTagColor(tag) : 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <span className="tag-filter-text">{tag}</span>
            {activeTag === tag && (
              <motion.div
                className="tag-filter-indicator"
                layoutId="activeTag"
                style={{ background: getTagColor(tag) }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TagFilter;
