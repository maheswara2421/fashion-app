/*
 * File: mobile/stylediscover-expo/src/shared/outfits.ts
 * Purpose: Shared mock outfits dataset mirrored from the web app for RN.
 */
import { Outfit } from './types';

// Generate 1000+ outfits with diverse categories and styles (same dataset as web app)
export const outfits: Outfit[] = [
  // Casual Outfits (200 items)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Casual Denim Look ${i + 1}`,
    category: 'Casual',
    style: 'Relaxed',
    season: ['Spring', 'Fall'][i % 2],
    occasion: 'Everyday',
    colors: [['Blue', 'White'], ['Black', 'Gray'], ['Navy', 'Cream']][i % 3],
    price: 45 + (i * 2),
    brand: ['Levi\'s', 'Gap', 'Uniqlo', 'H&M'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Comfortable denim outfit perfect for casual outings and everyday wear.`,
    tags: ['denim', 'comfortable', 'versatile', 'casual']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 51,
    name: `Athleisure Set ${i + 1}`,
    category: 'Activewear',
    style: 'Sporty',
    season: 'All Season',
    occasion: 'Gym',
    colors: [['Black', 'White'], ['Gray', 'Pink'], ['Navy', 'Mint']][i % 3],
    price: 65 + (i * 3),
    brand: ['Nike', 'Adidas', 'Lululemon', 'Under Armour'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Stylish athleisure wear that transitions from workout to street.`,
    tags: ['athletic', 'comfortable', 'trendy', 'versatile']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 101,
    name: `Cozy Knit Outfit ${i + 1}`,
    category: 'Casual',
    style: 'Cozy',
    season: ['Fall', 'Winter'][i % 2],
    occasion: 'Weekend',
    colors: [['Beige', 'Cream'], ['Gray', 'White'], ['Brown', 'Tan']][i % 3],
    price: 55 + (i * 2),
    brand: ['Zara', 'COS', 'Everlane', 'Mango'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Soft and cozy knitwear perfect for relaxed weekends.`,
    tags: ['knit', 'cozy', 'warm', 'comfortable']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 151,
    name: `Summer Casual ${i + 1}`,
    category: 'Casual',
    style: 'Breezy',
    season: 'Summer',
    occasion: 'Vacation',
    colors: [['White', 'Blue'], ['Yellow', 'White'], ['Pink', 'Coral']][i % 3],
    price: 40 + (i * 2),
    brand: ['Old Navy', 'Target', 'Forever 21', 'ASOS'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Light and airy summer outfits for warm weather adventures.`,
    tags: ['summer', 'light', 'breathable', 'vacation']
  })),

  // Business/Professional Outfits (200 items)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 201,
    name: `Power Suit ${i + 1}`,
    category: 'Business',
    style: 'Professional',
    season: 'All Season',
    occasion: 'Work',
    colors: [['Black', 'White'], ['Navy', 'White'], ['Gray', 'Blue']][i % 3],
    price: 150 + (i * 5),
    brand: ['Hugo Boss', 'Theory', 'Ann Taylor', 'Banana Republic'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Sharp and sophisticated business suit for professional settings.`,
    tags: ['professional', 'formal', 'sophisticated', 'business']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 251,
    name: `Business Casual ${i + 1}`,
    category: 'Business',
    style: 'Smart Casual',
    season: 'All Season',
    occasion: 'Office',
    colors: [['Navy', 'White'], ['Beige', 'Blue'], ['Gray', 'Pink']][i % 3],
    price: 85 + (i * 3),
    brand: ['J.Crew', 'Banana Republic', 'Everlane', 'Uniqlo'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Polished business casual look perfect for modern workplaces.`,
    tags: ['business-casual', 'polished', 'versatile', 'modern']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 301,
    name: `Executive Look ${i + 1}`,
    category: 'Business',
    style: 'Executive',
    season: 'All Season',
    occasion: 'Meeting',
    colors: [['Charcoal', 'White'], ['Navy', 'Cream'], ['Black', 'Gray']][i % 3],
    price: 200 + (i * 8),
    brand: ['Armani', 'Ralph Lauren', 'Brooks Brothers', 'Hugo Boss'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Premium executive attire for high-level business meetings.`,
    tags: ['executive', 'premium', 'authoritative', 'luxury']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 351,
    name: `Creative Professional ${i + 1}`,
    category: 'Business',
    style: 'Creative',
    season: 'All Season',
    occasion: 'Creative Work',
    colors: [['Black', 'White'], ['Burgundy', 'Gray'], ['Forest', 'Tan']][i % 3],
    price: 95 + (i * 4),
    brand: ['COS', 'Acne Studios', 'Ganni', 'Sandro'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Stylish professional wear for creative industries.`,
    tags: ['creative', 'artistic', 'unique', 'professional']
  })),

  // Evening/Formal Outfits (200 items)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 401,
    name: `Cocktail Dress ${i + 1}`,
    category: 'Evening',
    style: 'Elegant',
    season: 'All Season',
    occasion: 'Cocktail Party',
    colors: [['Black'], ['Navy'], ['Burgundy'], ['Emerald']][i % 4],
    price: 120 + (i * 6),
    brand: ['Diane von Furstenberg', 'Ted Baker', 'Reiss', 'Karen Millen'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Sophisticated cocktail dress perfect for evening events.`,
    tags: ['elegant', 'sophisticated', 'evening', 'formal']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 451,
    name: `Formal Gown ${i + 1}`,
    category: 'Evening',
    style: 'Glamorous',
    season: 'All Season',
    occasion: 'Gala',
    colors: [['Black'], ['Navy'], ['Red'], ['Gold']][i % 4],
    price: 250 + (i * 10),
    brand: ['Vera Wang', 'Oscar de la Renta', 'Carolina Herrera', 'Marchesa'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Stunning formal gown for special occasions and galas.`,
    tags: ['glamorous', 'formal', 'luxury', 'special-occasion']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 501,
    name: `Date Night Look ${i + 1}`,
    category: 'Evening',
    style: 'Romantic',
    season: 'All Season',
    occasion: 'Date',
    colors: [['Blush', 'Gold'], ['Black', 'Silver'], ['Wine', 'Rose Gold']][i % 3],
    price: 80 + (i * 4),
    brand: ['Free People', 'Anthropologie', 'Reformation', 'Zimmermann'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Romantic and stylish outfit perfect for date nights.`,
    tags: ['romantic', 'stylish', 'date-night', 'feminine']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 551,
    name: `Party Outfit ${i + 1}`,
    category: 'Evening',
    style: 'Trendy',
    season: 'All Season',
    occasion: 'Party',
    colors: [['Sequin Gold'], ['Metallic Silver'], ['Neon Pink'], ['Electric Blue']][i % 4],
    price: 90 + (i * 5),
    brand: ['ASOS', 'Boohoo', 'PrettyLittleThing', 'Missguided'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Fun and trendy party outfit that stands out.`,
    tags: ['party', 'trendy', 'fun', 'statement']
  })),

  // Seasonal Outfits (200 items)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 601,
    name: `Spring Floral ${i + 1}`,
    category: 'Seasonal',
    style: 'Feminine',
    season: 'Spring',
    occasion: 'Brunch',
    colors: [['Pink', 'Green'], ['Yellow', 'White'], ['Lavender', 'Mint']][i % 3],
    price: 60 + (i * 3),
    brand: ['Kate Spade', 'Tory Burch', 'Marc Jacobs', 'Coach'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Fresh spring outfit with beautiful floral patterns.`,
    tags: ['spring', 'floral', 'feminine', 'fresh']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 651,
    name: `Summer Beach ${i + 1}`,
    category: 'Seasonal',
    style: 'Bohemian',
    season: 'Summer',
    occasion: 'Beach',
    colors: [['Turquoise', 'White'], ['Coral', 'Cream'], ['Sunset Orange', 'Gold']][i % 3],
    price: 45 + (i * 2),
    brand: ['Billabong', 'Roxy', 'Free People', 'Spell & The Gypsy'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Breezy summer outfit perfect for beach days.`,
    tags: ['summer', 'beach', 'bohemian', 'relaxed']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 701,
    name: `Fall Layers ${i + 1}`,
    category: 'Seasonal',
    style: 'Layered',
    season: 'Fall',
    occasion: 'Casual',
    colors: [['Rust', 'Cream'], ['Burgundy', 'Tan'], ['Forest', 'Camel']][i % 3],
    price: 75 + (i * 4),
    brand: ['Madewell', 'Everlane', 'Ganni', 'Acne Studios'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Perfectly layered fall outfit with rich autumn colors.`,
    tags: ['fall', 'layered', 'cozy', 'autumn']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 751,
    name: `Winter Chic ${i + 1}`,
    category: 'Seasonal',
    style: 'Sophisticated',
    season: 'Winter',
    occasion: 'City',
    colors: [['Black', 'Gray'], ['Navy', 'Camel'], ['Charcoal', 'Cream']][i % 3],
    price: 120 + (i * 6),
    brand: ['Max Mara', 'The Row', 'Toteme', 'Lemaire'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Chic winter outfit that combines warmth with style.`,
    tags: ['winter', 'chic', 'warm', 'sophisticated']
  })),

  // Street Style Outfits (200 items)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 801,
    name: `Urban Edge ${i + 1}`,
    category: 'Street',
    style: 'Edgy',
    season: 'All Season',
    occasion: 'Street',
    colors: [['Black', 'White'], ['Gray', 'Red'], ['Black', 'Neon']][i % 3],
    price: 70 + (i * 3),
    brand: ['Off-White', 'Supreme', 'Stussy', 'Fear of God'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Bold street style with urban edge and attitude.`,
    tags: ['street', 'edgy', 'urban', 'bold']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 851,
    name: `Vintage Inspired ${i + 1}`,
    category: 'Street',
    style: 'Vintage',
    season: 'All Season',
    occasion: 'Creative',
    colors: [['Mustard', 'Brown'], ['Rust', 'Cream'], ['Olive', 'Tan']][i % 3],
    price: 55 + (i * 3),
    brand: ['Urban Outfitters', 'Vintage', 'Thrifted', 'American Apparel'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Vintage-inspired street style with retro charm.`,
    tags: ['vintage', 'retro', 'unique', 'creative']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 901,
    name: `Minimalist Street ${i + 1}`,
    category: 'Street',
    style: 'Minimalist',
    season: 'All Season',
    occasion: 'Everyday',
    colors: [['White', 'Black'], ['Gray', 'White'], ['Beige', 'Black']][i % 3],
    price: 65 + (i * 3),
    brand: ['COS', 'Arket', 'Uniqlo', 'Everlane'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Clean minimalist street style with perfect proportions.`,
    tags: ['minimalist', 'clean', 'modern', 'simple']
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 951,
    name: `Hypebeast Look ${i + 1}`,
    category: 'Street',
    style: 'Hypebeast',
    season: 'All Season',
    occasion: 'Street',
    colors: [['Neon', 'Black'], ['White', 'Red'], ['Multi-Color']][i % 3],
    price: 150 + (i * 8),
    brand: ['Balenciaga', 'Vetements', 'Yeezy', 'Travis Scott'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `High-end streetwear with hypebeast appeal.`,
    tags: ['hypebeast', 'streetwear', 'luxury', 'trendy']
  })),

  // Additional categories to reach 1000+
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 1001,
    name: `Boho Chic ${i + 1}`,
    category: 'Bohemian',
    style: 'Bohemian',
    season: ['Spring', 'Summer'][i % 2],
    occasion: 'Festival',
    colors: [['Earth Tones'], ['Jewel Tones'], ['Sunset Colors']][i % 3],
    price: 80 + (i * 4),
    brand: ['Free People', 'Spell', 'Zimmermann', 'For Love & Lemons'][i % 4],
    image: `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400`,
    description: `Free-spirited bohemian outfit with artistic flair.`,
    tags: ['bohemian', 'free-spirited', 'artistic', 'festival']
  }))
];

// Enrich items with per-id unique images and simple galleries to avoid visual duplication.
const makeGallery = (id: number): string[] => [
  `https://picsum.photos/seed/${id}-a/1200/800`,
  `https://picsum.photos/seed/${id}-b/1200/800`,
  `https://picsum.photos/seed/${id}-c/1200/800`,
];

outfits.forEach((item) => {
  const gallery = makeGallery(item.id);
  item.images = gallery;
  item.image = gallery[0];
});

// Add a few image variants per item to enable thumbnails in the viewer
const makeVariants = (base: string): string[] => {
  const sizes = [400, 800, 1200];
  const variants = sizes.map((w) => base.replace(/([?&])w=\d+/, `$1w=${w}`));
  return Array.from(new Set(variants));
};

[1, 2, 3, 4, 51, 52, 101, 151].forEach((id) => {
  const item = outfits.find((o) => o.id === id);
  if (item) {
    item.images = makeVariants(item.image);
  }
});
