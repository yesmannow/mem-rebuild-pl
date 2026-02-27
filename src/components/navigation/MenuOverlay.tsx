import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { mainNavigationLinks } from '../../data/navigation';

const pillStyles = 'px-6 py-2 rounded-full border border-white/15 bg-black/70 backdrop-blur-2xl text-white text-[10px] font-[\'Geist\',_sans-serif] tracking-[0.6em] uppercase shadow-[0_20px_60px_rgba(0,0,0,0.45)] hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-300';

const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.12,
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.4,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] },
  },
};

const overlayItems = [
  {
    name: 'Home',
    path: '/',
    description: 'Return to the war-room console',
  },
  ...mainNavigationLinks,
];

const previewPalette = ['#00F2FF', '#9b87f5', '#fed7aa', '#f43f5e', '#38bdf8', '#facc15', '#4ade80'];

const MenuOverlay: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const menuItems = useMemo(() => overlayItems, []);

  useGSAP(
    () => {
      if (!previewRef.current) return;
      const ctx = gsap.context(() => {
        gsap.to(previewRef.current, {
          filter: 'hue-rotate(20deg) contrast(120%)',
          duration: 0.6,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
        });
      }, previewRef);
      return () => ctx.revert();
    },
    { dependencies: [hoveredIndex], scope: previewRef }
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const previewColor = previewPalette[hoveredIndex % previewPalette.length];

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className={`fixed left-1/2 top-4 z-[600] -translate-x-1/2 ${pillStyles}`}
      >
        [ MENU ]
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[580]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/90" />
            <div
              ref={previewRef}
              className="absolute inset-0 opacity-60 mix-blend-screen"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, ${previewColor}66, transparent 55%), linear-gradient(120deg, rgba(0, 0, 0, 0) 0%, ${previewColor}1f 40%, rgba(0,0,0,0.7) 100%)`,
              }}
            />
            <motion.div
              className="relative z-10 flex h-full flex-col justify-center px-6 pb-12 pt-16 md:px-16"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={event => event.stopPropagation()}
            >
              <motion.ul className="space-y-6" variants={menuVariants}>
                {menuItems.map((item, index) => (
                  <motion.li key={item.path} variants={itemVariants}>
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onFocus={() => setHoveredIndex(index)}
                      onClick={() => handleNavigate(item.path)}
                      className="group w-full text-left focus-visible:outline-none"
                    >
                      <span className="block font-['Playfair_Display'] text-[min(14vw,9rem)] italic leading-none text-white transition-colors duration-300 group-hover:text-cyan-200">
                        {item.name ?? item.description}
                      </span>
                      <span className="mt-2 block font-['Geist',_sans-serif] text-[12px] uppercase tracking-[0.5em] text-white/50 transition-colors group-hover:text-white/80">
                        {item.description}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuOverlay;
