import React from 'react';
import { ProjectItem } from '../api/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface GalleryModalProps {
    project: ProjectItem;
    onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ project, onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative max-w-4xl w-full mx-4 bg-white rounded-lg overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    
                    <div className="relative aspect-video">
                        <img
                            src={project.url}
                            alt={project.title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                        <p className="text-gray-600">{project.desc}</p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}; 