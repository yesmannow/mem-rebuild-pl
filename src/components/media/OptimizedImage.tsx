import React from 'react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  width,
  height,
}) => {
  // Handle relative and absolute paths
  const imageSrc = src.startsWith('/') || src.startsWith('http') ? src : `/${src}`;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(width && { width })}
      {...(height && { height })}
    />
  );
};

export default OptimizedImage;
