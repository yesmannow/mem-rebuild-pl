/**
 * SocialShareButtons Component
 * Social media share buttons with pre-filled content
 * Supports LinkedIn, Twitter, Facebook, Email
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Facebook, Mail, Link2, Check } from 'lucide-react';

export interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url,
  title,
  description = '',
  hashtags = [],
  className = '',
  size = 'md',
  orientation = 'horizontal',
  showLabels = false,
}) => {
  const [copied, setCopied] = React.useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const buttonSize = sizeClasses[size];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0077b5',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: '#1da1f2',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}${hashtags.length > 0 ? `&hashtags=${hashtags.join(',')}` : ''}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: '#1877f2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: '#ea4335',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`,
    },
  ];

  const containerClass = orientation === 'horizontal' ? 'flex-row' : 'flex-col';

  return (
    <div className={`social-share-buttons ${className}`}>
      {showLabels && (
        <p className="text-sm font-medium text-[var(--parchment-050)]/70 mb-3">
          Share this:
        </p>
      )}
      
      <div className={`flex ${containerClass} items-center gap-3`}>
        {/* Social platform buttons */}
        {shareLinks.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonSize} flex items-center justify-center rounded-full bg-[var(--ink-800)]/60 hover:bg-[var(--ink-700)] border border-[var(--ink-700)]/60 transition-all duration-200`}
              style={{ color: platform.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${platform.color}40` }}
              whileTap={{ scale: 0.95 }}
              title={`Share on ${platform.name}`}
              aria-label={`Share on ${platform.name}`}
            >
              <Icon size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
            </motion.a>
          );
        })}

        {/* Copy link button */}
        <motion.button
          onClick={handleCopyLink}
          className={`${buttonSize} flex items-center justify-center rounded-full bg-[var(--ink-800)]/60 hover:bg-[var(--ink-700)] border border-[var(--ink-700)]/60 text-[#83c5be] transition-all duration-200`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: shareLinks.length * 0.1 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(131, 197, 190, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          title="Copy link"
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <Check size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
          ) : (
            <Link2 size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
          )}
        </motion.button>
      </div>

      {/* Copied feedback */}
      {copied && (
        <motion.p
          className="text-xs text-[#83c5be] mt-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          Link copied to clipboard!
        </motion.p>
      )}
    </div>
  );
};

export default SocialShareButtons;
