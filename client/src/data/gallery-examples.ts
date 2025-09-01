import { MediaItemType } from '@/components/ui/interactive-bento-gallery';

export const nanoBananaExamples: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "Portrait Style Transfer",
    desc: "Transform portraits with artistic styles while maintaining facial features",
    url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    prompt: "Transform this portrait into a Renaissance painting style while keeping the person's facial features exactly the same"
  },
  {
    id: 2,
    type: "image", 
    title: "Background Replacement",
    desc: "Change backgrounds while keeping the subject perfectly intact",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    prompt: "Replace the background with a beautiful sunset beach while keeping the person exactly as they are"
  },
  {
    id: 3,
    type: "image",
    title: "Outfit Transformation",
    desc: "Change clothing and accessories while preserving character identity",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    prompt: "Change the outfit to an elegant red evening dress while keeping the person and pose identical"
  },
  {
    id: 4,
    type: "image", 
    title: "Seasonal Atmosphere",
    desc: "Add seasonal effects and weather while maintaining photo realism",
    url: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&h=400&fit=crop",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    prompt: "Add falling snow and winter atmosphere to this scene while keeping everything else exactly the same"
  },
  {
    id: 5,
    type: "image",
    title: "Age Progression",
    desc: "Visualize age changes while maintaining personal characteristics",
    url: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=600&fit=crop&crop=face",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    prompt: "Make this person look 20 years older while keeping their unique facial features and expression"
  },
  {
    id: 6,
    type: "image",
    title: "Fantasy Transformation",
    desc: "Add fantasy elements while keeping the core subject recognizable",
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop&crop=face",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    prompt: "Add magical fairy wings and sparkles while keeping the person's face and pose exactly the same"
  },
  {
    id: 7,
    type: "image",
    title: "Professional Makeover", 
    desc: "Create professional headshots with perfect consistency",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    prompt: "Transform into a professional business headshot with suit and tie while maintaining the exact same facial features"
  },
  {
    id: 8,
    type: "image",
    title: "Color Grading",
    desc: "Apply cinematic color grading while preserving photo integrity",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
    prompt: "Apply a warm cinematic color grade with golden hour lighting while keeping everything else identical"
  },
  {
    id: 9,
    type: "image",
    title: "Hair Style Change",
    desc: "Experiment with different hairstyles while maintaining facial features",
    url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop&crop=face", 
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    prompt: "Change the hairstyle to long curly hair while keeping the face, expression, and everything else exactly the same"
  }
];

export const defaultGalleryProps = {
  title: "Popular Nano Banana Examples",
  description: "See what millions create with Gemini Nano Banana. Click any example to use its prompt in the editor above. Drag to rearrange!"
};