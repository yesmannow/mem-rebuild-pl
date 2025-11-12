/**
 * React Hooks for API Services
 * 
 * Easy-to-use React hooks for integrating free public APIs
 * into components with automatic loading states and error handling
 */

import { useState, useEffect, useMemo } from 'react';
import { FaviconService, AvatarService, ImageService, QRCodeService } from './client';

/**
 * Hook to get favicon URL with fallback
 */
export function useFavicon(domain: string | undefined, options?: {
  size?: number;
  provider?: 'favicone' | 'favicon-pub' | 'google';
}) {
  return useMemo(() => {
    if (!domain) return null;
    return FaviconService.getFaviconUrl(domain, options);
  }, [domain, options]);
}

/**
 * Hook to get avatar URL
 */
export function useAvatar(name: string | undefined, options?: {
  size?: number;
  background?: string;
  color?: string;
  rounded?: boolean;
}) {
  return useMemo(() => {
    if (!name) return null;
    return AvatarService.getAvatarUrl(name, options);
  }, [name, options]);
}

/**
 * Hook to get testimonial avatar with auto-color
 */
export function useTestimonialAvatar(name: string | undefined, color?: string) {
  return useMemo(() => {
    if (!name) return null;
    return AvatarService.getTestimonialAvatar(name, color);
  }, [name, color]);
}

/**
 * Hook to get placeholder image URL
 */
export function usePlaceholderImage(
  width: number,
  height: number,
  options?: {
    seed?: number;
    grayscale?: boolean;
    blur?: number;
  }
) {
  return useMemo(() => {
    return ImageService.getPlaceholderUrl(width, height, options);
  }, [width, height, options]);
}

/**
 * Hook to get QR code URL
 */
export function useQRCode(
  data: string | undefined,
  options?: {
    size?: number;
    format?: 'png' | 'svg' | 'gif' | 'jpeg';
  }
) {
  return useMemo(() => {
    if (!data) return null;
    return QRCodeService.getQRCodeUrl(data, options);
  }, [data, options]);
}

/**
 * Hook to get vCard QR code
 */
export function useVCardQRCode(
  contact: {
    name: string;
    email?: string;
    phone?: string;
    url?: string;
  } | undefined,
  size = 200
) {
  return useMemo(() => {
    if (!contact) return null;
    return QRCodeService.getVCardQRCode(contact, size);
  }, [contact, size]);
}

/**
 * Hook for image with loading state
 */
export function useImageLoader(src: string | null | undefined) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setLoaded(false);
      setError(false);
      return;
    }

    setLoaded(false);
    setError(false);

    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error, loading: !loaded && !error };
}

/**
 * Combined hook for favicon with loading state
 */
export function useFaviconWithLoader(domain: string | undefined, options?: {
  size?: number;
  provider?: 'favicone' | 'favicon-pub' | 'google';
}) {
  const url = useFavicon(domain, options);
  const { loaded, error, loading } = useImageLoader(url);

  return {
    url,
    loaded,
    error,
    loading,
  };
}

/**
 * Combined hook for avatar with loading state
 */
export function useAvatarWithLoader(name: string | undefined, options?: {
  size?: number;
  background?: string;
  color?: string;
  rounded?: boolean;
}) {
  const url = useAvatar(name, options);
  const { loaded, error, loading } = useImageLoader(url);

  return {
    url,
    loaded,
    error,
    loading,
  };
}
