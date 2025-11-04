import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";

interface ShowcaseGalleryProps {
  images: string[];
  videos?: string[];
}

const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({ images, videos }) => {
  return (
    <motion.section
      className="showcase-gallery"
      style={{
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem'
      }}
      {...motionTokens.fadeIn}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="gallery-item"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            borderRadius: '8px',
            height: '200px'
          }}
          whileHover={{ scale: 1.05, boxShadow: 'var(--glow-brand)' }}
        />
      ))}
      {videos && videos.map((video, index) => (
        <motion.video
          key={index}
          className="gallery-video"
          controls
          style={{
            width: '100%',
            borderRadius: '8px'
          }}
          whileHover={{ scale: 1.05, boxShadow: 'var(--glow-brand)' }}
        >
          <source src={video} type="video/mp4" />
        </motion.video>
      ))}
    </motion.section>
  );
};

export default ShowcaseGallery;
