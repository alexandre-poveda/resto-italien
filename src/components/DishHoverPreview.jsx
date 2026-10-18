import React, { useEffect, useState, useRef } from 'react';

export default function DishHoverPreview({ activeDish }) {
  const [coords, setCoords] = useState({ x: -500, y: -500 });
  const [targetCoords, setTargetCoords] = useState({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  const animRef = useRef(null);

  // Track global mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp / interpolation towards cursor
  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      setCoords((prev) => {
        const nextX = lerp(prev.x, targetCoords.x, 0.18);
        const nextY = lerp(prev.y, targetCoords.y, 0.18);
        return { x: nextX, y: nextY };
      });
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [targetCoords]);

  useEffect(() => {
    if (activeDish) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [activeDish]);

  if (!isVisible && !activeDish) return null;

  // Compute offset to keep inside viewport
  const previewWidth = 380;
  const previewHeight = 440;
  const offsetX = 32;
  const offsetY = -previewHeight / 2;

  let leftPos = coords.x + offsetX;
  let topPos = coords.y + offsetY;

  // Window bounds safety check
  if (typeof window !== 'undefined') {
    if (leftPos + previewWidth > window.innerWidth - 20) {
      leftPos = coords.x - previewWidth - offsetX;
    }
    if (topPos < 80) {
      topPos = 80;
    } else if (topPos + previewHeight > window.innerHeight - 20) {
      topPos = window.innerHeight - previewHeight - 20;
    }
  }

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-200 hidden md:block ${
        activeDish ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        left: `${leftPos}px`,
        top: `${topPos}px`,
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform, left, top',
      }}
    >
      <div className="bg-[#FFF9EF] p-4 rounded-3xl shadow-2xl border-2 border-[#2B211D]/20 w-[380px] overflow-hidden backdrop-blur-md">
        {/* Dish image container */}
        <div className="relative w-full h-[230px] rounded-2xl overflow-hidden bg-[#2B211D]/5 shadow-inner">
          <img
            src={activeDish?.image}
            alt={activeDish?.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            loading="eager"
          />
          {activeDish?.tags && activeDish.tags.length > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-[#E94B35] text-white text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-md">
              {activeDish.tags[0]}
            </span>
          )}
          <span className="absolute bottom-2.5 right-2.5 bg-[#2B211D]/90 text-white font-serif text-base font-bold px-3.5 py-1 rounded-full shadow-lg">
            {activeDish?.price} €
          </span>
        </div>

        {/* Dish meta info */}
        <div className="pt-3.5 px-1">
          <span className="text-xs uppercase font-sans tracking-widest text-[#E94B35] font-bold block mb-1">
            {activeDish?.courseName}
          </span>
          <h4 className="font-serif text-2xl font-bold text-[#2B211D] leading-snug">
            {activeDish?.name}
          </h4>
          <p className="text-sm text-[#2B211D]/80 font-sans mt-2 leading-relaxed">
            {activeDish?.description}
          </p>
          {activeDish?.pairing && (
            <div className="mt-3 pt-3 border-t border-[#2B211D]/12 flex items-center justify-between text-xs text-[#697348] font-medium">
              <span className="italic">Accord conseillé :</span>
              <strong className="text-[#2B211D] font-serif text-sm">{activeDish.pairing}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
