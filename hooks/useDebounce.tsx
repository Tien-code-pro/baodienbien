"use client";
import { useState, useEffect } from "react";

// Define the hook with generic type T for value
const useDebounce = <T,>(value: T, delay: number): T => {
  // Type the state to match the type of the value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update debouncedValue after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer when value or delay changes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
};

export default useDebounce;
