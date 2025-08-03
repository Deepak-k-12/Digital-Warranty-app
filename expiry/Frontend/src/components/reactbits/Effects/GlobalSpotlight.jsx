// src/components/reactbits/Effects/GlobalSpotlight.jsx
import React, { useEffect, useRef } from 'react';

const GlobalSpotlight = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!spotlightRef.current) return;
      const { clientX, clientY } = e;
      spotlightRef.current.style.setProperty('--x', `${clientX}px`);
      spotlightRef.current.style.setProperty('--y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-10 [mask-image:radial-gradient(500px_circle_at_var(--x)_var(--y),white,transparent)]"
    />
  );
};

export default GlobalSpotlight;
