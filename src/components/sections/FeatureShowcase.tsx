import React, { useState, useEffect, useCallback } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Parallax } from '@/components/animations/Parallax';
import { cn } from '@/lib/utils';
import { PenTool, Image, Layout, MessageSquare, Video, Palette, Target, Megaphone, Globe, Activity } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureShowcaseProps {
  className?: string;
  id?: string;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ className, id }) => {
  const [activeService, setActiveService] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleServiceChange = useCallback((serviceId: number) => {
    if (serviceId === activeService) return;
    
    setIsTransitioning(true);
    setActiveService(serviceId);
    
    requestAnimationFrame(() => {
      const serviceCard = document.querySelector(`[data-service-id="${serviceId}"]`);
      if (serviceCard) {
        serviceCard.classList.remove('card-pulse');
        void (serviceCard as HTMLElement).offsetWidth;
        serviceCard.classList.add('card-pulse');
      }
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
  }, [activeService]);

  useEffect(() => {
    const activateServiceHandler = (event: CustomEvent<{ serviceId: number }>) => {
      handleServiceChange(event.detail.serviceId);
    };
    
    document.addEventListener('activateService', activateServiceHandler as EventListener);
    
    return () => {
      document.removeEventListener('activateService', activateServiceHandler as EventListener);
    };
  }, [handleServiceChange]);
  
  const services: Service[] = [
    {
      id: 1,
      title: "Logo Design",
      description: "Unique and memorable logos that define your brand. Because your business deserves more than a \"designed-in-MS-Paint\" kind of logo.",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
          <PenTool className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      id: 2,
      title: "Graphic Design",
      description: "Eye-catching visuals that capture attention and communicate your message. We make designs that don't just look good—they work.",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 flex items-center justify-center">
          <Palette className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Intuitive, user-friendly designs for websites and apps. If people need a manual to use your website, you need us.",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-600 flex items-center justify-center">
          <Layout className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      id: 4,
      title: "Website Design & Development",
      description: "Custom-built, responsive, and optimized websites. Fast, beautiful, and Google-approved—because a slow website is basically a digital ghost town.",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
          <Globe className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      id: 5,
      title: "App Development",
      description: "Innovative mobile and web apps tailored to your needs. We build apps that don't crash at the worst moment (we've all been there).",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
          <Activity className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      id: 6,
      title: "Social Media Management",
      description: "Strategy, content, and engagement to grow your presence. We post, engage, and handle trolls—so you don't have to.",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      id: 7,
      title: "SEO & Search Marketing",
      description: "Rank higher, drive traffic, and increase visibility. We speak fluent Google so your brand gets the attention it deserves.",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
          <Target className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      id: 8,
      title: "Advertising & Promotions",
      description: "Campaigns that convert and boost brand awareness. Your ads should make people click, not cringe—we make that happen.",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 flex items-center justify-center">
          <Megaphone className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      id: 9,
      title: "Photo Editing",
      description: "High-quality retouching and enhancements. No over-editing, no fake perfection—just visuals that pop in the right way.",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
          <Image className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      id: 10,
      title: "Video Editing",
      description: "Engaging, professional edits for social media and marketing. Because shaky, low-quality videos are only acceptable in found-footage horror films.",
      icon: (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <Video className="h-5 w-5 text-white" />
        </div>
      )
    }
  ];

  // We'll create three rows with 4-4-3 distribution
  const servicesRow1 = services.slice(0, 4);
  const servicesRow2 = services.slice(4, 8);
  const servicesRow3 = services.slice(8);

  return (
    <div id={id} className={cn(
      "py-24 px-6 md:px-10 bg-gradient-to-b from-black to-blue-950",
      className,
      isTransitioning && "pointer-events-none"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <div className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
              Our Services
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight will-change-transform">
              Creative Solutions We Offer
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={400}>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              We provide a comprehensive range of marketing, design, and digital content services 
              to help your brand stand out in today's competitive market.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Parallax speed={0.05}>
              <div className="relative h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-white/10 shadow-2xl">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-300",
                      activeService === service.id ? "opacity-100" : "opacity-0 pointer-events-none",
                      isTransitioning && "transform-none"
                    )}
                  >
                    <div className="p-8 text-center">
                      <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-xl border border-white/10">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center">
                          {service.icon}
                        </div>
                      </div>
                      <h3 className="text-3xl font-display font-bold text-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-white/70 max-w-md mx-auto text-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Parallax>
          </div>
          
          <div className="space-y-4">
            {/* First row of services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-fr">
              {servicesRow1.map((service) => (
                <FadeIn key={service.id} direction="left" delay={service.id * 50} threshold={0.1}>
                  <div 
                    data-service-id={service.id}
                    className={cn(
                      "p-4 rounded-xl cursor-pointer transition-all duration-200 h-full flex flex-col",
                      activeService === service.id 
                        ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transform scale-105" 
                        : "hover:bg-white/5 border border-transparent hover:border-white/10",
                      "hover:transform hover:scale-102 active:scale-98 animate-on-scroll",
                    )}
                    onClick={() => handleServiceChange(service.id)}
                  >
                    <div className="flex items-start flex-1">
                      <div className="flex-shrink-0 mr-3">
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base lg:text-lg font-display font-semibold text-white mb-1 truncate">
                          {service.title}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-2 overflow-hidden">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            
            {/* Second row of services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-fr">
              {servicesRow2.map((service) => (
                <FadeIn key={service.id} direction="left" delay={(service.id - 4) * 50} threshold={0.1}>
                  <div 
                    data-service-id={service.id}
                    className={cn(
                      "p-4 rounded-xl cursor-pointer transition-all duration-200 h-full flex flex-col",
                      activeService === service.id 
                        ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transform scale-105" 
                        : "hover:bg-white/5 border border-transparent hover:border-white/10",
                      "hover:transform hover:scale-102 active:scale-98 animate-on-scroll",
                    )}
                    onClick={() => handleServiceChange(service.id)}
                  >
                    <div className="flex items-start flex-1">
                      <div className="flex-shrink-0 mr-3">
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base lg:text-lg font-display font-semibold text-white mb-1 truncate">
                          {service.title}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-2 overflow-hidden">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            
            {/* Third row of services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-fr">
              {servicesRow3.map((service) => (
                <FadeIn key={service.id} direction="left" delay={(service.id - 8) * 50} threshold={0.1}>
                  <div 
                    data-service-id={service.id}
                    className={cn(
                      "p-4 rounded-xl cursor-pointer transition-all duration-200 h-full flex flex-col",
                      activeService === service.id 
                        ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transform scale-105" 
                        : "hover:bg-white/5 border border-transparent hover:border-white/10",
                      "hover:transform hover:scale-102 active:scale-98 animate-on-scroll",
                    )}
                    onClick={() => handleServiceChange(service.id)}
                  >
                    <div className="flex items-start flex-1">
                      <div className="flex-shrink-0 mr-3">
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base lg:text-lg font-display font-semibold text-white mb-1 truncate">
                          {service.title}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-2 overflow-hidden">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
