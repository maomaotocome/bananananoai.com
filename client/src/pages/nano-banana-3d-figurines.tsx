import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Sparkles, Printer, Download, ArrowRight, Star, Play, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import FigurineGenerator from "@/components/figurine-generator";

export default function NanoBanana3DFigurines() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "AI-Powered Generation",
      description: "Uses Google's Gemini 2.5 Flash Image (Nano Banana) for professional figurine creation"
    },
    {
      icon: <Download className="w-6 h-6 text-primary" />,
      title: "Make it 3D (STL)",
      description: "Transform your 2D figurine into a downloadable 3D model ready for printing"
    },
    {
      icon: <Printer className="w-6 h-6 text-primary" />,
      title: "Instant Print Quotes",
      description: "Get real-time pricing from professional 3D printing services"
    }
  ];

  const promptExamples = [
    {
      category: "Pet Figurines",
      prompt: "Create a 1/7 scale commercialized figurine of the pet in the photo, realistic lighting, displayed on a computer desk with BANDAI-style packaging",
      tags: ["Dogs", "Cats", "Pets"]
    },
    {
      category: "Anime Style",
      prompt: "Transform into anime figurine with Kotobukiya quality, complete with collector's box and acrylic base",
      tags: ["Anime", "Collectible", "Kotobukiya"]
    },
    {
      category: "Couple/Wedding",
      prompt: "Create matching figurine pair in wedding attire, romantic lighting, premium packaging with custom artwork",
      tags: ["Wedding", "Couples", "Romance"]
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Upload Your Photo",
      description: "Choose any photo of yourself, pet, or loved one"
    },
    {
      number: "2", 
      title: "Select Style Template",
      description: "Pick from 6 themed prompt packs or customize your own"
    },
    {
      number: "3",
      title: "Generate Figurine",
      description: "AI creates professional figurine with packaging in seconds"
    },
    {
      number: "4",
      title: "Make it 3D",
      description: "Convert to STL file for 3D printing (optional)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SEO-Optimized Header */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
              <Star className="w-4 h-4 mr-2" />
              Free Nano Banana Generator
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Create <span className="gradient-text">Nano Banana 3D Figurines</span> Online — Then Turn Them into Real 3D Prints (STL)
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your photos into professional collectible figurines using Google's Gemini 2.5 Flash Image (Nano Banana). 
              Generate stunning figurines with packaging, convert to 3D models (STL), and get instant printing quotes.
              <strong> All images include SynthID watermark for authenticity.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-3" data-testid="button-start-creating">
                <Play className="w-5 h-5 mr-2" />
                Start Creating Free
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3" asChild data-testid="link-view-examples">
                <Link href="/examples">View Examples</Link>
              </Button>
            </div>
          </div>

          {/* Upload & Generator Section */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Quick Upload */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Upload Your Photo</CardTitle>
                <CardDescription>
                  Start with any photo to create a professional Nano Banana figurine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  data-testid="upload-dropzone"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="mb-4">
                    <p className="text-lg font-medium mb-2">Drop your image here</p>
                    <p className="text-sm text-muted-foreground">or click to browse files</p>
                  </div>
                  
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    data-testid="input-file-upload"
                  />
                  <Button asChild variant="outline" data-testid="button-browse-files">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Browse Files
                    </label>
                  </Button>
                  
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium" data-testid="text-selected-file">
                        Selected: {selectedFile.name}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Figurine Generator */}
            {selectedFile && (
              <FigurineGenerator 
                selectedFile={selectedFile}
                onGenerationComplete={(figurine) => {
                  console.log("Figurine generated:", figurine);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Complete <span className="gradient-text">Nano Banana</span> Workflow
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI generation to physical 3D printing - we handle the entire pipeline
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow" data-testid={`feature-${index}`}>
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple 4-step process to create your figurine</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center" data-testid={`step-${index}`}>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Examples */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Popular Prompt Templates</h2>
            <p className="text-xl text-muted-foreground">
              Pre-tested prompts that create amazing figurines every time
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {promptExamples.map((example, index) => (
              <Card key={index} className="p-6" data-testid={`prompt-example-${index}`}>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg">{example.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    "{example.prompt}"
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {example.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild data-testid="link-all-prompts">
              <Link href="/prompts">View All Prompt Packs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Is Nano Banana free to use?</h3>
              <p className="text-muted-foreground">
                Yes, Google's Gemini 2.5 Flash Image (Nano Banana) is free with daily usage limits. 
                You can generate multiple figurines per day at no cost.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">What is SynthID watermark?</h3>
              <p className="text-muted-foreground">
                All images generated through Gemini 2.5 Flash Image include an invisible SynthID watermark 
                for authenticity verification. This ensures responsible AI usage.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Can I 3D print the figurines?</h3>
              <p className="text-muted-foreground">
                Yes! Our "Make it 3D" feature converts your figurine into STL files ready for 3D printing. 
                We also provide instant quotes from professional printing services.
              </p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild data-testid="link-full-faq">
              <Link href="/faq">View Complete FAQ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Figurine?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands creating amazing Nano Banana figurines. Generate yours in seconds!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3" data-testid="button-start-now">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3" asChild data-testid="link-how-to-guide">
              <Link href="/guides/how-to-use-nano-banana-in-ai-studio">How-to Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}