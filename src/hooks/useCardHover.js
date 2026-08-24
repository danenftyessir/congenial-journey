import { useState, useRef } from 'react';

const useCardHover = (delay = 500) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState(null);
  const cardRef = useRef(null);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (cardRef.current) {
        const r = cardRef.current.getBoundingClientRect();
        setPos({ top: r.top, left: r.left, width: r.width, height: r.height });
      }
      setIsHovered(true);
    }, delay);
  };

  // Small grace period so moving cursor onto the popup doesn't close it
  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsHovered(false), 120);
  };

  const cancelLeave = () => {
    clearTimeout(timerRef.current);
  };

  return { cardRef, isHovered, pos, handleMouseEnter, handleMouseLeave, cancelLeave };
};

export default useCardHover;
