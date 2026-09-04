import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Animation props forwarded to a registered item when it activates.
 *
 * Anything omitted falls back to the item's own CSS defaults, so the queue
 * never needs to know about an item's animation internals — a registered item
 * can override just the props it cares about, or nothing at all.
 */
export interface AnimationOverrides {
  /** Duration (ms) of the item's reveal transition. */
  duration?: number;
  /**
   * The item's OWN start delay (ms) after it is triggered. This is NOT queue
   * timing — see {@link QueueItemConfig.staggerMs} for that.
   */
  delay?: number;
  /** CSS easing keyword forwarded to the item (e.g. `cubic-bezier(...)`). */
  easing?: string;
}

/** Per-item registration config. */
export interface QueueItemConfig {
  /**
   * Stagger (ms) before THIS item triggers, measured from the previous item's
   * trigger — i.e. the time between two consecutive triggers.
   *
   * Only felt when the previous item is competing for activation (fast scroll /
   * items stacked together); skipped on slow scroll. Falls back to the
   * queue-level `defaultStaggerMs`.
   */
  staggerMs?: number;
  /** Animation overrides forwarded to the item when it activates. */
  overrides?: AnimationOverrides;
}

/** State returned for a single registered item. */
export interface QueuedItem {
  /** Whether the item has been triggered and should render its animation. */
  activated: boolean;
  /** Resolved overrides to spread onto the animated element. */
  overrides: AnimationOverrides;
  /** Ref callback to attach to the observed wrapper element. */
  ref: (el: HTMLElement | null) => void;
  /**
   * Development-only `data-*` attributes to spread onto the wrapper element for
   * inspecting queue timing in the DOM. Empty object in production.
   */
  debug: Record<string, string | number | boolean>;
}

export interface UseAnimationQueueOptions {
  /** Total number of items in the queue. */
  count: number;
  /**
   * How far (0-1) an item must scroll up into the viewport before it is queued,
   * measured from the bottom edge (0.15 = 15% into the viewport). Larger values
   * trigger later. Defaults to 0.15.
   */
  threshold?: number;
  /**
   * Stagger (ms) between consecutive triggers when items compete and no
   * per-item `staggerMs` is provided. Defaults to 90.
   */
  defaultStaggerMs?: number;
  /** When true, every item is activated up front and observation is skipped. */
  prefersReducedMotion?: boolean;
}

/** Bottom-only rootMargin that raises the trigger line into the viewport. */
const getViewportMargin = (threshold: number) =>
  `0px 0px ${-(threshold * 100)}% 0px`;

const isDev =
  typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV);

/**
 * Scroll-triggered animation queue.
 *
 * An `IntersectionObserver` watches every registered item; as items enter the
 * viewport they're pushed into a queue and fired one at a time. The stagger
 * between triggers is only *felt* when items compete for activation — a fast
 * scroll that brings several items on-screen at once makes them cascade, while
 * a slow scroll triggers each item instantly as it's reached. Respects
 * reduced-motion and supports per-item overrides.
 */
export const useAnimationQueue = ({
  count,
  threshold = 0.15,
  defaultStaggerMs = 90,
  prefersReducedMotion = false,
}: UseAnimationQueueOptions): {
  register: (index: number, config?: QueueItemConfig) => QueuedItem;
} => {
  // Per-item configs, refreshed each render via register() so the latest
  // staggerMs/overrides are available to timers without re-subscribing.
  const configsRef = useRef<QueueItemConfig[]>([]);

  const [activated, setActivated] = useState<boolean[]>(
    () => Array(count).fill(prefersReducedMotion) as boolean[],
  );

  // The useState initializer only runs on the first render, so if
  // prefersReducedMotion resolves to true after mount (media-query change) or
  // count changes, activate every item immediately.
  useEffect(() => {
    if (!prefersReducedMotion) return;
    setActivated(Array(count).fill(true) as boolean[]);
  }, [prefersReducedMotion, count]);

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const queue = useRef(new Set<number>());
  const nextToProcess = useRef(0);
  const isProcessing = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Per-item runtime flag: did this item trigger as part of a competing burst
  // (stagger applied) rather than alone on a slow scroll?
  const togetherRef = useRef<boolean[]>([]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const processQueue = useCallback(
    (chained = false) => {
      if (isProcessing.current) return;

      const next = nextToProcess.current;
      if (next >= count || !queue.current.has(next)) return;

      isProcessing.current = true;
      queue.current.delete(next);
      nextToProcess.current = next + 1;

      // "Together" when this item either waited for the previous item's stagger
      // (chained) or still has items queued behind it (a burst).
      togetherRef.current[next] = chained || queue.current.size > 0;

      // Trigger the current item immediately — there is never a delay *before*
      // an activation, only after one.
      setActivated((prev) => {
        const updated = [...prev];
        updated[next] = true;
        return updated;
      });

      // The stagger belongs to the FOLLOWING item ("N+1 triggers X ms after N").
      // If that item is not queued when the cooldown ends, the queue drains and
      // the following item (slow scroll) triggers instantly instead of
      // inheriting a stale stagger.
      const following = next + 1;
      const stagger =
        configsRef.current[following]?.staggerMs ?? defaultStaggerMs;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isProcessing.current = false;
        processQueue(true);
      }, stagger);
    },
    [count, defaultStaggerMs],
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const margin = getViewportMargin(threshold);

    const observer = new IntersectionObserver(
      (entries) => {
        let added = false;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const index = itemRefs.current.indexOf(entry.target as HTMLElement);
          if (index === -1) continue;

          queue.current.add(index);
          added = true;
          observer.unobserve(entry.target);
        }

        if (added) processQueue();
      },
      { rootMargin: margin },
    );

    for (const ref of itemRefs.current) {
      if (ref) observer.observe(ref);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion, processQueue, threshold]);

  const register = useCallback(
    (index: number, config: QueueItemConfig = {}): QueuedItem => {
      // Cache the latest config so processQueue can read this item's stagger.
      configsRef.current[index] = config;

      const overrides = config.overrides ?? {};
      const isActivated = activated[index] ?? false;

      const debug: Record<string, string | number | boolean> = isDev
        ? {
            'data-queue-index': index,
            'data-queue-size': count,
            'data-queue-duration': overrides.duration ?? 'default',
            'data-queue-delay': overrides.delay ?? 'default',
            'data-queue-stagger': config.staggerMs ?? defaultStaggerMs,
            'data-queue-threshold': threshold,
            'data-queue-activated': isActivated,
            'data-queue-together': togetherRef.current[index] ?? false,
          }
        : {};

      return {
        activated: isActivated,
        overrides,
        ref: (el: HTMLElement | null) => {
          itemRefs.current[index] = el;
        },
        debug,
      };
    },
    [activated, count, defaultStaggerMs, threshold],
  );

  return { register };
};
