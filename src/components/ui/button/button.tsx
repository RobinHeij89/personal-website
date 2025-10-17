/**
 * ## Component: Button
 * 
 * ### Purpose:
 * Reusable button component with primary and secondary variants.
 * Supports glow effects and consistent styling across the application.
 * 
 * ### Props:
 * - children: React.ReactNode - Button content text
 * - variant?: 'primary' | 'secondary' - Button appearance variant
 * - onClick?: () => void - Click event handler
 * - href?: string - Optional href for link buttons
 * - className?: string - Additional CSS classes
 * - dataCursor?: string - Custom cursor text on hover
 * - disabled?: boolean - Whether the button is disabled
 * 
 * ### Example:
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>See My Magic</Button>
 * <Button variant="secondary" href="mailto:info@robinheij.nl">Let's Chat</Button>
 * ```
 */

import React from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

type ButtonProps = {
  /** Button content text */
  children: React.ReactNode;
  /** Button appearance variant */
  variant?: 'primary' | 'secondary';
  /** Click event handler */
  onClick?: () => void;
  /** Optional href for link buttons */
  href?: string;
  /** Additional CSS classes */
  className?: string;
  /** Custom cursor text on hover */
  dataCursor?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  href,
  className,
  dataCursor,
  disabled = false,
}) => {
  const buttonClasses = clsx(
    styles['button'],
    styles[`button--${variant}`],
    {
      [styles['button--disabled']]: disabled,
      'shimmer': variant === 'primary' && !disabled, // Add shimmer effect for primary buttons
    },
    className
  );

  // If href is provided, render as link
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        data-cursor-type="button"
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      data-cursor-type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};