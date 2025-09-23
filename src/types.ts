/*
 * File: src/types.ts
 * Purpose: Shared TypeScript interfaces for the web app (and mirrored in mobile shared data).
 * Notes:
 * - Outfit supports optional gallery images and extra details used across components.
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
  // Optional multiple images support for richer product galleries
  images?: string[];
  description: string;
  tags: string[];
  // Extra details
  rating?: number; // 1-5
  sizes?: string[]; // e.g., ['S','M','L']
  material?: string; // e.g., 'Cotton Blend'
  sku?: string; // stock keeping unit
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  images?: string[];
}

export interface StyleResult {
  type: string;
  title: string;
  description: string;
  traits: string[];
  recommendations: string[];
  outfitTypes: string[];
  colors: string[];
  image: string;
}

export interface FilterOptions {
  category: string;
  style: string;
  season: string;
  occasion: string;
  priceRange: [number, number];
  colors: string[];
}