
import React, { useState, useEffect } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Meteors } from '@/components/ui/meteors';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialsSectionProps {
  className?: string;
  id?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className, id }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Sapphire Creations completely transformed our brand identity. Their attention to detail and creative approach helped us stand out in a crowded market.",
      author: "Alex Morgan",
      role: "Marketing Director",
      company: "TechSolutions Inc."
    },
    {
      id: 2,
      quote: "Working with Sapphire has been a game-changer for our digital marketing strategy. Their team delivered exceptional results that exceeded our expectations.",
      author: "Jamie Chen",
      role: "CEO",
      company: "Innovative Media"
    },
    {
      id: 3,
      quote: "The website design and logo created by Sapphire Creations perfectly captured our brand essence. We've received countless compliments from our clients.",
      author: "Taylor Wilson",
      role: "Brand Manager",
      company: "Wilson Enterprises"
    }
  ];

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      changeTestimonial((activeIndex + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex, testimonials.length]);
  
  const changeTestimonial = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }, 400);
  };

  return (
    <div id={id} className={cn("py-24 px-6 md:px-10 bg-gradient-to-b from-blue-950 to-black relative overflow-hidden", className)}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-black z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <div className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
              What People Say
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
              Trusted by Industry Leaders
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Hear from professionals who have experienced the transformative impact of our services firsthand.
            </p>
          </FadeIn>
        </div>
        
        <div className="relative mx-auto max-w-4xl">
          <div className="w-full relative max-w-4xl mx-auto">
            {/* Gradient background blur */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 transform scale-[0.85] rounded-full blur-3xl" />
            
            {/* Testimonial card */}
            <div className="relative shadow-xl bg-gray-900/40 border border-gray-800 px-6 py-10 md:p-12 overflow-hidden rounded-2xl">
              <ScrollArea className="h-[300px] md:h-[320px] w-full">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={cn(
                      "transition-all duration-800 ease-in-out p-4",
                      activeIndex === index 
                        ? "opacity-100 transform translate-y-0 scale-100" 
                        : isTransitioning
                          ? "opacity-0 transform -translate-y-8 scale-95"
                          : "opacity-0 transform translate-y-8 scale-95 pointer-events-none hidden"
                    )}
                    style={{
                      transitionDuration: '800ms',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          <div className="text-3xl text-white font-medium">
                            {testimonial.author.charAt(0)}
                          </div>
                        </div>
                      </div>
                      <div className="relative z-10">
                        <svg className="h-8 w-8 text-blue-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-xl md:text-2xl text-white mb-6 font-display">
                          "{testimonial.quote}"
                        </p>
                        <div className="mb-2">
                          <div className="text-white font-semibold">
                            {testimonial.author}
                          </div>
                          <div className="text-white/70">
                            {testimonial.role}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              
              {/* Meteors effect */}
              <Meteors number={15} className="opacity-70" />
            </div>
          </div>
          
          <div className="flex justify-center space-x-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors duration-500",
                  activeIndex === index 
                    ? "bg-blue-400" 
                    : "bg-white/30 hover:bg-white/50"
                )}
                onClick={() => changeTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
                disabled={isTransitioning}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {["Recognized by", "Featured in", "Award Winner", "Trusted by"].map((text, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="h-12 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${
                    index === 0 ? "from-blue-400/20 to-blue-600/20" :
                    index === 1 ? "from-purple-400/20 to-purple-600/20" :
                    index === 2 ? "from-cyan-400/20 to-cyan-600/20" :
                    "from-blue-400/20 to-purple-400/20"
                  } backdrop-blur-md flex items-center justify-center`}>
                    <svg className="h-8 w-8 text-white opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {index === 0 && (
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                      {index === 1 && (
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                      {index === 2 && (
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                      {index === 3 && (
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                    </svg>
                  </div>
                </div>
                <div className="mt-4 text-white font-medium">{text}</div>
                <div className="text-white/50 text-sm">Industry Leaders</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};
