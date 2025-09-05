import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/seo-head";
import { Upload, Download, Trash2, Wand2 } from "lucide-react";
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

  // Reference images state
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Scene description state
  const [sceneDescription, setSceneDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>("");

  // Preset poses for dual character setup
  const presetPoses = [
    { 
      name: "Two Friends Standing", 
      icon: "🧍‍♀️🧍‍♂️", 
      description: "Two characters standing side by side",
      sketch: "two_friends_standing"
    },
    { 
      name: "Dancing Together", 
      icon: "💃🕺", 
      description: "Two characters dancing together",
      sketch: "dancing_together"
    },
    { 
      name: "High Five", 
      icon: "🙋‍♀️🙋‍♂️", 
      description: "Two characters giving high five",
      sketch: "high_five"
    },
    { 
      name: "Sitting Together", 
      icon: "🪑👫", 
      description: "Two characters sitting together",
      sketch: "sitting_together"
    }
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
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (currentLine.length > 0) {
      const lastPoint = currentLine[currentLine.length - 1];
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }, [isDrawing, currentLine]);

  const stopDrawing = useCallback(() => {
    if (isDrawing && currentLine.length > 0) {
      const newLine: DrawnLine = {
        points: currentLine,
        color: "#ffffff",
        thickness: 3
      };
      
      setLines(prev => [...prev, newLine]);
    }
    setIsDrawing(false);
    setCurrentLine([]);
  }, [isDrawing, currentLine, lines]);

  // Canvas utilities
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setLines([]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Reset dark background
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    trackEvent("clear_canvas", "pose_painter", "canvas_cleared");
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
    if (referenceImages.length === 0) {
      alert("请先上传至少1张参考图片");
      return;
    }

    if (lines.length === 0) {
      alert("请先在画布上绘制姿势");
      return;
    }

    if (!sceneDescription.trim()) {
      alert("请添加场景描述");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Convert canvas to image
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not found");
      
      const poseSketch = canvas.toDataURL("image/png");

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Generation failed: ${response.statusText}`);
      }

      const result = await response.json();
      setGeneratedImage(result.imageUrl);
      
      trackEvent("generate_image", "pose_painter", "image_generated");
      
    } catch (error) {
      console.error("Generation error:", error);
      alert(`图像生成失败: ${error instanceof Error ? error.message : "未知错误"}`);
    } finally {
      setIsGenerating(false);
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

  // Load preset pose
  const loadPresetPose = (poseName: string) => {
    clearCanvas();
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw preset poses for two characters
    switch (poseName) {
      case "Two Friends Standing":
        drawTwoFriendsStanding(ctx, centerX, centerY);
        break;
      case "Dancing Together":
        drawDancingTogether(ctx, centerX, centerY);
        break;
      case "High Five":
        drawHighFive(ctx, centerX, centerY);
        break;
      case "Sitting Together":
        drawSittingTogether(ctx, centerX, centerY);
        break;
    }
    
    trackEvent("load_preset", "pose_painter", poseName);
  };

  // Preset pose drawing functions for dual characters
  const drawTwoFriendsStanding = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Character 1 (left)
    drawCharacter(ctx, x - 80, y, "standing");
    // Character 2 (right)  
    drawCharacter(ctx, x + 80, y, "standing");
  };

  const drawDancingTogether = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Character 1 (left) - dancing pose
    drawCharacter(ctx, x - 80, y, "dancing");
    // Character 2 (right) - dancing pose
    drawCharacter(ctx, x + 80, y, "dancing");
  };

  const drawHighFive = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Character 1 (left)
    drawCharacter(ctx, x - 60, y, "high_five_left");
    // Character 2 (right)
    drawCharacter(ctx, x + 60, y, "high_five_right");
  };

  const drawSittingTogether = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Character 1 (left)
    drawCharacter(ctx, x - 80, y + 20, "sitting");
    // Character 2 (right)
    drawCharacter(ctx, x + 80, y + 20, "sitting");
  };

  const drawCharacter = (ctx: CanvasRenderingContext2D, x: number, y: number, pose: string) => {
    // Head
    ctx.beginPath();
    ctx.arc(x, y - 60, 12, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Body
    ctx.beginPath();
    ctx.moveTo(x, y - 48);
    ctx.lineTo(x, y + 20);
    ctx.stroke();
    
    // Arms and legs based on pose
    switch (pose) {
      case "standing":
        // Arms down
        ctx.beginPath();
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x - 25, y - 5);
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x + 25, y - 5);
        ctx.stroke();
        // Legs straight
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x - 15, y + 60);
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x + 15, y + 60);
        ctx.stroke();
        break;
        
      case "dancing":
        // Arms up and out
        ctx.beginPath();
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x - 30, y - 50);
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x + 30, y - 50);
        ctx.stroke();
        // One leg bent
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x - 20, y + 50);
        ctx.lineTo(x - 10, y + 30);
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x + 15, y + 60);
        ctx.stroke();
        break;
        
      case "high_five_left":
        // Right arm up for high five
        ctx.beginPath();
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x - 20, y - 10);
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x + 35, y - 45);
        ctx.stroke();
        // Normal legs
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x - 15, y + 60);
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x + 15, y + 60);
        ctx.stroke();
        break;
        
      case "high_five_right":
        // Left arm up for high five
        ctx.beginPath();
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x - 35, y - 45);
        ctx.moveTo(x, y - 30);
        ctx.lineTo(x + 20, y - 10);
        ctx.stroke();
        // Normal legs
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x - 15, y + 60);
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x + 15, y + 60);
        ctx.stroke();
        break;
        
      case "sitting":
        // Arms relaxed
        ctx.beginPath();
        ctx.moveTo(x, y - 20);
        ctx.lineTo(x - 20, y);
        ctx.moveTo(x, y - 20);
        ctx.lineTo(x + 20, y);
        ctx.stroke();
        // Legs sitting
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x - 25, y + 20);
        ctx.lineTo(x - 25, y + 50);
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x + 25, y + 20);
        ctx.lineTo(x + 25, y + 50);
        ctx.stroke();
        break;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;
    
    // Set dark background
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Pose Painter AI - AI Character Fusion Studio | Banana Nano AI"
        description="Create character fusion art with AI. Upload reference images, sketch poses, and generate amazing character illustrations."
        keywords="pose painter, AI character fusion, character art, AI art generator"
        image="/pose-painter-og.png"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            AI Character Fusion Studio
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Blend reference images, pose sketches, and text prompts into unique AI-generated art
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="space-y-6">
            {/* 1. Provide Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Provide Inputs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Reference Images */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Reference Images</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1].map((index) => (
                      <div key={index} className="relative">
                        {referenceImages[index] ? (
                          <div className="relative group">
                            <img 
                              src={referenceImages[index]} 
                              alt={`Reference ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border-2 border-border"
                              data-testid={`img-reference-${index}`}
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              data-testid={`button-remove-image-${index}`}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <div
                            className={`border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                              dragActive 
                                ? "border-primary bg-primary/10" 
                                : "border-border hover:border-primary/50"
                            }`}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={() => setDragActive(true)}
                            onDragLeave={() => setDragActive(false)}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e.target.files)}
                              className="hidden"
                              id={`image-upload-${index}`}
                              data-testid={`input-reference-${index}`}
                            />
                            <label htmlFor={`image-upload-${index}`} className="cursor-pointer text-center">
                              <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                              <p className="text-xs text-muted-foreground">Reference Image {index + 1}</p>
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pose Sketch */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Pose Sketch</label>
                    <Button
                      onClick={clearCanvas}
                      size="sm"
                      variant="outline"
                      data-testid="button-clear-canvas"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                  
                  {/* Preset Poses */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {presetPoses.map((pose) => (
                      <Button
                        key={pose.name}
                        variant="outline"
                        size="sm"
                        onClick={() => loadPresetPose(pose.name)}
                        className="text-xs h-auto py-2"
                        data-testid={`button-preset-${pose.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span className="mr-1">{pose.icon}</span>
                        <span className="text-wrap">{pose.name}</span>
                      </Button>
                    ))}
                  </div>

                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="border border-border rounded-lg cursor-crosshair w-full bg-slate-800"
                    style={{ maxHeight: "300px" }}
                    data-testid="canvas-pose-drawing"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Draw poses for your characters or use preset poses above
                  </p>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Aspect Ratio</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1:1", "4:3", "16:9", "2:3"].map((ratio) => (
                      <Button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        variant={aspectRatio === ratio ? "default" : "outline"}
                        size="sm"
                        data-testid={`button-ratio-${ratio.replace(":", "x")}`}
                      >
                        {ratio}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Prompt */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Prompt</label>
                  <Textarea
                    value={sceneDescription}
                    onChange={(e) => setSceneDescription(e.target.value)}
                    placeholder="Describe the scene, background, and mood..."
                    className="min-h-[100px]"
                    data-testid="textarea-scene-description"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateImage}
                  disabled={isGenerating || referenceImages.length === 0 || lines.length === 0 || !sceneDescription.trim()}
                  className="w-full"
                  data-testid="button-generate-image"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Result */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    View Result
                  </span>
                  {generatedImage && (
                    <Button
                      onClick={downloadImage}
                      size="sm"
                      variant="outline"
                      data-testid="button-download-result"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download Image
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedImage ? (
                  <div className="text-center">
                    <img
                      src={generatedImage}
                      alt="Generated character fusion"
                      className="max-w-full h-auto mx-auto rounded-lg border border-border"
                      data-testid="img-generated-result"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Generated image will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosePainter;