/**
 * Example React Components Using API Services
 * 
 * These components demonstrate how to use the API service hooks
 * in real React components for various use cases
 */

import React from 'react';
import {
  useFavicon,
  useAvatar,
  useTestimonialAvatar,
  usePlaceholderImage,
  useQRCode,
  useVCardQRCode,
  useImageLoader,
} from '../services/api/hooks';

/**
 * Example: Client Logo Component
 * Displays a client logo using the favicon API
 */
export function ClientLogo({ 
  domain, 
  name,
  size = 64 
}: { 
  domain: string; 
  name: string; 
  size?: number 
}) {
  const faviconUrl = useFavicon(domain, { size, provider: 'google' });
  const { loaded, error } = useImageLoader(faviconUrl);

  if (error) {
    return (
      <div 
        className="client-logo-fallback"
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#666',
        }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img 
      src={faviconUrl || undefined}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={`client-logo ${loaded ? 'loaded' : 'loading'}`}
      style={{
        opacity: loaded ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}

/**
 * Example: Testimonial Card with Avatar
 * Displays a testimonial with auto-generated avatar
 */
export function TestimonialCard({
  name,
  role,
  company,
  quote,
  customColor,
}: {
  name: string;
  role: string;
  company: string;
  quote: string;
  customColor?: string;
}) {
  const avatarUrl = useTestimonialAvatar(name, customColor);

  return (
    <div className="testimonial-card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <img 
          src={avatarUrl || undefined}
          alt={name}
          width={60}
          height={60}
          style={{ borderRadius: '50%', marginRight: '16px' }}
        />
        <div>
          <h4 style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{name}</h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            {role} at {company}
          </p>
        </div>
      </div>
      <blockquote style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
        "{quote}"
      </blockquote>
    </div>
  );
}

/**
 * Example: Placeholder Image Component
 * Uses Lorem Picsum for placeholder images during loading
 */
export function PlaceholderImage({
  width,
  height,
  seed,
  alt = 'Placeholder',
  grayscale = false,
  blur,
}: {
  width: number;
  height: number;
  seed?: number;
  alt?: string;
  grayscale?: boolean;
  blur?: number;
}) {
  const placeholderUrl = usePlaceholderImage(width, height, { seed, grayscale, blur });

  return (
    <img 
      src={placeholderUrl}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
      }}
    />
  );
}

/**
 * Example: QR Code Contact Card
 * Displays a QR code for easy contact sharing
 */
export function ContactQRCode({
  contact,
  size = 200,
  showLabel = true,
}: {
  contact: {
    name: string;
    email?: string;
    phone?: string;
    url?: string;
  };
  size?: number;
  showLabel?: boolean;
}) {
  const qrUrl = useVCardQRCode(contact, size);

  if (!qrUrl) return null;

  return (
    <div className="qr-code-card" style={{ textAlign: 'center' }}>
      <img 
        src={qrUrl}
        alt={`QR Code for ${contact.name}`}
        width={size}
        height={size}
        style={{
          display: 'block',
          margin: '0 auto',
          border: '4px solid #fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      />
      {showLabel && (
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
          Scan to save contact
        </p>
      )}
    </div>
  );
}

/**
 * Example: Link Preview Card
 * Rich preview card with favicon and metadata
 */
export function LinkPreviewCard({
  url,
  title,
  description,
  domain,
}: {
  url: string;
  title?: string;
  description?: string;
  domain?: string;
}) {
  const extractedDomain = domain || new URL(url).hostname.replace('www.', '');
  const faviconUrl = useFavicon(extractedDomain, { size: 32 });

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-preview-card"
      style={{
        display: 'block',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s ease',
        border: '1px solid #e9ecef',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {faviconUrl && (
          <img 
            src={faviconUrl}
            alt=""
            width={32}
            height={32}
            style={{ flexShrink: 0, marginTop: '2px' }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <h4 style={{ 
              margin: '0 0 4px 0', 
              fontSize: '16px',
              fontWeight: '600',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {title}
            </h4>
          )}
          {description && (
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {description}
            </p>
          )}
          <p style={{ 
            margin: 0, 
            fontSize: '12px', 
            color: '#999',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {extractedDomain}
          </p>
        </div>
      </div>
    </a>
  );
}

/**
 * Example: Case Study Client Grid
 * Grid of client logos from multiple companies
 */
export function ClientGrid({
  clients,
}: {
  clients: Array<{ domain: string; name: string }>;
}) {
  return (
    <div 
      className="client-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '24px',
        padding: '24px',
      }}
    >
      {clients.map((client) => (
        <div 
          key={client.domain}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ClientLogo domain={client.domain} name={client.name} size={64} />
          <span style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
            {client.name}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Usage Example in a Page Component
 */
export function ExampleUsagePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>API Services Examples</h1>

      <section style={{ marginBottom: '60px' }}>
        <h2>Client Logos</h2>
        <ClientGrid 
          clients={[
            { domain: 'google.com', name: 'Google' },
            { domain: 'github.com', name: 'GitHub' },
            { domain: 'microsoft.com', name: 'Microsoft' },
            { domain: 'apple.com', name: 'Apple' },
          ]}
        />
      </section>

      <section style={{ marginBottom: '60px' }}>
        <h2>Testimonials</h2>
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <TestimonialCard 
            name="Sarah Johnson"
            role="Marketing Director"
            company="TechCorp"
            quote="This portfolio showcases exceptional attention to detail and user experience."
          />
          <TestimonialCard 
            name="Michael Chen"
            role="CTO"
            company="StartupX"
            quote="The technical implementation and design system are world-class."
            customColor="28a745"
          />
        </div>
      </section>

      <section style={{ marginBottom: '60px' }}>
        <h2>Contact QR Code</h2>
        <ContactQRCode 
          contact={{
            name: 'Jacob Darling',
            email: 'jacob@example.com',
            phone: '+1234567890',
            url: 'https://jacobdarling.com',
          }}
          size={200}
        />
      </section>

      <section>
        <h2>Link Previews</h2>
        <div style={{ display: 'grid', gap: '16px', maxWidth: '600px' }}>
          <LinkPreviewCard 
            url="https://github.com"
            title="GitHub"
            description="Where the world builds software"
            domain="github.com"
          />
          <LinkPreviewCard 
            url="https://google.com"
            title="Google"
            description="Search the world's information"
            domain="google.com"
          />
        </div>
      </section>
    </div>
  );
}
