import React, { createContext, useContext } from 'react';
import clsx from 'clsx';
import {
  useAnimationQueue,
  type AnimationOverrides,
  type QueueItemConfig,
  type QueuedItem,
} from '@/hooks/useAnimationQueue';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/** Direction the element travels in as it reveals. */
export type RevealVariant = 'up' | 'left' | 'right' | 'bottom';

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
  bottom: 'reveal-bottom',
};

/** Turns per-item overrides into the CSS custom properties animations.css reads. */
function overrideVars(overrides: AnimationOverrides): React.CSSProperties {
  const vars: Record<string, string> = {};
  if (overrides.duration != null) vars['--reveal-duration'] = `${overrides.duration}ms`;
  if (overrides.delay != null) vars['--reveal-delay'] = `${overrides.delay}ms`;
  if (overrides.easing != null) vars['--reveal-ease'] = overrides.easing;
  return vars as React.CSSProperties;
}

type RegisterFn = (index: number, config?: QueueItemConfig) => QueuedItem;

const RevealGroupContext = createContext<RegisterFn | null>(null);

// --- Shared element renderer ---------------------------------------------

type RevealTag = 'div' | 'span' | 'section' | 'li' | 'p' | 'article';

interface CommonRevealProps extends React.HTMLAttributes<HTMLElement> {
  variant?: RevealVariant;
  as?: RevealTag;
  /** Reveal transition duration (ms). Falls back to the CSS default. */
  duration?: number;
  /** Delay (ms) after the item is triggered before it animates. */
  delay?: number;
  /** CSS easing keyword. Falls back to the CSS default. */
  easing?: string;
  [key: `data-${string}`]: string | number | boolean | undefined;
}

/** Renders the queued item onto the chosen element. */
function RevealElement({
  item,
  variant = 'up',
  as = 'div',
  className,
  style,
  children,
  ...rest
}: CommonRevealProps & { item: QueuedItem }) {
  const Tag = as;
  return (
    <Tag
      ref={item.ref as never}
      className={clsx(VARIANT_CLASS[variant], item.activated && 'visible', className)}
      style={{ ...overrideVars(item.overrides), ...style }}
      {...item.debug}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// --- Standalone reveal (own single-item queue) ---------------------------

interface StandaloneProps extends CommonRevealProps {
  /**
   * How far (0-1) into the viewport before triggering, from the bottom edge.
   * Larger = later. Defaults to 0.15.
   */
  threshold?: number;
}

function StandaloneReveal({ duration, delay, easing, threshold, ...rest }: StandaloneProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { register } = useAnimationQueue({ count: 1, threshold, prefersReducedMotion });
  const item = register(0, { overrides: { duration, delay, easing } });
  return <RevealElement item={item} {...rest} />;
}

// --- Grouped reveal (registers with the surrounding RevealGroup) ---------

interface GroupedProps extends CommonRevealProps {
  /** Position within the group. Required inside a <RevealGroup>. */
  index: number;
  /** Stagger (ms) before this item, when items compete. */
  staggerMs?: number;
}

function GroupedReveal({
  register,
  index,
  staggerMs,
  duration,
  delay,
  easing,
  ...rest
}: GroupedProps & { register: RegisterFn }) {
  const item = register(index, { staggerMs, overrides: { duration, delay, easing } });
  return <RevealElement item={item} {...rest} />;
}

// --- Public components ----------------------------------------------------

export type RevealProps = CommonRevealProps & {
  /** Required when inside a <RevealGroup>; ignored for a standalone reveal. */
  index?: number;
  staggerMs?: number;
  threshold?: number;
};

/**
 * Scroll-reveal element. Standalone by default; when rendered inside a
 * {@link RevealGroup} it registers with that group's queue (pass `index`) so
 * siblings cascade on a fast scroll and trigger instantly on a slow one.
 */
export const Reveal: React.FC<RevealProps> = ({ index, threshold, ...rest }) => {
  const register = useContext(RevealGroupContext);

  if (register) {
    if (index == null && import.meta.env.DEV) {
      console.warn('<Reveal> inside a <RevealGroup> needs an `index` prop.');
    }
    return <GroupedReveal register={register} index={index ?? 0} {...rest} />;
  }

  return <StandaloneReveal threshold={threshold} {...rest} />;
};

export interface RevealGroupProps {
  as?: RevealTag;
  /** Item count. Defaults to the number of direct children. */
  count?: number;
  /** Stagger (ms) between competing triggers. Defaults to 90. */
  staggerMs?: number;
  /** How far (0-1) into the viewport before triggering. Defaults to 0.15. */
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Wraps a set of {@link Reveal} items and drives them from a single animation
 * queue, so a burst that scrolls into view together cascades in index order.
 */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  as = 'div',
  count,
  staggerMs,
  threshold,
  className,
  style,
  children,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const resolvedCount = count ?? React.Children.count(children);
  const { register } = useAnimationQueue({
    count: resolvedCount,
    threshold,
    defaultStaggerMs: staggerMs,
    prefersReducedMotion,
  });

  const Tag = as;
  return (
    <RevealGroupContext.Provider value={register}>
      <Tag className={className} style={style}>
        {children}
      </Tag>
    </RevealGroupContext.Provider>
  );
};
