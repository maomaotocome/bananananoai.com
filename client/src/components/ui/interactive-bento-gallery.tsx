"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

// MediaItemType defines the structure of a media item
export interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
    prompt?: string; // Added for Nano Banana prompts
}

// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for video element
    const [isInView, setIsInView] = useState(false); // To track if video is in the viewport
    const [isBuffering, setIsBuffering] = useState(true);  // To track if video is buffering

    // Intersection Observer to detect if video is in view and play/pause accordingly
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting); // Set isInView to true if the video is in view
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current); // Start observing the video element
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current); // Clean up observer when component unmounts
            }
        };
    }, []);

    // Handle video play/pause based on whether the video is in view or not
    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return; // Don't play if video is not in view or component is unmounted

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play(); // Play the video if it's ready
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve; // Wait until the video can start playing
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
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
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    // Render either a video or image based on item.type
    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url} // Image source URL
            alt={`${item.title} - ${item.desc} created with Banana Nano Ai`} // SEO optimized alt text
            className={`${className} w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300`} // Enhanced styling
            onClick={onClick} // Trigger onClick when the image is clicked
            loading="lazy" // Lazy load the image for performance
            decoding="async" // Decode the image asynchronously
            onError={(e) => {
                console.log(`Failed to load image: ${item.url}`);
                // Fallback for failed images
                e.currentTarget.src = `https://images.unsplash.com/photo-1566275529824-cca6d008f3da?w=400&h=400&fit=crop&crop=center`;
            }}
        />
    );
};

// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[]; // List of media items to display in the modal
    onUsePrompt?: (prompt: string) => void; // Added for using prompts
}

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems, onUsePrompt }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });  // Track the position of the dockable panel
    const { toast } = useToast();

    if (!isOpen) return null; // Return null if the modal is not open

    const handleUsePrompt = () => {
        if (selectedItem.prompt && onUsePrompt) {
            onUsePrompt(selectedItem.prompt);
            toast({
                title: "Prompt copied! 🍌",
                description: "Scroll up to the editor to use this prompt",
            });
        }
    };

    const copyPrompt = () => {
        if (selectedItem.prompt) {
            navigator.clipboard.writeText(selectedItem.prompt);
            toast({
                title: "Copied to clipboard!",
                description: "Prompt copied successfully",
            });
        }
    };

    return (
        <>
            {/* Modal Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={onClose} // Click backdrop to close
            />
            
            {/* Main Modal */}
            <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                className="fixed inset-4 sm:inset-8 md:inset-16 bg-white dark:bg-gray-900 
                          rounded-lg md:rounded-xl overflow-hidden z-50 shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal content
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white 
                             rounded-full p-2 transition-colors duration-200"
                    data-testid="close-modal-button"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Main Content */}
                <div className="h-full flex flex-col">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-3xl 
                                         h-auto max-h-[70vh] rounded-lg overflow-hidden shadow-md"
                                initial={{ y: 20, scale: 0.97 }}
                                animate={{
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        mass: 0.5
                                    }
                                }}
                                exit={{
                                    y: 20,
                                    scale: 0.97,
                                    transition: { duration: 0.15 }
                                }}
                            >
                                <MediaItem item={selectedItem} className="w-full h-full object-contain bg-gray-900/20" />
                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 
                                              bg-gradient-to-t from-black/70 to-transparent">
                                    <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-2">
                                        {selectedItem.title}
                                    </h3>
                                    <p className="text-white/80 text-xs sm:text-sm mb-3">
                                        {selectedItem.desc}
                                    </p>
                                    {selectedItem.prompt && (
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                size="sm"
                                                onClick={handleUsePrompt}
                                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600"
                                                data-testid="use-prompt-button"
                                            >
                                                🍌 Use This Prompt
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={copyPrompt}
                                                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                                                data-testid="copy-prompt-button"
                                            >
                                                <Copy className="w-3 h-3 mr-1" />
                                                Copy
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Close Button */}
                <motion.button
                    className="absolute top-2 sm:top-2.5 md:top-3 right-2 sm:right-2.5 md:right-3 
                              p-2 rounded-full bg-gray-200/80 text-gray-700 hover:bg-gray-300/80 
                              dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700/80
                              text-xs sm:text-sm backdrop-blur-sm"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    data-testid="close-modal-button"
                >
                    <X className='w-3 h-3' />
                </motion.button>
            </motion.div>

            {/* Draggable Dock */}
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={false}
                animate={{ x: dockPosition.x, y: dockPosition.y }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="fixed z-50 left-1/2 bottom-4 -translate-x-1/2 touch-none"
            >
                <motion.div
                    className="relative rounded-xl bg-yellow-400/20 backdrop-blur-xl 
                             border border-yellow-400/30 shadow-lg
                             cursor-grab active:cursor-grabbing"
                >
                    <div className="flex items-center -space-x-2 px-3 py-2">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                }}
                                style={{
                                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                }}
                                className={`
                                    relative group
                                    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0 
                                    rounded-lg overflow-hidden 
                                    cursor-pointer hover:z-20
                                    ${selectedItem.id === item.id
                                        ? 'ring-2 ring-yellow-400/70 shadow-lg'
                                        : 'hover:ring-2 hover:ring-yellow-400/30'}
                                `}
                                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.2 : 1,
                                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -15 : 15,
                                    y: selectedItem.id === item.id ? -8 : 0,
                                }}
                                whileHover={{
                                    scale: 1.3,
                                    rotate: 0,
                                    y: -10,
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                }}
                                data-testid={`dock-item-${item.id}`}
                            >
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
                                {selectedItem.id === item.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -inset-2 bg-yellow-400/20 blur-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
    onUsePrompt?: (prompt: string) => void;
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ 
    mediaItems, 
    title, 
    description, 
    onUsePrompt 
}) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl" data-testid="interactive-bento-gallery">
            <div className="mb-8 text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="text-lg text-muted-foreground max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>
            
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                        onUsePrompt={onUsePrompt}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[120px]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`media-${item.id}`}
                                className={`relative overflow-hidden rounded-xl cursor-move ${item.span} 
                                           hover:shadow-lg transition-shadow duration-200
                                           border border-border/50 hover:border-primary/30 transform-gpu`}
                                onClick={() => !isDragging && setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                            delay: index * 0.05
                                        }
                                    }
                                }}
                                style={{ transform: 'translateZ(0)' }}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={1}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={(e, info) => {
                                    setIsDragging(false);
                                    const moveDistance = info.offset.x + info.offset.y;
                                    if (Math.abs(moveDistance) > 50) {
                                        const newItems = [...items];
                                        const draggedItem = newItems[index];
                                        const targetIndex = moveDistance > 0 ?
                                            Math.min(index + 1, items.length - 1) :
                                            Math.max(index - 1, 0);
                                        newItems.splice(index, 1);
                                        newItems.splice(targetIndex, 0, draggedItem);
                                        setItems(newItems);
                                    }
                                }}
                                data-testid={`gallery-item-${item.id}`}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full"
                                    onClick={() => !isDragging && setSelectedItem(item)}
                                />
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
                                        {item.desc}
                                    </p>
                                    {item.prompt && (
                                        <div className="relative mt-2">
                                            <div className="text-yellow-300 text-[8px] sm:text-[10px] md:text-xs 
                                                          bg-yellow-400/20 px-2 py-1 rounded-full inline-block">
                                                🍌 Click to use prompt
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;