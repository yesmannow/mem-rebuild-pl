/**
 * Client-side API Service for Frontend Integration
 * 
 * Provides React-friendly wrappers for the free public APIs
 * All services handle errors gracefully and return fallbacks
 */

/**
 * Favicon Service - Client Side
 */
export class FaviconService {
  /**
   * Get favicon URL from multiple providers
   */
  static getFaviconUrl(domain: string, options: {
    size?: number;
    provider?: 'favicone' | 'favicon-pub' | 'google';
  } = {}): string {
    const { size = 64, provider = 'google' } = options;
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');

    switch (provider) {
      case 'favicone':
        return `https://favicone.com/${cleanDomain}`;
      case 'favicon-pub':
        return `https://favicon.pub/${cleanDomain}?size=${size}`;
      case 'google':
      default:
        return `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=${size}`;
    }
  }

  /**
   * Get favicon with fallback chain
   */
  static async getFaviconWithFallback(domain: string, size = 64): Promise<string> {
    const providers: Array<'google' | 'favicon-pub' | 'favicone'> = ['google', 'favicon-pub', 'favicone'];
    
    for (const provider of providers) {
      try {
        const url = this.getFaviconUrl(domain, { size, provider });
        
        // Test if image loads
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          return url;
        }
      } catch {
        continue;
      }
    }
    
    // Ultimate fallback
    return this.getFaviconUrl(domain, { size, provider: 'google' });
  }
}

/**
 * Avatar Service - Client Side
 */
export class AvatarService {
  /**
   * Generate avatar URL from name
   */
  static getAvatarUrl(name: string, options: {
    size?: number;
    background?: string;
    color?: string;
    rounded?: boolean;
    bold?: boolean;
    format?: 'svg' | 'png';
  } = {}): string {
    const {
      size = 128,
      background = '007bff',
      color = 'ffffff',
      rounded = false,
      bold = true,
      format = 'svg',
    } = options;

    const params = new URLSearchParams({
      name,
      size: size.toString(),
      background: background.replace('#', ''),
      color: color.replace('#', ''),
      bold: bold.toString(),
      rounded: rounded.toString(),
      format,
    });

    return `https://ui-avatars.com/api/?${params}`;
  }

  /**
   * Generate avatar for testimonial/user
   */
  static getTestimonialAvatar(name: string, color?: string): string {
    return this.getAvatarUrl(name, {
      size: 80,
      background: color || this.getColorForName(name),
      rounded: true,
    });
  }

  /**
   * Generate consistent color for a name
   */
  private static getColorForName(name: string): string {
    const colors = [
      '007bff', // blue
      '28a745', // green
      'dc3545', // red
      'ffc107', // yellow
      '17a2b8', // cyan
      '6f42c1', // purple
      'fd7e14', // orange
      '20c997', // teal
    ];

    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  }
}

/**
 * Image Service - Client Side
 */
export class ImageService {
  /**
   * Get placeholder image URL
   */
  static getPlaceholderUrl(width: number, height: number, options: {
    seed?: number;
    grayscale?: boolean;
    blur?: number;
  } = {}): string {
    const { seed, grayscale, blur } = options;
    
    let url = `https://picsum.photos/${width}/${height}`;
    const params: string[] = [];

    if (grayscale) params.push('grayscale');
    if (blur) params.push(`blur=${blur}`);
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    if (seed !== undefined) {
      url += (params.length > 0 ? '&' : '?') + `random=${seed}`;
    }

    return url;
  }

  /**
   * Get simple placeholder with text
   */
  static getTextPlaceholder(width: number, height: number, text: string, options: {
    bgColor?: string;
    textColor?: string;
  } = {}): string {
    const { bgColor = 'cccccc', textColor = '333333' } = options;
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}.png?text=${encodeURIComponent(text)}`;
  }
}

/**
 * QR Code Service - Client Side
 */
export class QRCodeService {
  /**
   * Generate QR code URL
   */
  static getQRCodeUrl(data: string, options: {
    size?: number;
    format?: 'png' | 'svg' | 'gif' | 'jpeg';
    color?: string;
    bgColor?: string;
  } = {}): string {
    const {
      size = 200,
      format = 'png',
      color = '000000',
      bgColor = 'ffffff',
    } = options;

    const params = new URLSearchParams({
      data,
      size: `${size}x${size}`,
      format,
      color: color.replace('#', ''),
      bgcolor: bgColor.replace('#', ''),
    });

    return `https://api.qrserver.com/v1/create-qr-code/?${params}`;
  }

  /**
   * Generate vCard QR code
   */
  static getVCardQRCode(contact: {
    name: string;
    email?: string;
    phone?: string;
    url?: string;
  }, size = 200): string {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
${contact.email ? `EMAIL:${contact.email}` : ''}
${contact.phone ? `TEL:${contact.phone}` : ''}
${contact.url ? `URL:${contact.url}` : ''}
END:VCARD`;

    return this.getQRCodeUrl(vcard, { size });
  }
}

/**
 * Metadata Service - Client Side (for displaying rich previews)
 */
export interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  domain?: string;
}

export class MetadataService {
  /**
   * Extract basic metadata from URL for display
   */
  static extractBasicInfo(url: string): Pick<LinkMetadata, 'domain'> {
    try {
      const urlObj = new URL(url);
      return {
        domain: urlObj.hostname.replace('www.', ''),
      };
    } catch {
      return { domain: url };
    }
  }

  /**
   * Get favicon for a URL
   */
  static getFaviconForUrl(url: string): string {
    const { domain } = this.extractBasicInfo(url);
    return FaviconService.getFaviconUrl(domain || url);
  }
}

/**
 * Combined API Client
 */
export const ApiClient = {
  favicon: FaviconService,
  avatar: AvatarService,
  image: ImageService,
  qrCode: QRCodeService,
  metadata: MetadataService,
};

export default ApiClient;
