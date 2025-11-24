import React from 'react';
import './ServicesGrid.css';

export interface Service {
  /**
   * Service icon or emoji
   */
  icon: string | React.ReactNode;
  
  /**
   * Service title
   */
  title: string;
  
  /**
   * Service description
   */
  description: string;
  
  /**
   * Optional link
   */
  href?: string;
  
  /**
   * Optional features list
   */
  features?: string[];
}

export interface ServicesGridProps {
  /**
   * Section title
   */
  title?: string;
  
  /**
   * Section subtitle
   */
  subtitle?: string;
  
  /**
   * Services to display
   */
  services: Service[];
  
  /**
   * Number of columns (responsive)
   */
  columns?: 2 | 3 | 4;
  
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * ServicesGrid - Responsive grid of service cards
 * 
 * Features:
 * - Responsive grid layout
 * - Hover animations
 * - Accessible card design
 * - WCAG AA contrast
 */
export const ServicesGrid: React.FC<ServicesGridProps> = ({
  title,
  subtitle,
  services,
  columns = 3,
  className = '',
}) => {
  return (
    <section className={`services-grid ${className}`}>
      {(title || subtitle) && (
        <div className="services-grid__header">
          {title && <h2 className="services-grid__title">{title}</h2>}
          {subtitle && <p className="services-grid__subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className={`services-grid__container services-grid__container--${columns}`}>
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const CardWrapper = service.href ? 'a' : 'div';
  const cardProps = service.href
    ? {
        href: service.href,
        'aria-label': `Learn more about ${service.title}`,
      }
    : {};

  return (
    <CardWrapper className="service-card" {...cardProps}>
      <div className="service-card__icon" aria-hidden="true">
        {typeof service.icon === 'string' ? (
          <span className="service-card__emoji">{service.icon}</span>
        ) : (
          service.icon
        )}
      </div>
      
      <h3 className="service-card__title">{service.title}</h3>
      
      <p className="service-card__description">{service.description}</p>
      
      {service.features && service.features.length > 0 && (
        <ul className="service-card__features">
          {service.features.map((feature, idx) => (
            <li key={idx} className="service-card__feature">
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      {service.href && (
        <span className="service-card__link-indicator" aria-hidden="true">
          →
        </span>
      )}
    </CardWrapper>
  );
};

export default ServicesGrid;
