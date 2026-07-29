import styles from './name-revealer.module.css'
import { Reveal, RevealGroup } from '@/components/ui/reveal/reveal';

type Props = {
  firstName: string;
  lastName: string;
};

export const NameRevealer = (props: Props) => {
  const { firstName, lastName } = props;
  const chars = firstName.split('');

  return (
    <div className={styles.hero__name}>
      <RevealGroup as="span" className={styles.hero__line} staggerMs={50}>
        {chars.map((char, index) => (
          <Reveal
            key={index}
            as="span"
            index={index}
            variant="bottom"
            className={styles.hero__char}
          >
            {char}
          </Reveal>
        ))}
      </RevealGroup>
      <Reveal
        as="span"
        variant="right"
        delay={200}
        className={`${styles.hero__line} ${styles['hero__line--accent']}`}
      >
        {lastName}
      </Reveal>
    </div>
  );
};
