import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useUIStore } from '../../store/ui';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useUIStore();

  useEffect(() => {
    // Initialize theme on mount
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  return (
    <motion.button
      className="theme-toggle"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
