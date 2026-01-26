import { useEffect, useRef } from "react";

const useScrollSaver = (storageKey) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (scrollRef.current && saved != null) {
      scrollRef.current.scrollTop = Number(saved);
    }
  }, [storageKey]);

  const saveScrollPosition = () => {
    if (scrollRef.current) {
      sessionStorage.setItem(storageKey, String(scrollRef.current.scrollTop));
    }
  };

  return { scrollRef, saveScrollPosition };
};

export default useScrollSaver;
