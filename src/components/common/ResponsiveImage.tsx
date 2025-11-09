import React, { useState, useEffect, useRef } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  srcSet?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
}

/**
 * ResponsiveImage Component
 * Optimized image component with lazy loading, responsive srcset, and WebP support
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  srcSet,
  onLoad,
  onError,
  placeholder,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate WebP srcset if not provided
  const generateSrcSet = () => {
    if (srcSet) return srcSet;
    
    // If src ends with common image extensions, generate responsive srcset
    const baseSrc = src.replace(/\.(jpg|jpeg|png)$/i, "");
    const webpSrc = `${baseSrc}.webp`;
    
    // Generate multiple sizes
    const widths = [400, 800, 1200, 1600];
    return widths
      .map(width => `${baseSrc}-${width}w.webp ${width}w`)
      .join(", ");
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    // If image is already loaded (cached)
    if (img.complete && img.naturalHeight !== 0) {
      setIsLoaded(true);
    }

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [onLoad, onError]);

  // Fallback to original src if WebP fails
  const finalSrc = hasError && src.includes(".webp") 
    ? src.replace(".webp", ".jpg")
    : src;

  return (
    <div className={`responsive-image-wrapper ${className}`} style={{ position: "relative" }}>
      {/* Placeholder/Blur */}
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="responsive-image-placeholder"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(10px)",
            opacity: 0.5,
          }}
        />
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={finalSrc}
        alt={alt}
        loading={loading}
        srcSet={generateSrcSet()}
        sizes={sizes}
        className={`responsive-image ${isLoaded ? "responsive-image--loaded" : ""}`}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        decoding="async"
      />

      {/* Loading skeleton */}
      {!isLoaded && !placeholder && (
        <div
          className="responsive-image-skeleton"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "inherit",
          }}
        />
      )}
    </div>
  );
};

export default ResponsiveImage;

