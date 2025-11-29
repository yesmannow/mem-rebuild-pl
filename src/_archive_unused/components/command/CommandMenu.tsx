import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  ArrowRight,
  Home,
  User,
  Briefcase,
  Camera,
  Palette,
  Code,
  Wrench,
  Lightbulb,
  Building2,
  Mail,
  FileText,
  ExternalLink,
  Copy,
  Download,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

// Types for command items
type NavigationItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  to: string;
  keywords: string[];
  type: 'navigation';
};

type ActionItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  action: () => void;
  keywords: string[];
  type: 'action';
};

type CommandItem = NavigationItem | ActionItem;

// Command data structure
const COMMAND_ITEMS: {
  pages: NavigationItem[];
  work: NavigationItem[];
  tools: NavigationItem[];
  inspiration: NavigationItem[];
  actions: ActionItem[];
} = {
  pages: [
    {
      id: 'home',
      title: 'Home',
      description: 'BearCave Marketing homepage',
      icon: Home,
      to: '/',
      keywords: ['main', 'landing', 'start'],
      type: 'navigation' as const
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn about my journey and background',
      icon: User,
      to: '/about',
      keywords: ['me', 'story', 'bio', 'background'],
      type: 'navigation' as const
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch for collaborations',
      icon: Mail,
      to: '/contact',
      keywords: ['reach', 'message', 'connect'],
      type: 'navigation' as const
    },
    {
      id: 'resume',
      title: 'Resume',
      description: 'View my professional experience',
      icon: FileText,
      to: '/resume',
      keywords: ['cv', 'curriculum', 'experience'],
      type: 'navigation' as const
    }
  ],
  work: [
    {
      id: 'case-studies',
      title: 'Case Studies',
      description: 'Deep-dive into problem-solving and results',
      icon: Briefcase,
      to: '/case-studies',
      keywords: ['projects', 'results', 'success'],
      type: 'navigation' as const
    },
    {
      id: 'design',
      title: 'Graphic Design',
      description: 'Visual identity and brand systems',
      icon: Palette,
      to: '/design',
      keywords: ['visual', 'branding', 'identity'],
      type: 'navigation' as const
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Visual storytelling and composition',
      icon: Camera,
      to: '/photography',
      keywords: ['images', 'visual', 'pictures'],
      type: 'navigation' as const
    },
    {
      id: 'side-projects',
      title: 'Side Projects',
      description: 'Experimental work and collaborations',
      icon: Code,
      to: '/side-projects',
      keywords: ['experimental', 'collaborations', 'personal'],
      type: 'navigation' as const
    }
  ],
  tools: [
    {
      id: 'applications',
      title: 'Dev Builds',
      description: 'Custom applications and interactive tools',
      icon: Code,
      to: '/applications',
      keywords: ['tools', 'interactive', 'development'],
      type: 'navigation' as const
    },
    {
      id: 'toolbox',
      title: 'Toolbox',
      description: 'Frameworks, templates, and resources',
      icon: Wrench,
      to: '/toolbox',
      keywords: ['resources', 'templates', 'frameworks'],
      type: 'navigation' as const
    }
  ],
  inspiration: [
    {
      id: 'inspiration',
      title: 'Inspiration',
      description: 'Design references and creative influences',
      icon: Lightbulb,
      to: '/inspiration',
      keywords: ['references', 'influences', 'creative'],
      type: 'navigation' as const
    },
    {
      id: 'brand-builder',
      title: 'Brand Builder',
      description: 'Interactive brand identity creation tool',
      icon: Building2,
      to: '/brand-builder',
      keywords: ['brand', 'identity', 'create'],
      type: 'navigation' as const
    },
    {
      id: 'gallery',
      title: 'Gallery',
      description: 'Curated brand identity systems',
      icon: Palette,
      to: '/gallery',
      keywords: ['gallery', 'showcase', 'portfolio'],
      type: 'navigation' as const
    }
  ],
  actions: [] as ActionItem[] // Will be populated dynamically
};

const ALL_COMMANDS: CommandItem[] = Object.values(COMMAND_ITEMS).flat() as CommandItem[];

interface CommandItemProps {
  item: CommandItem;
  isSelected: boolean;
  onSelect: () => void;
}

const CommandItem: React.FC<CommandItemProps> = ({ item, isSelected, onSelect }) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-[var(--signal-500)]/10 border border-[var(--signal-500)]/20 text-[var(--signal-500)]'
          : 'hover:bg-[var(--signal-500)]/5 text-[var(--parchment-050)] hover:text-[var(--signal-500)]'
      }`}
      onClick={onSelect}
    >
      <div className={`p-1.5 rounded-md ${
        isSelected ? 'bg-[var(--signal-500)]/20' : 'bg-[var(--ink-700)]'
      }`}>
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{item.title}</div>
        <div className={`text-sm truncate ${
          isSelected ? 'text-[var(--signal-500)]/80' : 'text-[var(--parchment-050)]/60'
        }`}>
          {item.description}
        </div>
      </div>
      {item.type === 'navigation' ? (
        <ArrowRight size={14} className={`transition-transform ${
          isSelected ? 'rotate-90 text-[var(--signal-500)]' : 'text-[var(--parchment-050)]/40'
        }`} />
      ) : (
        <div className="text-xs text-[var(--parchment-050)]/40 px-2 py-1 bg-[var(--ink-700)] rounded">
          Action
        </div>
      )}
    </motion.div>
  );
};

interface CommandGroupProps {
  title: string;
  items: CommandItem[];
  selectedIndex: number;
  startIndex: number;
  onSelectItem: (item: CommandItem) => void;
}

const CommandGroup: React.FC<CommandGroupProps> = ({
  title,
  items,
  selectedIndex,
  startIndex,
  onSelectItem
}) => (
  <div className="mb-6">
    <h3 className="text-xs font-semibold text-[var(--parchment-050)]/60 uppercase tracking-wider mb-3 px-3">
      {title}
    </h3>
    <div className="space-y-1">
      {items.map((item, index) => (
        <CommandItem
          key={item.id}
          item={item}
          isSelected={selectedIndex === startIndex + index}
          onSelect={() => onSelectItem(item)}
        />
      ))}
    </div>
  </div>
);

interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandMenu({ open, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Email address
  const EMAIL = 'hoosierdarling@gmail.com';

  // Determine current effective theme (handle 'system')
  const effectiveTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  // Action handlers
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      // Show toast notification (you can enhance this with a toast system)
      console.log('Email copied to clipboard');
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleDownloadResume = () => {
    // Navigate to resume page and trigger download
    navigate('/resume');
    // The resume page should have a download button that can be triggered
    // For now, we'll just navigate there
  };

  const handleToggleTheme = () => {
    const newTheme = effectiveTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Build actions dynamically
  const actionItems: ActionItem[] = useMemo(() => [
    {
      id: 'copy-email',
      title: 'Copy Email',
      description: EMAIL,
      icon: Copy,
      action: handleCopyEmail,
      keywords: ['email', 'contact', 'copy', 'clipboard'],
      type: 'action' as const
    },
    {
      id: 'download-resume',
      title: 'Download Resume',
      description: 'Get my professional resume as PDF',
      icon: Download,
      action: handleDownloadResume,
      keywords: ['resume', 'cv', 'download', 'pdf'],
      type: 'action' as const
    },
    {
      id: 'toggle-theme',
      title: `Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} Mode`,
      description: `Currently using ${effectiveTheme} theme`,
      icon: effectiveTheme === 'dark' ? Sun : Moon,
      action: handleToggleTheme,
      keywords: ['theme', 'dark', 'light', 'mode', 'toggle'],
      type: 'action' as const
    }
  ], [effectiveTheme, EMAIL]);

  // Combine all commands with actions
  const allCommandsWithActions = useMemo(() => {
    return [
      ...COMMAND_ITEMS.pages,
      ...COMMAND_ITEMS.work,
      ...COMMAND_ITEMS.tools,
      ...COMMAND_ITEMS.inspiration,
      ...actionItems
    ];
  }, [actionItems]);

  // Flatten all items for keyboard navigation
  const allItems = useMemo(() => allCommandsWithActions, [allCommandsWithActions]);

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
      pages: [] as CommandItem[],
      work: [] as CommandItem[],
      tools: [] as CommandItem[],
      inspiration: [] as CommandItem[],
      actions: [] as CommandItem[]
    };

    filteredItems.forEach(item => {
      // Check if it's an action
      if (item.type === 'action') {
        groups.actions.push(item);
        return;
      }

      // Check other groups
      for (const [groupName, groupItems] of Object.entries(COMMAND_ITEMS)) {
        if (groupName === 'actions') continue;
        if (groupItems.some(groupItem => groupItem.id === item.id)) {
          (groups[groupName as keyof typeof groups] as CommandItem[]).push(item);
          break;
        }
      }
    });

    return groups;
  }, [filteredItems]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

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
  }, [open, selectedIndex, filteredItems, onClose]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelectItem = (item: CommandItem) => {
    if (item.type === 'action') {
      item.action();
      onClose();
      setQuery('');
    } else {
      navigate(item.to);
      onClose();
      setQuery('');
    }
  };

  // Focus input when menu opens
  useEffect(() => {
    if (open) {
      const input = document.querySelector('[data-command-input]') as HTMLInputElement;
      input?.focus();
    }
  }, [open]);

  if (!open) return null;

  const totalGroups = Object.entries(groupedItems).filter(([_, items]) => items.length > 0).length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="flex items-start justify-center pt-20 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-full max-w-2xl mx-4 bg-[var(--ink-900)] border border-[var(--ink-700)] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-[var(--ink-700)]">
              <Search className="text-[var(--signal-500)]" size={20} />
              <input
                type="text"
                placeholder="Search pages, projects, and more..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-[var(--parchment-050)] placeholder-[var(--parchment-050)]/50 outline-none text-lg"
                data-command-input
              />
              <kbd className="flex items-center gap-1 px-2 py-1 text-xs font-mono bg-[var(--ink-700)] rounded text-[var(--parchment-050)]/70">
                <Command size={12} />
                K
              </kbd>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {query.trim() && filteredItems.length === 0 ? (
                <div className="p-8 text-center">
                  <Search className="mx-auto text-[var(--parchment-050)]/40 mb-3" size={24} />
                  <p className="text-[var(--parchment-050)]/60">No results found for &quot;{query}&quot;</p>
                  <p className="text-[var(--parchment-050)]/40 text-sm mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="p-4">
                  {Object.entries(groupedItems).map(([groupName, items]) => {
                    if (items.length === 0) return null;

                    const groupTitles = {
                      pages: 'Pages',
                      work: 'Work',
                      tools: 'Tools & Skills',
                      inspiration: 'Inspiration',
                      actions: 'Actions'
                    };

                    return (
                      <CommandGroup
                        key={groupName}
                        title={groupTitles[groupName as keyof typeof groupTitles]}
                        items={items}
                        selectedIndex={selectedIndex}
                        startIndex={filteredItems.indexOf(items[0])}
                        onSelectItem={handleSelectItem}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredItems.length > 0 && (
              <div className="flex items-center justify-between p-3 border-t border-[var(--ink-700)] bg-[var(--ink-900)]/50">
                <div className="flex items-center gap-4 text-xs text-[var(--parchment-050)]/60">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>esc Close</span>
                </div>
                <div className="text-xs text-[var(--parchment-050)]/40">
                  {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
