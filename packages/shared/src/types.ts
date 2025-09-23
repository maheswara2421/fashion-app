/*
 * File: packages/shared/src/types.ts
 * Purpose: TypeScript interfaces shared across workspaces (web/mobile).
 */
export interface Outfit {
  id: number;
  name: string;
  category: string;
  style: string;
  season: string;
  occasion: string;
  colors: string[];
  price: number;
  brand: string;
  image: string;
  images?: string[];
  description: string;
  tags: string[];
}

export interface FilterOptions {
  category: string;
  style: string;
  season: string;
  occasion: string;
  priceRange: [number, number];
  colors: string[];
}
