import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Sparkles, Download, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface PromptPack {
  id: string;
  name: string;
  category: string;
  description: string;
  prompt: string;
  parameters?: any;
}

interface Figurine {
  id: string;
  originalImageUrl: string;
  generatedImageUrl?: string;
  status: "pending" | "generating" | "completed" | "failed";
  promptId?: string;
  customPrompt?: string;
}

interface FigurineGeneratorProps {
  selectedFile?: File;
  onGenerationComplete?: (figurine: Figurine) => void;
}

export default function FigurineGenerator({ selectedFile, onGenerationComplete }: FigurineGeneratorProps) {
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedPromptPack, setSelectedPromptPack] = useState<string>("");
  const [generatedFigurine, setGeneratedFigurine] = useState<Figurine | null>(null);
  const { toast } = useToast();

  // Fetch prompt packs
  const { data: promptPacks = [], isLoading: loadingPrompts } = useQuery<PromptPack[]>({
    queryKey: ["/api/prompt-packs"],
    enabled: true,
  });

  // Generate figurine mutation
  const generateMutation = useMutation({
    mutationFn: async (params: { imageFile: File; promptId?: string; customPrompt?: string }): Promise<Figurine> => {
      const formData = new FormData();
      formData.append("image", params.imageFile);
      if (params.promptId) formData.append("promptId", params.promptId);
      if (params.customPrompt) formData.append("customPrompt", params.customPrompt);
      
      const response = await fetch("/api/generate-figurine", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Generation failed: ${response.statusText}`);
      }
      
      return await response.json();
    },
    onSuccess: (data: Figurine) => {
      setGeneratedFigurine(data);
      onGenerationComplete?.(data);
      toast({
        title: "Figurine Generated! 🎉",
        description: "Your Nano Banana figurine has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/figurines"] });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate figurine. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!selectedFile) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    const selectedPack = promptPacks.find((pack) => pack.id === selectedPromptPack);
    
    generateMutation.mutate({
      imageFile: selectedFile,
      promptId: selectedPromptPack || undefined,
      customPrompt: customPrompt || undefined,
    });
  };

  const promptPackCategories = [
    { value: "pet", label: "🐕 Pet Figurines", emoji: "🐕" },
    { value: "couple", label: "💑 Couple/Wedding", emoji: "💑" },
    { value: "anime", label: "🎭 Anime Style", emoji: "🎭" },
    { value: "office", label: "💼 Office Desk", emoji: "💼" },
    { value: "superhero", label: "🦸 Superhero", emoji: "🦸" },
    { value: "general", label: "✨ General", emoji: "✨" },
  ];

  return (
    <div className="space-y-6">
      {/* Prompt Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Choose Your Style
          </CardTitle>
          <CardDescription>
            Select a pre-designed template or write your own custom prompt
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Prompt Pack Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Pre-designed Templates</label>
            <Select value={selectedPromptPack} onValueChange={setSelectedPromptPack} data-testid="select-prompt-pack">
              <SelectTrigger>
                <SelectValue placeholder="Choose a style template..." />
              </SelectTrigger>
              <SelectContent>
                {loadingPrompts ? (
                  <SelectItem value="loading">Loading templates...</SelectItem>
                ) : (
                  promptPacks.map((pack) => (
                    <SelectItem key={pack.id} value={pack.id}>
                      {promptPackCategories.find(cat => cat.value === pack.category)?.emoji} {pack.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            
            {selectedPromptPack && (
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {promptPacks.find((pack) => pack.id === selectedPromptPack)?.description}
                </p>
              </div>
            )}
          </div>

          {/* Custom Prompt */}
          <div>
            <label className="text-sm font-medium mb-2 block">Custom Prompt (Optional)</label>
            <Textarea
              placeholder="Describe your ideal figurine style... (e.g., Create a 1/7 scale figurine with anime styling, displayed on a desk with packaging)"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
              data-testid="textarea-custom-prompt"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty to use the selected template, or write your own for custom results
            </p>
          </div>
        </CardContent>
      </Card>

      {/* File Preview & Generate */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Your Figurine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedFile && (
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="w-16 h-16 bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium" data-testid="text-file-name">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!selectedFile || generateMutation.isPending}
            className="w-full"
            size="lg"
            data-testid="button-generate"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Figurine...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Nano Banana Figurine
              </>
            )}
          </Button>

          {generateMutation.isPending && (
            <div className="text-center text-sm text-muted-foreground">
              <p>Using Google's Gemini 2.5 Flash Image (Nano Banana)</p>
              <p>This usually takes 20-60 seconds...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generation Result */}
      {generatedFigurine && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {generatedFigurine.status === "completed" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : generatedFigurine.status === "failed" ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              )}
              Generation Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            {generatedFigurine.status === "completed" && generatedFigurine.generatedImageUrl ? (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={generatedFigurine.generatedImageUrl}
                    alt="Generated Nano Banana Figurine"
                    className="w-full rounded-lg border"
                    data-testid="image-generated-figurine"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary/80 text-primary-foreground">
                    Contains SynthID Watermark
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" asChild data-testid="button-download-image">
                    <a href={generatedFigurine.generatedImageUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Download Image
                    </a>
                  </Button>
                  <Button variant="outline" data-testid="button-make-3d">
                    🎯 Make it 3D (STL)
                  </Button>
                </div>
              </div>
            ) : generatedFigurine.status === "failed" ? (
              <div className="text-center py-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 font-medium">Generation Failed</p>
                <p className="text-sm text-muted-foreground">Please try again with a different image or prompt</p>
              </div>
            ) : (
              <div className="text-center py-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-2" />
                <p className="font-medium">Generating your figurine...</p>
                <p className="text-sm text-muted-foreground">This may take up to 60 seconds</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Usage Notice */}
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Important Notice
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                All generated images include an invisible SynthID watermark for authenticity verification. 
                This tool is free with daily usage limits. For commercial use, please review Google's terms of service.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}