import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Palette,
  Copy,
  Check,
  Sparkles,
  Download,
  Share2,
  Eye,
  RefreshCw,
  Zap,
  X,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
  usage: number;
}

interface ColorPaletteExtractorProps {
  imageUrl: string;
  onColorsExtracted?: (colors: ColorData[]) => void;
}

const ColorPaletteExtractor: React.FC<ColorPaletteExtractorProps> = ({
  imageUrl,
  onColorsExtracted,
}) => {
  const [colors, setColors] = useState<ColorData[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorData | null>(null);
  const extractorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock color extraction - in a real app, you'd use a library like node-vibrant
  const extractColors = async (url: string): Promise<ColorData[]> => {
    setIsExtracting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock color data - in production, use actual color extraction
    const mockColors: ColorData[] = [
      {
        hex: '#FF6B6B',
        rgb: 'rgb(255, 107, 107)',
        hsl: 'hsl(0, 100%, 71%)',
        name: 'Coral Red',
        usage: 25,
      },
      {
        hex: '#4ECDC4',
        rgb: 'rgb(78, 205, 196)',
        hsl: 'hsl(176, 53%, 55%)',
        name: 'Teal',
        usage: 20,
      },
      {
        hex: '#45B7D1',
        rgb: 'rgb(69, 183, 209)',
        hsl: 'hsl(195, 60%, 55%)',
        name: 'Sky Blue',
        usage: 18,
      },
      {
        hex: '#96CEB4',
        rgb: 'rgb(150, 206, 180)',
        hsl: 'hsl(150, 35%, 70%)',
        name: 'Mint Green',
        usage: 15,
      },
      {
        hex: '#FFEAA7',
        rgb: 'rgb(255, 234, 167)',
        hsl: 'hsl(48, 100%, 83%)',
        name: 'Cream',
        usage: 12,
      },
      {
        hex: '#DDA0DD',
        rgb: 'rgb(221, 160, 221)',
        hsl: 'hsl(300, 47%, 75%)',
        name: 'Plum',
        usage: 10,
      },
    ];

    setIsExtracting(false);
    return mockColors;
  };

  useEffect(() => {
    if (imageUrl) {
      extractColors(imageUrl).then(extractedColors => {
        setColors(extractedColors);
        onColorsExtracted?.(extractedColors);
      });
    }
  }, [imageUrl, onColorsExtracted]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        extractorRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: extractorRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, extractorRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = async (color: string, format: 'hex' | 'rgb' | 'hsl') => {
    try {
      const colorData = colors.find(c => c.hex === color);
      if (!colorData) return;

      const textToCopy =
        format === 'hex' ? colorData.hex : format === 'rgb' ? colorData.rgb : colorData.hsl;

      await navigator.clipboard.writeText(textToCopy);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (error) {
      console.error('Failed to copy color:', error);
    }
  };

  const downloadPalette = () => {
    const paletteData = colors.map(color => ({
      hex: color.hex,
      rgb: color.rgb,
      hsl: color.hsl,
      name: color.name,
    }));

    const dataStr = JSON.stringify(paletteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-palette.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  const sharePalette = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Color Palette',
          text: `Check out this color palette: ${colors.map(c => c.hex).join(', ')}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      const paletteText = colors.map(c => `${c.name}: ${c.hex}`).join('\n');
      await navigator.clipboard.writeText(paletteText);
      // You could add a toast notification here
    }
  };

  return (
    <div
      ref={extractorRef}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Color Palette</h3>
            <p className="text-sm text-gray-400">AI-extracted from image</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={downloadPalette}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            title="Download Palette"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={sharePalette}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            title="Share Palette"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExtracting ? (
        <div className="flex items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full"
          />
          <span className="ml-3 text-gray-400">Extracting colors...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colors.map((color, index) => (
            <motion.div
              key={color.hex}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedColor(color)}
            >
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <div
                  className="w-full h-full transition-transform duration-300 group-hover:scale-110 color-swatch"
                  data-color={color.hex}
                />
              </div>

              <div className="mt-2 text-center">
                <div className="text-sm font-mono text-white mb-1">{color.hex}</div>
                <div className="text-xs text-gray-400">{color.name}</div>
                <div className="text-xs text-gray-500">{color.usage}%</div>
              </div>

              {/* Copy Button */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  copyToClipboard(color.hex, 'hex');
                }}
                className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {copiedColor === color.hex ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Color Details Modal */}
      <AnimatePresence>
        {selectedColor && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedColor(null)}
          >
            <motion.div
              className="relative max-w-md w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedColor(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                title="Close color details"
                aria-label="Close color details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div
                  className="w-24 h-24 mx-auto rounded-xl shadow-lg mb-4 color-swatch"
                  data-color={selectedColor.hex}
                  title={`Color: ${selectedColor.hex}`}
                />
                <h3 className="text-xl font-bold text-white mb-2">{selectedColor.name}</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">HEX:</span>
                    <span className="text-white font-mono">{selectedColor.hex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RGB:</span>
                    <span className="text-white font-mono">{selectedColor.rgb}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">HSL:</span>
                    <span className="text-white font-mono">{selectedColor.hsl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Usage:</span>
                    <span className="text-white">{selectedColor.usage}%</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => copyToClipboard(selectedColor.hex, 'hex')}
                    className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-colors"
                  >
                    Copy HEX
                  </button>
                  <button
                    onClick={() => copyToClipboard(selectedColor.hex, 'rgb')}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
                  >
                    Copy RGB
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPaletteExtractor;
