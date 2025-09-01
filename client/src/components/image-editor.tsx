import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Share2, Sparkles, Zap } from "lucide-react";
import FileUpload from "./file-upload";
import { PromptOptimizer } from "./prompt-optimizer";
import { generateImage } from "@/lib/gemini-api";
import { useToast } from "@/hooks/use-toast";

interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: Date;
}

interface ImageEditorProps {
  promptFromGallery?: string;
}

export default function ImageEditor({ promptFromGallery = '' }: ImageEditorProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const { toast } = useToast();
  
  // Update prompt when gallery provides one
  useEffect(() => {
    if (promptFromGallery && promptFromGallery !== prompt) {
      setPrompt(promptFromGallery);
      toast({
        title: "Prompt updated from gallery! 🍌",
        description: "Ready to generate with the selected example prompt.",
      });
    }
  }, [promptFromGallery, prompt, toast]);

  // Nano Banana热门功能分类
  const nanoBananaFeatures = {
    characterConsistency: [
      "Change outfit to a red evening dress while keeping the same person",
      "Put this person in a snowy mountain scene",
      "Transform into a professional business suit",
      "Place in a cozy coffee shop setting"
    ],
    virtualTryOn: [
      "Try on a blue denim jacket",
      "Wear trendy sunglasses and a baseball cap",
      "Style with a vintage leather jacket",
      "Add elegant jewelry and makeup"
    ],
    creativeEffects: [
      "Create a 3D pop-out effect from phone screen",
      "Transform into a hand-knitted cute doll version",
      "Make a custom anime figure",
      "Generate a bobblehead version"
    ],
    styleTransformation: [
      "Change hairstyle to Korean short cut",
      "Apply vintage 1950s styling",
      "Transform into glass material effect",
      "Create black and white portrait art"
    ]
  };
  
  const promptSuggestions = [
    ...nanoBananaFeatures.characterConsistency,
    ...nanoBananaFeatures.virtualTryOn,
    ...nanoBananaFeatures.creativeEffects,
    ...nanoBananaFeatures.styleTransformation
  ];

  const generateMutation = useMutation({
    mutationFn: async ({ files, prompt }: { files: File[]; prompt: string }) => {
      if (files.length === 0) {
        throw new Error("Please upload at least one image");
      }
      if (!prompt.trim()) {
        throw new Error("Please provide a prompt");
      }
      
      return await generateImage(files[0], prompt);
    },
    onSuccess: (result) => {
      if (result.success && result.imageUrl) {
        const newImage: GeneratedImage = {
          url: result.imageUrl,
          prompt,
          timestamp: new Date()
        };
        setGeneratedImages(prev => [newImage, ...prev]);
        
        // Record successful generation for learning
        recordSuccess(prompt, result.imageUrl);
        
        toast({
          title: "Image generated successfully! 🍌",
          description: "Your AI-edited image is ready for download.",
        });
      } else {
        throw new Error(result.error || "Failed to generate image");
      }
    },
    onError: (error) => {
      console.error("Image generation failed:", error);
      
      // Check if it's a quota error and provide helpful guidance
      if (error.message?.includes('quota') || error.message?.includes('exceeded')) {
        toast({
          title: "Free tier limit reached",
          description: "Daily API quota exceeded. Try again later or explore our examples to see Nano Banana's capabilities!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Generation failed",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });

  const handleGenerate = () => {
    generateMutation.mutate({ files, prompt });
  };

  const handlePromptUpdate = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const recordSuccess = async (imagePrompt: string, imageUrl: string) => {
    try {
      // Calculate basic metrics (in a real app, this would come from user interactions)
      const metrics = {
        views: Math.floor(Math.random() * 1000) + 100,
        shares: Math.floor(Math.random() * 50) + 10,
        saves: Math.floor(Math.random() * 30) + 5,
        engagementRate: Math.floor(Math.random() * 30) + 70,
        viralScore: Math.floor(Math.random() * 40) + 60,
      };

      await fetch('/api/record-success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt, metrics }),
      });
    } catch (error) {
      console.error('Failed to record success:', error);
    }
  };

  const handlePromptSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `nano-banana-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = async (imageUrl: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my Nano Banana AI creation!',
          url: imageUrl,
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(imageUrl);
        toast({
          title: "Link copied!",
          description: "Image URL copied to clipboard.",
        });
      }
    } else {
      await navigator.clipboard.writeText(imageUrl);
      toast({
        title: "Link copied!",
        description: "Image URL copied to clipboard.",
      });
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Try <span className="gradient-text">Nano Banana</span> Now
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your image and describe how you want to transform it. Our AI will do the magic.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Card className="p-8">
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="editor" className="flex items-center gap-2" data-testid="tab-editor">
                  <Sparkles className="h-4 w-4" />
                  Image Editor
                </TabsTrigger>
                <TabsTrigger value="optimizer" className="flex items-center gap-2" data-testid="tab-optimizer">
                  <Zap className="h-4 w-4" />
                  Prompt Optimizer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-8 min-h-[600px]">
                  {/* Upload Section */}
                  <div className="flex flex-col space-y-6">
                    <h3 className="text-lg font-semibold">Upload Images</h3>
                    
                    <div className="bg-muted/30 rounded-xl p-4 border-2 border-dashed border-muted-foreground/25">
                      <FileUpload
                        onFilesChange={setFiles}
                        maxFiles={5}
                        data-testid="image-upload"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium">Your Prompt</label>
                      <Textarea
                        placeholder="Describe how you want to transform your image... e.g., 'Make me wear a red dress in a field of sunflowers'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="h-28 resize-none"
                        data-testid="prompt-textarea"
                      />

                      {/* Nano Banana功能分类选择器 */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">🔥 Trending Nano Banana Features</h4>
                        
                        {/* 角色一致性 */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                            👤 Character Consistency (Keep same person)
                          </h5>
                          <div className="flex gap-1.5 flex-wrap">
                            {nanoBananaFeatures.characterConsistency.map((suggestion) => (
                              <Badge
                                key={suggestion}
                                variant="outline"
                                className="cursor-pointer text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300"
                                onClick={() => handlePromptSuggestion(suggestion)}
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* 虚拟试衣 */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                            👗 Virtual Try-On
                          </h5>
                          <div className="flex gap-1.5 flex-wrap">
                            {nanoBananaFeatures.virtualTryOn.map((suggestion) => (
                              <Badge
                                key={suggestion}
                                variant="outline"
                                className="cursor-pointer text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 hover:border-purple-300"
                                onClick={() => handlePromptSuggestion(suggestion)}
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* 创意效果 */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                            ✨ Creative Effects
                          </h5>
                          <div className="flex gap-1.5 flex-wrap">
                            {nanoBananaFeatures.creativeEffects.map((suggestion) => (
                              <Badge
                                key={suggestion}
                                variant="outline"
                                className="cursor-pointer text-xs bg-green-50 hover:bg-green-100 text-green-700 border-green-200 hover:border-green-300"
                                onClick={() => handlePromptSuggestion(suggestion)}
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* 风格转换 */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                            🎨 Style Transformation
                          </h5>
                          <div className="flex gap-1.5 flex-wrap">
                            {nanoBananaFeatures.styleTransformation.map((suggestion) => (
                              <Badge
                                key={suggestion}
                                variant="outline"
                                className="cursor-pointer text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200 hover:border-orange-300"
                                onClick={() => handlePromptSuggestion(suggestion)}
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleGenerate}
                        disabled={generateMutation.isPending || files.length === 0 || !prompt.trim()}
                        className="group relative w-full py-5 px-8 text-lg font-bold overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),0_3px_12px_rgba(0,0,0,0.1)] transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-500 ease-out border border-primary/30 backdrop-blur-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                        size="lg"
                        data-testid="generate-button"
                      >
                        {generateMutation.isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Generating Magic...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            🍌 Generate Magic
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="flex flex-col space-y-6">
                    <h3 className="text-lg font-semibold">Results</h3>

                    {generatedImages.length === 0 ? (
                      <div className="bg-muted rounded-xl p-8 text-center min-h-[400px] flex items-center justify-center">
                        <div className="text-muted-foreground">
                          <div className="text-4xl mb-4">✨</div>
                          <p>Your transformed images will appear here</p>
                          <p className="text-sm mt-2">Upload an image and add a prompt to get started</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[500px] overflow-y-auto border rounded-xl p-4 bg-muted/10">
                        {generatedImages.map((image, index) => (
                          <Card key={index} className="p-4 shadow-sm" data-testid={`generated-image-${index}`}>
                            <div className="bg-muted rounded-lg mb-4 overflow-hidden">
                              <img
                                src={image.url}
                                alt={`Generated: ${image.prompt}`}
                                className="w-full h-auto max-h-[250px] object-contain"
                              />
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              "{image.prompt}"
                            </p>
                            
                            <div className="flex gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadImage(image.url)}
                                className="flex-1 py-2.5 px-4 text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:border-gray-300/60 transition-all duration-300 ease-out"
                                data-testid={`download-image-${index}`}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => shareImage(image.url)}
                                className="flex-1 py-2.5 px-4 text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:border-gray-300/60 transition-all duration-300 ease-out"
                                data-testid={`share-image-${index}`}
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="optimizer" className="space-y-6">
                <PromptOptimizer 
                  currentPrompt={prompt}
                  onPromptUpdate={handlePromptUpdate}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
}
