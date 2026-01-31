import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FadeIn } from '@/components/animations/FadeIn';
import { ContactForm } from './ContactForm';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  className?: string;
  id?: string;
  heading?: string;
  description?: string;
  items?: FaqItem[];
  supportHeading?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
  emailTo?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  className,
  id,
  heading = "Frequently Asked Questions",
  description = "Find answers to common questions about our services. Can't find what you're looking for? Contact our support team.",
  items = [],
  supportHeading = "Got a question? Just ask!",
  supportDescription = "Our team is ready to help bring your vision to life.",
  supportButtonText = "Contact Our Team",
  supportButtonUrl = "#contact",
  emailTo = "info@sapphirecreations.in", // Default email to send questions to
}) => {
  const [contactFormOpen, setContactFormOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContactFormOpen(true);
  };

  return (
    <section id={id} className={`py-24 bg-black text-white ${className}`}>
      <div className="container space-y-16 max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
            <h2 className="mb-3 text-3xl font-display font-semibold md:mb-4 lg:mb-6 lg:text-5xl">
              {heading}
            </h2>
            <p className="text-white/70 lg:text-lg">{description}</p>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full lg:max-w-3xl"
          >
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-white/20">
                <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60 text-white py-5">
                  <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="sm:mb-1 lg:mb-2">
                  <div className="text-white/70 lg:text-lg">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-white/5 p-8 text-center md:rounded-xl">
            <div className="relative mb-6">
              <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
                <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="mb-4 size-16 border md:mb-5">
                <AvatarImage src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="mb-2 max-w-3xl font-semibold lg:text-xl">
              {supportHeading}
            </h3>
            <p className="mb-8 max-w-3xl text-white/70 lg:text-lg">
              {supportDescription}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-0" 
                onClick={handleContactClick}
              >
                {supportButtonText}
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
      
      <ContactForm 
        open={contactFormOpen} 
        onOpenChange={setContactFormOpen} 
        emailTo={emailTo}
      />
    </section>
  );
};
