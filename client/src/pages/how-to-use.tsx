import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Upload, 
  Type, 
  Sparkles, 
  Download, 
  ArrowRight, 
  Lightbulb,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function HowToUse() {
  const steps = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Your Images",
      description: "Drag and drop up to 5 images or click to browse. Supports JPG, PNG, WebP up to 10MB each.",
      tips: [
        "Use high-quality images for best results",
        "Multiple images enable blending and comparison",
        "Portrait orientation works best for people"
      ]
    },
    {
      icon: <Type className="w-6 h-6" />,
      title: "Write Your Prompt",
      description: "Describe what you want to change in natural language. Be specific and creative!",
      tips: [
        "Start with action words: 'Change', 'Add', 'Remove', 'Make'",
        "Include details about style, color, and setting",
        "Reference specific parts: 'her outfit', 'the background', 'his hair'"
      ]
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Generate & Refine",
      description: "Let AI work its magic! Generate results and make iterative improvements.",
      tips: [
        "Review results and refine prompts if needed",
        "Use follow-up prompts for incremental changes",
        "Save your favorite results before making new edits"
      ]
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Download & Share",
      description: "Save your creations and share them with the world!",
      tips: [
        "Right-click to save or use the download button",
        "Share on social media with #NanoBanana",
        "Use results as starting points for new edits"
      ]
    }
  ];

  const promptExamples = [
    {
      category: "Fashion & Style",
      examples: [
        "Change her outfit to a red evening gown",
        "Make him wear a business suit",
        "Add sunglasses and a leather jacket",
        "Transform the dress to vintage 1950s style"
      ]
    },
    {
      category: "Background & Setting",
      examples: [
        "Put them on a beach at sunset",
        "Change background to a city skyline",
        "Place in a cozy coffee shop",
        "Move to a futuristic sci-fi setting"
      ]
    },
    {
      category: "Artistic Styles",
      examples: [
        "Make it look like anime art",
        "Transform to oil painting style",
        "Apply vintage film photography effect",
        "Convert to cartoon illustration"
      ]
    },
    {
      category: "Object Manipulation",
      examples: [
        "Remove the background completely",
        "Add a crown and royal attire",
        "Change car color to metallic blue",
        "Replace flowers with balloons"
      ]
    }
  ];

  const bestPractices = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Be Specific",
      description: "The more detailed your prompt, the better the results. Include colors, styles, and specific elements."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Use Action Words",
      description: "Start with clear verbs like 'change', 'add', 'remove', 'make', or 'transform'."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Reference Image Parts",
      description: "Specify which part to edit: 'the person's outfit', 'the background', 'her hair color'."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Iterate Gradually",
      description: "Make small changes at a time to maintain consistency and get exactly what you want."
    }
  ];

  const commonMistakes = [
    {
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
      title: "Vague Prompts",
      mistake: "Make it better",
      solution: "Change the lighting to golden hour and add warm tones"
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
      title: "Too Many Changes",
      mistake: "Change outfit, background, hair, and add effects",
      solution: "Change outfit to red dress (then edit again for other changes)"
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
      title: "Low Quality Images",
      mistake: "Using pixelated or very small images",
      solution: "Use high-resolution images (at least 512x512 pixels)"
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
      title: "Conflicting Instructions",
      mistake: "Make it realistic and cartoon style",
      solution: "Choose one style: Make it photorealistic OR Convert to cartoon style"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            Complete Tutorial
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How to Use <span className="gradient-text">Nano Banana</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master the art of AI image editing with our comprehensive step-by-step guide. 
            From basic edits to advanced techniques.
          </p>
        </div>

        {/* Step-by-Step Guide */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Master Nano Banana in 4 Simple Steps
          </h2>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-8" data-testid={`step-${index}`}>
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground mr-4">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Step {index + 1}</div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6">
                      {step.description}
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-6">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-primary" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Prompt Examples */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">
              50+ Creative <span className="gradient-text">Prompt Examples</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Get inspired with these proven prompts that create amazing results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {promptExamples.map((category, index) => (
              <Card key={index} className="p-6" data-testid={`prompt-category-${index}`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-3">
                    {index === 0 && "👗"}
                    {index === 1 && "🌅"}
                    {index === 2 && "🎨"}
                    {index === 3 && "🔧"}
                  </span>
                  {category.category}
                </h3>
                
                <div className="space-y-3">
                  {category.examples.map((example, exampleIndex) => (
                    <div 
                      key={exampleIndex}
                      className="p-3 bg-muted rounded-lg text-sm font-mono cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => navigator.clipboard.writeText(example)}
                      data-testid={`prompt-example-${index}-${exampleIndex}`}
                    >
                      "{example}"
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">
              Best <span className="gradient-text">Practices</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Follow these guidelines to get the most out of Nano Banana
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="p-6" data-testid={`best-practice-${index}`}>
                <div className="flex items-start space-x-4">
                  {practice.icon}
                  <div>
                    <h3 className="font-semibold mb-2">{practice.title}</h3>
                    <p className="text-muted-foreground">{practice.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">
              Common <span className="gradient-text">Mistakes</span> to Avoid
            </h2>
            <p className="text-xl text-muted-foreground">
              Learn from these common pitfalls to improve your results
            </p>
          </div>

          <div className="space-y-6">
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="p-6" data-testid={`common-mistake-${index}`}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    {mistake.icon}
                    <div>
                      <h3 className="font-semibold mb-2">{mistake.title}</h3>
                      <div className="bg-red-50 dark:bg-red-950 rounded-lg p-3">
                        <div className="text-sm text-red-700 dark:text-red-300 mb-1">❌ Don't:</div>
                        <div className="font-mono text-sm">"{mistake.mistake}"</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-2">Better Approach</h3>
                      <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3">
                        <div className="text-sm text-green-700 dark:text-green-300 mb-1">✅ Do:</div>
                        <div className="font-mono text-sm">"{mistake.solution}"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Start CTA */}
        <section className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start <span className="gradient-text">Creating</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Now that you know the basics, it's time to put your knowledge into practice!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold banana-glow">
                🍌 Try Nano Banana Now
              </Button>
            </Link>
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
