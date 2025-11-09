import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download } from 'lucide-react';

interface ColorPalette {
  primary?: string[];
  secondary?: string[];
  accent?: string[];
  neutral?: string[];
  semantic?: {
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
  };
  gradients?: string[];
  warmth?: string[];
  whimsical?: string[];
  palette?: string;
  [key: string]: any;
}

interface BrandColorPaletteProps {
  colors: ColorPalette;
  brandName?: string;
}

const BrandColorPalette: React.FC<BrandColorPaletteProps> = ({ colors, brandName = 'Brand' }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const exportPalette = () => {
    const allColors: string[] = [];

    // Collect all colors
    if (colors.primary) allColors.push(...colors.primary);
    if (colors.secondary) allColors.push(...colors.secondary);
    if (colors.accent) allColors.push(...colors.accent);
    if (colors.neutral) allColors.push(...colors.neutral);
    if (colors.warmth) allColors.push(...colors.warmth);
    if (colors.whimsical) allColors.push(...colors.whimsical);
    if (colors.galactic) allColors.push(...colors.galactic);
    if (colors.victorian) allColors.push(...colors.victorian);
    if (colors.natural) allColors.push(...colors.natural);
    if (colors.semantic?.success) allColors.push(colors.semantic.success);
    if (colors.semantic?.warning) allColors.push(colors.semantic.warning);
    if (colors.semantic?.error) allColors.push(colors.semantic.error);
    if (colors.semantic?.info) allColors.push(colors.semantic.info);

    const uniqueColors = [...new Set(allColors)];
    const paletteText = `Color Palette: ${brandName}\n\n${uniqueColors.join('\n')}`;

    // Create downloadable file
    const blob = new Blob([paletteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName.toLowerCase().replace(/\s+/g, '-')}-palette.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderColorSwatch = (color: string, label?: string) => {
    const isCopied = copiedColor === color;
    return (
      <motion.div
        key={color}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative cursor-pointer"
        onClick={() => copyToClipboard(color)}
      >
        <div
          className="w-full h-20 rounded-lg shadow-md transition-shadow hover:shadow-xl"
          style={{ backgroundColor: color }}
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label || color}
          </span>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
            aria-label="Copy color"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{color}</div>
      </motion.div>
    );
  };

  const renderColorGroup = (title: string, colors: string[] | undefined, key: string) => {
    if (!colors || colors.length === 0) return null;

    return (
      <div key={key} className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {colors.map(color => renderColorSwatch(color))}
        </div>
      </div>
    );
  };

  const renderSemanticColors = (semantic: ColorPalette['semantic']) => {
    if (!semantic) return null;

    return (
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Semantic Colors</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {semantic.success && renderColorSwatch(semantic.success, 'Success')}
          {semantic.warning && renderColorSwatch(semantic.warning, 'Warning')}
          {semantic.error && renderColorSwatch(semantic.error, 'Error')}
          {semantic.info && renderColorSwatch(semantic.info, 'Info')}
        </div>
      </div>
    );
  };

  const renderGradient = (gradient: string) => {
    const [start, end] = gradient.split(' → ');
    return (
      <div key={gradient} className="mb-4">
        <div className="flex gap-2 mb-2">
          <div className="flex-1 h-16 rounded-lg" style={{ backgroundColor: start }} />
          <div className="flex items-center text-gray-500">→</div>
          <div className="flex-1 h-16 rounded-lg" style={{ backgroundColor: end }} />
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{gradient}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        {colors.palette && (
          <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">{colors.palette}</p>
          </div>
        )}
        <button
          onClick={exportPalette}
          className="ml-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Download className="h-4 w-4" />
          Export Palette
        </button>
      </div>

      {renderColorGroup('Primary Colors', colors.primary, 'primary')}
      {renderColorGroup('Secondary Colors', colors.secondary, 'secondary')}
      {renderColorGroup('Accent Colors', colors.accent, 'accent')}
      {renderColorGroup('Neutral Colors', colors.neutral, 'neutral')}
      {renderColorGroup('Warmth Colors', colors.warmth, 'warmth')}
      {renderColorGroup('Whimsical Colors', colors.whimsical, 'whimsical')}
      {renderColorGroup('Galactic Colors', colors.galactic, 'galactic')}
      {renderColorGroup('Victorian Colors', colors.victorian, 'victorian')}
      {renderColorGroup('Natural Colors', colors.natural, 'natural')}

      {renderSemanticColors(colors.semantic)}

      {colors.gradients && colors.gradients.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gradients</h4>
          {colors.gradients.map(renderGradient)}
        </div>
      )}

      {Object.keys(colors).length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No color information available for {brandName}
        </div>
      )}
    </div>
  );
};

export default BrandColorPalette;

