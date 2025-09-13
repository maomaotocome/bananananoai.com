import { storage } from "./storage";

export const promptPacksData = [
  {
    id: "pet-dog-figurine",
    name: "Pet Dog Figurine",
    category: "pet" as const,
    description: "Transform your dog into a professional collectible figurine with realistic packaging",
    prompt: `Create a 1/7 scale commercialized figurine of the dog in the photo, realistic lighting, displayed on a computer desk. Use a round transparent acrylic base with no text. Show the ZBrush modeling process on the monitor. Place a BANDAI-style toy box printed with the original artwork next to the monitor. The packaging features detailed illustrations of the dog character.`,
    negativePrompt: "blurry, distorted, low quality, text on base, multiple figures",
    parameters: { guidance: 3.5, seed: null },
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "pet-cat-figurine", 
    name: "Pet Cat Figurine",
    category: "pet" as const,
    description: "Turn your cat into an adorable collectible figurine with premium presentation",
    prompt: `Create a 1/7 scale commercialized figurine of the cat in the photo, realistic lighting, displayed on a computer desk. Use a round transparent acrylic base with no text. Show the ZBrush modeling process on the monitor. Place a BANDAI-style toy box printed with the original artwork next to the monitor. The packaging features cute illustrations of the cat character.`,
    negativePrompt: "blurry, distorted, low quality, text on base, multiple figures",
    parameters: { guidance: 3.5, seed: null },
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "anime-kotobukiya-style",
    name: "Anime Kotobukiya Style",
    category: "anime" as const,
    description: "Professional anime figurine with Kotobukiya-quality packaging and presentation",
    prompt: `Transform into anime figurine with Kotobukiya quality styling, 1/7 scale commercialized figurine, realistic lighting, displayed on a computer desk. Use a round transparent acrylic base with no text. Show the ZBrush modeling process on the monitor. Place a high-quality collectible figure box with anime artwork next to the monitor. The packaging features beautiful anime-style illustrations.`,
    negativePrompt: "realistic face, western style, blurry, distorted, low quality",
    parameters: { guidance: 4.0, seed: null },
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "couple-wedding-figurine",
    name: "Couple Wedding Figurine",
    category: "couple" as const,
    description: "Romantic wedding figurine pair with elegant packaging perfect for gifts",
    prompt: `Create matching 1/7 scale commercialized figurines of the couple in wedding attire, romantic lighting, displayed on a computer desk. Use round transparent acrylic bases with no text. Show the ZBrush modeling process on the monitor. Place an elegant wedding-themed toy box with romantic artwork next to the monitor. The packaging features beautiful romantic illustrations.`,
    negativePrompt: "single figure, casual clothes, blurry, distorted, low quality",
    parameters: { guidance: 3.5, seed: null },
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "office-desk-display",
    name: "Office Desk Display",
    category: "office" as const,
    description: "Professional desk figurine perfect for office display and workspace decoration",
    prompt: `Create a 1/7 scale commercialized figurine in professional attire, realistic lighting, displayed on a computer desk workspace. Use a round transparent acrylic base with no text. Show the ZBrush modeling process on the monitor. Place a sleek professional toy box with minimalist artwork next to the monitor. The packaging features clean, professional design.`,
    negativePrompt: "casual clothes, unprofessional, blurry, distorted, low quality",
    parameters: { guidance: 3.5, seed: null },
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "superhero-action-figure",
    name: "Superhero Action Figure",
    category: "superhero" as const,
    description: "Epic superhero figurine with dynamic pose and comic-style packaging",
    prompt: `Transform into superhero action figure, 1/7 scale commercialized figurine with dynamic heroic pose, dramatic lighting, displayed on a computer desk. Use a round transparent acrylic base with no text. Show the ZBrush modeling process on the monitor. Place a comic book style action figure box with superhero artwork next to the monitor. The packaging features bold comic book illustrations.`,
    negativePrompt: "villain, dark theme, static pose, blurry, distorted, low quality",
    parameters: { guidance: 4.0, seed: null },
    isActive: true,
    sortOrder: 6,
  },
];

export async function initPromptPacks() {
  try {
    console.log('Initializing prompt packs...');
    
    // Check if prompt packs already exist
    const existing = await storage.getAllPromptPacks();
    if (existing.length > 0) {
      console.log('Prompt packs already initialized');
      return;
    }
    
    // Insert new prompt packs
    for (const promptPackData of promptPacksData) {
      await storage.createPromptPack(promptPackData);
    }
    
    console.log(`Successfully initialized ${promptPacksData.length} prompt packs`);
  } catch (error) {
    console.error('Error initializing prompt packs:', error);
    // Don't throw error, just log it
  }
}