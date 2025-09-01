import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface TrendingPattern {
  id: string;
  pattern: string;
  category: string;
  popularity: number;
  successRate: number;
  examples: string[];
  lastUpdated: Date;
}

export interface OptimizationSuggestion {
  originalPrompt: string;
  optimizedPrompt: string;
  improvements: string[];
  confidence: number;
  expectedEngagement: number;
  trendingElements: string[];
}

export interface ViralMetrics {
  views: number;
  shares: number;
  saves: number;
  engagementRate: number;
  viralScore: number;
}

class PromptOptimizerService {
  private trendingPatterns: Map<string, TrendingPattern> = new Map();
  private successfulPrompts: Map<string, { prompt: string; metrics: ViralMetrics }> = new Map();

  constructor() {
    this.initializeTrendingPatterns();
  }

  // Initialize with known viral patterns
  private initializeTrendingPatterns() {
    const patterns: TrendingPattern[] = [
      {
        id: "selfie-magic",
        pattern: "two people taking selfie together",
        category: "social",
        popularity: 95,
        successRate: 87,
        examples: [
          "Make them look like they're taking a selfie together in a park",
          "Transform into a natural selfie with sunset background",
          "Create a casual selfie moment at the beach"
        ],
        lastUpdated: new Date()
      },
      {
        id: "before-after",
        pattern: "dramatic transformation",
        category: "transformation",
        popularity: 92,
        successRate: 84,
        examples: [
          "Show dramatic before and after comparison",
          "Transform from casual to professional look",
          "Create stunning makeover transformation"
        ],
        lastUpdated: new Date()
      },
      {
        id: "object-persistence",
        pattern: "change specific object while keeping background",
        category: "precision",
        popularity: 89,
        successRate: 91,
        examples: [
          "Change the car color but keep everything else the same",
          "Replace the umbrella with a red one, keep the beach identical",
          "Swap the phone for a book, maintain the exact same pose"
        ],
        lastUpdated: new Date()
      },
      {
        id: "style-fusion",
        pattern: "blend artistic styles",
        category: "artistic",
        popularity: 78,
        successRate: 76,
        examples: [
          "Make it look like a Renaissance painting",
          "Apply cyberpunk aesthetic while keeping the person realistic",
          "Blend vintage film photography with modern elements"
        ],
        lastUpdated: new Date()
      },
      {
        id: "seasonal-themes",
        pattern: "seasonal or holiday themes",
        category: "seasonal",
        popularity: 85,
        successRate: 82,
        examples: [
          "Add falling snow and winter atmosphere",
          "Create a Halloween spooky transformation",
          "Apply summer beach vibes with palm trees"
        ],
        lastUpdated: new Date()
      }
    ];

    patterns.forEach(pattern => {
      this.trendingPatterns.set(pattern.id, pattern);
    });
  }

  // Analyze user prompt and suggest optimizations
  async optimizePrompt(userPrompt: string): Promise<OptimizationSuggestion> {
    try {
      const analysisPrompt = `
        You are a viral content optimization expert. Analyze this image editing prompt and suggest improvements based on trending patterns and engagement data.

        User prompt: "${userPrompt}"

        Current trending patterns:
        ${Array.from(this.trendingPatterns.values()).map(p => 
          `- ${p.pattern} (${p.popularity}% popularity, ${p.successRate}% success rate)`
        ).join('\n')}

        Provide optimization suggestions in JSON format:
        {
          "optimizedPrompt": "improved version of the prompt",
          "improvements": ["list of specific improvements made"],
          "confidence": confidence_score_0_to_100,
          "expectedEngagement": estimated_engagement_score_0_to_100,
          "trendingElements": ["trending elements incorporated"]
        }

        Focus on:
        1. Clarity and specificity
        2. Incorporating trending patterns
        3. Visual appeal keywords
        4. Engagement-driving elements
        5. Technical precision for better results
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          responseMimeType: "application/json",
        },
        contents: analysisPrompt,
      });

      const optimizationData = JSON.parse(response.text || '{}');

      return {
        originalPrompt: userPrompt,
        optimizedPrompt: optimizationData.optimizedPrompt || userPrompt,
        improvements: optimizationData.improvements || [],
        confidence: optimizationData.confidence || 50,
        expectedEngagement: optimizationData.expectedEngagement || 50,
        trendingElements: optimizationData.trendingElements || []
      };

    } catch (error) {
      console.error('Error optimizing prompt:', error);
      return {
        originalPrompt: userPrompt,
        optimizedPrompt: userPrompt,
        improvements: ["Unable to optimize at this time"],
        confidence: 0,
        expectedEngagement: 50,
        trendingElements: []
      };
    }
  }

  // Get trending patterns for suggestions
  getTrendingPatterns(): TrendingPattern[] {
    return Array.from(this.trendingPatterns.values())
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
  }

  // Learn from successful generation
  recordSuccessfulGeneration(prompt: string, metrics: ViralMetrics) {
    this.successfulPrompts.set(prompt, { prompt, metrics });
    
    // Update trending patterns based on successful prompts
    this.updateTrendingPatterns(prompt, metrics);
  }

  // Update trending patterns based on successful content
  private updateTrendingPatterns(prompt: string, metrics: ViralMetrics) {
    const promptLower = prompt.toLowerCase();
    
    this.trendingPatterns.forEach((pattern, id) => {
      if (promptLower.includes(pattern.pattern.toLowerCase())) {
        // Boost popularity based on viral performance
        const boost = Math.min(5, metrics.viralScore / 20);
        pattern.popularity = Math.min(100, pattern.popularity + boost);
        pattern.lastUpdated = new Date();
        
        // Add successful example if it's significantly different
        if (!pattern.examples.some(ex => 
          this.calculateSimilarity(ex.toLowerCase(), promptLower) > 0.7
        )) {
          pattern.examples.push(prompt);
          // Keep only top 5 examples
          if (pattern.examples.length > 5) {
            pattern.examples.shift();
          }
        }
      }
    });
  }

  // Calculate similarity between two strings (simple implementation)
  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  // Generate smart suggestions based on user's prompt context
  async generateSmartSuggestions(basePrompt: string, count: number = 3): Promise<string[]> {
    try {
      const suggestionsPrompt = `
        Based on this image editing prompt: "${basePrompt}"
        
        Generate ${count} alternative viral-worthy prompts using these trending patterns:
        ${this.getTrendingPatterns().slice(0, 5).map(p => `- ${p.pattern}`).join('\n')}
        
        Each suggestion should:
        1. Keep the core intent of the original
        2. Add viral elements
        3. Be specific and actionable
        4. Include emotional or social appeal
        
        Return only an array of strings, no additional text.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: suggestionsPrompt,
      });

      const text = response.text || '';
      // Extract suggestions from response
      const lines = text.split('\n').filter(line => line.trim().length > 0);
      return lines.slice(0, count).map(line => line.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim());
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return [
        `${basePrompt} with dramatic lighting`,
        `${basePrompt} in a trendy, Instagram-worthy setting`,
        `${basePrompt} with a creative twist that would go viral`
      ];
    }
  }

  // Get engagement prediction for a prompt
  async predictEngagement(prompt: string): Promise<number> {
    const optimization = await this.optimizePrompt(prompt);
    return optimization.expectedEngagement;
  }
}

export const promptOptimizerService = new PromptOptimizerService();