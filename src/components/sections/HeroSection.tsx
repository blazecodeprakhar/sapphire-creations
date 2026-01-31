import React, { useEffect, useRef, useState } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { useParallaxEffect } from '@/hooks/use-animation';
import { cn } from '@/lib/utils';
import { PenTool, Layout, Image } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Increase the sensitivity by changing the multiplier from 0.05 to 0.08
  const parallaxOffset = useParallaxEffect(0.08);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollPosition = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const progress = Math.min(scrollPosition / heroHeight, 1);
      
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    animationDelay: Math.random() * 5,
    animationDuration: Math.random() * 10 + 10,
  }));

  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: href } });
      } else {
        const element = document.querySelector(href);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      navigate(href);
    }
  };

  return (
    <div 
      ref={heroRef}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-black opacity-90 z-0">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/7d9d5a78-2237-4294-8b02-fe193ec6e410.png')] bg-center bg-no-repeat bg-contain opacity-20"></div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-500/10 animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
              opacity: 0.4 - (scrollProgress * 0.4),
              transform: `translateY(${scrollProgress * 100}px)`,
            }}
          />
        ))}
      </div>
      
      <div 
        className="absolute w-[600px] h-[600px] pointer-events-none opacity-70"
        style={{
          // Increase the movement multiplier from 0.5 to 0.8 for more responsiveness
          transform: `translate3d(${parallaxOffset.x * 0.8}px, ${parallaxOffset.y * 0.8}px, 0) rotateX(${parallaxOffset.y * 0.08}deg) rotateY(${-parallaxOffset.x * 0.08}deg)`,
          opacity: 1 - scrollProgress,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full blur-xl animate-pulse-soft"></div>
        <div className="absolute inset-10 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-lg"></div>
        <div className="absolute inset-20 bg-gradient-to-tr from-cyan-300/20 to-blue-300/20 rounded-full blur-md"></div>
      </div>
      
      <div className="relative z-10 px-6 text-center max-w-5xl" style={{ opacity: 1 - scrollProgress }}>
        <FadeIn delay={300} duration={800} className="mb-2">
          <div className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
            Elevate Your Brand With Us
          </div>
        </FadeIn>
        
        <FadeIn delay={500} duration={1000} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-white">
            Creative Design Solutions
          </h1>
        </FadeIn>
        
        <FadeIn delay={700} duration={1000} direction="up" distance={30}>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            We don't just design—we craft exceptional visual identities and digital experiences that make your brand unforgettable. Whether it's a logo, website, or social media campaign, we bring your vision to life with creativity and precision.
          </p>
        </FadeIn>
        
        <FadeIn delay={900} duration={1000}>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={(e) => handleNavigation('#portfolio', e)}
            >
              Explore Our Work
            </button>
            <button 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full font-medium transition-all duration-300 border border-white/20"
              onClick={(e) => handleNavigation('#contact', e)}
            >
              Get In Touch
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
