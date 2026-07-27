import React from 'react';
import styles from './intro-section.module.css';

export const IntroSection: React.FC = () => {

  const availableAs = [
    "Tech Lead",
    "Senior Front-end Developer",
    "Design System Developer"
  ]

  const expertise = [
    "Creative development",
    "Design systems",
    "Leadership & coaching"
  ]

  const hobbies = [
    "Indie game development",
    "Music production",
    "Craftbeer",
    "Playstation"
  ]

  const arrayOfHTMLChars = ['<', '>', '/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\', ':', ';', '"', "'", ',', '.', '?'];

  return (
    <section id="intro" className={styles.intro}>
      <div className={`${styles.intro__statement} reveal`}>
        <strong>Senior creative front-end developer</strong>
        {' '}with a design background and leadership experience.
        Coach, team player, hobby game developer — and above all, a dad of 2 girls.
      </div>

      <div className={styles.intro__right}>
        <div className={styles.descriptor}>
          <p className={styles.descriptor__label}>Available as</p>
          <ul className={styles.descriptor__list}>
            {availableAs.map((item, index) => (
              <li key={index}>
                <p>
                  {item.split('').map((char: string, _charIndex: number) => {
                    const randomDelay = Math.floor(Math.random() * 250); // Random delay between 500ms and 1500ms
                    const randomChar = arrayOfHTMLChars[Math.floor(Math.random() * arrayOfHTMLChars.length)];
                    return (
                      <div className={styles.char}>
                        <span style={{ transitionDelay: `${randomDelay}ms` }}>{char}</span>
                        <span style={{ transitionDelay: `${randomDelay}ms` }}>{randomChar}</span>
                        <span style={{ transitionDelay: `${randomDelay}ms` }}>{char}</span>
                      </div>
                    )
                  })}
                </p>
                <span className={styles.descriptor__number}>{String(index + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.descriptor}>
          <p className={styles.descriptor__label}>Expertise</p>
          <ul className={styles.descriptor__list}>
            {expertise.map((item, index) => (
              <li key={index}>
                {item} <span>-</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.descriptor}>
          <p className={styles.descriptor__label}>Hobbies and interests</p>
          <ul className={styles.descriptor__list}>
            {hobbies.map((item, index) => (
              <li key={index}>
                {item} <span>-</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
};
