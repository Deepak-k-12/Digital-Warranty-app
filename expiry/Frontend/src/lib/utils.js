import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState, useEffect } from 'react';

// NEW: Function for combining class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// NEW: Hook to detect mobile screen size
const MOBILE_BREAKPOINT = 768;
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

/**
 * Formats a date string (e.g., "2024-12-01") into a more readable format (e.g., "Dec 1, 2024").
 * @param {string} dateString The date string to format.
 * @returns {string} The formatted date.
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Returns Tailwind CSS classes for a product's status badge.
 * @param {string} status The status of the product ('active', 'warning', 'expired', or a category).
 * @returns {string} A string of Tailwind CSS classes.
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
    case 'expired':
      return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    case 'electronics':
      return 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300';
    case 'medicine':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    case 'food':
       return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
    case 'appliance':
       return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};