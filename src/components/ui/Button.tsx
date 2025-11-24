import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Full width button
   */
  fullWidth?: boolean;
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Icon element (optional)
   */
  icon?: React.ReactNode;
  
  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right';
  
  /**
   * Link href (renders as anchor instead of button)
   */
  href?: string;
  
  /**
   * Children elements
   */
  children: React.ReactNode;
}

/**
 * Button - Accessible button component with micro-interactions
 * 
 * Features:
 * - Multiple style variants
 * - Focus ring for keyboard navigation
 * - Hover elevation effect
 * - Loading state
 * - Icon support
 * - WCAG AA color contrast
 * - Can render as link or button
 */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      href,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      fullWidth ? 'btn--full-width' : '',
      loading ? 'btn--loading' : '',
      disabled ? 'btn--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {loading && (
          <span className="btn__spinner" aria-hidden="true">
            <svg className="btn__spinner-icon" viewBox="0 0 24 24">
              <circle
                className="btn__spinner-circle"
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="3"
              />
            </svg>
          </span>
        )}
        {icon && iconPosition === 'left' && (
          <span className="btn__icon btn__icon--left" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="btn__text">{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="btn__icon btn__icon--right" aria-hidden="true">
            {icon}
          </span>
        )}
      </>
    );

    // Render as link if href is provided
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          aria-disabled={disabled || loading}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
