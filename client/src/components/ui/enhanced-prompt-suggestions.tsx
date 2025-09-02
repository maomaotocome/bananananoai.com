"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Palette, 
  User, 
  Shirt, 
  Camera, 
  Wand2,
  RefreshCw,
  TrendingUp
} from 'lucide-react';

interface EnhancedPromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
  category?: string;
}

const promptCategories = {
  character: {
    icon: User,
    label: "Character Consistency",
    color: "from-blue-400 to-blue-600",
    prompts: [
      "Keep the same person but change the outfit to business attire",
      "Maintain character while changing the background to a beach scene",
      "Same person in different lighting - golden hour sunset",
      "Character consistency: transform into a professional headshot",
      "Keep facial features identical but add accessories"
    ]
  },
  style: {
    icon: Palette,
    label: "Style Transfer",
    color: "from-purple-400 to-purple-600", 
    prompts: [
      "Transform into Renaissance painting style",
      "Apply cyberpunk neon aesthetic",
      "Convert to vintage 1950s photograph",
      "Make it look like an oil painting masterpiece",
      "Add anime/manga art style"
    ]
  },
  tryOn: {
    icon: Shirt,
    label: "Virtual Try-On",
    color: "from-pink-400 to-pink-600",
    prompts: [
      "Try on elegant evening dress",
      "Add fashionable sunglasses and jewelry", 
      "Change to casual streetwear style",
      "Virtual try-on: luxury designer outfit",
      "Add winter coat and accessories"
    ]
  },
  background: {
    icon: Camera,
    label: "Background Effects",
    color: "from-green-400 to-green-600",
    prompts: [
      "Replace background with mountain landscape",
      "Change to modern office environment",
      "Add dreamy bokeh background effect",
      "Transform background to futuristic cityscape",
      "Create studio portrait background"
    ]
  },
  creative: {
    icon: Wand2,
    label: "Creative Effects", 
    color: "from-yellow-400 to-orange-500",
    prompts: [
      "Add magical sparkles and fairy dust",
      "Create double exposure effect",
      "Add rainbow and fantasy elements",
      "Transform into surreal art piece",
      "Add glowing aura and mystical effects"
    ]
  },
  trending: {
    icon: TrendingUp,
    label: "Trending Styles",
    color: "from-red-400 to-red-600",
    prompts: [
      "Create viral social media aesthetic",
      "Add trending color grade filter",
      "Transform with popular Instagram style",
      "Apply TikTok viral effect",
      "Create Pinterest-worthy aesthetic"
    ]
  }
};

export const EnhancedPromptSuggestions: React.FC<EnhancedPromptSuggestionsProps> = ({ 
  onSelectPrompt,
  category = 'character'
}) => {
  const [activeCategory, setActiveCategory] = useState(category);
  const [displayedPrompts, setDisplayedPrompts] = useState<string[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const categoryData = promptCategories[activeCategory as keyof typeof promptCategories];
    if (categoryData) {
      setDisplayedPrompts(categoryData.prompts);
      setAnimationKey(prev => prev + 1);
    }
  }, [activeCategory]);

  const refreshPrompts = () => {
    const categoryData = promptCategories[activeCategory as keyof typeof promptCategories];
    if (categoryData) {
      // Shuffle the prompts for variety
      const shuffled = [...categoryData.prompts].sort(() => Math.random() - 0.5);
      setDisplayedPrompts(shuffled);
      setAnimationKey(prev => prev + 1);
    }
  };

  const handlePromptClick = (prompt: string) => {
    onSelectPrompt(prompt);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background/50 to-muted/50 border-primary/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Smart Prompt Suggestions</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshPrompts}
            data-testid="button-refresh-prompts"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(promptCategories).map(([key, categoryData]) => {
            const Icon = categoryData.icon;
            return (
              <motion.button
                key={key}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === key 
                    ? `bg-gradient-to-r ${categoryData.color} text-white shadow-lg`
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`category-${key}`}
              >
                <Icon className="w-4 h-4" />
                <span>{categoryData.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Prompt Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={animationKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {displayedPrompts.map((prompt, index) => {
              const categoryData = promptCategories[activeCategory as keyof typeof promptCategories];
              return (
                <motion.button
                  key={`${activeCategory}-${index}`}
                  className="text-left p-4 rounded-lg border border-border/50 bg-background/60 hover:bg-background/80 hover:border-primary/30 transition-all group"
                  onClick={() => handlePromptClick(prompt)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`prompt-suggestion-${index}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${categoryData.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <categoryData.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {prompt}
                      </p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Click to use
                      </Badge>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Quick tip */}
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Pro tip:</strong> Be specific about what you want to keep and what you want to change for best results.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedPromptSuggestions;