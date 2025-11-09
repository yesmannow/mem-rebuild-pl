import React, { useEffect, useState, useCallback } from 'react';
import CommandMenu from './CommandMenu';

interface CommandMenuToggleProps {
  className?: string;
}

export default function CommandMenuToggle({ className }: CommandMenuToggleProps) {
  const [open, setOpen] = useState(false);

  // Global keyboard shortcut handler
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isCmdK = isMac && event.metaKey && event.key.toLowerCase() === 'k';
    const isCtrlK = !isMac && event.ctrlKey && event.key.toLowerCase() === 'k';

    if (isCmdK || isCtrlK) {
      event.preventDefault();
      setOpen(prev => !prev);
    }
  }, []);

  // Close on escape
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  // Set up event listeners
  useEffect(() => {
    // Only add the keyboard shortcut listener when not in an input
    const isInputElement = (target: EventTarget) => {
      const element = target as HTMLElement;
      return element.tagName === 'INPUT' ||
             element.tagName === 'TEXTAREA' ||
             element.getAttribute('contenteditable') === 'true';
    };

    const handleKeyDownWithInputCheck = (event: KeyboardEvent) => {
      if (event.target && !isInputElement(event.target)) {
        handleKeyDown(event);
      }
    };

    document.addEventListener('keydown', handleKeyDownWithInputCheck);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleKeyDownWithInputCheck);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleKeyDown, handleEscape]);

  // Close on click outside or route change
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest('[data-command-menu]')) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Don't render anything - this is just a keyboard listener
  return (
    <CommandMenu
      open={open}
      onClose={() => setOpen(false)}
    />
  );
}