import clsx from 'clsx';
import styles from './name-revealer.module.css'

type Props = {
  firstName: string;
  lastName: string;
};

export const NameRevealer = (props: Props) => {
  const { firstName, lastName } = props;
  return (
    <div className={styles.hero__name}>
      <span className={`${styles.hero__line}`} style={{ transitionDelay: '100ms' }}>
        {firstName.split("").map((char, index) => (
          <span key={index} className={clsx(styles.hero__char, 'reveal-bottom')} style={{ transitionDelay: `${index * 50 + 100}ms` }}>
            {char}
          </span>
        ))}
      </span>
      <span className={`${styles.hero__line} ${styles['hero__line--accent']} reveal-right`} style={{ transitionDelay: '200ms' }}>{lastName}</span>
    </div>
  );
};
