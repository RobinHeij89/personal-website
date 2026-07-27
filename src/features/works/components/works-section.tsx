import React, { useState } from 'react';
import styles from './works-section.module.css';

type Deliverables = { bold: string; rest: string };

// Logos live in /public/client-logos as small SVGs. Missing files fall back
// to the brand name automatically (see onError below).
const clients: { name: string; logo: string; deliverables: Deliverables, url?: string }[] = [
  {
    name: 'BUUT',
    logo: '/client-logos/buut.svg',
    deliverables: {
      bold: 'Marketing website rebuild.',
      rest: 'Design system, a11y, CMS-agnostic API layer, testing, SEO & geo — front-end development.',
    },
    url: 'https://www.buut.com/'
  },
  {
    name: 'Heineken',
    logo: '/client-logos/heineken.svg',
    deliverables: {
      bold: 'Second screen for live beer-drafting training.',
      rest: 'Real-time scoreboards & instructor tools built with Phoenix LiveView — front-end development.',
    },
  },
  {
    name: 'IFFR',
    logo: '/client-logos/iffr.svg',
    deliverables: {
      bold: 'Phased website migration during a live festival.',
      rest: 'Continuous rollout from legacy to new platform with real ticket purchasing running throughout, heavy monitoring — front-end development.',
    },
  },
  {
    name: 'Zwijsen',
    logo: '/client-logos/zwijsen.svg',
    deliverables: {
      bold: 'Primary school learning software.',
      rest: 'Architecture, animations & illustrations, module federation, design system, large-scale refactors, team coaching — front-end development.',
    },
  },
  {
    name: 'Free a Girl',
    logo: '/client-logos/free-a-girl.svg',
    deliverables: {
      bold: 'Campaign website.',
      rest: 'Front-end development.',
    },
  },
  {
    name: 'Aviko',
    logo: '/client-logos/aviko.svg',
    deliverables: {
      bold: 'New B2B website, built from scratch.',
      rest: 'Front-end development.',
    },
    url: 'https://www.avikofoodservice.nl/',
  },
  {
    name: 'Davidoff',
    logo: '/client-logos/davidoff.svg',
    deliverables: {
      bold: 'Luxury brand website.',
      rest: 'Stepped into an established codebase, drove in-depth refactoring across the board to sharpen quality and long-term maintainability — front-end development.',
    },
  },
  {
    name: 'Hero',
    logo: '/client-logos/hero.svg',
    deliverables: {
      bold: 'Heritage brand website.',
      rest: 'Took ownership of a mature Dutch consumer brand\'s digital presence and modernised it through focused structural refactoring — front-end development.',
    },
  },
  {
    name: 'Takeda',
    logo: '/client-logos/takeda.svg',
    deliverables: {
      bold: 'Interactive documentary & ADHD information website.',
      rest: 'Video-progress-driven content reveals, in-depth info pages, curved emotion-based timeline — seamless page transitions with Barba.js — front-end development.',
    },
  },
];

const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  img.style.display = 'none';
  const fallback = img.nextElementSibling as HTMLElement | null;
  if (fallback) fallback.style.display = 'flex';
};

export const WorksSection: React.FC = () => {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [pinnedName, setPinnedName] = useState<string | null>(null);

  const activeName = hoveredName ?? pinnedName;
  const activeDeliverables = clients.find(c => c.name === activeName)?.deliverables ?? null;
  const activeUrl = clients.find(c => c.name === activeName)?.url ?? null;

  return (
    <section id="works" className={styles.works}>
      <div className={`${styles.works__header} reveal`}>
        <h2 className={styles.works__heading}>
          Selected<br /><em>Clients</em>
        </h2>
        <span className={styles.works__count}>{String(clients.length).padStart(2, '0')} brands</span>
      </div>

      <div className={`${styles.brands} stagger`}>
        {clients.map(({ name, logo }) => {
          const isPinned = pinnedName === name;
          return (
            <div
              key={name}
              className={`${styles.brand} ${isPinned ? styles['brand--pinned'] : ''}`}
              title={name}
              data-cursor="brand"
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHoveredName(name); }}
              onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHoveredName(null); }}
              onClick={() => setPinnedName(prev => prev === name ? null : name)}
            >
              <img
                src={logo}
                alt={name}
                className={styles.brand__logo}
                loading="lazy"
                onError={handleLogoError}
              />
              <span className={styles.brand__fallback}>{name}</span>
            </div>
          );
        })}
      </div>

      <p className={`${styles.works__deliverables} ${activeDeliverables ? styles['works__deliverables--visible'] : ''}`}>
        {activeDeliverables
          ? <><strong>{activeDeliverables.bold}</strong>{' '}{activeDeliverables.rest}</>
          : ' '
        }
        {activeUrl ? <><br /><a href={activeUrl || ''} target="_blank" rel="noopener noreferrer">
          View here
        </a></> : ''}
      </p>
    </section>
  );
};
