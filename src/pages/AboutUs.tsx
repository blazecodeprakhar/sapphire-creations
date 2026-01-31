import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Meteors } from '@/components/ui/meteors';

const AboutUs = () => {
    const navigate = useNavigate();

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500); // Increased delay to ensure page load
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <Header />
            
            <main className="container mx-auto px-4 py-16 relative">
                <Meteors number={20} />
                
                {/* Back Button */}
                <div className="mb-8">
                    <Link to="/">
                        <Button className="bg-primary/20 text-white hover:bg-primary/30 border border-primary/30">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                        About Us
                    </h1>
                    <p className="text-xl text-gray-300">
                        Who We Are
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-lg text-gray-300 leading-relaxed">
                        We're not just another creative agency—we're the secret ingredient behind designs that make people stop scrolling, websites that don't confuse visitors, and marketing strategies that actually work (yes, really).
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed mt-4">
                        Our job? To make your brand look good, sound great, and perform even better. From stunning graphics to websites that don't crash under pressure, we handle it all while keeping things fresh, fun, and frustration-free.
                    </p>
                </motion.section>

                {/* Why Work With Us Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold mb-6">Why Work With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-semibold mb-4">🎯 Creativity that packs a punch</h3>
                            <p className="text-gray-300">
                                Without the unnecessary fluff.
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-semibold mb-4">✨ Unique Touch</h3>
                            <p className="text-gray-300">
                                We don't do boring things. Every project gets a unique touch.
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-semibold mb-4">⚡ Deadlines aren't suggestions</h3>
                            <p className="text-gray-300">
                                We actually meet them.
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-semibold mb-4">🎮 Strategy with Fun</h3>
                            <p className="text-gray-300">
                                We mix strategy with fun, so marketing doesn't feel like a chore.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Team Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Oh, and did we mention? We're a bunch of engineers. Most of us proudly passed with zero backlogs - except for the exceptionally talented ones who embraced a single backlog in their early years (because genius takes time, right?). We even have a few warriors still battling their way through college. But hey, as they say - engineers are good at everything… except engineering.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed mt-4">
                        At the end of the day, we're here to help you stand out, grow, and maybe even make your competitors a little jealous. Let's create something awesome together!
                    </p>
                </motion.section>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Let's create something amazing together. Contact us today to discuss your vision.
                    </p>
                    <Button 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        onClick={handleContactClick}
                    >
                        Contact Us
                    </Button>
                </motion.div>
            </main>
            
            <Footer />
        </div>
    );
};

export default AboutUs; 