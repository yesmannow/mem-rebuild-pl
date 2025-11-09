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
  ExternalLink
} from 'lucide-react';

// Command data structure
const COMMAND_ITEMS = {
  pages: [
    {
      id: 'home',
      title: 'Home',
      description: 'BearCave Marketing homepage',
      icon: Home,
      to: '/',
      keywords: ['main', 'landing', 'start']
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn about my journey and background',
      icon: User,
      to: '/about',
      keywords: ['me', 'story', 'bio', 'background']
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch for collaborations',
      icon: Mail,
      to: '/contact',
      keywords: ['reach', 'message', 'connect']
    },
    {
      id: 'resume',
      title: 'Resume',
      description: 'View my professional experience',
      icon: FileText,
      to: '/resume',
      keywords: ['cv', 'curriculum', 'experience']
    }
  ],
  work: [
    {
      id: 'case-studies',
      title: 'Case Studies',
      description: 'Deep-dive into problem-solving and results',
      icon: Briefcase,
      to: '/case-studies',
      keywords: ['projects', 'results', 'success']
    },
    {
      id: 'design',
      title: 'Graphic Design',
      description: 'Visual identity and brand systems',
      icon: Palette,
      to: '/design',
      keywords: ['visual', 'branding', 'identity']
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Visual storytelling and composition',
      icon: Camera,
      to: '/photography',
      keywords: ['images', 'visual', 'pictures']
    },
    {
      id: 'side-projects',
      title: 'Side Projects',
      description: 'Experimental work and collaborations',
      icon: Code,
      to: '/side-projects',
      keywords: ['experimental', 'collaborations', 'personal']
    }
  ],
  tools: [
    {
      id: 'applications',
      title: 'Dev Builds',
      description: 'Custom applications and interactive tools',
      icon: Code,
      to: '/applications',
      keywords: ['tools', 'interactive', 'development']
    },
    {
      id: 'toolbox',
      title: 'Toolbox',
      description: 'Frameworks, templates, and resources',
      icon: Wrench,
      to: '/toolbox',
      keywords: ['resources', 'templates', 'frameworks']
    }
  ],
  inspiration: [
    {
      id: 'inspiration',
      title: 'Inspiration',
      description: 'Design references and creative influences',
      icon: Lightbulb,
      to: '/inspiration',
      keywords: ['references', 'influences', 'creative']
    },
    {
      id: 'brand-builder',
      title: 'Brand Builder',
      description: 'Interactive brand identity creation tool',
      icon: Building2,
      to: '/brand-builder',
      keywords: ['brand', 'identity', 'create']
    },
    {
      id: 'gallery',
      title: 'Gallery',
      description: 'Curated brand identity systems',
      icon: Palette,
      to: '/gallery',
      keywords: ['gallery', 'showcase', 'portfolio']
    }
  ]
};

const ALL_COMMANDS = Object.values(COMMAND_ITEMS).flat();

interface CommandItemProps {
  item: typeof ALL_COMMANDS[0];
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
          ? 'bg-turquoise/10 border border-turquoise/20 text-turquoise'
          : 'hover:bg-turquoise/5 text-cave-text hover:text-turquoise'
      }`}
      onClick={onSelect}
    >
      <div className={`p-1.5 rounded-md ${
        isSelected ? 'bg-turquoise/20' : 'bg-cave-border'
      }`}>
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{item.title}</div>
        <div className={`text-sm truncate ${
          isSelected ? 'text-turquoise/80' : 'text-cave-text/60'
        }`}>
          {item.description}
        </div>
      </div>
      <ArrowRight size={14} className={`transition-transform ${
        isSelected ? 'rotate-90 text-turquoise' : 'text-cave-text/40'
      }`} />
    </motion.div>
  );
};

interface CommandGroupProps {
  title: string;
  items: typeof ALL_COMMANDS;
  selectedIndex: number;
  startIndex: number;
  onSelectItem: (item: typeof ALL_COMMANDS[0]) => void;
}

const CommandGroup: React.FC<CommandGroupProps> = ({
  title,
  items,
  selectedIndex,
  startIndex,
  onSelectItem
}) => (
  <div className="mb-6">
    <h3 className="text-xs font-semibold text-cave-text/60 uppercase tracking-wider mb-3 px-3">
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

  // Flatten all items for keyboard navigation
  const allItems = useMemo(() => ALL_COMMANDS, []);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return ALL_COMMANDS;

    const searchTerm = query.toLowerCase();
    return ALL_COMMANDS.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  }, [query]);

  // Group filtered items
  const groupedItems = useMemo(() => {
    const groups = {
      pages: [] as typeof ALL_COMMANDS,
      work: [] as typeof ALL_COMMANDS,
      tools: [] as typeof ALL_COMMANDS,
      inspiration: [] as typeof ALL_COMMANDS
    };

    filteredItems.forEach(item => {
      for (const [groupName, groupItems] of Object.entries(COMMAND_ITEMS)) {
        if (groupItems.some(groupItem => groupItem.id === item.id)) {
          (groups[groupName as keyof typeof groups] as typeof ALL_COMMANDS).push(item);
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

  const handleSelectItem = (item: typeof ALL_COMMANDS[0]) => {
    navigate(item.to);
    onClose();
    setQuery('');
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
            className="w-full max-w-2xl mx-4 bg-cave-bg border border-cave-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-cave-border">
              <Search className="text-turquoise" size={20} />
              <input
                type="text"
                placeholder="Search pages, projects, and more..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-cave-text placeholder-cave-text/50 outline-none text-lg"
                data-command-input
              />
              <kbd className="flex items-center gap-1 px-2 py-1 text-xs font-mono bg-cave-border rounded text-cave-text/70">
                <Command size={12} />
                K
              </kbd>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {query.trim() && filteredItems.length === 0 ? (
                <div className="p-8 text-center">
                  <Search className="mx-auto text-cave-text/40 mb-3" size={24} />
                  <p className="text-cave-text/60">No results found for &quot;{query}&quot;</p>
                  <p className="text-cave-text/40 text-sm mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="p-4">
                  {Object.entries(groupedItems).map(([groupName, items]) => {
                    if (items.length === 0) return null;

                    const groupTitles = {
                      pages: 'Pages',
                      work: 'Work',
                      tools: 'Tools & Skills',
                      inspiration: 'Inspiration'
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
              <div className="flex items-center justify-between p-3 border-t border-cave-border bg-cave-bg/50">
                <div className="flex items-center gap-4 text-xs text-cave-text/60">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>esc Close</span>
                </div>
                <div className="text-xs text-cave-text/40">
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