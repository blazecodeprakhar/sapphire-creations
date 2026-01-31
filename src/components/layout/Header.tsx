import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '/') {
      if (location.pathname === '/') {
        // If we're already on the home page, scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        navigate('/');
      }
    } else if (href.startsWith('#')) {
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

  const navItems = [
    {label: "About Us", href: "/about"}, 
    {label: "Team", href: "/team"},
    {label: "Services", href: "#services"}, 
    {label: "Portfolio", href: "#portfolio"}, 
    {label: "Process", href: "#process"}, 
    {label: "FAQs", href: "/faqs"}
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-2 bg-black/80 backdrop-blur-lg shadow-md" 
          : "py-3 sm:py-4 bg-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className={cn("flex items-center", mobileMenuOpen && "md:hidden opacity-0")}>
          <a 
            href="/" 
            onClick={(e) => handleNavigation('/', e)} 
            className="font-display font-bold text-white relative z-30"
          >
            <Logo size="sm" variant={isScrolled ? 'minimal' : 'default'} />
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavigation(item.href, e)}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium px-2 py-1 rounded-full hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <button 
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
            onClick={(e) => handleNavigation('#contact', e)}
          >
            Contact Us
          </button>
        </div>

        <button
          className="md:hidden relative z-50 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? null : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transition-all duration-300 md:hidden",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center justify-center min-h-screen space-y-5 p-6 bg-white">
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center border-b border-gray-100">
            <Logo size="sm" variant="default" className="[&>div>span]:!text-blue-600 [&>div>span:last-child]:!text-blue-600" />
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-16">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigation(item.href, e)}
                className="block py-3 text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium text-center"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="pt-6 flex flex-col space-y-3 w-full max-w-xs">
            <button 
              className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
              onClick={(e) => handleNavigation('#contact', e)}
            >
              Contact Us
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
