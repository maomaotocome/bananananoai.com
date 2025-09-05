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
    "两个朋友在樱花树下击掌庆祝，粉色花瓣飘落，温暖阳光",
    "魔法学院的两个学生施展魔法，闪耀的魔法光效，奇幻背景",
    "赛博朋克城市中的两个角色，霓虹灯光，未来科技感",
    "两个冒险者在山顶眺望日落，壮美风景，史诗氛围",
    "校园祭典上两个学生跳舞，彩色灯光，欢乐气氛"
  ];

  // Fixed canvas drawing (solves mouse position offset)
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
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
      setError("请上传图片文件");
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
      setError("请至少上传一张参考图片");
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) {
      setError("画布未初始化");
      return;
    }
    
    // Check if canvas has drawings
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("无法获取画布上下文");
      return;
    }
    
    if (!prompt.trim()) {
      setError("请输入场景描述");
      return;
    }
    
    setIsGenerating(true);
    setError("");
    setStatusMessage("正在生成角色融合图像...");
    
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
        const errorData = await response.json();
        throw new Error(errorData.error || "生成失败");
      }
      
      const result = await response.json();
      setGeneratedImage(result.imageUrl);
      setStatusMessage("生成成功！");
      trackEvent("generate_success", "pose_painter");
      
    } catch (error) {
      console.error("Generation error:", error);
      setError(error instanceof Error ? error.message : "生成失败，请重试");
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
    
    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;
    
    // Initial dark background
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#1a1f2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      <SEOHead 
        title="AI Character Fusion Studio - 角色融合AI | Banana Nano AI"
        description="使用AI技术创建角色融合艺术。上传参考图像，绘制姿势，生成独特的AI插画。"
        keywords="AI角色融合, pose painter, AI艺术生成器, 角色插画"
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
                AI Character Fusion Studio
              </h1>
              <p className="text-gray-600 text-sm">
                融合参考图像、姿势草图和文字描述，创造独特的AI艺术
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Panel */}
          <div className="lg:col-span-2 space-y-6">
            
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
                              className="w-full h-40 object-cover rounded-lg border-2 border-yellow-300"
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
                                点击上传
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
                      🧍‍♀️🧍‍♂️ 站立
                    </Button>
                    <Button
                      onClick={() => addPresetPose("dancing")}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      data-testid="preset-dancing"
                    >
                      💃🕺 跳舞
                    </Button>
                    <Button
                      onClick={() => addPresetPose("highfive")}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      data-testid="preset-highfive"
                    >
                      🙋‍♀️🙋‍♂️ 击掌
                    </Button>
                    <Button
                      onClick={() => addPresetPose("sitting")}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      data-testid="preset-sitting"
                    >
                      🪑 坐着
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
                      className="w-full border-2 border-gray-300 rounded-lg cursor-crosshair"
                      style={{ maxHeight: "400px" }}
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
                    使用预设姿势或自由绘制。白色画笔绘制角色姿势。
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
                    Prompt - 场景描述
                  </label>
                  
                  {/* Popular prompts */}
                  <div className="mb-3 space-y-1">
                    <p className="text-xs text-gray-500">流行玩法：</p>
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
                    placeholder="描述场景、背景、氛围..."
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
                      生成中...
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
          <div>
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
                {generatedImage ? (
                  <div className="space-y-3">
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full rounded-lg shadow-md"
                      data-testid="img-result"
                    />
                    <Button
                      onClick={downloadImage}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                      data-testid="btn-download-main"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Image
                    </Button>
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">
                        生成的图像将显示在这里
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