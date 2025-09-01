import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Share2, Sparkles } from "lucide-react";
import FileUpload from "./file-upload";
import { generateImage } from "@/lib/gemini-api";
import { useToast } from "@/hooks/use-toast";

interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: Date;
}

export default function ImageEditor() {
  const [files, setFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const { toast } = useToast();

  const promptSuggestions = [
    "Change outfit to a red dress",
    "Blend two photos together",
    "Change background to a beach",
    "Make it look like anime art",
    "Remove background",
    "Add sunglasses and hat",
    "Change to winter setting",
    "Make it vintage style"
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

        <div className="max-w-6xl mx-auto">
          <Card className="p-8">
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

                  <div className="flex gap-2 flex-wrap max-h-24 overflow-y-auto">
                    {promptSuggestions.map((suggestion) => (
                      <Badge
                        key={suggestion}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80 transition-colors text-xs whitespace-nowrap"
                        onClick={() => handlePromptSuggestion(suggestion)}
                        data-testid={`prompt-suggestion-${suggestion.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={generateMutation.isPending || files.length === 0 || !prompt.trim()}
                    className="w-full py-4 text-lg font-bold hero-cta-button"
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
                        Generate Magic
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
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadImage(image.url)}
                            className="flex-1"
                            data-testid={`download-image-${index}`}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => shareImage(image.url)}
                            className="flex-1"
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
          </Card>
        </div>
      </div>
    </section>
  );
}
