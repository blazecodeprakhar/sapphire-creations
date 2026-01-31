import React, { useState, useCallback } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Parallax } from '@/components/animations/Parallax';
import { cn } from '@/lib/utils';
import { Layout } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProductIntroProps {
  className?: string;
  id?: string;
}

export const ProductIntro: React.FC<ProductIntroProps> = ({ className, id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = useCallback((href: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isNavigating) return; // Prevent multiple rapid clicks
    setIsNavigating(true);
    
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

    // Reset navigation state after animation completes
    setTimeout(() => {
      setIsNavigating(false);
    }, 800); // Match this with your animation duration
  }, [navigate, location.pathname, isNavigating]);

  const handleProcessClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    navigate('/');
    setTimeout(() => {
      const processSection = document.getElementById('process');
      if (processSection) {
        processSection.scrollIntoView({ behavior: 'smooth' });
      }
      setIsNavigating(false);
    }, 500);
  };

  return (
    <div id={id} className={cn(
      "py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 relative overflow-hidden bg-black",
      className,
      isNavigating && "pointer-events-none" // Prevent interactions during navigation
    )}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-0"></div>
      <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-b from-blue-500/10 to-indigo-500/5 blur-2xl rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <FadeIn direction="right">
              <div className="text-sm font-medium text-blue-400 mb-2 sm:mb-3 tracking-wider">OUR APPROACH</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6 text-white tracking-tight">
                Creativity with a Purpose
              </h2>
              <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
                At Sapphire Creations, we blend artistic innovation with strategic thinking to create designs that look stunning and drive real results for your business.
              </p>
              
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
                {[
                  "Brand-focused design that tells your story",
                  "Strategic visual communication that makes an impact",
                  "Consistent aesthetics across all platforms",
                  "Data-driven creative solutions for maximum effectiveness"
                ].map((item, index) => (
                  <FadeIn key={index} delay={index * 100} duration={800}>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 h-4 sm:h-5 w-4 sm:w-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <svg className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base text-white/80">{item}</span>
                    </li>
                  </FadeIn>
                ))}
              </ul>
              
              <FadeIn duration={1000}>
                <button 
                  onClick={handleProcessClick}
                  disabled={isNavigating}
                  className={cn(
                    "px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",
                    isNavigating && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Want to see how we work?
                </button>
              </FadeIn>
            </FadeIn>
          </div>
          
          {/* Right Content */}
          <div className="relative mt-8 md:mt-0">
            <Parallax speed={0.1}>
              <div className={cn(
                "relative rounded-xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-[500px] shadow-2xl transition-opacity duration-300",
                isNavigating && "opacity-50"
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm z-0"></div>
                <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6">
                  <div className="glass rounded-xl w-full h-full flex items-center justify-center">
                    <div className="text-center p-6 sm:p-8">
                      <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white/10 backdrop-blur-md mx-auto mb-6 flex items-center justify-center">
                        <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 animate-pulse-soft flex items-center justify-center">
                          <Layout className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-medium text-white mb-3">Intuitive Design</h3>
                      <p className="text-sm sm:text-base text-white/70 max-w-xs mx-auto">
                        Creating interfaces that users love to interact with, one pixel at a time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Parallax>
            
            {/* Testimonial - fixed positioning */}
            <FadeIn>
              <div className="absolute bottom-[-24px] left-4 sm:left-[-24px] z-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 sm:p-6 backdrop-blur-sm border border-white/20 shadow-xl max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-3rem)]">
                <p className="text-sm sm:text-base text-white font-medium">
                  "We make designs so good, even your competition might 'accidentally' take inspiration."
                </p>
                <div className="mt-3 sm:mt-4 flex items-center">
                  <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-white/30"></div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-white">Ctrl + Z</div>
                    <div className="text-xs text-white/70">Janitor</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};
