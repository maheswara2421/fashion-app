/*
 * File: src/data/quiz.ts
 * Purpose: Questions and style result data powering the StyleQuiz component.
 */
import { Question, StyleResult } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    question: "What's your ideal weekend outfit?",
    options: [
      "Cozy oversized sweater and leggings",
      "Tailored blazer with dark jeans", 
      "Flowy maxi dress with statement jewelry",
      "Matching athleisure set",
      "Vintage band tee with distressed denim",
      "Minimalist white tee and trousers"
    ],
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"
    ]
  },
  {
    id: 2,
    question: "Which color palette speaks to you most?",
    options: [
      "Warm neutrals: beige, cream, camel",
      "Classic monochromes: black, white, gray",
      "Rich jewel tones: emerald, sapphire, ruby",
      "Soft pastels: blush, lavender, mint",
      "Earth tones: rust, olive, mustard",
      "Bold brights: electric blue, hot pink, neon"
    ],
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"
    ]
  },
  {
    id: 3,
    question: "Your shopping approach is:",
    options: [
      "I buy versatile pieces that mix and match",
      "I invest in high-quality timeless classics",
      "I love unique, statement pieces that tell a story",
      "I prioritize comfort and functionality above all",
      "I hunt for vintage and one-of-a-kind finds",
      "I follow the latest trends and seasonal must-haves"
    ],
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"
    ]
  },
  {
    id: 4,
    question: "For a night out, you'd choose:",
    options: [
      "Something comfortable yet put-together",
      "A timeless, elegant ensemble",
      "Something bold and eye-catching",
      "Casual-chic with interesting details",
      "A vintage-inspired look with character",
      "The latest trendy outfit from social media"
    ],
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"
    ]
  },
  {
    id: 5,
    question: "Your accessories style is:",
    options: [
      "Minimal and functional pieces",
      "Classic and refined selections",
      "Bold statement pieces that make an impact",
      "Eclectic and personal collections",
      "Vintage and antique treasures",
      "Trendy pieces that complement current looks"
    ],
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"
    ]
  },
  {
    id: 6,
    question: "Your ideal work outfit includes:",
    options: [
      "Comfortable separates that look polished",
      "A perfectly tailored suit or dress",
      "Creative pieces that express personality",
      "Relaxed but professional attire",
      "Unique vintage pieces with modern touches",
      "On-trend professional wear"
    ],
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"
    ]
  },
  {
    id: 7,
    question: "Your vacation wardrobe consists of:",
    options: [
      "Comfortable, versatile pieces for any activity",
      "Elegant resort wear and classic swimwear",
      "Bohemian dresses and statement cover-ups",
      "Practical activewear and casual basics",
      "Unique local finds and vintage discoveries",
      "Instagram-worthy outfits for every occasion"
    ],
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"
    ]
  },
  {
    id: 8,
    question: "Your footwear collection is dominated by:",
    options: [
      "Comfortable sneakers and flat boots",
      "Classic pumps and leather loafers",
      "Statement heels and unique boots",
      "Athletic shoes and comfortable sandals",
      "Vintage boots and retro sneakers",
      "The latest trendy shoes and seasonal styles"
    ],
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"
    ]
  }
];

export const styleResults: StyleResult[] = [
  {
    type: "casual",
    title: "Effortless Casual",
    description: "Your style is comfortable, versatile, and effortlessly chic. You love pieces that work for multiple occasions and prioritize comfort without sacrificing style.",
    traits: ["Comfortable", "Versatile", "Effortless", "Practical"],
    recommendations: [
      "Stock up on well-fitting jeans and comfortable knits",
      "Choose versatile pieces that mix and match easily",
      "Invest in comfortable yet stylish footwear",
      "Layer with cardigans and lightweight jackets"
    ],
    outfitTypes: ["Casual", "Activewear", "Street"],
    colors: ["Beige", "Gray", "Navy", "White", "Denim Blue"],
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    type: "classic",
    title: "Timeless Elegance",
    description: "You have a sophisticated, refined style that never goes out of fashion. You appreciate quality over quantity and prefer clean, polished looks.",
    traits: ["Timeless", "Sophisticated", "Refined", "Quality-focused"],
    recommendations: [
      "Invest in a well-tailored blazer and classic trench coat",
      "Build a capsule wardrobe with neutral colors",
      "Choose classic pieces like white shirts and little black dresses",
      "Opt for quality leather accessories and classic pumps"
    ],
    outfitTypes: ["Business", "Evening", "Seasonal"],
    colors: ["Black", "White", "Navy", "Camel", "Gray"],
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    type: "creative",
    title: "Artistic Expression",
    description: "You use fashion as a form of self-expression and aren't afraid to experiment with bold colors, patterns, and unique pieces that reflect your personality.",
    traits: ["Creative", "Bold", "Expressive", "Unique"],
    recommendations: [
      "Experiment with bold patterns and textures",
      "Mix unexpected color combinations",
      "Seek out unique vintage or artisanal pieces",
      "Use accessories to add creative flair to any outfit"
    ],
    outfitTypes: ["Bohemian", "Street", "Evening"],
    colors: ["Jewel Tones", "Earth Tones", "Bold Brights", "Rich Colors"],
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    type: "modern",
    title: "Modern Minimalist",
    description: "Your aesthetic is clean, contemporary, and purposeful. You appreciate sleek lines, quality fabrics, and a curated wardrobe of versatile essentials.",
    traits: ["Minimalist", "Contemporary", "Clean", "Purposeful"],
    recommendations: [
      "Focus on clean lines and structured silhouettes",
      "Choose a neutral color palette with occasional pops of color",
      "Invest in modern, functional pieces",
      "Keep accessories simple and geometric"
    ],
    outfitTypes: ["Business", "Street", "Casual"],
    colors: ["White", "Black", "Gray", "Beige", "Minimal Palette"],
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    type: "vintage",
    title: "Vintage Soul",
    description: "You're drawn to the charm and character of past eras. Your style combines vintage finds with modern pieces, creating unique and personal looks.",
    traits: ["Nostalgic", "Unique", "Character-rich", "Individual"],
    recommendations: [
      "Hunt for authentic vintage pieces in thrift stores",
      "Mix vintage items with modern basics",
      "Experiment with retro silhouettes and patterns",
      "Collect vintage accessories and statement jewelry"
    ],
    outfitTypes: ["Street", "Bohemian", "Casual"],
    colors: ["Earth Tones", "Vintage Hues", "Mustard", "Rust", "Olive"],
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    type: "trendy",
    title: "Fashion Forward",
    description: "You love staying current with the latest trends and aren't afraid to try new styles. Your wardrobe reflects the most current fashion movements.",
    traits: ["Trendy", "Current", "Experimental", "Fashion-conscious"],
    recommendations: [
      "Follow fashion influencers and runway trends",
      "Experiment with seasonal color palettes",
      "Try new silhouettes and trending pieces",
      "Mix high and low fashion for accessible trends"
    ],
    outfitTypes: ["Street", "Evening", "Seasonal"],
    colors: ["Trending Colors", "Seasonal Palettes", "Bold Statements"],
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];