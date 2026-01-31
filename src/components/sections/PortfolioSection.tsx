import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import { BentoGridGalleryDemo } from '@/components/demos/bento-grid-gallery-demo';
import { useNavigate } from 'react-router-dom';

interface PortfolioSectionProps {
  className?: string;
  id?: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ className, id }) => {
  const navigate = useNavigate();

  return (
    <div id={id} className={cn("py-24 px-6 md:px-10 bg-black relative", className)}>
      <div className="absolute inset-0 bg-[url('/lovable-uploads/7d9d5a78-2237-4294-8b02-fe193ec6e410.png')] bg-center bg-no-repeat bg-contain opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-black/90 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <div className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
              Our Work
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
              Featured Projects
            </h2>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Explore our creative portfolio showcasing our best work across various 
              industries and design solutions.
            </p>
          </FadeIn>
        </div>
        
        {/* Interactive Bento Gallery */}
        <FadeIn delay={600}>
          <div className="mb-12">
            <BentoGridGalleryDemo />
          </div>
        </FadeIn>
        
        <FadeIn delay={800}>
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/all-projects')}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20 hover:scale-105"
            >
              View All Projects
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
