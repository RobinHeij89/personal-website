import { useState, useEffect } from 'react';
import { useMagneticHover } from '@/hooks/useAnimations';
import styles from './navigation.module.css';
import { Logo } from './logo';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ctaRef = useMagneticHover<HTMLButtonElement>(0.15);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''} ${className || ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Logo className={styles.logo} />
          </div>

          {/* Desktop Navigation */}
          <ul className={styles.navItems}>
            {navigationItems.map((item) => (
              <li key={item.id} className={styles.navItem}>
                <button
                  onClick={() => smoothScrollTo(item.id)}
                  className={styles.navLink}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Contact CTA */}
          <div className={styles.ctaContainer}>
            <button
              ref={ctaRef}
              onClick={() => smoothScrollTo('contact')}
              className={styles.ctaButton}
            >
              Let's Talk
            </button>
            <div className={styles.availability}>
              <div className={styles.statusDot}></div>
              <span className={styles.statusText}>Available</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileNavItems}>
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => smoothScrollTo(item.id)}
                className={styles.mobileNavLink}
                style={{ 
                  transitionDelay: `${index * 0.1}s`,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100px)',
                  opacity: isMobileMenuOpen ? 1 : 0
                }}
              >
                <span className={styles.mobileNavNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div className={styles.mobileMenuFooter}>
            <button
              onClick={() => smoothScrollTo('contact')}
              className={styles.mobileCta}
            >
              Let's Talk
            </button>
            <div className={styles.mobileAvailability}>
              <div className={styles.statusDot}></div>
              <span>Available for new projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileBackdrop}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;