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
  const previewWidth = 280;
  const previewHeight = 330;
  const offsetX = 28;
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
      <div className="bg-[#FFF9EF] p-2.5 rounded-2xl shadow-2xl border-2 border-[#2B211D]/15 w-[280px] overflow-hidden backdrop-blur-md">
        {/* Dish image container */}
        <div className="relative w-full h-[190px] rounded-xl overflow-hidden bg-[#2B211D]/5">
          <img
            src={activeDish?.image}
            alt={activeDish?.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            loading="eager"
          />
          {activeDish?.tags && activeDish.tags.length > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-[#E94B35] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-sm">
              {activeDish.tags[0]}
            </span>
          )}
          <span className="absolute bottom-2.5 right-2.5 bg-[#2B211D]/90 text-white font-serif text-xs font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            {activeDish?.price} €
          </span>
        </div>

        {/* Dish meta info */}
        <div className="p-2.5 pt-3">
          <span className="text-[10px] uppercase font-sans tracking-widest text-[#E94B35] font-bold block mb-0.5">
            {activeDish?.courseName}
          </span>
          <h4 className="font-serif text-sm font-bold text-[#2B211D] leading-snug line-clamp-1">
            {activeDish?.name}
          </h4>
          <p className="text-[11px] text-[#2B211D]/70 font-sans line-clamp-2 mt-1 leading-normal">
            {activeDish?.description}
          </p>
          {activeDish?.pairing && (
            <div className="mt-2 pt-2 border-t border-[#2B211D]/10 flex items-center justify-between text-[10px] text-[#2B211D]/60">
              <span className="italic">Accord conseillé :</span>
              <span className="font-semibold text-[#2B211D]">{activeDish.pairing}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
