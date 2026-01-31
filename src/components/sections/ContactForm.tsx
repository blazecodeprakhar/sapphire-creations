import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';

const formSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' })
    .regex(/^[a-zA-Z0-9\s\-']+$/, { message: 'Name can only contain letters, numbers, spaces, hyphens, and apostrophes' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address' })
    .max(254, { message: 'Email must be less than 254 characters' }),
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be less than 1000 characters' })
    .regex(/^[^<>]*$/, { message: 'Message cannot contain HTML tags' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  emailTo?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  open, 
  onOpenChange,
  emailTo = "info@sapphirecreations.in",
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>('');
  const lastSubmissionTime = useRef<number>(0);
  const RATE_LIMIT_MS = 60000; // 1 minute rate limit
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // Generate CSRF token on component mount
  useEffect(() => {
    const generateCsrfToken = () => {
      const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      setCsrfToken(token);
    };
    generateCsrfToken();
  }, []);

  const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input.trim());
  };

  const onSubmit = async (data: FormValues) => {
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

    // Input sanitization
    const sanitizedData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      message: sanitizeInput(data.message),
    };

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
          name: sanitizedData.name,
          email: sanitizedData.email,
          message: sanitizedData.message,
          botcheck: '', // Honeypot field
        })
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        
        // Reset form and close dialog
        form.reset();
        onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Contact Us</DialogTitle>
          <DialogDescription className="text-white/70">
            Send us your question and we'll get back to you soon.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Honeypot field */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
            
            {/* CSRF Token */}
            <input type="hidden" name="csrf_token" value={csrfToken} />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Your Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      className="bg-white/5 border-white/10 text-white"
                      autoComplete="name"
                      maxLength={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="john@example.com" 
                      type="email" 
                      {...field} 
                      className="bg-white/5 border-white/10 text-white"
                      autoComplete="email"
                      maxLength={254}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Your Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your project or question..." 
                      {...field} 
                      className="bg-white/5 border-white/10 text-white min-h-[120px]"
                      maxLength={1000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
