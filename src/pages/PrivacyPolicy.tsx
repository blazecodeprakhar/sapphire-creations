import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Meteors } from '@/components/ui/meteors';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative py-16 px-6 md:px-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-black z-0"></div>
          <Meteors number={20} className="opacity-30" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 mt-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </div>
        </div>
        
        {/* Back to Home Button */}
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <Link to="/">
            <Button variant="secondary" className="mb-8 bg-blue-600 hover:bg-blue-700 text-white border-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        
        {/* Privacy Policy Content */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="prose prose-invert prose-lg max-w-none">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy of Sapphire Creations</h1>
            <p className="text-white/70 mb-6"><strong>Effective Date:</strong> 2-04-2025</p>
            
            <p className="text-white/90 mb-6">
              Sapphire Creations ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or communicate with us. Please read this Privacy Policy carefully. By using our services, you consent to the data practices described in this policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-white/80 mb-6">
              We collect personal information that you voluntarily provide to us when you contact us for support or other inquiries. The types of personal information we may collect include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li className="mb-2"><strong>Email Address:</strong> This is the primary information we collect to communicate with you.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Purpose of Data Collection</h2>
            <p className="text-white/80 mb-6">
              We collect your personal information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li className="mb-2"><strong>Contact or Support:</strong> To respond to your inquiries, provide customer support, and send you updates related to your requests.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Legal Basis for Processing Personal Data (GDPR)</h2>
            <p className="text-white/80 mb-6">
              If you are located in the European Economic Area (EEA), our legal basis for collecting and using your personal information is based on the following:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li className="mb-2"><strong>Consent:</strong> You have given us explicit consent to process your personal information for the purpose of contacting you or providing support.</li>
              <li className="mb-2"><strong>Legitimate Interests:</strong> We may process your personal information if it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. California Privacy Rights (CCPA)</h2>
            <p className="text-white/80 mb-6">
              If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li className="mb-2"><strong>Right to Know:</strong> You have the right to request that we disclose to you the categories and specific pieces of personal information we have collected about you.</li>
              <li className="mb-2"><strong>Right to Delete:</strong> You have the right to request that we delete any personal information we have collected from you, subject to certain exceptions.</li>
              <li className="mb-2"><strong>Right to Opt-Out:</strong> You have the right to opt-out of the sale of your personal information. However, we do not sell your personal information to third parties.</li>
            </ul>
            <p className="text-white/80 mb-6">
              To exercise any of these rights, please contact us using the contact information provided below.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. How We Use Your Information</h2>
            <p className="text-white/80 mb-6">
              We use the information we collect in the following ways:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li className="mb-2">To communicate with you regarding your inquiries or support requests.</li>
              <li className="mb-2">To improve our services and enhance user experience.</li>
              <li className="mb-2">To comply with legal obligations.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2>
            <p className="text-white/80 mb-6">
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Security</h2>
            <p className="text-white/80 mb-6">
              We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, alteration, or disclosure. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Sharing of Your Information</h2>
            <p className="text-white/80 mb-6">
              We do not sell or rent your personal information to third parties. We may share your information with third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also disclose your information when we believe such action is necessary to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Your Rights</h2>
            <p className="text-white/80 mb-6">
              Depending on your location and applicable laws, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li className="mb-2"><strong>Right to Access:</strong> You have the right to request copies of your personal information.</li>
              <li className="mb-2"><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or incomplete.</li>
              <li className="mb-2"><strong>Right to Erasure:</strong> You have the right to request that we erase your personal information, under certain conditions.</li>
              <li className="mb-2"><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal information, under certain conditions.</li>
              <li className="mb-2"><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p className="text-white/80 mb-6">
              To exercise your rights, please contact us at the email address provided in the "Contact Us" section.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. International Transfers</h2>
            <p className="text-white/80 mb-6">
              If you are located outside the European Economic Area and choose to provide us with personal information, please note that we may transfer your data to the EEA and process it there. Your information may also be transferred to other countries that may not have the same data protection laws as your country. By submitting your personal information, you consent to such transfers.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-white/80 mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Us</h2>
            <p className="text-white/80 mb-6">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none mb-6 text-white/80">
              <li className="mb-2"><strong>Email:</strong> info@sapphirecreations.in</li>
              <li className="mb-2"><strong>Address:</strong> Pune, India</li>
            </ul>
            
            <p className="text-white/90 mt-8">
              By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms. Thank you for choosing Sapphire Creations. Your privacy is important to us, and we are committed to protecting your personal information.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
