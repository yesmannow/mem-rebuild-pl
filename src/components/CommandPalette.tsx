import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  ArrowRight,
  Home,
  User,
  Briefcase,
  Palette,
  Code,
  Wrench,
  Mail,
  FileText,
  Copy,
  ExternalLink,
  FlaskConical,
  Swords,
  Lock,
  Rocket,
  Shield,
  Compass,
  Zap,
  Database,
  CreditCard,
  Settings
} from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

// Types for command items
type NavigationItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  to: string;
  keywords: string[];
  type: 'navigation';
};

type ActionItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  keywords: string[];
  type: 'action';
};

type CommandItem = NavigationItem | ActionItem;

// Navigation items
const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    description: 'Return to the homepage',
    icon: Home,
    to: '/',
    keywords: ['main', 'landing', 'start'],
    type: 'navigation'
  },
  {
    id: 'work',
    title: 'Work / Case Studies',
    description: 'Deep-dive into problem-solving and results',
    icon: Briefcase,
    to: '/case-studies',
    keywords: ['projects', 'results', 'success', 'portfolio'],
    type: 'navigation'
  },
  {
    id: 'lab',
    title: 'The Lab',
    description: 'Experimental applications and tools',
    icon: FlaskConical,
    to: '/apps',
    keywords: ['apps', 'tools', 'experiments', 'development'],
    type: 'navigation'
  },
  {
    id: 'studio',
    title: 'The Studio',
    description: 'Creative workspace and design portfolio',
    icon: Palette,
    to: '/studio',
    keywords: ['design', 'creative', 'visual', 'branding'],
    type: 'navigation'
  },
  {
    id: 'warroom',
    title: 'War Room',
    description: 'Strategic operations center',
    icon: Swords,
    to: '/war-room',
    keywords: ['strategy', 'operations', 'command'],
    type: 'navigation'
  },
  {
    id: 'vault',
    title: 'The Vault',
    description: 'Project archive and gallery',
    icon: Lock,
    to: '/gallery',
    keywords: ['archive', 'gallery', 'collection'],
    type: 'navigation'
  },
  {
    id: 'services',
    title: 'Services',
    description: 'What I offer',
    icon: Wrench,
    to: '/services',
    keywords: ['offer', 'work', 'hire'],
    type: 'navigation'
  },
  {
    id: 'ventures',
    title: 'Ventures',
    description: 'Side projects and experiments',
    icon: Rocket,
    to: '/side-projects',
    keywords: ['side', 'projects', 'experiments'],
    type: 'navigation'
  },
  {
    id: 'bio',
    title: 'Bio / About',
    description: 'Learn about my journey and background',
    icon: User,
    to: '/about',
    keywords: ['me', 'story', 'background', 'about'],
    type: 'navigation'
  },
  {
    id: 'resume',
    title: 'Resume',
    description: 'View my professional experience',
    icon: FileText,
    to: '/resume',
    keywords: ['cv', 'curriculum', 'experience'],
    type: 'navigation'
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch for collaborations',
    icon: Mail,
    to: '/contact',
    keywords: ['reach', 'message', 'connect', 'email'],
    type: 'navigation'
  },
];

// Map case study icons
const caseStudyIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'the-fortress': Shield,
  'the-compass': Compass,
  'the-launchpad': Rocket,
  'the-conductor': Database,
  'the-closer': CreditCard,
  'the-engine-room': Settings,
};

// Generate case study navigation items
const CASE_STUDY_ITEMS: NavigationItem[] = caseStudies
  .filter(cs => cs.featured)
  .map(cs => ({
    id: `case-${cs.slug}`,
    title: cs.title,
    description: cs.tagline,
    icon: caseStudyIcons[cs.slug] || Briefcase,
    to: `/case-studies/${cs.slug}`,
    keywords: [...cs.tags, cs.title.toLowerCase(), ...cs.category.map(c => c.toLowerCase())],
    type: 'navigation' as const
  }));

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const EMAIL = 'hoosierdarling@gmail.com';
  const GITHUB_URL = 'https://github.com/yesmannow/mem-rebuild-pl';

  // Action handlers
  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      // Could add toast notification here
      console.log('Email copied to clipboard');
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  }, []);

  const handleViewSource = useCallback(() => {
    window.open(GITHUB_URL, '_blank');
  }, []);

  // Build action items
  const actionItems: ActionItem[] = useMemo(() => [
    {
      id: 'copy-email',
      title: 'Copy Email',
      description: EMAIL,
      icon: Copy,
      action: handleCopyEmail,
      keywords: ['email', 'contact', 'copy', 'clipboard'],
      type: 'action'
    },
    {
      id: 'view-source',
      title: 'View Source Code',
      description: 'Open GitHub repository',
      icon: ExternalLink,
      action: handleViewSource,
      keywords: ['github', 'source', 'code', 'repository'],
      type: 'action'
    },
  ], [handleCopyEmail, handleViewSource]);

  // Combine all items
  const allItems: CommandItem[] = useMemo(() => [
    ...NAVIGATION_ITEMS,
    ...CASE_STUDY_ITEMS,
    ...actionItems
  ], [actionItems]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;

    const searchTerm = query.toLowerCase();
    return allItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  }, [query, allItems]);

  // Group filtered items
  const groupedItems = useMemo(() => {
    const groups = {
      navigation: [] as CommandItem[],
      caseStudies: [] as CommandItem[],
      system: [] as CommandItem[]
    };

    filteredItems.forEach(item => {
      if (item.type === 'action') {
        groups.system.push(item);
      } else if (item.id.startsWith('case-')) {
        groups.caseStudies.push(item);
      } else {
        groups.navigation.push(item);
      }
    });

    return groups;
  }, [filteredItems]);

  // Handle item selection
  const handleSelectItem = useCallback((item: CommandItem) => {
    if (item.type === 'action') {
      item.action();
    } else {
      navigate(item.to);
    }
    onClose();
    setQuery('');
    setSelectedIndex(0);
  }, [navigate, onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredItems.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? filteredItems.length - 1 : prev - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleSelectItem(filteredItems[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, onClose, handleSelectItem]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when menu opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the modal is mounted
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate indices for each group
  let currentIndex = 0;
  const getGroupStartIndex = (groupItems: CommandItem[]) => {
    const startIndex = currentIndex;
    currentIndex += groupItems.length;
    return startIndex;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-slate-950/50 backdrop-blur-2xl"
        onClick={onClose}
      >
        <div className="flex items-start justify-center pt-[15vh] min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.65)] overflow-hidden"
            style={{
              boxShadow: '0 0 40px rgba(64, 224, 208, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/15 text-brand-teal text-xs font-semibold uppercase tracking-wide">
                <Command size={14} /> Palette
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search apps, gallery, resume, contact..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-brand-muted outline-none text-lg"
              />
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-mono bg-slate-800 border border-white/10 rounded text-brand-muted">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center">
                  <Search className="mx-auto text-brand-muted mb-3" size={24} />
                  <p className="text-brand-muted">No results found for "{query}"</p>
                  <p className="text-brand-muted/60 text-sm mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="p-2">
                  {/* Navigation Group */}
                  {groupedItems.navigation.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2 px-3">
                        Navigation
                      </h3>
                      <div className="space-y-1">
                        {(() => {
                          const startIndex = getGroupStartIndex(groupedItems.navigation);
                          return groupedItems.navigation.map((item, index) => {
                            const Icon = item.icon;
                            const isSelected = selectedIndex === startIndex + index;
                            return (
                              <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.02 }}
                                onClick={() => handleSelectItem(item)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-brand-teal/20 text-brand-teal'
                                    : 'hover:bg-white/5 text-white'
                                }`}
                              >
                                <div className={`p-1.5 rounded-md ${
                                  isSelected ? 'bg-brand-teal/20' : 'bg-slate-800'
                                }`}>
                                  <Icon size={16} className={isSelected ? 'text-brand-teal' : 'text-brand-muted'} />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                  <div className="font-medium truncate">{item.title}</div>
                                  <div className={`text-sm truncate ${
                                    isSelected ? 'text-brand-teal/70' : 'text-brand-muted/60'
                                  }`}>
                                    {item.description}
                                  </div>
                                </div>
                                <ArrowRight size={14} className={`transition-transform ${
                                  isSelected ? 'translate-x-1 text-brand-teal' : 'text-brand-muted/40'
                                }`} />
                              </motion.button>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Case Studies Group */}
                  {groupedItems.caseStudies.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2 px-3">
                        Case Studies
                      </h3>
                      <div className="space-y-1">
                        {(() => {
                          const startIndex = getGroupStartIndex(groupedItems.caseStudies);
                          return groupedItems.caseStudies.map((item, index) => {
                            const Icon = item.icon;
                            const isSelected = selectedIndex === startIndex + index;
                            return (
                              <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.02 }}
                                onClick={() => handleSelectItem(item)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-brand-teal/20 text-brand-teal'
                                    : 'hover:bg-white/5 text-white'
                                }`}
                              >
                                <div className={`p-1.5 rounded-md ${
                                  isSelected ? 'bg-brand-teal/20' : 'bg-slate-800'
                                }`}>
                                  <Icon size={16} className={isSelected ? 'text-brand-teal' : 'text-brand-muted'} />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                  <div className="font-medium truncate">{item.title}</div>
                                  <div className={`text-sm truncate ${
                                    isSelected ? 'text-brand-teal/70' : 'text-brand-muted/60'
                                  }`}>
                                    {item.description}
                                  </div>
                                </div>
                                <ArrowRight size={14} className={`transition-transform ${
                                  isSelected ? 'translate-x-1 text-brand-teal' : 'text-brand-muted/40'
                                }`} />
                              </motion.button>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}

                  {/* System/Actions Group */}
                  {groupedItems.system.length > 0 && (
                    <div className="mb-2">
                      <h3 className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2 px-3">
                        System
                      </h3>
                      <div className="space-y-1">
                        {(() => {
                          const startIndex = getGroupStartIndex(groupedItems.system);
                          return groupedItems.system.map((item, index) => {
                            const Icon = item.icon;
                            const isSelected = selectedIndex === startIndex + index;
                            return (
                              <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.02 }}
                                onClick={() => handleSelectItem(item)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-brand-teal/20 text-brand-teal'
                                    : 'hover:bg-white/5 text-white'
                                }`}
                              >
                                <div className={`p-1.5 rounded-md ${
                                  isSelected ? 'bg-brand-teal/20' : 'bg-slate-800'
                                }`}>
                                  <Icon size={16} className={isSelected ? 'text-brand-teal' : 'text-brand-muted'} />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                  <div className="font-medium truncate">{item.title}</div>
                                  <div className={`text-sm truncate ${
                                    isSelected ? 'text-brand-teal/70' : 'text-brand-muted/60'
                                  }`}>
                                    {item.description}
                                  </div>
                                </div>
                                <div className="text-xs text-brand-muted/40 px-2 py-1 bg-slate-800 rounded">
                                  Action
                                </div>
                              </motion.button>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredItems.length > 0 && (
              <div className="flex items-center justify-between p-3 border-t border-white/10 bg-slate-900/50">
                <div className="flex items-center gap-4 text-xs text-brand-muted">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">↵</kbd>
                    Select
                  </span>
                  <span className="hidden sm:flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">esc</kbd>
                    Close
                  </span>
                </div>
                <div className="text-xs text-brand-muted/60">
                  {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommandPalette;
