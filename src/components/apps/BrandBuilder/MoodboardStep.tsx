import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';
import { BrandTokens } from './types';

interface MoodboardStepProps {
  tokens: BrandTokens;
  setTokens: React.Dispatch<React.SetStateAction<BrandTokens>>;
}

const MoodboardStep: React.FC<MoodboardStepProps> = ({ tokens, setTokens }) => {
  const [images, setImages] = useState<string[]>(tokens.images || []);

  // Sync images to tokens when they change
  useEffect(() => {
    setTokens(prev => ({ ...prev, images }));
  }, [images, setTokens]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      const removed = newImages.splice(index, 1)[0];
      // Revoke object URL to free memory
      if (removed.startsWith('blob:')) {
        URL.revokeObjectURL(removed);
      }
      return newImages;
    });
  };

  return (
    <div className="step-panel">
      <h2>Create Your Moodboard</h2>
      <p>Upload images that inspire your brand direction</p>
      <div className="moodboard-grid">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="moodboard-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={src} alt={`Moodboard ${index + 1}`} />
            <button
              className="moodboard-remove"
              onClick={() => handleRemoveImage(index)}
              aria-label="Remove image"
            >
              ×
            </button>
          </motion.div>
        ))}
        <label className="upload-area">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="upload-content">
            <Image size={32} />
            <span>Upload Images</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default MoodboardStep;
