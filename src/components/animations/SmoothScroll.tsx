
import React, { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
  ease?: number;
  enabled?: boolean;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ 
  children, 
  ease = 0.1,
  enabled = true
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const smoothScrollRef = useRef<{
    target: number;
    current: number;
    ease: number;
    enabled: boolean;
    rAF: number | null;
  }>({
    target: 0,
    current: 0,
    ease,
    enabled,
    rAF: null
  });

  useEffect(() => {
    smoothScrollRef.current.ease = ease;
    smoothScrollRef.current.enabled = enabled;

    if (!enabled && smoothScrollRef.current.rAF) {
      cancelAnimationFrame(smoothScrollRef.current.rAF);
      smoothScrollRef.current.rAF = null;
    } else if (enabled && !smoothScrollRef.current.rAF) {
      smoothScrollRef.current.rAF = requestAnimationFrame(smoothScrollLoop);
    }
  }, [ease, enabled]);

  useEffect(() => {
    if (!enabled) return;
    
    const resizeObserver = new ResizeObserver(() => {
      if (scrollableRef.current) {
        document.body.style.height = `${scrollableRef.current.scrollHeight}px`;
      }
    });

    if (scrollableRef.current) {
      resizeObserver.observe(scrollableRef.current);
      document.body.style.height = `${scrollableRef.current.scrollHeight}px`;
    }

    const scrollListener = () => {
      smoothScrollRef.current.target = window.scrollY;
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    smoothScrollRef.current.rAF = requestAnimationFrame(smoothScrollLoop);

    return () => {
      if (scrollableRef.current) {
        resizeObserver.unobserve(scrollableRef.current);
      }
      window.removeEventListener('scroll', scrollListener);
      if (smoothScrollRef.current.rAF) {
        cancelAnimationFrame(smoothScrollRef.current.rAF);
      }
      document.body.style.height = '';
    };
  }, [enabled]);

  const smoothScrollLoop = () => {
    if (!smoothScrollRef.current.enabled) return;
    
    // Calculate the difference between current position and target
    const delta = smoothScrollRef.current.target - smoothScrollRef.current.current;
    // Apply easing
    const movement = delta * smoothScrollRef.current.ease;
    
    // Update current position
    smoothScrollRef.current.current += movement;
    
    // Apply the transform
    if (scrollableRef.current) {
      scrollableRef.current.style.transform = `translate3d(0, -${smoothScrollRef.current.current}px, 0)`;
    }
    
    // Schedule next frame
    smoothScrollRef.current.rAF = requestAnimationFrame(smoothScrollLoop);
  };

  return (
    <div
      ref={scrollableRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
