import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export const ThemeTransitionOverlay: React.FC = () => {
  const { isTransitioning, theme } = useTheme();
  const [position, setPosition] = useState({ x: '50%', y: '50%' });
  const [isActive, setIsActive] = useState(false);

  // Handle the transition animation
  useEffect(() => {
    if (isTransitioning) {
      // Get mouse position or use center of screen
      const x = localStorage.getItem('mouseX') || '50%';
      const y = localStorage.getItem('mouseY') || '50%';
      setPosition({ x, y });
      
      // Activate the overlay
      setIsActive(true);
      
      // Reset after animation completes
      const timeout = setTimeout(() => {
        setIsActive(false);
      }, 800);
      
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  // Track mouse position for better animation effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Store mouse position as percentage
      const x = `${(e.clientX / window.innerWidth) * 100}%`;
      const y = `${(e.clientY / window.innerHeight) * 100}%`;
      localStorage.setItem('mouseX', x);
      localStorage.setItem('mouseY', y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={cn(
        "theme-transition-overlay",
        isActive && "active"
      )}
      style={{
        backgroundPosition: `${position.x} ${position.y}`,
        // Adjust the scale of the effect based on the theme
        backgroundSize: theme === 'dark' ? '200% 200%' : '150% 150%',
      }}
    />
  );
}; 