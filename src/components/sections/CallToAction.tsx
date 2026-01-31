import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Parallax } from '@/components/animations/Parallax';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CTASectionProps {
  className?: string;
  id?: string;
  emailTo?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ 
  className, 
  id,
  emailTo = "info@sapphirecreations.in"
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stickyCardRef = useRef<HTMLDivElement>(null);
  const lastSubmissionTime = useRef<number>(0);
  const RATE_LIMIT_MS = 60000; // 1 minute rate limit
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      service: '',
      message: ''
    }
  });
  
  // Fix initial position on load and ensure correct positioning
  useEffect(() => {
    if (stickyCardRef.current) {
      const height = stickyCardRef.current.offsetHeight;
      setTimeout(() => {
        if (stickyCardRef.current) {
          stickyCardRef.current.style.transform = 'translateZ(0)';
        }
      }, 0);
    }
  }, []);

  const handleSubmit = async (data: FormData) => {
    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmissionTime.current < RATE_LIMIT_MS) {
      toast({
        title: "Please wait",
        description: "You can submit another form in a minute.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    lastSubmissionTime.current = now;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'a6568375-c3e6-477b-8d24-914da0b8f99e',
          name: data.name,
          email: data.email,
          message: data.message || 'Newsletter subscription request',
          botcheck: '', // Honeypot field
        })
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      } else {
        console.error("Form submission failed:", result);
        throw new Error(result.message || 'Something went wrong with the form submission');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className={cn("py-24 px-6 md:px-10 bg-black relative overflow-hidden", className)}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-500/10 to-indigo-500/5 blur-2xl rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-indigo-500/10 to-blue-500/5 blur-2xl rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div ref={stickyCardRef} className="h-full lg:sticky lg:top-24 will-change-transform">
            <div className="rounded-xl overflow-hidden relative shadow-2xl h-full flex">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-indigo-600/40 backdrop-blur-sm z-0"></div>
              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                <div className="w-24 h-24 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center mb-8 mx-auto">
                  <div className="w-12 h-12 rounded-full bg-blue-500/40 backdrop-blur-md"></div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 text-center">
                  Missed Our Special Offer? Don't Worry, We've Got More!
                </h3>
                
                <p className="text-white/80 text-center mb-8">
                  We may not be handing out freebies anymore, but we're still serving top-notch creativity freshly crafted, just like your nearest vegetable shop!
                </p>
                
                <Button 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg transition-all transform hover:scale-[1.02] mt-auto mx-auto"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <FadeIn direction="up">
              <div className="text-sm font-medium text-blue-400 mb-3 tracking-wider">CONTACT US</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
                Ready to Elevate Your Brand?
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Let's work together to shape a brand identity that stands out and connects with your audience. 
                Get in touch today for a free consultation!
              </p>
            </FadeIn>
            
            <FadeIn delay={300}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white/80 text-sm">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" 
                      placeholder="John Doe"
                      {...form.register('name')}
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-sm">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white/80 text-sm">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" 
                      placeholder="john@example.com"
                      {...form.register('email')}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="service" className="text-white/80 text-sm">Service Interested In</label>
                  <select 
                    id="service" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none" 
                    {...form.register('service')}
                  >
                    <option value="" disabled className="bg-gray-900">Select a service</option>
                    <option value="branding" className="bg-gray-900">Brand Design</option>
                    <option value="social" className="bg-gray-900">Social Media Content</option>
                    <option value="video" className="bg-gray-900">Video Production</option>
                    <option value="print" className="bg-gray-900">Print Design</option>
                    <option value="digital" className="bg-gray-900">Digital Design</option>
                  </select>
                  {form.formState.errors.service && (
                    <p className="text-red-400 text-sm">{form.formState.errors.service.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-white/80 text-sm">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="Tell us about your project..."
                    {...form.register('message')}
                  ></textarea>
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-sm">{form.formState.errors.message.message}</p>
                  )}
                </div>

                {/* Honeypot field */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Get Started"}
                  </button>
                </div>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
