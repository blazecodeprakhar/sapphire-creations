
import { useEffect, useState, useRef, useMemo } from 'react';

interface UseAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useAnimation(options: UseAnimationOptions = {}) {
  const { 
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true 
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  
  const shouldAnimate = useMemo(() => {
    return isVisible && (!triggerOnce || !hasAnimated);
  }, [isVisible, triggerOnce, hasAnimated]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          
          setIsVisible(isIntersecting);
          
          if (isIntersecting && triggerOnce) {
            setHasAnimated(true);
            observer.unobserve(element);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  const setRef = (el: HTMLElement | null) => {
    elementRef.current = el;
  };

  return { elementRef, shouldAnimate, isVisible, setRef };
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}

export function useParallaxEffect(speed = 0.1) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const mousePosition = useMousePosition();
  
  useEffect(() => {
    // Calculate the center of the screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Calculate the distance from the center with a smoother movement
    // Using requestAnimationFrame for smoother transition
    requestAnimationFrame(() => {
      const distanceX = (mousePosition.x - centerX) * speed;
      const distanceY = (mousePosition.y - centerY) * speed;
      
      setOffset({ x: distanceX, y: distanceY });
    });
  }, [mousePosition, speed]);
  
  return offset;
}
