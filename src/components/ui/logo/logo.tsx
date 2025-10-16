/**
 * ## Component: Logo
 * 
 * ### Purpose:
 * Displays the Robin Heij SVG logo from robinheij.dev
 * 
 * ### Props:
 * - `size?: 'sm' | 'md' | 'lg'` - Size of the logo
 * - `className?: string` - Additional CSS classes
 * 
 * ### Example:
 * ```tsx
 * <Logo size="md" />
 * ```
 */

import React from 'react';
import clsx from 'clsx';
import styles from './logo.module.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  isCovering?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md',
  className = '',
  isCovering = false
}) => {
  const sizeModifier = size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large';
  
  return (
    <div className={clsx(
      styles.logo,
      className,
      {
        [styles['logo--covering']]: isCovering,
        [styles[`logo--${sizeModifier}`]]: !isCovering
      }
    )}>
      <img 
        src="/logo.svg" 
        alt="Robin Heij Logo"
        className={styles["logo__image"]}
      />
    </div>
  );
};