import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Zap, 
  Palette, 
  MessageSquare, 
  RotateCcw, 
  Heart,
  Star,
  ArrowRight,
  Sparkles
} from "lucide-react";
import ImageEditor from "@/components/image-editor";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { bananaNanoAiExamples, defaultGalleryProps } from "@/data/gallery-examples";

export default function Home() {
  console.log("Home component is rendering");
  
  // State to handle prompt updates from gallery
  const [editorPrompt, setEditorPrompt] = React.useState('');
  
  // Function to handle prompt selection from gallery
  const handleUsePrompt = (prompt: string) => {
    setEditorPrompt(prompt);
    // Scroll to the editor
    const editorElement = document.querySelector('[data-testid="image-editor"]');
    if (editorElement) {
      editorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Character Consistency",
      description: "Keep subjects identical across edits with advanced AI technology."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Lightning Speed",
      description: "Generate professional edits in seconds with powerful AI processing."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Multi-Image Blending",
      description: "Combine photos seamlessly with advanced technology."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Natural Language",
      description: "Describe edits in plain English - simple and intuitive."
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Professional Quality",
      description: "Studio-grade results that rival expensive software solutions."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Free & Accessible",
      description: "Powerful editing tools available to everyone at zero cost."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer", 
      content: "This Banana Nano Ai tool completely changed how I create mockups. Hours in Photoshop now take minutes. I recommend Banana Nano Ai to everyone.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Content Creator",
      content: "The Banana Nano Ai character consistency is absolutely unreal. I create story sequences keeping characters identical. Every creator needs this Banana Nano Ai platform.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-8 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 pulse-glow"></span>
              🔥 Viral on Twitter • 2.5M LMArena Votes • #1 AI Image Editor
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text block">🍌 Banana Nano Ai</span>
              <span className="block">Free AI Image Editor</span>
              <span className="block text-lg md:text-xl lg:text-2xl font-normal text-muted-foreground">Revolutionary AI Image Technology</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Create viral content with <strong>Banana Nano Ai</strong> - the breakthrough <strong>Banana Nano Ai</strong> AI that took social media by storm. This revolutionary <strong>Banana Nano Ai</strong> platform uses advanced technology to deliver professional results with lightning-fast processing for stunning visuals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="px-10 py-5 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 rounded-xl"
                data-testid="hero-try-free"
              >
                <span className="text-2xl mr-2">🍌</span>
                Try Free Now
                <span className="ml-2 text-lg">✨</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold border-2"
                data-testid="hero-watch-tutorial"
              >
                View Tutorial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.9/5 from 50k+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></span>
                <span className="font-medium">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="font-medium">Instant Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Editor Section */}
      <section id="editor" className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transform Images with <span className="gradient-text">Banana Nano Ai</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of <strong>Banana Nano Ai</strong> AI image editing with <strong>Banana Nano Ai</strong> technology. Upload your photo and describe the changes you want in natural language. Our advanced <strong>Banana Nano Ai</strong> technology delivers professional results instantly with unprecedented quality and speed.
            </p>
          </div>
          <ImageEditor 
            key={editorPrompt} 
            promptFromGallery={editorPrompt}
            data-testid="image-editor"
          />
        </div>
      </section>

      {/* Interactive Bento Gallery - Popular Examples - Moved here for better UX and SEO */}
      <section className="py-16 bg-muted/20">
        <InteractiveBentoGallery
          mediaItems={bananaNanoAiExamples}
          title={defaultGalleryProps.title}
          description={defaultGalleryProps.description}
          onUsePrompt={handleUsePrompt}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Why Choose <span className="gradient-text">Banana Nano Ai</span>?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <strong>Banana Nano Ai</strong> outperformed Midjourney and DALL-E on LMArena benchmarks, delivering superior <strong>Banana Nano Ai</strong> results that millions trust. Professional creators choose this <strong>Banana Nano Ai</strong> platform for viral content creation and innovative editing solutions with consistent excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="feature-card p-8 transition-all hover:shadow-lg"
                data-testid={`feature-${index}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What is Banana Nano Ai */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">What is <span className="gradient-text">Banana Nano Ai</span>?</h2>
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              <strong>Banana Nano Ai</strong> represents a breakthrough in AI image editing technology. This revolutionary platform combines advanced machine learning with intuitive design, making professional-grade image editing accessible to everyone. Whether you're creating content for social media, designing marketing materials, or exploring creative possibilities, <strong>Banana Nano Ai</strong> delivers exceptional results with unprecedented speed and accuracy.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The technology behind <strong>Banana Nano Ai</strong> has been tested and validated by millions of users worldwide, earning recognition for its superior performance in competitive benchmarks. Content creators, designers, and businesses rely on this platform for its consistency, quality, and ease of use. From virtual try-ons to background replacements, <strong>Banana Nano Ai</strong> handles complex editing tasks with remarkable precision.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join the community of creators who have discovered the power of <strong>Banana Nano Ai</strong>. Experience the future of image editing today and see why this technology has become the go-to choice for professionals and enthusiasts alike. Start creating amazing content with <strong>Banana Nano Ai</strong> - where innovation meets simplicity.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Users Say About <span className="gradient-text">Banana Nano Ai</span></h2>
            <p className="text-xl text-muted-foreground">
              Millions trust <strong>Banana Nano Ai</strong> for their creative projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8" data-testid={`testimonial-${index}`}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create with <span className="gradient-text">Banana Nano Ai</span>?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions who trust <strong>Banana Nano Ai</strong> for professional image editing. Start creating amazing content today with our revolutionary AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-10 py-5 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 rounded-xl"
              data-testid="cta-start-creating"
            >
              <span className="text-2xl mr-2">🍌</span>
              Start Creating Now
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-2"
              asChild
              data-testid="cta-learn-more"
            >
              <Link href="/examples">
                View More Examples
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}