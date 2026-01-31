import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Meteors } from '@/components/ui/meteors';

interface TeamMember {
    name: string;
    role: string;
    description: string;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Kshitij",
        role: "Video Editor",
        description: "I edit videos, design graphics, and—most importantly—I'm the founder. How do I know? Because my name is on top. If anyone else claims to be the founder, don't fall for their lies.",
        image: "https://media.giphy.com/media/13GIgrGdslD9oQ/giphy.gif"
    },
    {
        name: "Kamesh",
        role: "Graphic Designer",
        description: "No, I am the founder. Just because someone's name is written first doesn't mean they own the place! Also, I do graphic designing when I'm not busy correcting misinformation.",
        image: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3BuZTl0M3hnM3RwMGx4bHczdmFzeGxjamxidXRrYjFzd3o0Z2x6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5WJ6K7XnP2K2p3VWft/giphy.gif"
    },
    {
        name: "Prakhar",
        role: "Photo Editor & Video Editor",
        description: "The world's best photo editor (in my area). Also, I'm interning under Kshitij and Aman for video editing, but deep down, I know I edit better than them. One day, the world will see the truth.",
        image: "https://media.giphy.com/media/11KzOet1ElBDz2/giphy.gif"
    },
    {
        name: "Aryan",
        role: "Web Developer",
        description: "The best web developer in this team. Don't believe me? Ask Puru - I taught him everything he knows. If he says otherwise, he's just being dramatic.",
        image: "https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif"
    },
    {
        name: "Puru",
        role: "Web Developer",
        description: "Lies! I am the best web developer! Aryan was my student, and now he's trying to claim credit. Don't trust him. Web development is my domain.",
        image: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif"
    },
    {
        name: "Aman",
        role: "Video Editor & E-commerce Developer",
        description: "I do video editing and specialize in e-commerce web development. Ignore the drama—I am the real expert here. They're all just fighting over second place.",
        image: "https://media.giphy.com/media/5wWf7H89PisM6An8UAU/giphy.gif"
    },
    {
        name: "Utkarsh",
        role: "Content Writer",
        description: "I do nothing except endless Instagram and YouTube scrolling. But since I'm the only content writer here, that technically counts as 'research.' Also, I am the founder. My proof? I scroll all day—what more do you need?",
        image: "https://media.giphy.com/media/5wWf7GR2nhgamhRnEuA/giphy.gif"
    }
];

const Team = () => {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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
                        Meet the Masters of Chaos
                    </h1>
                    <p className="text-xl text-gray-300">
                        (a.k.a. Our Team)
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group cursor-pointer"
                            onClick={() => setSelectedMember(member)}
                        >
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-800">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                        <p className="text-primary">{member.role}</p>
                                    </div>
                                </div>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Member Modal */}
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-2xl w-full mx-4 bg-gray-800 rounded-xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative aspect-video">
                                <img
                                    src={selectedMember.image}
                                    alt={selectedMember.name}
                                    className="w-full h-full object-cover"
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                                        <p className="text-primary">{selectedMember.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">{selectedMember.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </main>
            
            <Footer />
        </div>
    );
};

export default Team; 