import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductIntro } from '@/components/sections/ProductIntro';
import { FeatureShowcase } from '@/components/sections/FeatureShowcase';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { CTASection } from '@/components/sections/CallToAction';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ProcessSection } from '@/components/sections/ProcessSection';

const Index = () => {
  const location = useLocation();
  const [isContentReady, setIsContentReady] = useState(false);

  // Handle initial content loading
  useEffect(() => {
    // Set a small delay to ensure content is rendered
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      setIsContentReady(false);
    };
  }, []);

  // Handle navigation and scrolling
  useEffect(() => {
    if (!isContentReady) return;

    if (location.state) {
      const { scrollTo, serviceId } = location.state;
      
      if (scrollTo) {
        // Add a small delay to ensure content is stable
        const timer = setTimeout(() => {
          const element = document.querySelector(scrollTo);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            // If there's a serviceId, dispatch the event after scrolling
            if (serviceId) {
              setTimeout(() => {
                const event = new CustomEvent('activateService', { 
                  detail: { serviceId } 
                });
                document.dispatchEvent(event);
              }, 800);
            }
          }
        }, 100);

        return () => clearTimeout(timer);
      }
      
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location, isContentReady]);

  // Handle smooth scroll for anchor links
  useEffect(() => {
    if (!isContentReady) return;

    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId as string);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, [isContentReady]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      
      <main className="min-h-[calc(100vh-64px)] pb-0">
        <HeroSection />
        <ProductIntro id="about" />
        <FeatureShowcase id="services" />
        <PortfolioSection id="portfolio" />
        <ProcessSection id="process" />
        <BenefitsSection id="benefits" />
        <CTASection id="contact" />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
