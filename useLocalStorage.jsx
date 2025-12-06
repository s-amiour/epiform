import { useState, useEffect } from "react";

export default function useLocalStorage(storageKey, defaultState = {}) {
  const [checked, setChecked] = useState(defaultState);

  // Load from localStorage on first load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            setChecked(parsed);
            return;
          }
        } catch (parseError) {
          console.error(`Invalid JSON in localStorage for key: ${storageKey}`, parseError);
        }
      }

      // If no saved data or parsing failed, initialize full schema
      try {
        localStorage.setItem(storageKey, JSON.stringify(defaultState));
      } catch (writeError) {
        console.error(`Failed to initialize localStorage schema for key: ${storageKey}`, writeError);
      }

      // Ensure React state matches schema
      setChecked(defaultState);

    } catch (error) {
      console.error(`Failed to access localStorage (load) for key: ${storageKey}`, error);
    }
  }, [storageKey, defaultState]);

  // Save to localStorage whenever checked changes
  useEffect(() => {
    try {
      const serialized = JSON.stringify(checked);
      localStorage.setItem(storageKey, serialized);
    } catch (error) {
      console.error(`Failed to save checklist to localStorage (key: ${storageKey})`, error);
    }
  }, [checked, storageKey]);

  // Toggle helper: flips boolean values only
  const toggle = (id) => {
    try {
      setChecked((prev) => {
        const current = prev[id];
        if (typeof current === "boolean") {
          return { ...prev, [id]: !current };
        }
        return prev; // leave non-boolean values unchanged
      });
    } catch (error) {
      console.error(`Failed to toggle checklist item: ${id}`, error);
    }
  };

  // Update helper: sets any value (string, number, boolean, etc.)
  const update = (id, value) => {
    try {
      setChecked((prev) => ({ ...prev, [id]: value }));
    } catch (error) {
      console.error(`Failed to update checklist item: ${id}`, error);
    }
  };

  return { checked, setChecked, toggle, update };
}
