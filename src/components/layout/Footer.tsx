import React from 'react';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/animations/FadeIn';
import { Logo } from '@/components/ui/logo';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  
  const footerLinks = [
    {
      title: "Our Services",
      links: [
        { name: "Logo Design", serviceId: 1 },
        { name: "UI/UX Design", serviceId: 3 },
        { name: "Website Design", serviceId: 4 },
        { name: "Social Media Management", serviceId: 6 },
        { name: "SEO & Search Marketing", serviceId: 7 }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Work", href: "#portfolio" },
        { name: "Process", href: "#process" },
        { name: "Team", href: "/team" },
        { name: "FAQs", href: "/faqs" }
      ]
    },
    {
      title: "Contact",
      links: [
        { name: "Get a Quote", href: "#contact" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms", href: "/terms" }
      ]
    }
  ];

  const handleNavigation = (href: string, e: React.MouseEvent, serviceId?: number) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/', { 
          state: { 
            scrollTo: href,
            serviceId 
          } 
        });
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
          
          if (serviceId) {
            setTimeout(() => {
              const event = new CustomEvent('activateService', { 
                detail: { serviceId } 
              });
              document.dispatchEvent(event);
            }, 800);
          }
        }
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className={cn("bg-black text-white pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 relative overflow-hidden", className)}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <FadeIn className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div>
              <a 
                href="/" 
                onClick={(e) => handleNavigation('/', e)}
                className="inline-block mb-4"
              >
                <Logo size="md" />
              </a>
              <p className="text-white/70 mb-6 max-w-md text-sm leading-relaxed">
                Sapphire Creations is a full-service marketing and design agency specializing in brand identity,
                digital marketing, and creative content development to help brands stand out in today's
                competitive market.
              </p>
              <div className="flex space-x-3">
                {[
                  { 
                    icon: <Instagram className="h-4 w-4" />, 
                    name: "instagram",
                    href: "https://www.instagram.com/sapphire.creations67/"
                  },
                  { 
                    icon: <Facebook className="h-4 w-4" />, 
                    name: "facebook",
                    href: "https://www.facebook.com/profile.php?id=61569865382923"
                  },
                  { 
                    icon: <Linkedin className="h-4 w-4" />, 
                    name: "linkedin",
                    href: "https://www.linkedin.com/company/sapphirecreations"
                  }
                ].map((social) => (
                  <a 
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors hover:scale-110 transform duration-200"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
          
          {footerLinks.map((column, index) => (
            <FadeIn key={column.title} delay={index * 100}>
              <div>
                <h3 className="text-white font-medium mb-3 text-sm tracking-wide">{column.title}</h3>
                <ul className="space-y-2.5">
                  {index === 0 ? (
                    (column.links as Array<{ name: string; serviceId: number }>).map((link) => (
                      <li key={link.name}>
                        <a 
                          href="#services" 
                          className="text-white/70 hover:text-white transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                          onClick={(e) => handleNavigation('#services', e, link.serviceId)}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))
                  ) : (
                    (column.links as Array<{ name: string; href: string }>).map((link) => (
                      <li key={link.name}>
                        <a 
                          href={link.href}
                          className="text-white/70 hover:text-white transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                          onClick={(e) => handleNavigation(link.href, e)}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
        
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-white/50 text-xs">
              © {currentYear} Sapphire Creations. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a 
                href="https://www.linkedin.com/company/sapphirecreations" 
                className="text-white/50 hover:text-white text-xs transition-colors hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
