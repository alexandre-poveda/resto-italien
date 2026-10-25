import React, { useEffect, useRef, useState } from 'react';

export default function BlurRevealTitle({
  as: Component = 'h2',
  className = '',
  lines = null,
  children = null,
  staggerMs = 65,
  initialDelayMs = 0,
  once = true
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Trigger immediately if already in viewport or if reduced motion is requested
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [once]);

  let globalWordIndex = 0;

  // Render structured lines if provided
  if (lines && Array.isArray(lines)) {
    return (
      <Component ref={containerRef} className={`${className} select-none`}>
        {lines.map((line, lIdx) => {
          const lineText = typeof line === 'string' ? line : line.text;
          const lineClass = typeof line === 'object' && line.className ? line.className : '';
          const words = lineText.split(' ');

          return (
            <React.Fragment key={lIdx}>
              <span className={`inline-block ${lineClass}`}>
                {words.map((word, wIdx) => {
                  const delay = initialDelayMs + globalWordIndex * staggerMs;
                  globalWordIndex++;

                  return (
                    <span
                      key={wIdx}
                      className="inline-block transition-all ease-out"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        filter: isVisible ? 'blur(0px)' : 'blur(12px)',
                        transform: isVisible ? 'translateY(0px)' : 'translateY(16px)',
                        transitionDuration: '750ms',
                        transitionDelay: `${delay}ms`,
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        marginRight: wIdx < words.length - 1 ? '0.28em' : '0'
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
              {lIdx < lines.length - 1 && <br />}
            </React.Fragment>
          );
        })}
      </Component>
    );
  }

  // Render text children
  if (typeof children === 'string') {
    const words = children.split(' ');

    return (
      <Component ref={containerRef} className={`${className} select-none`}>
        {words.map((word, wIdx) => {
          const delay = initialDelayMs + wIdx * staggerMs;

          return (
            <span
              key={wIdx}
              className="inline-block transition-all ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? 'blur(0px)' : 'blur(12px)',
                transform: isVisible ? 'translateY(0px)' : 'translateY(16px)',
                transitionDuration: '750ms',
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                marginRight: wIdx < words.length - 1 ? '0.28em' : '0'
              }}
            >
              {word}
            </span>
          );
        })}
      </Component>
    );
  }

  // Fallback for custom children
  return (
    <Component
      ref={containerRef}
      className={`${className} transition-all duration-700 ease-out`}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(12px)',
        transform: isVisible ? 'translateY(0px)' : 'translateY(16px)',
        transitionDelay: `${initialDelayMs}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </Component>
  );
}
