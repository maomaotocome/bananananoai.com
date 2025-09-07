import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ExternalLink, ArrowRight, Zap, Award, Globe, Code } from "lucide-react";
import { SEOHead, seoConfigs } from "@/components/seo-head";

export default function WhatIsNanoBanana() {
  return (
    <div className="min-h-screen py-12">
      <SEOHead {...seoConfigs.whatIsNanoBanana} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Award className="w-4 h-4 mr-2" />
            🔥 Viral Story Behind the AI Revolution
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            What is <span className="gradient-text">🍌 Banana Nano Ai</span>?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The mysterious AI that broke Twitter, topped LMArena leaderboards, and became Google's biggest AI reveal of 2025. Here's the complete viral story.
          </p>
        </div>

        {/* Viral Facts */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">🍌🍌🍌</div>
              <div className="text-sm text-muted-foreground">Sundar Pichai's Tweet</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2.5M</div>
              <div className="text-sm text-muted-foreground">LMArena Votes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">#1</div>
              <div className="text-sm text-muted-foreground">Global Ranking</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1-2s</div>
              <div className="text-sm text-muted-foreground">Generation Speed</div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What is Banana Nano Ai */}
          {/* The Viral Story */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="mr-3">🔥</span>
              The Viral Story That Broke the Internet
            </h2>
            <Card className="p-8 border border-primary/20">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">🍌 August 26, 2025: The Three Bananas That Changed Everything</h3>
                  <p className="text-muted-foreground mb-4">
                    Google CEO Sundar Pichai posted just three banana emojis on Twitter: <strong>🍌🍌🍌</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Within hours, the tweet went viral with millions of views. Nobody knew what it meant until Pichai revealed that Google's mysterious AI model - which had been dominating LMArena leaderboards anonymously - was actually theirs.
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-semibold mb-3">📈 The Anonymous Rise to #1:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Mystery Launch:</strong> Appeared anonymously on LMArena testing platform</li>
                    <li>• <strong>Community Buzz:</strong> Reddit and Discord exploded with speculation</li>
                    <li>• <strong>2.5M Votes:</strong> Users voted it #1 before knowing it was Google's</li>
                    <li>• <strong>Performance:</strong> Beat DALL-E 3, Midjourney, and Stable Diffusion</li>
                    <li>• <strong>The Reveal:</strong> Sundar Pichai's cryptic tweet cracked the mystery</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="mr-3">🤖</span>
              What exactly is Banana Nano Ai?
            </h2>
            <Card className="p-8">
              <p className="text-lg leading-relaxed mb-6">
                <strong>Banana Nano Ai</strong> is Google's internal codename for Gemini 2.5 Flash Image model. 
                It became the most talked-about AI after demonstrating unprecedented character consistency 
                and following instructions better than any previous image AI model.
              </p>
              
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-semibold mb-3">⚡ What Made It Go Viral:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Perfect Identity Preservation:</strong> Keeps faces identical across all edits</li>
                  <li>• <strong>Lightning Speed:</strong> 1-2 seconds vs 10-15 seconds for competitors</li>
                  <li>• <strong>Object Persistence:</strong> Changes only what you ask, leaves rest untouched</li>
                  <li>• <strong>Multi-Image Fusion:</strong> Seamlessly combines multiple photos</li>
                  <li>• <strong>Natural Language:</strong> Just tell it what you want in plain English</li>
                </ul>
              </div>
            </Card>
          </section>

          {/* How it compares */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="mr-3">🆚</span>
              How does it compare to other AI image editors?
            </h2>
            <Card className="p-8">
              <p className="text-lg leading-relaxed mb-6">
                Banana Nano Ai excels at <strong>character consistency</strong> across multiple edits, 
                making it perfect for virtual try-ons and iterative changes. Unlike other models that 
                regenerate everything from scratch, it remembers subjects and maintains their appearance 
                throughout the editing process.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-950 rounded-lg p-6">
                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">
                    Banana Nano Ai Advantages
                  </h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-300">
                    <li>✅ Perfect character consistency</li>
                    <li>✅ Multi-turn editing support</li>
                    <li>✅ Free access via Gemini</li>
                    <li>✅ Fast generation speed</li>
                    <li>✅ Natural language prompts</li>
                  </ul>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">
                    Other Models
                  </h3>
                  <ul className="space-y-2 text-orange-700 dark:text-orange-300">
                    <li>⚠️ Subject appearance may change</li>
                    <li>⚠️ Limited editing memory</li>
                    <li>⚠️ Often require subscriptions</li>
                    <li>⚠️ Slower processing times</li>
                    <li>⚠️ Complex prompt engineering</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="mr-3">💰</span>
              Is Banana Nano Ai free to use?
            </h2>
            <Card className="p-8">
              <p className="text-lg leading-relaxed mb-6">
                <strong>Yes!</strong> You can use Banana Nano Ai for free through the Gemini app or 
                Google AI Studio. Our platform provides unlimited access to the basic features. 
                API usage costs $0.039 per image for developers building custom applications.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-muted rounded-lg">
                  <div className="text-2xl mb-2">🆓</div>
                  <h3 className="font-semibold mb-2">Free Tier</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlimited basic editing via Gemini App
                  </p>
                </div>
                
                <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-2xl mb-2">🔧</div>
                  <h3 className="font-semibold mb-2">API Access</h3>
                  <p className="text-sm text-muted-foreground">
                    $0.039 per image generation
                  </p>
                </div>
                
                <div className="text-center p-6 bg-muted rounded-lg">
                  <div className="text-2xl mb-2">🏢</div>
                  <h3 className="font-semibold mb-2">Enterprise</h3>
                  <p className="text-sm text-muted-foreground">
                    Custom pricing for high volume
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="mr-3">🎯</span>
              What can I create with Banana Nano Ai?
            </h2>
            <Card className="p-8">
              <p className="text-lg leading-relaxed mb-6">
                The possibilities are endless: virtual fashion try-ons, product photography, 
                interior design previews, creative art styles, photo restoration, meme creation, 
                character design, and much more. If you can describe it, Banana Nano Ai can create it.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "👗",
                    title: "Virtual Fashion Try-On",
                    description: "Try different outfits while keeping your face and pose identical"
                  },
                  {
                    icon: "🏠",
                    title: "Interior Design",
                    description: "Visualize room changes, furniture placement, and decor options"
                  },
                  {
                    icon: "📸",
                    title: "Product Photography",
                    description: "Create professional product shots with custom backgrounds"
                  },
                  {
                    icon: "🎨",
                    title: "Creative Art Styles",
                    description: "Transform photos into anime, paintings, or artistic styles"
                  },
                  {
                    icon: "🔄",
                    title: "Photo Restoration",
                    description: "Enhance old photos, fix damage, and improve quality"
                  },
                  {
                    icon: "🎭",
                    title: "Character Design",
                    description: "Create consistent characters for stories, comics, and content"
                  }
                ].map((useCase, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
                    <div className="text-2xl">{useCase.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Technical Overview */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="mr-3">⚙️</span>
              How does the technology work?
            </h2>
            <Card className="p-8">
              <p className="text-lg leading-relaxed mb-6">
                Banana Nano Ai uses advanced diffusion models trained specifically for image editing 
                tasks. Unlike traditional image generators, it maintains a "memory" of previous 
                edits, allowing for consistent character representation across multiple modifications.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Multi-Modal Understanding</h3>
                    <p className="text-muted-foreground">
                      Processes both text prompts and image inputs simultaneously for precise edits
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Context Preservation</h3>
                    <p className="text-muted-foreground">
                      Maintains subject identity and characteristics across editing sessions
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Advanced Inpainting</h3>
                    <p className="text-muted-foreground">
                      Selective editing of image regions while preserving surrounding areas
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Getting Started */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to try <span className="gradient-text">Banana Nano Ai</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start creating amazing images with the world's most advanced AI editing technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold banana-glow">
                  🍌 Start Editing Now
                </Button>
              </Link>
              <Link href="/tutorials">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                  View Tutorials
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Related Links */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Learn More</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/how-to-use">
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="font-semibold mb-2">How to Use Banana Nano Ai</h3>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step guide to get started with image editing
                  </p>
                </Card>
              </Link>
              
              <Link href="/api">
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="font-semibold mb-2">API Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrate Banana Nano Ai into your applications
                  </p>
                </Card>
              </Link>
              
              <Link href="/examples">
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="font-semibold mb-2">Example Gallery</h3>
                  <p className="text-sm text-muted-foreground">
                    See what's possible with creative prompts
                  </p>
                </Card>
              </Link>
              
              <a 
                href="https://lmarena.ai/leaderboard/image-edit" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="font-semibold mb-2 flex items-center">
                    LMArena Ranking
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    See how Banana Nano Ai compares to other models
                  </p>
                </Card>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
