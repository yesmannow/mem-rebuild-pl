import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Search, Home, User, Briefcase, Moon, Sun, Copy, Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const shortcuts: Shortcut[] = [
  {
    keys: ['⌘', 'K'],
    description: 'Open Command Menu',
    category: 'Navigation',
    icon: Search,
  },
  {
    keys: ['?'],
    description: 'Show Keyboard Shortcuts',
    category: 'Navigation',
  },
  {
    keys: ['Esc'],
    description: 'Close Modal / Cancel',
    category: 'Navigation',
  },
  {
    keys: ['⌘', '/'],
    description: 'Toggle Theme',
    category: 'Actions',
    icon: Moon,
  },
  {
    keys: ['↑', '↓'],
    description: 'Navigate Menu Items',
    category: 'Navigation',
  },
  {
    keys: ['Enter'],
    description: 'Select / Confirm',
    category: 'Navigation',
  },
  {
    keys: ['H'],
    description: 'Go to Home',
    category: 'Quick Navigation',
    icon: Home,
  },
  {
    keys: ['A'],
    description: 'Go to About',
    category: 'Quick Navigation',
    icon: User,
  },
  {
    keys: ['W'],
    description: 'Go to Work',
    category: 'Quick Navigation',
    icon: Briefcase,
  },
];

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('contenteditable') === 'true'
      ) {
        return;
      }

      // Press ? to open
      if (e.key === '?' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsOpen(true);
      }

      // Press Esc to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[var(--ink-900)] border border-[var(--ink-700)] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--ink-700)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--signal-500)]/20 flex items-center justify-center">
                    <Command className="text-[var(--signal-500)]" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--parchment-050)]">Keyboard Shortcuts</h2>
                    <p className="text-sm text-[var(--parchment-050)]/60">Power-user commands</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-[var(--ink-700)] text-[var(--parchment-050)]/60 hover:text-[var(--parchment-050)] transition-colors"
                  aria-label="Close shortcuts"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                {Object.entries(groupedShortcuts).map(([category, items]) => (
                  <div key={category} className="mb-8 last:mb-0">
                    <h3 className="text-xs font-semibold text-[var(--parchment-050)]/60 uppercase tracking-wider mb-4">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {items.map((shortcut, idx) => {
                        const Icon = shortcut.icon;
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--ink-700)]/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {Icon && (
                                <Icon size={16} className="text-[var(--parchment-050)]/40" />
                              )}
                              <span className="text-sm text-[var(--parchment-050)]">
                                {shortcut.description}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {shortcut.keys.map((key, keyIdx) => (
                                <React.Fragment key={keyIdx}>
                                  <kbd className="px-2 py-1 text-xs font-mono bg-[var(--ink-700)] border border-[var(--ink-600)] rounded text-[var(--parchment-050)]/80 min-w-[24px] text-center">
                                    {key}
                                  </kbd>
                                  {keyIdx < shortcut.keys.length - 1 && (
                                    <span className="text-[var(--parchment-050)]/40 mx-1">+</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[var(--ink-700)] bg-[var(--ink-900)]/50 text-xs text-[var(--parchment-050)]/60 text-center">
                Press <kbd className="px-1.5 py-0.5 bg-[var(--ink-700)] rounded text-[10px]">Esc</kbd> to close
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

