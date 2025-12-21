import { useEffect, useRef } from "react";

const useScrollSaver = (storageKey) => {
  const scrollRef = useRef(null);

  // Restore on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (scrollRef.current && saved != null) {
      scrollRef.current.scrollTop = Number(saved);
    }
  }, [storageKey]);

  // Helper to save scroll before navigating away
  const saveScrollPosition = () => {
    if (scrollRef.current) {
      sessionStorage.setItem(storageKey, String(scrollRef.current.scrollTop));
    }
  };

  return { scrollRef, saveScrollPosition };
};

export default useScrollSaver;
