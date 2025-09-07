import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { useState } from "react";
import { SEOHead, seoConfigs } from "@/components/seo-head";
import { 
  Play, 
  Clock, 
  Users, 
  BookOpen, 
  Video, 
  FileText,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  Download,
  ExternalLink
} from "lucide-react";

export default function Tutorials() {
  const [completedTutorials, setCompletedTutorials] = useState<Set<number>>(new Set());

  const tutorialCategories = [
    { id: "beginner", name: "Beginner", count: 8, color: "bg-green-500" },
    { id: "intermediate", name: "Intermediate", count: 12, color: "bg-yellow-500" },
    { id: "advanced", name: "Advanced", count: 6, color: "bg-red-500" },
    { id: "api", name: "Developer", count: 4, color: "bg-blue-500" }
  ];

  const featuredTutorials = [
    {
      id: 1,
      title: "Complete Beginner's Guide to Nano Banana",
      description: "Everything you need to know to start editing images with AI. Perfect for first-time users.",
      duration: "15 min",
      difficulty: "beginner",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      views: 15420,
      rating: 4.9,
      featured: true,
      topics: ["Getting Started", "Basic Interface", "First Edit", "Best Practices"]
    },
    {
      id: 2,
      title: "50+ Creative Prompt Engineering Techniques",
      description: "Master the art of prompt writing with proven techniques and real examples that work.",
      duration: "25 min",
      difficulty: "intermediate",
      type: "article",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      views: 8930,
      rating: 4.8,
      featured: true,
      topics: ["Prompt Writing", "Advanced Techniques", "Style Prompts", "Character Consistency"]
    },
    {
      id: 3,
      title: "Building Apps with Nano Banana API",
      description: "Complete developer guide to integrating Gemini 2.5 Flash Image into your applications.",
      duration: "45 min",
      difficulty: "advanced",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      views: 3240,
      rating: 4.7,
      featured: true,
      topics: ["API Integration", "Authentication", "Error Handling", "Best Practices"]
    }
  ];

  const allTutorials = [
    // Beginner Tutorials
    {
      id: 4,
      title: "Your First Image Edit",
      description: "Step-by-step walkthrough of editing your first image with Nano Banana.",
      duration: "8 min",
      difficulty: "beginner",
      type: "video",
      views: 12300,
      rating: 4.9
    },
    {
      id: 5,
      title: "Understanding Prompts",
      description: "Learn how to write effective prompts for better AI results.",
      duration: "12 min",
      difficulty: "beginner",
      type: "article",
      views: 9800,
      rating: 4.8
    },
    {
      id: 6,
      title: "Virtual Try-On Basics",
      description: "Create your first virtual clothing try-on with character consistency.",
      duration: "18 min",
      difficulty: "beginner",
      type: "video",
      views: 7650,
      rating: 4.7
    },
    
    // Intermediate Tutorials
    {
      id: 7,
      title: "Advanced Character Consistency",
      description: "Maintain perfect character appearance across multiple edits and sessions.",
      duration: "22 min",
      difficulty: "intermediate",
      type: "video",
      views: 5420,
      rating: 4.8
    },
    {
      id: 8,
      title: "Multi-Image Blending Techniques",
      description: "Combine multiple photos seamlessly for creative composite images.",
      duration: "28 min",
      difficulty: "intermediate",
      type: "article",
      views: 4330,
      rating: 4.6
    },
    {
      id: 9,
      title: "Product Photography Mastery",
      description: "Create professional product shots using AI backgrounds and lighting.",
      duration: "35 min",
      difficulty: "intermediate",
      type: "video",
      views: 6200,
      rating: 4.9
    },
    
    // Advanced Tutorials
    {
      id: 10,
      title: "Custom Style Transfer Techniques",
      description: "Create and apply custom artistic styles using advanced prompting methods.",
      duration: "40 min",
      difficulty: "advanced",
      type: "article",
      views: 2100,
      rating: 4.5
    },
    {
      id: 11,
      title: "Batch Processing Workflows",
      description: "Automate image editing for large datasets using API integration.",
      duration: "50 min",
      difficulty: "advanced",
      type: "video",
      views: 1850,
      rating: 4.7
    }
  ];

  const markCompleted = (tutorialId: number) => {
    setCompletedTutorials(prev => new Set([...Array.from(prev), tutorialId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400";
      case "intermediate": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400";
      case "advanced": return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
      default: return "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "video" ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen py-12">
      <SEOHead {...seoConfigs.tutorials} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Learning Center
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master <span className="gradient-text">Nano Banana</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From beginner basics to advanced techniques. Learn to create stunning AI-edited images 
            with our comprehensive tutorials and guides.
          </p>
        </div>

        {/* Learning Path Overview */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Learning Journey</h2>
              <p className="text-muted-foreground">
                Follow our structured path from beginner to expert
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {tutorialCategories.map((category, index) => (
                <div key={category.id} className="text-center" data-testid={`learning-path-${category.id}`}>
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}>
                    {index + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {category.count} tutorials
                  </p>
                  <Progress 
                    value={Math.random() * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Featured Tutorials */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center">
              <Star className="w-6 h-6 mr-2 text-primary" />
              Featured Tutorials
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative">
                  <img 
                    src={tutorial.thumbnail} 
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90"
                      data-testid={`watch-featured-${tutorial.id}`}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {tutorial.type === "video" ? "Watch Now" : "Read Now"}
                    </Button>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/80">
                      {getTypeIcon(tutorial.type)}
                      <span className="ml-1 capitalize">{tutorial.type}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{tutorial.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tutorial.description}</p>
                  
                  {tutorial.topics && (
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">You'll learn:</div>
                      <div className="flex flex-wrap gap-1">
                        {tutorial.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tutorial.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {tutorial.rating}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => markCompleted(tutorial.id)}
                    data-testid={`start-featured-${tutorial.id}`}
                  >
                    {completedTutorials.has(tutorial.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Completed
                      </>
                    ) : (
                      <>
                        Start Learning
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* All Tutorials by Category */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">All Tutorials</h2>
          
          {tutorialCategories.map((category) => {
            const categoryTutorials = allTutorials.filter(t => t.difficulty === category.id);
            
            return (
              <div key={category.id} className="mb-12" data-testid={`category-${category.id}`}>
                <div className="flex items-center mb-6">
                  <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center text-white font-bold mr-3`}>
                    {tutorialCategories.findIndex(c => c.id === category.id) + 1}
                  </div>
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                  <Badge variant="secondary" className="ml-3">
                    {categoryTutorials.length} tutorials
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTutorials.map((tutorial) => (
                    <Card key={tutorial.id} className="p-6 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          {getTypeIcon(tutorial.type)}
                          <span className="ml-2 text-sm text-muted-foreground capitalize">
                            {tutorial.type}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {tutorial.rating}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold mb-2">{tutorial.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{tutorial.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {tutorial.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {tutorial.views.toLocaleString()}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => markCompleted(tutorial.id)}
                        data-testid={`start-${tutorial.id}`}
                      >
                        {completedTutorials.has(tutorial.id) ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            Completed
                          </>
                        ) : (
                          <>
                            Start Tutorial
                            <Play className="w-3 h-3 ml-2" />
                          </>
                        )}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Additional Resources</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Prompt Library</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Download 500+ proven prompts for every use case
              </p>
              <Button size="sm" variant="outline" data-testid="download-prompts">
                Download PDF
              </Button>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                <ExternalLink className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Community Forum</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Join discussions and get help from experts
              </p>
              <Button size="sm" variant="outline" data-testid="join-community">
                Join Now
              </Button>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Video Course</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Complete 4-hour masterclass on AI image editing
              </p>
              <Button size="sm" variant="outline" data-testid="watch-course">
                Watch Free
              </Button>
            </Card>
            
            <Link href="/api">
              <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">API Docs</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Complete developer documentation and examples
                </p>
                <Button size="sm" variant="outline" data-testid="view-api-docs">
                  View Docs
                </Button>
              </Card>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12">
          <div className="text-6xl mb-6">🎓</div>
          <h2 className="text-3xl font-bold mb-6">
            Ready to Become a <span className="gradient-text">Nano Banana</span> Expert?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with the basics and work your way up to advanced techniques. 
            Join thousands of creators who've mastered AI image editing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold banana-glow">
              🍌 Start Learning Now
            </Button>
            <Link href="/examples">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                View Examples
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
