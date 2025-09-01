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

export default function Home() {
  console.log("Home component is rendering");
  
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Character Consistency",
      description: "Keep subjects identical across edits with Gemini Nano Banana technology."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Lightning Speed",
      description: "Generate professional edits in seconds with Gemini Nano Banana AI."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Multi-Image Blending",
      description: "Combine photos seamlessly with Gemini Nano Banana technology."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Natural Language",
      description: "Describe edits in plain English to Gemini Nano Banana."
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Multi-Turn Editing",
      description: "Make multiple changes while Gemini Nano Banana maintains context."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Free Access",
      description: "Use Gemini Nano Banana free - no signup required."
    }
  ];

  // Viral trending examples based on social media buzz and real user cases
  const examples = [
    {
      category: "🔥 Viral Gemini Nano Banana Selfie Magic",
      description: "Turn two separate photos into a natural-looking selfie with Gemini Nano Banana - the trick that's breaking Twitter",
      prompt: "Make them look like they're taking a selfie together in a park",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: true,
      views: "2.3M views"
    },
    {
      category: "💇‍♀️ Gemini Nano Banana Virtual Hair Try-On",
      description: "Preview 6 different hairstyles instantly with Gemini Nano Banana - show your stylist exactly what you want",
      prompt: "Reimagine this person with different hairstyles: Korean short cut, French curls, vintage waves",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: true,
      views: "1.8M views"
    },
    {
      category: "🏖️ Gemini Nano Banana Object Persistence Magic",
      description: "Change specific objects while keeping backgrounds perfectly intact with Gemini Nano Banana - the tech that amazed Reddit",
      prompt: "Change the umbrellas to red but keep the beach exactly the same",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: true,
      views: "3.1M views"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer", 
      content: "Gemini Nano Banana changed how I create mockups. Hours in Photoshop now take minutes with Gemini Nano Banana.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Content Creator",
      content: "Gemini Nano Banana character consistency is unreal. I create story sequences keeping characters identical.",
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
              🔥 Gemini Nano Banana Viral on Twitter • 2.5M Votes on LMArena • #1 Gemini Nano Banana AI
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              The Revolutionary
              <span className="gradient-text block">🍌 Gemini Nano Banana</span>
              <span className="block">AI Image Editor</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Create viral content with <strong>Gemini Nano Banana</strong> - the AI that broke Twitter! Experience <strong>Gemini Nano Banana</strong> editing power for free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="px-10 py-5 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 rounded-xl"
                data-testid="hero-try-free"
              >
                <span className="text-2xl mr-2">🍌</span>
                Try Gemini Nano Banana Free
                <span className="ml-2 text-lg">✨</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold border-2"
                data-testid="hero-watch-tutorial"
              >
                Gemini Nano Banana Tutorial
              </Button>
            </div>
            
            {/* Hero Demo Image */}
            <div className="relative max-w-4xl mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
                alt="AI image editing demonstration showing before and after transformations" 
                className="rounded-2xl shadow-2xl w-full h-auto float-animation" 
              />
              
              <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm">
                Before
              </Badge>
              <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground">
                After ✨
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Block */}
      <section className="py-8 border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground font-medium mb-4">Trusted by millions using <strong>Gemini Nano Banana</strong></p>
          <div className="grid grid-cols-2 gap-4 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="stat-users">2.5M</div>
              <div className="text-sm text-muted-foreground">LMArena Votes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="stat-images">🍌🍌🍌</div>
              <div className="text-sm text-muted-foreground">Sundar Pichai's Tweet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="stat-ranking">#1</div>
              <div className="text-sm text-muted-foreground">Image AI Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="stat-plan">1-2s</div>
              <div className="text-sm text-muted-foreground">Generation Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Demo */}
      <ImageEditor />

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">Gemini Nano Banana</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <strong>Gemini Nano Banana</strong> outperformed Midjourney and DALL-E on LMArena benchmarks. Try <strong>Gemini Nano Banana</strong> today!
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

      {/* What is Nano Banana AI - SEO Optimized Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              What is <span className="gradient-text">Gemini Nano Banana</span>?
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-xl leading-relaxed">
                <strong>Gemini Nano Banana</strong> is Google's viral AI that dominated LMArena leaderboards. The mysterious <strong>Gemini Nano Banana</strong> shocked the AI community with unprecedented results.
              </p>
              
              <p className="text-lg leading-relaxed">
                <strong>Gemini Nano Banana</strong> outperformed Midjourney and DALL-E, winning 2.5M+ votes. When Google revealed <strong>Gemini Nano Banana</strong> was theirs, social media exploded with viral <strong>Gemini Nano Banana</strong> transformations.
              </p>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 my-8">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Why <strong>Gemini Nano Banana</strong> Goes Viral:</h3>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold">🍌</span>
                    <span><strong>Character Consistency:</strong> <strong>Gemini Nano Banana</strong> keeps people looking identical across edits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold">🍌</span>
                    <span><strong>Perfect Blending:</strong> <strong>Gemini Nano Banana</strong> creates natural-looking photo combinations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold">🍌</span>
                    <span><strong>Natural Language:</strong> Just tell <strong>Gemini Nano Banana</strong> what you want in plain English</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold">🍌</span>
                    <span><strong>Professional Results:</strong> <strong>Gemini Nano Banana</strong> delivers studio-quality edits instantly</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-lg leading-relaxed">
                <strong>Gemini Nano Banana</strong> creates convincing content that goes viral because it understands context and lighting. Unlike other AI editors, <strong>Gemini Nano Banana</strong> maintains visual coherence that makes edits look authentic and shareable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Gallery */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Viral <span className="gradient-text">Gemini Nano Banana</span> Examples
            </h2>
            <p className="text-xl text-muted-foreground">Viral <strong>Gemini Nano Banana</strong> edits that broke Twitter • Try <strong>Gemini Nano Banana</strong> yourself</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden hover:shadow-lg transition-all ${
                  example.viral ? 'ring-2 ring-primary/20 border-primary/30' : ''
                }`}
                data-testid={`example-${index}`}
              >
                <div className="relative">
                  <img 
                    src={example.image} 
                    alt={example.description} 
                    className="w-full h-48 object-cover" 
                  />
                  {example.viral && (
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white animate-pulse">
                      🔥 VIRAL
                    </Badge>
                  )}
                  <Badge className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm text-xs">
                    {example.views}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{example.category}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{example.description}</p>
                  <div className="flex items-start text-sm text-primary">
                    <span className="mr-2 mt-1">📝</span>
                    <code className="bg-primary/10 px-3 py-2 rounded text-xs leading-relaxed flex-1">"{example.prompt}"</code>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/examples">
              <Button variant="outline" size="lg" data-testid="view-all-examples">
                View All Examples
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground">Three simple steps to transform your images</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📤", title: "Upload", desc: "Drag and drop up to 5 images. Support for JPG, PNG, WebP formats." },
              { icon: "✍️", title: "Describe", desc: "Write what you want in plain English. Be creative with your prompts!" },
              { icon: "✨", title: "Transform", desc: "Watch as AI creates your perfect image in seconds. Download and share!" }
            ].map((step, index) => (
              <div key={index} className="text-center" data-testid={`how-it-works-${index}`}>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 banana-glow">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{index + 1}. {step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Loved by <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-xl text-muted-foreground">Join thousands of users creating amazing content</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`testimonial-${index}`}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full mr-3 flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div className="flex text-primary">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="text-6xl mb-6">🍌</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to go <span className="gradient-text">Bananas</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators transforming their images with the world's most advanced AI editing technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-12 py-5 text-lg font-bold hero-cta-button rounded-xl"
              data-testid="final-cta-start"
            >
              <span className="text-2xl mr-3">🍌</span>
              Start Creating for Free
              <span className="ml-3 text-lg">✨</span>
            </Button>
            <Link href="/api">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-10 py-4 text-lg font-bold"
                data-testid="final-cta-api"
              >
                View API Documentation
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            No signup required • Free forever plan • $0.039/image for API
          </p>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="gradient-text">Gemini Nano Banana</span> FAQ
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-2">What is Gemini Nano Banana?</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Gemini Nano Banana</strong> is Google's viral AI that topped LMArena benchmarks and creates professional edits.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-2">Is Gemini Nano Banana free?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! <strong>Gemini Nano Banana</strong> is free to use. Premium <strong>Gemini Nano Banana</strong> features available for power users.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-2">How does Gemini Nano Banana work?</h3>
              <p className="text-sm text-muted-foreground">
                Upload images, describe edits in plain English, and <strong>Gemini Nano Banana</strong> creates viral-ready content instantly.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-2">Can I use Gemini Nano Banana commercially?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! <strong>Gemini Nano Banana</strong> outputs can be used for professional projects, marketing, and social media.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg font-bold"
              onClick={() => document.querySelector('#tool')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🍌 Try Gemini Nano Banana Now
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg banana-glow text-2xl"
          onClick={() => document.querySelector('#tool')?.scrollIntoView({ behavior: 'smooth' })}
          data-testid="floating-action-button"
        >
          🍌
        </Button>
      </div>
    </div>
  );
}
