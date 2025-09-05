import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SEOHead } from "@/components/seo-head";
import { Upload, Download, Trash2, Undo, Redo, Palette, Wand2, Settings } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Point {
  x: number;
  y: number;
}

interface DrawnLine {
  points: Point[];
  color: string;
  thickness: number;
}

const PosePainter = () => {
  // Canvas and drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<DrawnLine[]>([]);
  const [currentLine, setCurrentLine] = useState<Point[]>([]);
  const [brushColor, setBrushColor] = useState("#ffffff");
  const [brushThickness, setBrushThickness] = useState([3]);
  const [undoStack, setUndoStack] = useState<DrawnLine[][]>([]);
  const [redoStack, setRedoStack] = useState<DrawnLine[][]>([]);

  // Reference images state
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Scene description state
  const [sceneDescription, setSceneDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>("");
  const [generationProgress, setGenerationProgress] = useState(0);

  // Preset poses
  const presetPoses = [
    { name: "Standing", icon: "🧍", description: "Neutral standing pose" },
    { name: "Jumping", icon: "🤸", description: "Dynamic jumping pose" },
    { name: "Sitting", icon: "🪑", description: "Relaxed sitting pose" },
    { name: "Running", icon: "🏃", description: "Action running pose" },
    { name: "Dancing", icon: "💃", description: "Graceful dancing pose" },
    { name: "Fighting", icon: "🥊", description: "Combat action pose" }
  ];

  // Canvas drawing functions
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentLine([{ x, y }]);
  }, []);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCurrentLine(prev => [...prev, { x, y }]);
    
    // Draw on canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushThickness[0];
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (currentLine.length > 0) {
      const lastPoint = currentLine[currentLine.length - 1];
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }, [isDrawing, currentLine, brushColor, brushThickness]);

  const stopDrawing = useCallback(() => {
    if (isDrawing && currentLine.length > 0) {
      const newLine: DrawnLine = {
        points: currentLine,
        color: brushColor,
        thickness: brushThickness[0]
      };
      
      setUndoStack(prev => [...prev, lines]);
      setLines(prev => [...prev, newLine]);
      setRedoStack([]);
    }
    setIsDrawing(false);
    setCurrentLine([]);
  }, [isDrawing, currentLine, lines, brushColor, brushThickness]);

  // Canvas utilities
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setUndoStack(prev => [...prev, lines]);
    setLines([]);
    setRedoStack([]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    trackEvent("clear_canvas", "pose_painter", "canvas_cleared");
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    
    const previousState = undoStack[undoStack.length - 1];
    setRedoStack(prev => [lines, ...prev]);
    setUndoStack(prev => prev.slice(0, -1));
    setLines(previousState);
    redrawCanvas(previousState);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    
    const nextState = redoStack[0];
    setUndoStack(prev => [...prev, lines]);
    setRedoStack(prev => prev.slice(1));
    setLines(nextState);
    redrawCanvas(nextState);
  };

  const redrawCanvas = (linesToDraw: DrawnLine[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    linesToDraw.forEach(line => {
      if (line.points.length < 2) return;
      
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.thickness;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      
      for (let i = 1; i < line.points.length; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y);
      }
      ctx.stroke();
    });
  };

  // Image upload functions
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith("image/") && referenceImages.length < 2) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setReferenceImages(prev => [...prev, e.target!.result as string]);
            trackEvent("upload_reference", "pose_painter", "image_uploaded");
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== index));
  };

  // Generate image function
  const generateImage = async () => {
    if (referenceImages.length === 0 || lines.length === 0 || !sceneDescription.trim()) {
      alert("请上传参考图片、绘制姿势并添加场景描述");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    
    try {
      // Convert canvas to image
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not found");
      
      const poseSketch = canvas.toDataURL("image/png");
      
      // Progress simulation
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch("/api/generate-pose-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceImages,
          poseSketch,
          sceneDescription,
          aspectRatio
        })
      });

      clearInterval(progressInterval);
      
      if (!response.ok) {
        throw new Error(`Generation failed: ${response.statusText}`);
      }

      const result = await response.json();
      setGeneratedImage(result.imageUrl);
      setGenerationProgress(100);
      
      trackEvent("generate_image", "pose_painter", "image_generated");
      
    } catch (error) {
      console.error("Generation error:", error);
      alert("图像生成失败，请重试");
    } finally {
      setIsGenerating(false);
      setTimeout(() => setGenerationProgress(0), 2000);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `pose-painter-${Date.now()}.png`;
    link.click();
    
    trackEvent("download_image", "pose_painter", "image_downloaded");
  };

  // Preset pose functions
  const loadPresetPose = (poseName: string) => {
    // Clear current drawing
    clearCanvas();
    
    // Draw preset pose (simplified stick figure patterns)
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw different poses based on preset
    switch (poseName) {
      case "Standing":
        drawStandingPose(ctx, centerX, centerY);
        break;
      case "Jumping":
        drawJumpingPose(ctx, centerX, centerY);
        break;
      case "Sitting":
        drawSittingPose(ctx, centerX, centerY);
        break;
      case "Running":
        drawRunningPose(ctx, centerX, centerY);
        break;
      case "Dancing":
        drawDancingPose(ctx, centerX, centerY);
        break;
      case "Fighting":
        drawFightingPose(ctx, centerX, centerY);
        break;
    }
    
    trackEvent("load_preset", "pose_painter", poseName);
  };

  // Simplified pose drawing functions
  const drawStandingPose = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Head
    ctx.beginPath();
    ctx.arc(x, y - 60, 15, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Body
    ctx.beginPath();
    ctx.moveTo(x, y - 45);
    ctx.lineTo(x, y + 30);
    ctx.stroke();
    
    // Arms
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x - 30, y - 10);
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x + 30, y - 10);
    ctx.stroke();
    
    // Legs
    ctx.beginPath();
    ctx.moveTo(x, y + 30);
    ctx.lineTo(x - 20, y + 80);
    ctx.moveTo(x, y + 30);
    ctx.lineTo(x + 20, y + 80);
    ctx.stroke();
  };

  const drawJumpingPose = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Head
    ctx.beginPath();
    ctx.arc(x, y - 80, 15, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Body
    ctx.beginPath();
    ctx.moveTo(x, y - 65);
    ctx.lineTo(x, y + 10);
    ctx.stroke();
    
    // Arms raised
    ctx.beginPath();
    ctx.moveTo(x, y - 50);
    ctx.lineTo(x - 35, y - 70);
    ctx.moveTo(x, y - 50);
    ctx.lineTo(x + 35, y - 70);
    ctx.stroke();
    
    // Legs bent
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x - 30, y + 40);
    ctx.lineTo(x - 40, y + 20);
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x + 30, y + 40);
    ctx.lineTo(x + 40, y + 20);
    ctx.stroke();
  };

  const drawSittingPose = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Head
    ctx.beginPath();
    ctx.arc(x, y - 40, 15, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Body
    ctx.beginPath();
    ctx.moveTo(x, y - 25);
    ctx.lineTo(x, y + 25);
    ctx.stroke();
    
    // Arms
    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x - 25, y + 10);
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x + 25, y + 10);
    ctx.stroke();
    
    // Legs sitting
    ctx.beginPath();
    ctx.moveTo(x, y + 25);
    ctx.lineTo(x - 35, y + 25);
    ctx.lineTo(x - 35, y + 60);
    ctx.moveTo(x, y + 25);
    ctx.lineTo(x + 35, y + 25);
    ctx.lineTo(x + 35, y + 60);
    ctx.stroke();
  };

  const drawRunningPose = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Head
    ctx.beginPath();
    ctx.arc(x + 5, y - 60, 15, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Body leaning forward
    ctx.beginPath();
    ctx.moveTo(x + 5, y - 45);
    ctx.lineTo(x + 15, y + 30);
    ctx.stroke();
    
    // Arms in running motion
    ctx.beginPath();
    ctx.moveTo(x + 10, y - 30);
    ctx.lineTo(x - 20, y - 50);
    ctx.moveTo(x + 10, y - 30);
    ctx.lineTo(x + 40, y - 10);
    ctx.stroke();
    
    // Legs in running stride
    ctx.beginPath();
    ctx.moveTo(x + 15, y + 30);
    ctx.lineTo(x - 10, y + 80);
    ctx.moveTo(x + 15, y + 30);
    ctx.lineTo(x + 45, y + 60);
    ctx.stroke();
  };

  const drawDancingPose = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Head
    ctx.beginPath();
    ctx.arc(x, y - 60, 15, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Body curved
    ctx.beginPath();
    ctx.moveTo(x, y - 45);
    ctx.quadraticCurveTo(x + 10, y, x - 5, y + 30);
    ctx.stroke();
    
    // Arms graceful
    ctx.beginPath();
    ctx.moveTo(x + 5, y - 30);
    ctx.quadraticCurveTo(x - 40, y - 40, x - 30, y - 60);
    ctx.moveTo(x + 5, y - 30);
    ctx.quadraticCurveTo(x + 35, y - 20, x + 45, y - 45);
    ctx.stroke();
    
    // Legs in dance position
    ctx.beginPath();
    ctx.moveTo(x - 5, y + 30);
    ctx.lineTo(x - 25, y + 75);
    ctx.moveTo(x - 5, y + 30);
    ctx.lineTo(x + 20, y + 80);
    ctx.stroke();
  };

  const drawFightingPose = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Head
    ctx.beginPath();
    ctx.arc(x, y - 60, 15, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Body
    ctx.beginPath();
    ctx.moveTo(x, y - 45);
    ctx.lineTo(x - 5, y + 30);
    ctx.stroke();
    
    // Arms in fighting stance
    ctx.beginPath();
    ctx.moveTo(x - 2, y - 30);
    ctx.lineTo(x - 35, y - 45);
    ctx.moveTo(x - 2, y - 30);
    ctx.lineTo(x + 25, y - 50);
    ctx.stroke();
    
    // Legs in wide stance
    ctx.beginPath();
    ctx.moveTo(x - 5, y + 30);
    ctx.lineTo(x - 35, y + 80);
    ctx.moveTo(x - 5, y + 30);
    ctx.lineTo(x + 25, y + 80);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;
    
    // Set dark background
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SEOHead 
        title="Pose Painter AI - AI-Powered Character Pose Generation | Banana Nano AI"
        description="Create stunning character poses with AI. Upload reference images, sketch poses, and generate beautiful character art with Google's Gemini AI."
        keywords="pose painter, AI character generation, pose sketching, character art, AI art generator"
        image="/pose-painter-og.png"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🎨 Pose Painter AI
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
            Sketch poses, add references, and bring your vision to life with AI-powered character generation
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Character Consistency
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Pose Control
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Scene Generation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Reference Images */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="w-5 h-5" />
                1. Upload Reference Images
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive 
                    ? "border-blue-400 bg-blue-400/10" 
                    : "border-slate-600 hover:border-slate-500"
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                  data-testid="input-reference-images"
                />
                <label htmlFor="image-upload" className="cursor-pointer" data-testid="label-upload-images">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-300">Drop images here or click to upload</p>
                  <p className="text-gray-500 text-sm mt-1">Up to 2 reference images</p>
                </label>
              </div>

              {/* Uploaded Images */}
              <div className="grid grid-cols-2 gap-2">
                {referenceImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={img} 
                      alt={`Reference ${index + 1}`}
                      className="w-full h-24 object-cover rounded border border-slate-600"
                      data-testid={`img-reference-${index}`}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`button-remove-image-${index}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Center Panel - Pose Sketching */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="w-5 h-5" />
                2. Sketch Poses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preset Poses */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Quick Presets:</label>
                <div className="grid grid-cols-3 gap-2">
                  {presetPoses.map((pose) => (
                    <Button
                      key={pose.name}
                      variant="outline"
                      size="sm"
                      onClick={() => loadPresetPose(pose.name)}
                      className="border-slate-600 text-gray-300 hover:bg-slate-700 text-xs p-2"
                      data-testid={`button-preset-${pose.name.toLowerCase()}`}
                    >
                      <span className="mr-1">{pose.icon}</span>
                      {pose.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Drawing Tools */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Brush Color:</label>
                  <div className="flex gap-2">
                    {["#ffffff", "#ff4444", "#44ff44", "#4444ff", "#ffff44", "#ff44ff"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setBrushColor(color)}
                        className={`w-8 h-8 rounded border-2 ${
                          brushColor === color ? "border-white" : "border-slate-600"
                        }`}
                        style={{ backgroundColor: color }}
                        data-testid={`button-color-${color.slice(1)}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Brush Size: {brushThickness[0]}px
                  </label>
                  <Slider
                    value={brushThickness}
                    onValueChange={setBrushThickness}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                    data-testid="slider-brush-size"
                  />
                </div>
              </div>

              {/* Canvas */}
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="border border-slate-600 rounded cursor-crosshair w-full"
                  style={{ maxWidth: "400px", height: "400px" }}
                  data-testid="canvas-pose-drawing"
                />
              </div>

              {/* Canvas Controls */}
              <div className="flex gap-2">
                <Button
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-gray-300"
                  data-testid="button-undo"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-gray-300"
                  data-testid="button-redo"
                >
                  <Redo className="w-4 h-4" />
                </Button>
                <Button
                  onClick={clearCanvas}
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-gray-300"
                  data-testid="button-clear-canvas"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Scene Description & Generation */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                3. Describe & Generate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Scene Description */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Scene Description:</label>
                <Textarea
                  value={sceneDescription}
                  onChange={(e) => setSceneDescription(e.target.value)}
                  placeholder="Describe the scene, background, lighting, and mood..."
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 min-h-[100px]"
                  data-testid="textarea-scene-description"
                />
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Aspect Ratio:</label>
                <div className="grid grid-cols-4 gap-2">
                  {["1:1", "4:3", "16:9", "2:3"].map((ratio) => (
                    <Button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      variant={aspectRatio === ratio ? "default" : "outline"}
                      size="sm"
                      className={aspectRatio === ratio ? "" : "border-slate-600 text-gray-300"}
                      data-testid={`button-ratio-${ratio.replace(":", "x")}`}
                    >
                      {ratio}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="bg-slate-600" />

              {/* Generate Button */}
              <Button
                onClick={generateImage}
                disabled={isGenerating || referenceImages.length === 0 || lines.length === 0 || !sceneDescription.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3"
                data-testid="button-generate-image"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating... {generationProgress}%
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>

              {/* Example Prompts */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 block">Example Prompts:</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Two magical students flying on broomsticks under a starry night sky",
                    "Characters sitting by a cozy campfire in an enchanted forest",
                    "Friends dancing together at a vibrant outdoor festival",
                    "Heroes standing triumphantly on a mountain peak at sunrise"
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setSceneDescription(example)}
                      className="text-left p-2 text-xs bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-gray-300 transition-colors"
                      data-testid={`button-example-prompt-${index}`}
                    >
                      "{example}"
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-slate-600" />

              {/* Requirements */}
              <div className="text-xs text-gray-400 space-y-1">
                <p>Requirements:</p>
                <div className="flex items-center gap-2">
                  <Badge variant={referenceImages.length > 0 ? "default" : "secondary"} className="text-xs">
                    Reference Images ({referenceImages.length}/2)
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={lines.length > 0 ? "default" : "secondary"} className="text-xs">
                    Pose Sketch {lines.length > 0 ? "✓" : "✗"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={sceneDescription.trim() ? "default" : "secondary"} className="text-xs">
                    Scene Description {sceneDescription.trim() ? "✓" : "✗"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generation Progress */}
        {isGenerating && generationProgress > 0 && (
          <Card className="mt-6 bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
              <p className="text-center text-gray-300 mt-2">
                Generating your character... {generationProgress}%
              </p>
            </CardContent>
          </Card>
        )}

        {/* Generated Result */}
        {generatedImage && (
          <Card className="mt-6 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>✨ Generated Result</span>
                <Button
                  onClick={downloadImage}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-gray-300"
                  data-testid="button-download-result"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <img
                  src={generatedImage}
                  alt="Generated character pose"
                  className="max-w-full h-auto mx-auto rounded-lg border border-slate-600"
                  data-testid="img-generated-result"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PosePainter;