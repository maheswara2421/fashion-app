/*
 * File: mobile/stylediscover-expo/src/shared/types.ts
 * Purpose: TypeScript interfaces mirrored from the web app for RN usage.
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
  rating?: number;
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
