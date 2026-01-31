import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import { ProjectItem } from '../api/projects';
import { GalleryModal } from '../components/GalleryModal';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type FilterCategory = 'concerts' | 'education' | 'bars' | 'restaurants' | 'spas-and-salons' | 'travel-agencies' | 'real-estate';

const filters: { id: FilterCategory; label: string }[] = [
    { id: 'concerts', label: 'Concerts' },
    { id: 'education', label: 'Education' },
    { id: 'bars', label: 'Bars' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'spas-and-salons', label: 'Spas & Salons' },
    { id: 'travel-agencies', label: 'Travel Agencies' },
    { id: 'real-estate', label: 'Real Estate' }
];

const ITEMS_PER_PAGE = 5; // Show 5 items initially

export default function AllProjects() {
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('concerts');
    const [showAll, setShowAll] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [loading, setLoading] = useState(true);

    // Image loading state
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [errorImages, setErrorImages] = useState<Set<number>>(new Set());

    const handleImageLoad = useCallback((id: number) => {
        setLoadedImages(prev => new Set(prev).add(id));
    }, []);

    const handleImageError = useCallback((id: number) => {
        setErrorImages(prev => new Set(prev).add(id));
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.projects.list();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Reset showAll when changing categories
    useEffect(() => {
        setShowAll(false);
    }, [activeFilter]);

    const filteredProjects = projects.filter(project => 
        project.category === activeFilter
    );

    const displayedProjects = showAll 
        ? filteredProjects 
        : filteredProjects.slice(0, ITEMS_PER_PAGE);

    const hasMoreItems = filteredProjects.length > ITEMS_PER_PAGE;
    const remainingItems = filteredProjects.length - ITEMS_PER_PAGE;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <Header />
            
            <main className="container mx-auto px-4 py-16">
                {/* Back Button */}
                <div className="mb-8">
                    <Link to="/">
                        <Button variant="ghost" className="text-white hover:text-primary">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                activeFilter === filter.id
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {displayedProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative group cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-800">
                                        {!loadedImages.has(project.id) && !errorImages.has(project.id) && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                                <div className="animate-pulse">
                                                    <ImageIcon className="h-8 w-8 text-gray-600" />
                                                </div>
                                            </div>
                                        )}
                                        {errorImages.has(project.id) ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                                <div className="text-center p-4">
                                                    <ImageIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
                                                    <p className="text-sm text-red-500">Failed to load image</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={project.url}
                                                alt={project.title}
                                                loading="lazy"
                                                width={400}
                                                height={400}
                                                className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                                                    loadedImages.has(project.id) ? 'opacity-100' : 'opacity-0'
                                                }`}
                                                onLoad={() => handleImageLoad(project.id)}
                                                onError={() => handleImageError(project.id)}
                                                onContextMenu={(e) => e.preventDefault()}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                                                <p className="text-sm text-gray-300">{project.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Show More Button */}
                        {hasMoreItems && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                                >
                                    {showAll ? 'Show Less' : `Show More (${remainingItems})`}
                                </button>
                            </div>
                        )}

                        {/* Gallery Modal */}
                        {selectedProject && (
                            <GalleryModal
                                project={selectedProject}
                                onClose={() => setSelectedProject(null)}
                            />
                        )}
                    </>
                )}
            </main>
            
            <Footer />
        </div>
    );
}