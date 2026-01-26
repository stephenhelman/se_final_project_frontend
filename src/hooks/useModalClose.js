import { useEffect } from "react";

const useModalClose = (isOpen, onClose, type) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleModalOverlay = (e) => {
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    const handleFilterOverlay = (e) => {
      if (
        !e.target.closest(".sidebar") &&
        !e.target.parentElement.classList.contains("button")
      ) {
        onClose();
      }
    };

    const handleAuthNavOverlay = (e) => {
      if (
        !e.target.closest(".auth") &&
        !e.target.parentElement.classList.contains("button")
      ) {
        onClose();
      }
    };
    let mouseFunc;

    switch (type) {
      case "sidebar":
        mouseFunc = handleFilterOverlay;
        break;
      case "menu":
        mouseFunc = handleAuthNavOverlay;
        break;

      default:
        mouseFunc = handleModalOverlay;
        break;
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", mouseFunc);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", mouseFunc);
    };
  }, [isOpen, onClose, type]);
};

export default useModalClose;
