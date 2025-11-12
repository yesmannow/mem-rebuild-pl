# API Services Integration Guide

This guide shows you how to integrate the free public API services into your React components for improved UX and functionality.

## 🚀 Quick Start

### Installation
All services are already integrated! No additional packages needed.

### Basic Usage

```typescript
import { useFavicon, useAvatar, usePlaceholderImage } from '@/services/api/hooks';

function MyComponent() {
  const faviconUrl = useFavicon('google.com');
  const avatarUrl = useAvatar('John Doe');
  const placeholderUrl = usePlaceholderImage(800, 600);
  
  return (
    <div>
      <img src={faviconUrl} alt="Favicon" />
      <img src={avatarUrl} alt="Avatar" />
      <img src={placeholderUrl} alt="Placeholder" />
    </div>
  );
}
```

## 📦 Available Hooks

### useFavicon
Get website favicon/logo from any domain.

```typescript
import { useFavicon } from '@/services/api/hooks';

function ClientLogo({ domain }) {
  const logoUrl = useFavicon(domain, { 
    size: 64, 
    provider: 'google' // or 'favicone', 'favicon-pub'
  });
  
  return <img src={logoUrl} alt="Client logo" />;
}
```

**Use Cases:**
- Client portfolio logos
- Case study company branding
- Link preview favicons
- Technology stack icons

### useAvatar
Generate avatar images from names.

```typescript
import { useAvatar, useTestimonialAvatar } from '@/services/api/hooks';

function UserProfile({ name }) {
  const avatarUrl = useAvatar(name, {
    size: 128,
    background: '007bff',
    rounded: true
  });
  
  return <img src={avatarUrl} alt={name} />;
}

function Testimonial({ author }) {
  // Auto-generates consistent color for name
  const avatarUrl = useTestimonialAvatar(author.name);
  
  return (
    <div>
      <img src={avatarUrl} alt={author.name} />
      <p>{author.quote}</p>
    </div>
  );
}
```

**Use Cases:**
- Testimonial avatars
- User profile placeholders
- Team member displays
- Comment sections

### usePlaceholderImage
High-quality placeholder images for loading states.

```typescript
import { usePlaceholderImage } from '@/services/api/hooks';

function ImagePlaceholder() {
  const placeholderUrl = usePlaceholderImage(800, 600, {
    seed: 42, // Consistent image
    grayscale: false,
    blur: 2
  });
  
  return <img src={placeholderUrl} alt="Loading..." />;
}
```

**Use Cases:**
- Loading states
- Development placeholders
- Image size testing
- Hero image backups

### useQRCode
Generate QR codes for URLs or vCards.

```typescript
import { useQRCode, useVCardQRCode } from '@/services/api/hooks';

function ShareButton({ url }) {
  const qrCodeUrl = useQRCode(url, { size: 200 });
  
  return <img src={qrCodeUrl} alt="QR Code" />;
}

function ContactCard() {
  const qrCodeUrl = useVCardQRCode({
    name: 'Jacob Darling',
    email: 'jacob@example.com',
    phone: '+1234567890'
  }, 200);
  
  return (
    <div>
      <h3>Scan to save contact</h3>
      <img src={qrCodeUrl} alt="Contact QR Code" />
    </div>
  );
}
```

**Use Cases:**
- Contact cards
- URL sharing
- Calendar events
- WiFi credentials

## 🎨 Real-World Integration Examples

### Example 1: Case Study Client Showcase

```typescript
// src/components/CaseStudy/ClientShowcase.tsx
import { useFavicon } from '@/services/api/hooks';

interface Client {
  domain: string;
  name: string;
}

export function ClientShowcase({ clients }: { clients: Client[] }) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {clients.map(client => (
        <ClientCard key={client.domain} {...client} />
      ))}
    </div>
  );
}

function ClientCard({ domain, name }: Client) {
  const logoUrl = useFavicon(domain, { size: 64 });
  
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white shadow">
      <img 
        src={logoUrl} 
        alt={`${name} logo`}
        className="w-16 h-16 object-contain"
      />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

// Usage in case study page
<ClientShowcase 
  clients={[
    { domain: 'graston.com', name: 'Graston' },
    { domain: 'example-client.com', name: 'Example Co' }
  ]}
/>
```

### Example 2: Testimonials with Auto-Generated Avatars

```typescript
// src/components/Testimonials/TestimonialCard.tsx
import { useTestimonialAvatar } from '@/services/api/hooks';

interface Testimonial {
  author: string;
  role: string;
  company: string;
  quote: string;
  color?: string; // Optional custom color
}

export function TestimonialCard({ author, role, company, quote, color }: Testimonial) {
  const avatarUrl = useTestimonialAvatar(author, color);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={avatarUrl}
          alt={author}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-bold">{author}</h4>
          <p className="text-sm text-gray-600">{role} at {company}</p>
        </div>
      </div>
      <blockquote className="text-gray-800 italic">
        "{quote}"
      </blockquote>
    </div>
  );
}

// Usage
<TestimonialCard 
  author="Sarah Johnson"
  role="Marketing Director"
  company="TechCorp"
  quote="Outstanding work on our digital transformation project."
/>
```

### Example 3: Link Preview Cards

```typescript
// src/components/Links/LinkPreview.tsx
import { useFavicon } from '@/services/api/hooks';

interface LinkPreviewProps {
  url: string;
  title: string;
  description: string;
}

export function LinkPreview({ url, title, description }: LinkPreviewProps) {
  const domain = new URL(url).hostname.replace('www.', '');
  const faviconUrl = useFavicon(domain, { size: 32 });
  
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
    >
      <div className="flex items-start gap-3">
        <img 
          src={faviconUrl}
          alt=""
          className="w-8 h-8 mt-1"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{title}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <p className="text-xs text-gray-400 mt-1">{domain}</p>
        </div>
      </div>
    </a>
  );
}
```

### Example 4: Contact Page with QR Code

```typescript
// src/pages/Contact.tsx
import { useVCardQRCode } from '@/services/api/hooks';

export function ContactPage() {
  const qrCodeUrl = useVCardQRCode({
    name: 'Jacob Darling',
    email: 'jacob@example.com',
    phone: '+1234567890',
    url: 'https://jacobdarling.com'
  }, 250);
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1>Get in Touch</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2>Contact Information</h2>
          <p>Email: jacob@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
        
        <div className="text-center">
          <h3 className="mb-4">Save My Contact</h3>
          <img 
            src={qrCodeUrl}
            alt="Contact QR Code"
            className="inline-block border-4 border-white rounded-lg shadow-lg"
          />
          <p className="text-sm text-gray-600 mt-2">
            Scan with your phone to save
          </p>
        </div>
      </div>
    </div>
  );
}
```

## 🎯 Best Practices

### 1. Error Handling
Always provide fallbacks for failed API calls:

```typescript
function SafeLogo({ domain, name }) {
  const logoUrl = useFavicon(domain);
  const { loaded, error } = useImageLoader(logoUrl);
  
  if (error) {
    return (
      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
        {name.charAt(0)}
      </div>
    );
  }
  
  return <img src={logoUrl} alt={name} />;
}
```

### 2. Loading States
Show loading indicators for better UX:

```typescript
function LogoWithLoader({ domain, name }) {
  const { url, loaded, loading } = useFaviconWithLoader(domain);
  
  return (
    <div className="relative">
      {loading && <Spinner />}
      <img 
        src={url}
        alt={name}
        className={loading ? 'opacity-50' : 'opacity-100'}
      />
    </div>
  );
}
```

### 3. Memoization
Use hooks at the component level (they're already memoized):

```typescript
// ✅ Good - Hook is memoized
function Component({ domain }) {
  const logoUrl = useFavicon(domain);
  return <img src={logoUrl} />;
}

// ❌ Avoid - Creating new URL on every render
function Component({ domain }) {
  const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
  return <img src={logoUrl} />;
}
```

### 4. Consistent Avatars
Use seed or consistent colors for the same user:

```typescript
// Consistent avatar for the same name
const avatarUrl = useTestimonialAvatar('John Doe');
// Always generates same color for "John Doe"
```

## 🔧 Advanced Usage

### Custom API Client

```typescript
import ApiClient from '@/services/api/client';

// Direct API access without hooks
const faviconUrl = ApiClient.favicon.getFaviconUrl('google.com', { size: 128 });
const avatarUrl = ApiClient.avatar.getAvatarUrl('Jane Doe', { background: 'ff0000' });
const qrUrl = ApiClient.qrCode.getQRCodeUrl('https://example.com');
```

### Batch Processing

```typescript
function MultipleLogos({ domains }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {domains.map(domain => {
        const logoUrl = useFavicon(domain);
        return <img key={domain} src={logoUrl} alt={domain} />;
      })}
    </div>
  );
}
```

## 📊 Performance Considerations

1. **Lazy Loading**: Use `loading="lazy"` on images
2. **Caching**: Browser automatically caches API responses
3. **Rate Limits**: All services have generous free tiers
4. **CDN**: Most services use CDNs for fast delivery

## 🔒 Privacy & Security

- All APIs use HTTPS
- No authentication required (except optional Unsplash)
- No personal data collected
- CORS-enabled for client-side use
- Production-ready and reliable

## 📚 Additional Resources

- [API Services README](../scripts/api-services/README.md)
- [API Recommendations](../docs/API_RECOMMENDATIONS.md)
- [Component Examples](../src/components/examples/ApiServiceExamples.tsx)

## 🤝 Contributing

To add new API integrations:
1. Add service class to `src/services/api/client.ts`
2. Create corresponding hooks in `src/services/api/hooks.ts`
3. Add example components
4. Update this documentation

## 💡 Ideas for More Integrations

- Weather API for location-based greetings
- GitHub API for project statistics
- Cryptocurrency prices for tech demos
- IP geolocation for timezone-aware features
- Open Graph scraper for automatic link previews
