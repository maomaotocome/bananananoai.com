import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";
import {
  Search,
  ArrowRight,
  Copy,
  Download,
  Heart,
  Star,
  Filter,
  Grid,
  List
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEOHead, seoConfigs } from "@/components/seo-head";

export default function Examples() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All Examples", count: 48 },
    { id: "fashion", name: "Virtual Try-On", count: 12 },
    { id: "interior", name: "Interior Design", count: 8 },
    { id: "product", name: "Product Photography", count: 10 },
    { id: "art", name: "Creative Art", count: 8 },
    { id: "background", name: "Background Editing", count: 6 },
    { id: "restoration", name: "Photo Enhancement", count: 4 }
  ];

  const examples = [
    {
      id: 1,
      title: "Elegant Evening Gown Try-On",
      category: "fashion",
      prompt: "Change her outfit to an elegant red evening gown with sparkles",
      description: "Transform casual wear into formal attire while maintaining character consistency",
      beforeImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      afterImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      tags: ["fashion", "formal", "elegant"],
      likes: 234,
      featured: true
    },
    {
      id: 2,
      title: "Modern Living Room Makeover",
      category: "interior",
      prompt: "Add a modern gray sofa, coffee table, and some plants to this empty room",
      description: "Complete room transformation with furniture and decor placement",
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      afterImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      tags: ["interior", "modern", "furniture"],
      likes: 189,
      featured: true
    },
    {
      id: 3,
      title: "Professional Product Shot",
      category: "product",
      prompt: "Place the sneakers on a clean white marble surface with studio lighting",
      description: "Transform basic product photos into professional marketing images",
      beforeImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      afterImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      tags: ["product", "photography", "commercial"],
      likes: 156,
      featured: false
    },
    {
      id: 4,
      title: "Anime Art Style Transformation",
      category: "art",
      prompt: "Transform this portrait into anime art style with vibrant colors",
      description: "Convert realistic photos into beautiful anime-style illustrations",
      beforeImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      afterImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      tags: ["art", "anime", "style"],
      likes: 312,
      featured: true
    },
    {
      id: 5,
      title: "Tropical Beach Background",
      category: "background",
      prompt: "Change the background to a beautiful tropical beach with palm trees at sunset",
      description: "Replace backgrounds while maintaining perfect subject isolation",
      beforeImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      afterImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      tags: ["background", "travel", "tropical"],
      likes: 198,
      featured: false
    },
    {
      id: 6,
      title: "Vintage Photo Restoration",
      category: "restoration",
      prompt: "Enhance the colors, fix the scratches, and improve the overall quality",
      description: "Restore old photos to their former glory with AI enhancement",
      beforeImage: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      afterImage: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&brightness=1.2&contrast=1.1",
      tags: ["restoration", "vintage", "enhancement"],
      likes: 87,
      featured: false
    }
  ];

  const filteredExamples = examples.filter(example => {
    const matchesSearch = example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         example.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         example.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || example.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Prompt copied!",
      description: "The prompt has been copied to your clipboard.",
    });
  };

  const downloadImage = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `nano-banana-${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-12">
      <SEOHead {...seoConfigs.examples} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Star className="w-4 h-4 mr-2" />
            Community Gallery
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Nano Banana</span> Examples
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing creations from our community. Get inspired by real examples 
            and learn from the prompts that created them.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search examples, prompts, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="search-examples"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    data-testid="view-grid"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    data-testid="view-list"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="h-8"
                  data-testid={`category-${category.id}`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Featured Examples */}
        {selectedCategory === "all" && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <Star className="w-6 h-6 mr-2 text-primary" />
              Featured Examples
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {examples.filter(ex => ex.featured).map((example) => (
                <Card key={example.id} className="overflow-hidden hover:shadow-lg transition-all group">
                  <div className="relative">
                    <div className="grid grid-cols-2">
                      <div className="relative">
                        <img 
                          src={example.beforeImage} 
                          alt={`${example.title} - Before`}
                          className="w-full h-32 object-cover" 
                        />
                        <Badge className="absolute top-2 left-2 bg-background/80 text-foreground">
                          Before
                        </Badge>
                      </div>
                      <div className="relative">
                        <img 
                          src={example.afterImage} 
                          alt={`${example.title} - After`}
                          className="w-full h-32 object-cover" 
                        />
                        <Badge className="absolute top-2 right-2 bg-primary/80 text-primary-foreground">
                          After ✨
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => downloadImage(example.afterImage, example.title)}
                        data-testid={`download-featured-${example.id}`}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => copyPrompt(example.prompt)}
                        data-testid={`copy-featured-${example.id}`}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{example.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Heart className="w-4 h-4 mr-1" />
                        {example.likes}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4">{example.description}</p>
                    
                    <div className="bg-muted rounded-lg p-3 mb-4">
                      <div className="text-xs text-muted-foreground mb-1">Prompt:</div>
                      <code className="text-sm">"{example.prompt}"</code>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {example.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Examples */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "all" ? "All Examples" : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-muted-foreground ml-2">({filteredExamples.length})</span>
            </h2>
          </div>

          {filteredExamples.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No examples found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                data-testid="clear-filters"
              >
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }>
              {filteredExamples.map((example) => (
                <Card 
                  key={example.id} 
                  className={`overflow-hidden hover:shadow-lg transition-all ${viewMode === "list" ? "flex" : ""}`}
                  data-testid={`example-${example.id}`}
                >
                  <div className={viewMode === "list" ? "w-64 flex-shrink-0" : ""}>
                    <div className="relative">
                      <div className={`grid grid-cols-2 ${viewMode === "list" ? "h-32" : ""}`}>
                        <div className="relative">
                          <img 
                            src={example.beforeImage} 
                            alt={`${example.title} - Before`}
                            className={`w-full object-cover ${viewMode === "list" ? "h-32" : "h-24"}`}
                          />
                          <Badge className="absolute top-1 left-1 bg-background/80 text-foreground text-xs">
                            Before
                          </Badge>
                        </div>
                        <div className="relative">
                          <img 
                            src={example.afterImage} 
                            alt={`${example.title} - After`}
                            className={`w-full object-cover ${viewMode === "list" ? "h-32" : "h-24"}`}
                          />
                          <Badge className="absolute top-1 right-1 bg-primary/80 text-primary-foreground text-xs">
                            After ✨
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{example.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Heart className="w-3 h-3 mr-1" />
                        {example.likes}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">{example.description}</p>
                    
                    <div className="bg-muted rounded-lg p-2 mb-3">
                      <code className="text-xs">"{example.prompt}"</code>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {example.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {example.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{example.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => copyPrompt(example.prompt)}
                          data-testid={`copy-${example.id}`}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => downloadImage(example.afterImage, example.title)}
                          data-testid={`download-${example.id}`}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12">
          <div className="text-6xl mb-6">🎨</div>
          <h2 className="text-3xl font-bold mb-6">
            Create Your Own <span className="gradient-text">Masterpiece</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to create your own amazing images? Start with Nano Banana and join our community of creators.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold banana-glow">
                🍌 Start Creating
              </Button>
            </Link>
            <Link href="/tutorials">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                Learn How
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
