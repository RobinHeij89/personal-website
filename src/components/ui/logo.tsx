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
import styles from './logo.module.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md',
  className = ''
}) => {
  return (
    <div className={`${styles.logo} ${styles[size]} ${className}`}>
      <img 
        src="/logo.svg" 
        alt="Robin Heij Logo"
        className={styles.image}
      />
    </div>
  );
};