import { useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('rh-theme') as Theme) ?? 'light';
    } catch {
      return 'light';
    }
  });

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('rh-theme', theme);
    } catch {
      // localStorage unavailable (private mode etc.)
    }
  }, [theme]);

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggle };
}
