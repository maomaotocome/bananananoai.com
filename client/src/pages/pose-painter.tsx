import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/seo-head";
import { 
  Upload, 
  Download, 
  Trash2, 
  Wand2, 
  RefreshCw,
  Undo2,
  Redo2,
  Loader2,
  X
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

const PosePainter = () => {
  // Canvas refs and state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#ffffff");
  const [brushSize, setBrushSize] = useState(3);
  const [history, setHistory] = useState<Stroke[][]>([]);
  const [historyStep, setHistoryStep] = useState(0);

  // Reference images state
  const [referenceImages, setReferenceImages] = useState<(string | null)[]>([null, null]);
  const [dragActive, setDragActive] = useState(false);

  // Generation state
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [error, setError] = useState("");

  // Example prompts for better UX
  const examplePrompts = [
    "2人のキャラクターがハイタッチしていて",
    "魔法の森で冒険している二人の勇者",
    "夕日を背景に並んで立つ二人の友達",
    "ダンスパーティーで踊る二人",
    "学校の屋上で語り合う生徒たち"
  ];

  // Canvas coordinate fixing
  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, []);

  // Drawing functions
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getMousePos(e);
    setCurrentStroke([pos]);
    setError("");
  }, [getMousePos]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    setCurrentStroke(prev => [...prev, pos]);
    
    // Draw current stroke
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx || currentStroke.length === 0) return;
    
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    const lastPoint = currentStroke[currentStroke.length - 1];
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }, [isDrawing, currentStroke, brushColor, brushSize, getMousePos]);

  const endDrawing = useCallback(() => {
    if (isDrawing && currentStroke.length > 0) {
      const newStroke: Stroke = {
        points: currentStroke,
        color: brushColor,
        width: brushSize
      };
      
      const newStrokes = [...strokes, newStroke];
      setStrokes(newStrokes);
      
      // Add to history
      const newHistory = history.slice(0, historyStep + 1);
      newHistory.push(newStrokes);
      setHistory(newHistory);
      setHistoryStep(newHistory.length - 1);
    }
    
    setIsDrawing(false);
    setCurrentStroke([]);
  }, [isDrawing, currentStroke, strokes, brushColor, brushSize, history, historyStep]);

  // Canvas utilities
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setStrokes([]);
    setHistory([[]]);
    setHistoryStep(0);
    trackEvent("clear_canvas", "pose_painter");
  };

  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      setStrokes(history[newStep]);
      redrawCanvas(history[newStep]);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      setStrokes(history[newStep]);
      redrawCanvas(history[newStep]);
    }
  };

  const redrawCanvas = (strokesToDraw: Stroke[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear and redraw background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Redraw all strokes
    strokesToDraw.forEach(stroke => {
      if (stroke.points.length < 2) return;
      
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      
      ctx.stroke();
    });
  };

  // Image handling
  const handleImageUpload = (files: FileList | null, index: number) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith("image/")) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const newImages = [...referenceImages];
        newImages[index] = e.target.result as string;
        setReferenceImages(newImages);
        trackEvent("upload_reference", "pose_painter");
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
    if (!referenceImages.some(img => img !== null)) {
      setError("最少上传1张参考图片");
      return;
    }

    if (strokes.length === 0) {
      setError("请先绘制姿势");
      return;
    }

    if (!prompt.trim()) {
      setError("请输入场景描述");
      return;
    }

    setIsGenerating(true);
    setError("");
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not found");
      
      const poseSketch = canvas.toDataURL("image/png");
      const validReferences = referenceImages.filter(img => img !== null);

      // Build enhanced prompt for Gemini
      const enhancedPrompt = `
角色融合生成任务：

参考图片：提供了${validReferences.length}张角色参考图
姿势草图：已提供白色线条姿势图
场景要求：${prompt}

生成要求：
1. 严格保持参考图片中角色的外貌特征（发型、服装、配色）
2. 精确复现草图中的动作姿势
3. 融入用户描述的场景环境
4. 保持动漫/插画艺术风格
5. 确保角色细节清晰可见
6. 颜色鲜艳，构图专业

输出规格：${aspectRatio}高清图像`;

      const response = await fetch("/api/generate-pose-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceImages: validReferences,
          poseSketch,
          sceneDescription: enhancedPrompt,
          aspectRatio
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "生成失败");
      }

      const result = await response.json();
      setGeneratedImage(result.imageUrl);
      trackEvent("generate_success", "pose_painter");
      
    } catch (error) {
      console.error("Generation error:", error);
      setError(error instanceof Error ? error.message : "图像生成失败");
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
    
    // Set high DPI canvas
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 672 * dpr;
    canvas.height = 400 * dpr;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, 672, 400);
    }
    
    setHistory([[]]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SEOHead 
        title="AI Character Fusion Studio - Pose Painter | Banana Nano AI"
        description="Create stunning AI character fusion art. Upload references, sketch poses, and generate unique illustrations with advanced AI technology."
        keywords="AI character fusion, pose painter, AI art generator, character illustration"
      />
      
      {/* Modern Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            AI Character Fusion Studio
          </h1>
          <p className="text-muted-foreground mt-2">
            Blend reference images, pose sketches, and text prompts into unique AI-generated art
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Panel - Inputs */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Step 1: Provide Inputs */}
            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="bg-gradient-to-r from-violet-600/10 to-pink-600/10 px-6 py-4 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-bold">
                    1
                  </span>
                  Provide Inputs
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Reference Images */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Reference Images
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1].map((index) => (
                      <div key={index} className="relative group">
                        {referenceImages[index] ? (
                          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-primary/20 bg-muted">
                            <img 
                              src={referenceImages[index]!} 
                              alt={`Reference ${index + 1}`}
                              className="w-full h-full object-cover"
                              data-testid={`img-reference-${index}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                data-testid={`button-remove-${index}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                              Reference Image {index + 1}
                            </div>
                          </div>
                        ) : (
                          <label className="relative aspect-[3/4] rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 group">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e.target.files, index)}
                              className="hidden"
                              data-testid={`input-upload-${index}`}
                            />
                            <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              Reference Image {index + 1}
                            </span>
                            <span className="text-xs text-muted-foreground mt-1">
                              Click to upload
                            </span>
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pose Sketch */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Pose Sketch
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={undo}
                        size="sm"
                        variant="ghost"
                        disabled={historyStep <= 0}
                        data-testid="button-undo"
                      >
                        <Undo2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={redo}
                        size="sm"
                        variant="ghost"
                        disabled={historyStep >= history.length - 1}
                        data-testid="button-redo"
                      >
                        <Redo2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={clearCanvas}
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        data-testid="button-clear"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>

                  <div 
                    ref={containerRef}
                    className="relative rounded-xl overflow-hidden border-2 border-border bg-slate-900"
                  >
                    <canvas
                      ref={canvasRef}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={endDrawing}
                      onMouseLeave={endDrawing}
                      className="w-full cursor-crosshair"
                      style={{ 
                        width: "100%",
                        height: "400px",
                        imageRendering: "pixelated"
                      }}
                      data-testid="canvas-drawing"
                    />
                    
                    {/* Brush controls overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        {["#ffffff", "#ffeb3b", "#4caf50", "#2196f3", "#e91e63"].map(color => (
                          <button
                            key={color}
                            onClick={() => setBrushColor(color)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform ${
                              brushColor === color ? "scale-125 border-white" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                            data-testid={`color-${color}`}
                          />
                        ))}
                      </div>
                      <div className="w-px h-6 bg-white/20" />
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-20"
                        data-testid="brush-size"
                      />
                      <span className="text-white text-xs">{brushSize}px</span>
                    </div>
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Aspect Ratio
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["1:1", "4:3", "16:9", "2:3", "3:2"].map(ratio => (
                      <Button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        variant={aspectRatio === ratio ? "default" : "outline"}
                        size="sm"
                        className={aspectRatio === ratio ? "bg-gradient-to-r from-violet-600 to-pink-600" : ""}
                        data-testid={`ratio-${ratio}`}
                      >
                        {ratio}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Prompt */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Prompt
                  </label>
                  
                  {/* Example prompts */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {examplePrompts.map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(example)}
                        className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        data-testid={`example-${i}`}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                  
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="描述场景、背景和氛围..."
                    className="min-h-[100px] resize-none"
                    data-testid="textarea-prompt"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                {/* Generate Button */}
                <Button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 transition-all transform hover:scale-[1.02]"
                  data-testid="button-generate"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Panel - Result */}
          <div className="xl:col-span-1">
            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors sticky top-8">
              <div className="bg-gradient-to-r from-violet-600/10 to-pink-600/10 px-6 py-4 border-b">
                <h2 className="text-lg font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-bold">
                      2
                    </span>
                    View Result
                  </span>
                  {generatedImage && (
                    <Button
                      onClick={downloadImage}
                      size="sm"
                      variant="ghost"
                      data-testid="button-download"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </h2>
              </div>
              
              <div className="p-6">
                {generatedImage ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={generatedImage}
                      alt="Generated fusion"
                      className="w-full h-auto"
                      data-testid="img-result"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <Button
                        onClick={downloadImage}
                        className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                        data-testid="button-download-overlay"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square rounded-xl bg-muted/30 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                        <Wand2 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Generated image will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosePainter;