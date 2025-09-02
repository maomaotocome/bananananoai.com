import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search,
  Bookmark,
  Share2,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All Posts", count: 24 },
    { id: "tutorials", name: "Tutorials", count: 8 },
    { id: "ai-news", name: "AI News", count: 6 },
    { id: "case-studies", name: "Case Studies", count: 5 },
    { id: "tips", name: "Tips & Tricks", count: 5 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "How Banana Nano Ai Achieved #1 Ranking on LMArena: The Complete Technical Analysis",
      excerpt: "Deep dive into the technical innovations that made Banana Nano Ai outperform DALL-E 3 and Midjourney in blind testing with 2.5M user votes.",
      category: "ai-news",
      readTime: "12 min read",
      publishDate: "2025-09-02",
      author: "AI Research Team",
      featured: true,
      tags: ["benchmark", "performance", "lmarena", "google-ai"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      views: 15420
    },
    {
      id: 2, 
      title: "10 Viral Social Media Edits You Can Create with Banana Nano Ai in Under 60 Seconds",
      excerpt: "Step-by-step guide to creating trending social media content using advanced AI image editing. Includes prompts and techniques used by top creators.",
      category: "tutorials",
      readTime: "8 min read",
      publishDate: "2025-09-01", 
      author: "Content Creator Lab",
      featured: true,
      tags: ["social-media", "viral-content", "quick-edits", "creator-economy"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      views: 23100
    }
  ];

  const recentPosts = [
    {
      id: 3,
      title: "The Science Behind Character Consistency: How Banana Nano Ai Maintains Perfect Identity Across Edits",
      excerpt: "Technical breakdown of the AI algorithms that enable perfect character consistency, a feature that sets Banana Nano Ai apart from competitors.",
      category: "case-studies",
      readTime: "15 min read",
      publishDate: "2025-08-31",
      author: "AI Engineering Team",
      tags: ["character-consistency", "technical-deep-dive", "ai-algorithms"],
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=300&fit=crop",
      views: 8750
    },
    {
      id: 4,
      title: "From Zero to Viral: E-commerce Brand Increased Sales 340% Using Banana Nano Ai Product Photos",
      excerpt: "Case study: How an online fashion brand used AI-generated product photography to dramatically boost conversion rates and social media engagement.",
      category: "case-studies", 
      readTime: "10 min read",
      publishDate: "2025-08-30",
      author: "Business Strategy Team",
      tags: ["ecommerce", "product-photography", "case-study", "roi"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      views: 12300
    },
    {
      id: 5,
      title: "Advanced Prompt Engineering for Banana Nano Ai: 50+ Proven Techniques",
      excerpt: "Master prompt crafting with our comprehensive guide featuring 50+ tested techniques for achieving professional-quality results every time.",
      category: "tutorials",
      readTime: "20 min read", 
      publishDate: "2025-08-29",
      author: "Prompt Engineering Lab",
      tags: ["prompt-engineering", "advanced-techniques", "professional-tips"],
      image: "https://images.unsplash.com/photo-1552508744-1696d4464960?w=400&h=300&fit=crop", 
      views: 18900
    },
    {
      id: 6,
      title: "Banana Nano Ai vs Competition: Comprehensive Benchmark Results",
      excerpt: "Independent testing results comparing Banana Nano Ai against DALL-E 3, Midjourney, and Stable Diffusion across 12 key performance metrics.",
      category: "ai-news",
      readTime: "14 min read",
      publishDate: "2025-08-28", 
      author: "Benchmark Research Lab",
      tags: ["benchmark", "comparison", "performance-analysis"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      views: 21400
    }
  ];

  const filteredPosts = [...featuredPosts, ...recentPosts].filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            🔥 Latest AI Insights & Tutorials
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Banana Nano Ai</span> Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the latest insights, tutorials, and case studies about <strong>Banana Nano Ai</strong>. 
            Learn from industry experts and join the revolution in AI-powered image editing.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search articles, tutorials, case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
                data-testid="search-blog"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="mb-2"
                  data-testid={`filter-${category.id}`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "all" && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-primary" />
              Featured Articles
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border border-primary/20">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === post.category)?.name}
                      </Badge>
                      <div className="flex items-center text-muted-foreground text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.publishDate}
                      </div>
                      <div className="flex items-center text-muted-foreground text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {post.views.toLocaleString()} views
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === "all" ? "Latest Articles" : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.featured && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === post.category)?.name}
                      </Badge>
                      <div className="flex items-center text-muted-foreground text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.publishDate}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {post.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filter selection.</p>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20 text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with <span className="gradient-text">Banana Nano Ai</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest tutorials, AI insights, and exclusive tips delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email address" 
                className="flex-1"
                data-testid="newsletter-email"
              />
              <Button className="banana-glow" data-testid="newsletter-subscribe">
                Subscribe Free
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}