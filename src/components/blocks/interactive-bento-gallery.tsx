"use client"
import React, { useEffect, useRef, useState, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

// Utility function for debouncing
const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// MediaItemType defines the structure of a media item
interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
}

// Memoized MediaItem component
const MediaItem = memo(({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const preventSaveMedia = useCallback((e: React.MouseEvent | MouseEvent | KeyboardEvent) => {
        e.preventDefault();
        return false;
    }, []);

    const preventDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        return false;
    }, []);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
                preventSaveMedia(e);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [preventSaveMedia]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting);
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        let playAttempt: NodeJS.Timeout;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve;
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        playAttempt = setTimeout(async () => {
                            try {
                                await videoRef.current?.play();
                            } catch (error) {
                                console.warn("Video playback failed:", error);
                            }
                        }, 300);
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            clearTimeout(playAttempt);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden bg-zinc-900`}>
                <video
                    ref={videoRef}
                    className={`w-full h-full ${className?.includes('absolute') ? 'object-cover' : 'object-contain'}`}
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="auto"
                    controlsList="nodownload"
                    onLoadedData={handleLoad}
                    onContextMenu={preventSaveMedia}
                    onDragStart={preventDrag}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {(!isLoaded || isBuffering) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`${className} relative overflow-hidden bg-zinc-900`}>
            <img
                src={item.url}
                alt={item.title}
                className={`w-full h-full ${className?.includes('absolute') ? 'object-cover' : 'object-contain'}`}
                onClick={onClick}
                loading="lazy"
                decoding="async"
                onLoad={handleLoad}
                onContextMenu={preventSaveMedia}
                onDragStart={preventDrag}
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
});

MediaItem.displayName = 'MediaItem';

interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[];
}

export const GalleryModal = memo(({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [mounted, setMounted] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const preventSaveMedia = useCallback((e: React.MouseEvent | MouseEvent | KeyboardEvent) => {
        e.preventDefault();
        return false;
    }, []);

    useEffect(() => {
        if (selectedItem && selectedItem.type === 'image' && imageRef.current) {
            const img = new Image();
            img.src = selectedItem.url;
            img.onload = () => {
                setImageDimensions({
                    width: img.width,
                    height: img.height
                });
            };
        }
    }, [selectedItem]);

    useEffect(() => {
        if (isOpen) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
                    preventSaveMedia(e);
                }
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose, preventSaveMedia]);

    const modalContent = (
        <>
            <div 
                className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                onClick={onClose}
                style={{ zIndex: 999998 }}
            />
            
            <div
                style={{ 
                    zIndex: 999999,
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    height: '90vh',
                    maxWidth: '1200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{
                        type: "tween",
                        duration: 0.2
                    }}
                    className="w-full h-full bg-black/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex flex-col"
                    onContextMenu={preventSaveMedia}
                >
                    <motion.button
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 z-10"
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-4 h-4" />
                    </motion.button>

                    <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center p-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full h-full flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <div className="w-full h-full max-w-[90%] max-h-[80vh]">
                                        <MediaItem 
                                            item={selectedItem} 
                                            className="w-full h-full rounded-lg" 
                                        />
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                                            {selectedItem.title}
                                        </h3>
                                        <p className="text-white/90 text-lg leading-relaxed drop-shadow-lg max-w-3xl">
                                            {selectedItem.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </>
    );

    if (!isOpen || !mounted) return null;

    return createPortal(modalContent, document.body);
});

GalleryModal.displayName = 'GalleryModal';

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
}

export default function InteractiveBentoGallery({
    mediaItems,
    title,
    description
}: InteractiveBentoGalleryProps) {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative w-full">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-end sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                        <p className="text-gray-500">{description}</p>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="grid auto-rows-[200px] grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
                        {mediaItems.map((item) => (
                            <div
                                key={item.id}
                                className={`group relative overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300 hover:scale-[1.02] ${
                                    item.type === 'video' 
                                        ? 'col-span-2 row-span-2' 
                                        : item.span === 'wide' 
                                            ? 'col-span-2'
                                            : item.span === 'tall' 
                                                ? 'row-span-2'
                                                : ''
                                }`}
                                onClick={() => {
                                    setSelectedItem(item);
                                    setIsModalOpen(true);
                                }}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 h-full w-full [&_img]:object-cover [&_video]:object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 transition-opacity group-hover:opacity-90" />
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <div className="space-y-2 translate-y-4 transform transition-transform group-hover:translate-y-0">
                                        <h3 className="text-xl font-semibold text-white drop-shadow-lg">{item.title}</h3>
                                        <p className="mt-2 text-sm text-gray-100 opacity-0 transform transition-all duration-300 group-hover:opacity-100 line-clamp-2 max-w-[90%]">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedItem && (
                <GalleryModal
                    selectedItem={selectedItem}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedItem(null);
                    }}
                    setSelectedItem={setSelectedItem}
                    mediaItems={mediaItems}
                />
            )}
        </div>
    );
} 