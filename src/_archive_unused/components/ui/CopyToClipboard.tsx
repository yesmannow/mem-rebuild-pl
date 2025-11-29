import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CopyToClipboardProps {
  text: string;
  className?: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md',
        'bg-brand-surface/50 border border-brand-muted/20',
        'hover:border-brand-teal/40 transition-all duration-200',
        'text-xs font-mono text-brand-muted hover:text-brand-teal',
        className
      )}
      aria-label="Copy to clipboard"
    >
      <code>{text}</code>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-3 h-3 text-brand-teal" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Copy className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CopyToClipboard;

