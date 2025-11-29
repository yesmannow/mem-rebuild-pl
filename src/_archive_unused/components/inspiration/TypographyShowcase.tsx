import React from 'react';
import { motion } from 'framer-motion';

interface TypographyScale {
  display?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  body?: string;
  caption?: string;
  [key: string]: string | undefined;
}

interface TypographyInfo {
  primary?: string;
  secondary?: string;
  style?: string;
  approach?: string;
  scale?: TypographyScale;
}

interface TypographyShowcaseProps {
  typography: TypographyInfo;
  brandName?: string;
}

const TypographyShowcase: React.FC<TypographyShowcaseProps> = ({
  typography,
  brandName = 'Brand',
}) => {
  const renderTypeScale = () => {
    if (!typography.scale) return null;

    const scaleEntries = Object.entries(typography.scale).filter(([_, value]) => value);

    if (scaleEntries.length === 0) return null;

    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Type Scale</h4>
        <div className="space-y-4">
          {scaleEntries.map(([level, size]) => {
            const fontSize = size && size.includes('rem')
              ? `calc(${size} * 16px)`
              : size && size.includes('px')
                ? size
                : size || '1rem';

            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    {level}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">{size}</span>
                </div>
                <div
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontSize: fontSize,
                    fontFamily: typography.primary || 'inherit',
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
                {typography.secondary && level === 'body' && (
                  <div
                    className="text-gray-600 dark:text-gray-400 mt-2"
                    style={{
                      fontSize: fontSize,
                      fontFamily: typography.secondary,
                    }}
                  >
                    Secondary font: {typography.secondary}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFontInfo = () => {
    const hasInfo = typography.primary || typography.secondary || typography.style || typography.approach;

    if (!hasInfo) return null;

    return (
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Font Information</h4>
        <div className="space-y-2">
          {typography.primary && (
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Primary: </span>
              <span className="text-gray-900 dark:text-white font-mono">{typography.primary}</span>
            </div>
          )}
          {typography.secondary && (
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Secondary: </span>
              <span className="text-gray-900 dark:text-white font-mono">{typography.secondary}</span>
            </div>
          )}
          {typography.style && (
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Style: </span>
              <span className="text-gray-900 dark:text-white">{typography.style}</span>
            </div>
          )}
          {typography.approach && (
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Approach: </span>
              <span className="text-gray-900 dark:text-white italic">{typography.approach}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFontPairing = () => {
    if (!typography.primary && !typography.secondary) return null;

    return (
      <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Font Pairing Example</h4>
        <div className="space-y-4">
          {typography.primary && (
            <div>
              <div
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                style={{ fontFamily: typography.primary }}
              >
                Heading Style
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                {typography.primary}
              </div>
            </div>
          )}
          {typography.secondary && (
            <div>
              <div
                className="text-base text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: typography.secondary }}
              >
                Body text example using the secondary typeface. This demonstrates how the font reads in
                longer passages and provides context for typographic hierarchy.
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                {typography.secondary}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!typography || Object.keys(typography).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No typography information available for {brandName}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderFontInfo()}
      {renderTypeScale()}
      {renderFontPairing()}
    </div>
  );
};

export default TypographyShowcase;

