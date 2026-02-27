import React from 'react';
import AppButton from '../ui/AppButton';
import './ContactCTA.css';

export interface ContactCTAProps {
  /**
   * Main heading
   */
  title?: string;

  /**
   * Supporting text
   */
  subtitle?: string;

  /**
   * Primary CTA text
   */
  primaryText?: string;

  /**
   * Primary CTA link
   */
  primaryHref?: string;

  /**
   * Secondary CTA text
   */
  secondaryText?: string;

  /**
   * Secondary CTA link
   */
  secondaryHref?: string;

  /**
   * Background gradient colors
   */
  gradientColors?: string[];

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * ContactCTA - Call-to-action section for contact
 *
 * Features:
 * - Gradient background
 * - Responsive layout
 * - Accessible buttons
 * - WCAG AA contrast
 */
export const ContactCTA: React.FC<ContactCTAProps> = ({
  title = "Ready to work together?",
  subtitle = "Let's build something amazing. Get in touch to discuss your project.",
  primaryText = "Get in Touch",
  primaryHref = "/contact",
  secondaryText,
  secondaryHref,
  gradientColors = ['var(--color-primary)', 'var(--color-danger)'],
  className = '',
}) => {
  return (
    <section className={`contact-cta ${className}`}>
      <div
        className="contact-cta__background"
        style={{
          background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
        }}
        aria-hidden="true"
      />

      <div className="contact-cta__container">
        <div className="contact-cta__content">
          <h2 className="contact-cta__title">{title}</h2>
          <p className="contact-cta__subtitle">{subtitle}</p>

          <div className="contact-cta__actions">
            <AppButton
              variant="primary"
              size="lg"
              href={primaryHref}
              className="contact-cta__button contact-cta__button--primary"
            >
              {primaryText}
            </AppButton>

            {secondaryText && secondaryHref && (
              <AppButton
                variant="outline"
                size="lg"
                href={secondaryHref}
                className="contact-cta__button contact-cta__button--secondary"
              >
                {secondaryText}
              </AppButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
