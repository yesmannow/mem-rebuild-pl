import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera, X, ZoomIn, Copy, Check } from 'lucide-react';

interface PhotoItem {
  src: string;
  alt: string;
  title: string;
  category: string;
  tags: string[];
  featured: boolean;
  exif?: {
    iso: string;
    aperture: string;
    shutter: string;
    camera: string;
    lens: string;
  };
}

interface DesignItem {
  src: string;
  alt: string;
  title: string;
  category: string;
  tags: string[];
  featured: boolean;
  colors?: string[];
}

type GalleryMode = 'photo' | 'design';

interface SmartGalleryProps {
  mode: GalleryMode;
  items: (PhotoItem | DesignItem)[];
}

const SmartGallery: React.FC<SmartGalleryProps> = ({ mode, items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<PhotoItem | DesignItem | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  React.useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const copyColorToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const handleItemClick = (item: PhotoItem | DesignItem) => {
    setSelectedItem(item);
  };

  const isPhoto = (item: PhotoItem | DesignItem): item is PhotoItem => {
    return mode === 'photo' && 'exif' in item;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isPhotoItem = isPhoto(item);

          return (
            <GalleryCard
              key={`${mode}-${index}`}
              item={item}
              index={index}
              mode={mode}
              isHovered={isHovered}
              isTouchDevice={isTouchDevice}
              onHover={() => !isTouchDevice && setHoveredIndex(index)}
              onLeave={() => !isTouchDevice && setHoveredIndex(null)}
              onClick={() => handleItemClick(item)}
              onColorCopy={copyColorToClipboard}
              copiedColor={copiedColor}
            />
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] w-full"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white hover:text-brand-teal transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={selectedItem.src}
                alt={selectedItem.alt}
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-brand-muted">{selectedItem.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 3D Tilt Card Component
interface GalleryCardProps {
  item: PhotoItem | DesignItem;
  index: number;
  mode: GalleryMode;
  isHovered: boolean;
  isTouchDevice: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  onColorCopy: (color: string) => void;
  copiedColor: string | null;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  index,
  mode,
  isHovered,
  isTouchDevice,
  onHover,
  onLeave,
  onClick,
  onColorCopy,
  copiedColor,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXValue = (e.clientX - rect.left) / width - 0.5;
    const mouseYValue = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseXValue);
    mouseY.set(mouseYValue);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
  };

  const isPhotoItem = mode === 'photo' && 'exif' in item;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
    >
      {/* Image Container with 3D Effect */}
      <div className="relative overflow-hidden rounded-xl bg-brand-surface/20 border border-brand-teal/10">
        <motion.img
          src={item.src}
          alt={item.alt}
          className="w-full h-auto object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

                {/* Overlay - Lens Mode (EXIF Data) */}
                {mode === 'photo' && isPhotoItem && item.exif && (
                  <AnimatePresence>
                    {(isHovered || isTouchDevice) && (
                      <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-4 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Camera size={20} className="text-brand-teal" />
                          <span className="text-sm font-semibold text-white">{item.title}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div className="text-brand-muted">
                            <span className="text-brand-teal">ISO:</span> {item.exif.iso}
                          </div>
                          <div className="text-brand-muted">
                            <span className="text-brand-teal">Aperture:</span> {item.exif.aperture}
                          </div>
                          <div className="text-brand-muted">
                            <span className="text-brand-teal">Shutter:</span> {item.exif.shutter}
                          </div>
                          <div className="text-brand-muted">
                            <span className="text-brand-teal">Camera:</span> {item.exif.camera}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-brand-muted">
                          <span className="text-brand-teal">Lens:</span> {item.exif.lens}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Overlay - Pixel Mode (Color Palette) */}
                {mode === 'design' && !isPhotoItem && item.colors && (
                  <AnimatePresence>
                    {(isHovered || isTouchDevice) && (
                      <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-4 backdrop-blur-sm"
                      >
                        <div className="mb-3">
                          <span className="text-sm font-semibold text-white">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {item.colors.slice(0, 5).map((color, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onColorCopy(color);
                              }}
                              className="w-8 h-8 rounded border-2 border-white/20 shadow-lg hover:scale-110 transition-transform relative"
                              style={{ backgroundColor: color }}
                              title={`Click to copy: ${color}`}
                            >
                              {copiedColor === color && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded"
                                >
                                  <Check size={16} className="text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs font-mono">
                          {item.colors.slice(0, 5).map((color, idx) => (
                            <motion.button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                onColorCopy(color);
                              }}
                              className="px-2 py-1 bg-black/50 rounded text-brand-teal hover:bg-black/70 transition-colors flex items-center gap-1"
                              title="Click to copy"
                            >
                              {color}
                              {copiedColor === color ? (
                                <Check size={12} className="text-green-400" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Zoom Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <ZoomIn size={20} className="text-white" />
                </motion.div>
              </div>
            </motion.div>
  );
};

export default SmartGallery;
