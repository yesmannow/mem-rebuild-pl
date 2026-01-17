import React from 'react';
import { motion } from 'framer-motion';
import { BrandTokens } from './types';

interface PaletteStepProps {
  tokens: BrandTokens;
  setTokens: React.Dispatch<React.SetStateAction<BrandTokens>>;
}

const PaletteStep: React.FC<PaletteStepProps> = ({ tokens, setTokens }) => {
  const defaultColors = [
    '#6366f1',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#3b82f6',
  ];

  const colorKeys = ['primary', 'secondary', 'accent', 'warning', 'info'];

  const handleColorSelect = (color: string, index: number) => {
    const key = colorKeys[index] || `color${index}`;
    setTokens({
      ...tokens,
      colors: { ...tokens.colors, [key]: color },
    });
  };

  return (
    <div className="step-panel">
      <h2>Refine Your Palette</h2>
      <p>Select and adjust your brand colors</p>
      <div className="palette-grid">
        {defaultColors.map((color, index) => {
          const key = colorKeys[index] || `color${index}`;
          const isSelected = tokens.colors[key] === color;

          return (
            <motion.div
              key={index}
              className={`color-swatch ${isSelected ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleColorSelect(color, index)}
            >
              <span className="color-code">{color}</span>
              {isSelected && (
                <motion.div
                  className="color-check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      {Object.keys(tokens.colors).length > 0 && (
        <div className="selected-colors">
          <h3>Selected Colors:</h3>
          <div className="selected-colors-list">
            {Object.entries(tokens.colors).map(([key, color]) => (
              <div key={key} className="selected-color-item">
                <div
                  className="color-preview"
                  style={{ backgroundColor: color }}
                />
                <span className="color-name">{key}</span>
                <span className="color-value">{color}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaletteStep;
