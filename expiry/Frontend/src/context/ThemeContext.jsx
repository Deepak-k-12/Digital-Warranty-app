// ThemeContext.jsx
import { createContext, useContext, useEffect, useState, useMemo } from 'react';

const ThemeProviderContext = createContext({
  theme: 'system',
  setTheme: () => null,
  toggleTheme: () => null, // ✅ ADD THIS
});

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-ui-theme' }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(storageKey, next);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme: (newTheme) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      },
      toggleTheme, // ✅ PASS IT IN CONTEXT
    }),
    [theme]
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
