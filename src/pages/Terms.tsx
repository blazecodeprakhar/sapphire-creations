import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Meteors } from '@/components/ui/meteors';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
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
              Terms and Conditions
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
        
        {/* Terms Content */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="prose prose-invert prose-lg max-w-none">
            <h1 className="text-3xl font-bold mb-8">Terms and Conditions for Sapphire Creations</h1>
            <p className="text-white/70 mb-6"><strong>Last Updated:</strong> 2-04-2025</p>
            
            <p className="text-white/90 mb-6">
              Welcome to Sapphire Creations. These Terms and Conditions ("Terms") govern your use of our services ("Services") provided by Sapphire Creations ("Company", "we", "us", or "our"). By accessing or using our Services, you ("User", "you", or "your") agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Services Provided</h2>
            <p className="text-white/80 mb-6">
              Sapphire Creations offers a range of services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li className="mb-2">Advertising & Promotions</li>
              <li className="mb-2">Video Editing</li>
              <li className="mb-2">Photo Editing</li>
              <li className="mb-2">SEO & Search Marketing</li>
              <li className="mb-2">Content Marketing</li>
              <li className="mb-2">Social Media Management</li>
              <li className="mb-2">App Development</li>
              <li className="mb-2">Website Design & Development</li>
              <li className="mb-2">UI/UX Design</li>
              <li className="mb-2">Graphic Design</li>
              <li className="mb-2">Logo Design</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Rights and Responsibilities</h2>
            <h3 className="text-xl font-medium mt-6 mb-3">2.1 User Rights</h3>
            <p className="text-white/80 mb-6">
              You have the right to access and use our Services in accordance with these Terms. You may not use our Services for any illegal or unauthorized purpose.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">2.2 User Responsibilities</h3>
            <p className="text-white/80 mb-6">
              You agree to provide accurate, current, and complete information when using our Services. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Payment Terms</h2>
            <h3 className="text-xl font-medium mt-6 mb-3">3.1 Fees</h3>
            <p className="text-white/80 mb-6">
              All fees for Services will be outlined in the service agreement or invoice provided to you. Payment is due as specified in the agreement.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">3.2 Refund Policy</h3>
            <p className="text-white/80 mb-6">
              Refunds will be considered on a case-by-case basis and are not guaranteed. Any requests for refunds must be made in writing within 14 days of service delivery.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property Rights</h2>
            <h3 className="text-xl font-medium mt-6 mb-3">4.1 Ownership</h3>
            <p className="text-white/80 mb-6">
              All content, materials, and intellectual property created and delivered by Sapphire Creations remain the property of Sapphire Creations unless otherwise agreed in writing.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">4.2 License</h3>
            <p className="text-white/80 mb-6">
              Upon full payment for Services, you are granted a non-exclusive, non-transferable license to use the deliverables for the intended purpose as outlined in the service agreement.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
            <p className="text-white/80 mb-6">
              To the fullest extent permitted by law, Sapphire Creations shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or related to your use of our Services, even if we have been advised of the possibility of such damages.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Indemnification</h2>
            <p className="text-white/80 mb-6">
              You agree to indemnify, defend, and hold harmless Sapphire Creations, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or related to your use of our Services, your violation of these Terms, or your violation of any rights of another party.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Dispute Resolution</h2>
            <h3 className="text-xl font-medium mt-6 mb-3">7.1 Governing Law</h3>
            <p className="text-white/80 mb-6">
              These Terms shall be governed by and construed in accordance with the laws of India.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">7.2 Arbitration</h3>
            <p className="text-white/80 mb-6">
              Any dispute arising out of or related to these Terms or your use of our Services shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall take place in Pune, India, and the language of arbitration shall be English.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">7.3 Waiver of Class Action</h3>
            <p className="text-white/80 mb-6">
              You agree that any dispute resolution proceedings will be conducted on an individual basis and not in a class, consolidated, or representative action.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
            <p className="text-white/80 mb-6">
              Sapphire Creations reserves the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of our Services after the posting of changes constitutes your acceptance of such changes.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
            <p className="text-white/80 mb-6">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-none mb-6 text-white/80">
              <li className="mb-2"><strong>Email:</strong> info@sapphirecreations.in</li>
              <li className="mb-2"><strong>Address:</strong> Pune, India</li>
            </ul>
            
            <p className="text-white/90 mt-8">
              By using our Services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
