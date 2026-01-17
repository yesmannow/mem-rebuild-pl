import React from 'react';
import { motion } from 'framer-motion';
import { BrandTokens } from './types';

interface TypographyStepProps {
  tokens: BrandTokens;
  setTokens: React.Dispatch<React.SetStateAction<BrandTokens>>;
}

const TypographyStep: React.FC<TypographyStepProps> = ({ tokens, setTokens }) => {
  const fonts = ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Open Sans'];

  const handleFontSelect = (font: string, type: 'heading' | 'body') => {
    setTokens({
      ...tokens,
      fonts: { ...tokens.fonts, [type]: font },
    });
  };

  return (
    <div className="step-panel">
      <h2>Choose Typography</h2>
      <p>Select fonts that represent your brand</p>

      <div className="typography-section">
        <h3>Heading Font</h3>
        <div className="font-grid">
          {fonts.map(font => (
            <motion.div
              key={`heading-${font}`}
              className={`font-card ${tokens.fonts.heading === font ? 'selected' : ''}`}
              onClick={() => handleFontSelect(font, 'heading')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 style={{ fontFamily: font }}>{font}</h3>
              <p>The quick brown fox jumps over the lazy dog</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="typography-section">
        <h3>Body Font</h3>
        <div className="font-grid">
          {fonts.map(font => (
            <motion.div
              key={`body-${font}`}
              className={`font-card ${tokens.fonts.body === font ? 'selected' : ''}`}
              onClick={() => handleFontSelect(font, 'body')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 style={{ fontFamily: font }}>{font}</h3>
              <p>The quick brown fox jumps over the lazy dog</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypographyStep;
