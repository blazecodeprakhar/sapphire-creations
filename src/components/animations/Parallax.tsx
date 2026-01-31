import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className = '',
  speed = 0.1,
  direction = 'vertical',
  reverse = false,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const initialOffsetRef = useRef<number>(0);
  const [transform, setTransform] = useState('none');
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial position and mark as ready after a small delay
    initialOffsetRef.current = window.scrollY;
    const timer = setTimeout(() => setIsReady(true), 100);

    const handleScroll = () => {
      if (!element) return;
      const scrollY = window.scrollY;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if element is in viewport (or near it)
      if (rect.bottom < -viewportHeight || rect.top > viewportHeight * 2) return;
      
      // Calculate the offset based on the element's position in the viewport
      const offset = scrollY - initialOffsetRef.current;
      const parallaxValue = offset * speed * (reverse ? -1 : 1);
      
      setTransform(direction === 'vertical' 
        ? `translateY(${parallaxValue}px)`
        : `translateX(${parallaxValue}px)`);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [speed, direction, reverse]);

  return (
    <div 
      ref={elementRef} 
      className={cn(className)} 
      style={{ 
        willChange: 'transform',
        transform,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
        visibility: isReady ? 'visible' : 'hidden'
      }}
    >
      {children}
    </div>
  );
};
