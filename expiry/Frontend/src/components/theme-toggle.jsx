import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, Monitor } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2 border rounded px-2 py-1 dark:border-gray-700">
      <button
        onClick={() => setTheme('light')}
        className={`p-1 rounded ${theme === 'light' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
        title="Light"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1 rounded ${theme === 'dark' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
        title="Dark"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1 rounded ${theme === 'system' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
        title="System"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ThemeToggle;
