import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state with localStorage persistence
 * @param key - The localStorage key
 * @param initialValue - The initial value if nothing is stored
 * @returns [storedValue, setValue] - Similar to useState
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      // Parse stored json
      const parsed = JSON.parse(item);

      // Special handling for Set objects
      if (parsed && typeof parsed === 'object' && parsed._type === 'Set' && Array.isArray(parsed._values)) {
        return new Set(parsed._values) as T;
      }

      return parsed;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        // Special handling for Set objects
        let serialized: string;
        if (valueToStore instanceof Set) {
          serialized = JSON.stringify({
            _type: 'Set',
            _values: Array.from(valueToStore),
          });
        } else {
          serialized = JSON.stringify(valueToStore);
        }
        window.localStorage.setItem(key, serialized);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
