import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  duration = 700,
  delay = 0, 
  direction = 'up',
  distance = 20,
  threshold = 0.1,
  once = true,
  rootMargin = '0px',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const observedRef = useRef<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (typeof window !== 'undefined') {
      const getTransform = () => {
        switch (direction) {
          case 'up': return `translateY(${distance}px)`;
          case 'down': return `translateY(-${distance}px)`;
          case 'left': return `translateX(${distance}px)`;
          case 'right': return `translateX(-${distance}px)`;
          default: return 'none';
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && (!once || !observedRef.current)) {
              setIsVisible(true);
              observedRef.current = true;
              
              if (once) {
                observer.unobserve(element);
              }
            } else if (!entry.isIntersecting && !once && observedRef.current) {
              setIsVisible(false);
              observedRef.current = false;
            }
          });
        },
        { threshold, rootMargin }
      );

      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }
  }, [direction, distance, duration, delay, threshold, once, rootMargin]);

  return (
    <div 
      ref={elementRef} 
      className={cn(className, "will-change-transform will-change-opacity")}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : direction === 'up' ? `translateY(${distance}px)` :
                                      direction === 'down' ? `translateY(-${distance}px)` :
                                      direction === 'left' ? `translateX(${distance}px)` :
                                      direction === 'right' ? `translateX(-${distance}px)` : 'none',
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1), transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
        visibility: isVisible ? 'visible' : 'hidden'
      }}
    >
      {children}
    </div>
  );
};
