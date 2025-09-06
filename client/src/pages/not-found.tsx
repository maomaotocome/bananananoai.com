import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowRight, Palette, BookOpen, HelpCircle, Zap } from "lucide-react";
import { Link } from "wouter";
import { SEOHead } from "@/components/seo-head";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <SEOHead 
        title="404 - Page Not Found | Banana Nano Ai - Free AI Image Editor"
        description="The page you're looking for doesn't exist. Explore Banana Nano Ai - the revolutionary AI image editor with character consistency. Try our Pose Painter tool, view examples, or learn how to create viral content."
        keywords="404 error, page not found, banana nano ai, ai image editor, pose painter, character consistency"
        url="https://bananananoai.com/404"
      />
      
      <Card className="w-full max-w-lg mx-4 shadow-lg">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <AlertCircle className="h-16 w-16 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. But don't worry, there's plenty more to explore with <strong>Banana Nano Ai</strong> - the revolutionary AI image editor that's taking the world by storm.
          </p>

          <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/" data-testid="404-home-link">
                <Home className="mr-2 h-5 w-5" />
                Go Back Home
              </Link>
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" data-testid="404-pose-painter-link">
                <Link href="/pose-painter">
                  <Palette className="mr-2 h-4 w-4" />
                  Try Pose Painter
                </Link>
              </Button>
              
              <Button asChild variant="outline" data-testid="404-examples-link">
                <Link href="/examples">
                  <Zap className="mr-2 h-4 w-4" />
                  View Examples
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h2 className="text-lg font-semibold mb-4">Explore Popular Sections</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button asChild variant="ghost" size="sm" data-testid="404-tutorials-link">
                  <Link href="/tutorials">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Tutorials
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" data-testid="404-how-to-use-link">
                  <Link href="/how-to-use">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    How to Use
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                Need more help? Check out these resources:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/faq" className="text-primary hover:text-primary/80 underline text-sm" data-testid="404-faq-link">FAQ</Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/api" className="text-primary hover:text-primary/80 underline text-sm" data-testid="404-api-link">API Docs</Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/blog" className="text-primary hover:text-primary/80 underline text-sm" data-testid="404-blog-link">Blog</Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/case-studies" className="text-primary hover:text-primary/80 underline text-sm" data-testid="404-case-studies-link">Case Studies</Link>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border/50 bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Did you know?</strong> Banana Nano Ai uses Google's Gemini 2.5 Flash Image model to deliver character consistency that outperformed Midjourney and DALL-E in blind testing. Join 100,000+ creators who trust our platform for viral content creation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
