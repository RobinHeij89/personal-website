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
    if (elementId === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
    { label: 'Interests', id: 'interests' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav className={`${styles.navigation} ${isScrolled ? styles["navigation--scrolled"] : ''} ${className || ''}`}>
        <div className={styles["navigation__container"]}>
          {/* Logo */}
          <div className={styles["navigation__logo-container"]}>
            <button
              onClick={() => smoothScrollTo('top')}
              className={styles["navigation__logo-button"]}
              data-cursor="HOME"
              data-cursor-type="logo"
            >
              <Logo className={styles["navigation__logo"]} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className={styles["navigation__nav-items"]}>
            {navigationItems.map((item) => (
              <li key={item.id} className={styles["navigation__nav-item"]}>
                <button
                  onClick={() => smoothScrollTo(item.id)}
                  className={styles["navigation__nav-link"]}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Contact CTA */}
          <div className={styles["navigation__cta-container"]}>
            <button
              ref={ctaRef}
              onClick={() => smoothScrollTo('contact')}
              className={styles["navigation__cta-button"]}
            >
              Let's Talk
            </button>
            <div className={styles["navigation__availability"]}>
              <div className={styles["navigation__status-dot"]}></div>
              <span className={styles["navigation__status-text"]}>Available</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles["navigation__mobile-toggle"]} ${isMobileMenuOpen ? styles["navigation__mobile-toggle--active"] : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div className={styles["navigation__progress-bar"]}>
          <div 
            className={styles["navigation__progress-fill"]}
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles["navigation__mobile-menu"]} ${isMobileMenuOpen ? styles["navigation__mobile-menu--open"] : ''}`}>
        <div className={styles["navigation__mobile-menu-content"]}>
          <div className={styles["navigation__mobile-nav-items"]}>
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => smoothScrollTo(item.id)}
                className={styles["navigation__mobile-nav-link"]}
                style={{ 
                  transitionDelay: `${index * 0.1}s`,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100px)',
                  opacity: isMobileMenuOpen ? 1 : 0
                }}
              >
                <span className={styles["navigation__mobile-nav-number"]}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div className={styles["navigation__mobile-menu-footer"]}>
            <button
              onClick={() => smoothScrollTo('contact')}
              className={styles["navigation__mobile-cta"]}
            >
              Let's Talk
            </button>
            <div className={styles["navigation__mobile-availability"]}>
              <div className={styles["navigation__status-dot"]}></div>
              <span>Available for new projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className={styles["navigation__mobile-backdrop"]}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;