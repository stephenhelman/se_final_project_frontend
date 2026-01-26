import { useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const usePan = ({
  minX = -9999,
  maxX = 9999,
  minY = -9999,
  maxY = 9999,
} = {}) => {
  const isPanningRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const originRef = useRef({ x: 0, y: 0 });

  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    if (e.target.closest("[data-evo-node")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isPanningRef.current = true;
    startRef.current = { x: e.clientX, y: e.clientY };
    originRef.current = { x: pos.x, y: pos.y };

    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e) => {
    if (!isPanningRef.current) return;

    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    const nextX = clamp(originRef.current.x + dx, minX, maxX);
    const nextY = clamp(originRef.current.y + dy, minY, maxY);

    setPos({ x: nextX, y: nextY });
  };

  const onPointerUp = (e) => {
    isPanningRef.current = false;
    if (e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (e) {
        () => {};
      }
    }
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return {
    pos,
    reset,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
};

export default usePan;
