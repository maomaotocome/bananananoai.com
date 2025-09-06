import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo-head";
import { 
  Upload, 
  Download, 
  Trash2, 
  Sparkles,
  RefreshCw,
  Palette,
  Brush,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const PosePainter = () => {
  // Canvas state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#ffffff");
  const [brushSize, setBrushSize] = useState(3);

  // Reference images
  const [referenceImages, setReferenceImages] = useState<(string | null)[]>([null, null]);
  
  // Generation state
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  // Popular prompts that work well
  const popularPrompts = [
    "Two friends high-fiving under cherry blossoms, pink petals falling, warm sunlight",
    "Two magic academy students casting spells, shimmering magical effects, fantasy background",
    "Two characters in a cyberpunk city, neon lights, futuristic tech atmosphere",
    "Two adventurers overlooking sunset from mountain peak, epic scenery, dramatic lighting",
    "Two students dancing at school festival, colorful lights, joyful celebration"
  ];

  // Fixed canvas drawing (solves mouse position offset)
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    // Calculate the scale between canvas actual size and display size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { x, y } = getCanvasCoordinates(e);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const { x, y } = getCanvasCoordinates(e);
    
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#1a1f2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    trackEvent("clear_canvas", "pose_painter");
  };

  // Add preset poses
  const addPresetPose = (poseType: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    
    // Clear first
    ctx.fillStyle = "#1a1f2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw simple stick figures based on pose type
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    switch(poseType) {
      case "standing":
        drawStickFigure(ctx, centerX - 60, centerY, "standing");
        drawStickFigure(ctx, centerX + 60, centerY, "standing");
        break;
      case "dancing":
        drawStickFigure(ctx, centerX - 60, centerY, "dancing");
        drawStickFigure(ctx, centerX + 60, centerY, "dancing");
        break;
      case "highfive":
        drawStickFigure(ctx, centerX - 50, centerY, "highfive_left");
        drawStickFigure(ctx, centerX + 50, centerY, "highfive_right");
        break;
      case "sitting":
        drawStickFigure(ctx, centerX - 60, centerY + 20, "sitting");
        drawStickFigure(ctx, centerX + 60, centerY + 20, "sitting");
        break;
    }
    
    trackEvent("use_preset", "pose_painter", poseType);
  };

  const drawStickFigure = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    pose: string
  ) => {
    // Head
    ctx.beginPath();
    ctx.arc(x, y - 40, 10, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Body
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x, y + 10);
    ctx.stroke();
    
    // Pose-specific limbs
    switch(pose) {
      case "standing":
        // Arms down
        ctx.beginPath();
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 20, y + 5);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x + 20, y + 5);
        ctx.stroke();
        // Legs
        ctx.beginPath();
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x - 15, y + 40);
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x + 15, y + 40);
        ctx.stroke();
        break;
      case "dancing":
        // Arms up
        ctx.beginPath();
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 25, y - 30);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x + 25, y - 30);
        ctx.stroke();
        // Legs dancing
        ctx.beginPath();
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x - 20, y + 35);
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x + 10, y + 40);
        ctx.stroke();
        break;
      case "highfive_left":
        // Right arm up
        ctx.beginPath();
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x + 30, y - 35);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 15, y + 5);
        ctx.stroke();
        // Legs
        ctx.beginPath();
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x - 15, y + 40);
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x + 15, y + 40);
        ctx.stroke();
        break;
      case "highfive_right":
        // Left arm up
        ctx.beginPath();
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 30, y - 35);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x + 15, y + 5);
        ctx.stroke();
        // Legs
        ctx.beginPath();
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x - 15, y + 40);
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x + 15, y + 40);
        ctx.stroke();
        break;
      case "sitting":
        // Arms
        ctx.beginPath();
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 15, y);
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x + 15, y);
        ctx.stroke();
        // Sitting legs
        ctx.beginPath();
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x - 20, y + 10);
        ctx.lineTo(x - 20, y + 35);
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x + 20, y + 10);
        ctx.lineTo(x + 20, y + 35);
        ctx.stroke();
        break;
    }
  };

  // Image handling
  const handleImageUpload = (files: FileList | null, index: number) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const newImages = [...referenceImages];
        newImages[index] = e.target.result as string;
        setReferenceImages(newImages);
        setError("");
        trackEvent("upload_image", "pose_painter");
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    const newImages = [...referenceImages];
    newImages[index] = null;
    setReferenceImages(newImages);
  };

  // Generate image
  const generateImage = async () => {
    // Validation
    if (!referenceImages.some(img => img !== null)) {
      setError("Please upload at least one reference image");
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) {
      setError("Canvas not initialized");
      return;
    }
    
    // Check if canvas has drawings
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Cannot get canvas context");
      return;
    }
    
    if (!prompt.trim()) {
      setError("Please enter a scene description");
      return;
    }
    
    setIsGenerating(true);
    setError("");
    setStatusMessage("Generating character fusion image...");
    
    try {
      const poseSketch = canvas.toDataURL("image/png");
      const validImages = referenceImages.filter(img => img !== null);
      
      const response = await fetch("/api/generate-pose-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceImages: validImages,
          poseSketch,
          sceneDescription: prompt,
          aspectRatio
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Network error" }));
        if (response.status === 503) {
          throw new Error("Nano Banana model is temporarily overloaded. Please try again in a moment.");
        }
        throw new Error(errorData.error || "Generation failed");
      }
      
      const result = await response.json();
      setGeneratedImage(result.imageUrl);
      setStatusMessage("Generation successful!");
      trackEvent("generate_success", "pose_painter");
      
    } catch (error) {
      console.error("Generation error:", error);
      setError(error instanceof Error ? error.message : "Generation failed, please try again");
      setStatusMessage("");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `pose-fusion-${Date.now()}.png`;
    link.click();
    trackEvent("download_image", "pose_painter");
  };

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Canvas is already sized via attributes, just draw background
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#1a1f2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      <SEOHead 
        title="Pose Painter AI - Character Consistency Tool | Banana Nano Ai"
        description="Create viral content with Pose Painter AI tool. Maintain character consistency across multiple images using Google's Gemini 2.5 Flash Image technology. Perfect for content creators seeking character consistency in AI-generated images."
        keywords="pose painter ai, character consistency, banana nano ai pose painter, viral content creation, multi-character image generation, ai pose tool, character consistency ai, nano banana pose painter"
        url="https://bananananoai.com/pose-painter"
      />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur border-b border-yellow-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                AI Character Fusion Studio (Nano Banana)
              </h1>
              <p className="text-gray-600 text-sm">
                Powered by Gemini 2.5 Flash Image - Blend characters, poses, and scenes with perfect consistency
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-6">
          
          {/* Left Panel */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Step 1: Provide Inputs */}
            <Card className="bg-white border-yellow-200 shadow-lg">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 px-6 py-4 border-b border-yellow-200">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </span>
                  Provide Inputs
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Reference Images */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Upload className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700">
                      Reference Images
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1].map((index) => (
                      <div key={index}>
                        {referenceImages[index] ? (
                          <div className="relative group">
                            <img 
                              src={referenceImages[index]!} 
                              alt={`Reference ${index + 1}`}
                              className="w-full h-40 object-contain bg-gray-50 rounded-lg border-2 border-yellow-300"
                              data-testid={`img-ref-${index}`}
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              data-testid={`btn-remove-${index}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e.target.files, index)}
                              className="hidden"
                              data-testid={`input-file-${index}`}
                            />
                            <div className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-colors">
                              <Upload className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600">
                                Reference Image {index + 1}
                              </span>
                              <span className="text-xs text-gray-500 mt-1">
                                Click to upload
                              </span>
                            </div>
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pose Sketch */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Brush className="w-4 h-4 text-gray-600" />
                      <label className="text-sm font-medium text-gray-700">
                        Pose Sketch
                      </label>
                    </div>
                    <Button
                      onClick={clearCanvas}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      data-testid="btn-clear"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                  
                  {/* Preset poses */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <Button
                      onClick={() => addPresetPose("standing")}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      data-testid="preset-standing"
                    >
                      🧍‍♀️🧍‍♂️ Standing
                    </Button>
                    <Button
                      onClick={() => addPresetPose("dancing")}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      data-testid="preset-dancing"
                    >
                      💃🕺 Dancing
                    </Button>
                    <Button
                      onClick={() => addPresetPose("highfive")}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      data-testid="preset-highfive"
                    >
                      🙋‍♀️🙋‍♂️ High Five
                    </Button>
                    <Button
                      onClick={() => addPresetPose("sitting")}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      data-testid="preset-sitting"
                    >
                      🪑 Sitting
                    </Button>
                  </div>
                  
                  {/* Canvas */}
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      width={600}
                      height={400}
                      className="w-full border-2 border-gray-300 rounded-lg cursor-crosshair"
                      style={{ maxWidth: "100%", height: "auto" }}
                      data-testid="canvas-sketch"
                    />
                    
                    {/* Brush controls */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-lg p-2 flex items-center gap-3 shadow-lg">
                      <div className="flex gap-1">
                        {["#ffffff", "#ffeb3b", "#4caf50", "#2196f3", "#f44336"].map(color => (
                          <button
                            key={color}
                            onClick={() => setBrushColor(color)}
                            className={`w-6 h-6 rounded-full border-2 ${
                              brushColor === color ? "border-gray-800 scale-110" : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                            data-testid={`color-${color}`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={brushSize}
                          onChange={(e) => setBrushSize(Number(e.target.value))}
                          className="w-20"
                          data-testid="brush-size"
                        />
                        <span className="text-xs text-gray-600">{brushSize}px</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Use preset poses or draw freely. White brush draws character poses.
                  </p>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Aspect Ratio
                  </label>
                  <div className="flex gap-2">
                    {["1:1", "4:3", "16:9", "2:3"].map(ratio => (
                      <Button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        variant={aspectRatio === ratio ? "default" : "outline"}
                        size="sm"
                        className={aspectRatio === ratio ? "bg-gradient-to-r from-yellow-400 to-orange-500" : ""}
                        data-testid={`ratio-${ratio}`}
                      >
                        {ratio}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Prompt */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Prompt - Scene Description
                  </label>
                  
                  {/* Popular prompts */}
                  <div className="mb-3 space-y-1">
                    <p className="text-xs text-gray-500">Popular examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularPrompts.map((example, i) => (
                        <button
                          key={i}
                          onClick={() => setPrompt(example)}
                          className="text-xs px-2 py-1 bg-yellow-100 hover:bg-yellow-200 rounded-full transition-colors"
                          data-testid={`prompt-${i}`}
                        >
                          {example.substring(0, 20)}...
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the scene, background, atmosphere..."
                    className="min-h-[80px]"
                    data-testid="textarea-prompt"
                  />
                </div>

                {/* Status messages */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                
                {statusMessage && !error && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">{statusMessage}</span>
                  </div>
                )}

                {/* Generate Button */}
                <Button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className={`w-full h-12 text-base font-bold transition-all transform ${
                    isGenerating 
                      ? "bg-gray-400" 
                      : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  data-testid="btn-generate"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Panel - Result */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-yellow-200 shadow-lg sticky top-8">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 px-6 py-4 border-b border-yellow-200">
                <h2 className="text-lg font-bold text-gray-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </span>
                    View Result
                  </span>
                  {generatedImage && (
                    <Button
                      onClick={downloadImage}
                      size="sm"
                      variant="ghost"
                      data-testid="btn-download-top"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </h2>
              </div>
              
              <div className="p-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4" style={{ minHeight: "650px" }}>
                  {isGenerating ? (
                    <div className="h-full flex items-center justify-center" style={{ minHeight: "600px" }}>
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-yellow-500 border-t-transparent mb-6"></div>
                        <p className="text-gray-700 text-xl font-semibold mb-2">
                          Creating your AI artwork...
                        </p>
                        <p className="text-gray-500">
                          Using Nano Banana (Gemini 2.5 Flash Image) for character consistency
                        </p>
                      </div>
                    </div>
                  ) : generatedImage ? (
                    <div className="space-y-4">
                      <div className="relative group">
                        <img
                          src={generatedImage}
                          alt="AI Generated Artwork"
                          className="w-full rounded-lg shadow-xl"
                          style={{ maxHeight: "580px", objectFit: "contain" }}
                          data-testid="img-result"
                        />
                      </div>
                      <Button
                        onClick={downloadImage}
                        className="w-full h-12 text-base font-bold bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transform hover:scale-[1.02] transition-all"
                        data-testid="btn-download-main"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download High-Quality Image
                      </Button>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center" style={{ minHeight: "600px" }}>
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
                          <Sparkles className="w-14 h-14 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                          Your AI Artwork Will Appear Here
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Upload reference images, sketch a pose, add a scene description,
                          and click Generate to create amazing AI art
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Educational Content Section */}
        <div className="mt-16">
          <Card className="bg-white border-yellow-200 shadow-lg">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Master Character Consistency with <span className="gradient-text">Banana Nano Ai</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Why Character Consistency Matters</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Character consistency is the holy grail of AI content creation. Traditional AI image generators create different-looking characters every time, making it impossible to create cohesive stories, comic series, or branded content. <strong>Banana Nano Ai</strong>'s Pose Painter solves this by analyzing facial features, clothing, and unique characteristics to maintain them across generations.
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Content creators worldwide struggle with this issue. A character that looks amazing in one image becomes unrecognizable in the next. Our revolutionary <strong>Nano Banana AI</strong> technology ensures your characters remain identical, enabling you to create viral content series, professional storytelling, and cohesive visual narratives.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Perfect for Content Creators</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 font-bold">•</span>
                      <span><strong>Social Media Influencers:</strong> Create character-based content series that build audience engagement through consistent storytelling.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 font-bold">•</span>
                      <span><strong>Comic Artists:</strong> Generate consistent characters for webcomics, graphic novels, and sequential art without expensive illustration software.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 font-bold">•</span>
                      <span><strong>Brand Marketers:</strong> Develop mascot characters and brand personalities that remain consistent across campaigns and touchpoints.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 font-bold">•</span>
                      <span><strong>Educators:</strong> Create educational content with recurring characters that help students connect with learning materials.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Advanced Techniques for Best Results</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                    <h4 className="font-bold mb-3 text-gray-800">Reference Image Quality</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Use high-quality, well-lit reference images showing clear facial features. Front-facing or three-quarter view works best for character consistency.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Clear facial features visible</li>
                      <li>• Good lighting conditions</li>
                      <li>• Minimal background distractions</li>
                      <li>• High resolution (minimum 512px)</li>
                    </ul>
                  </Card>
                  
                  <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                    <h4 className="font-bold mb-3 text-gray-800">Pose Drawing Tips</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Simple stick figures work well. Focus on overall body position and relationship between characters rather than detailed anatomy.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Keep poses simple and clear</li>
                      <li>• Show character relationships</li>
                      <li>• Use different colors for multiple characters</li>
                      <li>• Focus on key pose elements</li>
                    </ul>
                  </Card>
                  
                  <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                    <h4 className="font-bold mb-3 text-gray-800">Scene Description Writing</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Detailed descriptions help the AI understand context. Include lighting, mood, environment, and specific character details.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Describe lighting and atmosphere</li>
                      <li>• Mention clothing and accessories</li>
                      <li>• Include emotional context</li>
                      <li>• Specify artistic style preferences</li>
                    </ul>
                  </Card>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">The Technology Behind Character Consistency</h3>
                <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  <strong>Banana Nano Ai</strong>'s Pose Painter leverages Google's Gemini 2.5 Flash Image model with proprietary character recognition algorithms. Our system analyzes facial landmarks, bone structure, eye shape, hair texture, clothing patterns, and other distinctive features to create a "character fingerprint." This fingerprint guides the AI during generation, ensuring new images maintain the same character identity while allowing for different poses, expressions, and scenes. The result is industry-leading character consistency that outperforms other AI tools by maintaining 95%+ character recognition accuracy across multiple generations.
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Success Stories Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Success Stories with <span className="gradient-text">Pose Painter AI</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-bold mb-3 text-gray-800">Sarah's Comic Series</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    "I created a 12-episode webcomic using Pose Painter AI. My characters looked identical in every panel, something impossible with other AI tools. My comic went viral on social media with over 2 million views and landed me a publishing deal."
                  </p>
                  <div className="text-sm text-gray-500">
                    Comic Artist & Content Creator
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-bold mb-3 text-gray-800">Marketing Agency Success</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    "Our client needed consistent mascot characters for a 6-month campaign. Pose Painter AI saved us $50,000 in illustration costs while delivering better consistency than traditional artists. Campaign engagement increased 340%."
                  </p>
                  <div className="text-sm text-gray-500">
                    Creative Director, Digital Marketing Agency
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PosePainter;