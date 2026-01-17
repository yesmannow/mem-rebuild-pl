import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';
import { BrandTokens } from './types';

interface ExportStepProps {
  tokens: BrandTokens;
}

const ExportStep: React.FC<ExportStepProps> = ({ tokens }) => {
  const handleDownload = () => {
    // Create a JSON blob with the brand tokens
    const dataStr = JSON.stringify(tokens, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tokens.name || 'brand'}-tokens.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    // In a production environment, this would generate a shareable link
    const shareData = {
      title: `${tokens.name} Brand Tokens`,
      text: `Check out my brand identity: ${tokens.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(err => {
        console.error('Error sharing:', err);
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="step-panel">
      <h2>Export Your Brand</h2>
      <p>Download your brand assets and design tokens</p>
      <div className="export-options">
        <motion.button
          className="export-btn"
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={20} />
          Download Assets
        </motion.button>
        <motion.button
          className="export-btn"
          onClick={handleShare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 size={20} />
          Share Link
        </motion.button>
      </div>

      {Object.keys(tokens.colors).length > 0 && (
        <div className="export-preview">
          <h3>Brand Summary</h3>
          <div className="export-tokens">
            <div className="token-section">
              <h4>Colors</h4>
              <div className="token-colors">
                {Object.entries(tokens.colors).map(([key, color]) => (
                  <div key={key} className="token-color-item">
                    <div className="token-color-preview" style={{ backgroundColor: color }} />
                    <span className="token-color-name">{key}</span>
                    <span className="token-color-value">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="token-section">
              <h4>Typography</h4>
              <div className="token-fonts">
                <div className="token-font-item">
                  <span className="token-font-label">Heading:</span>
                  <span className="token-font-value" style={{ fontFamily: tokens.fonts.heading }}>
                    {tokens.fonts.heading}
                  </span>
                </div>
                <div className="token-font-item">
                  <span className="token-font-label">Body:</span>
                  <span className="token-font-value" style={{ fontFamily: tokens.fonts.body }}>
                    {tokens.fonts.body}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportStep;
