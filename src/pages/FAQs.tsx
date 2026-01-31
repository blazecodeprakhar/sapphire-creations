
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FAQSection } from '@/components/sections/FAQSection';
import { Meteors } from '@/components/ui/meteors';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const faqItems = [
  {
    id: "faq-1",
    question: "What services do you offer?",
    answer: "We design, develop, and market—basically, everything you need to grow online (except making coffee, but we're working on it! ☕)."
  },
  {
    id: "faq-2",
    question: "How much do your services cost?",
    answer: "Our pricing depends on the project. Let's chat, and we'll tailor something that fits your budget."
  },
  {
    id: "faq-3",
    question: "How long does it take to complete a project?",
    answer: "Depends on the complexity. A simple design? Fast. A full website? A bit longer. A time machine? Give us some years!"
  },
  {
    id: "faq-4",
    question: "Can you handle my social media too?",
    answer: "Yes! We create content, schedule posts, and ensure your brand stays active while you focus on running your business."
  },
  {
    id: "faq-5",
    question: "Will my website be mobile-friendly?",
    answer: "Absolutely! We make sure your website looks great on all devices—desktop, tablet, and even all your old phone!"
  },
  {
    id: "faq-6",
    question: "Do you offer ongoing support after project completion?",
    answer: "Yes! We don't ghost our clients. We're here for updates and fixes."
  },
  {
    id: "faq-7",
    question: "Can you help with social media marketing too?",
    answer: "Absolutely! We create content, manage your accounts, and grow your brand online while you focus on running your business."
  },
  {
    id: "faq-8",
    question: "Can you redesign my existing website?",
    answer: "Of course! If your website looks like it's from the 90s, we'll give it a fresh, modern makeover."
  },
  {
    id: "faq-9",
    question: "Can you help with branding from scratch?",
    answer: "Yes! From designing your logo to building your online presence, we create everything your brand needs to stand out."
  },
  {
    id: "faq-10",
    question: "How do we get started?",
    answer: "Just drop us a message! We'll discuss your needs, plan the magic, and get started."
  }
];

const FAQs = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative py-24 px-6 md:px-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-black z-0"></div>
          <Meteors number={20} className="opacity-50" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 mt-12">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Get answers to common questions about our services and solutions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>
        </div>
        
        {/* Back to Home Button */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <Link to="/">
            <Button variant="secondary" className="mb-8 bg-blue-600 hover:bg-blue-700 text-white border-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        
        {/* FAQ Section */}
        <FAQSection 
          items={faqItems}
          supportHeading="Got a question? Just ask!"
          supportDescription="Our team is ready to help bring your vision to life."
          supportButtonText="Contact Our Team"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQs;
