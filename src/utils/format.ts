/*
 * File: src/utils/format.ts
 * Purpose: Formatting utilities for the web app (e.g., INR currency formatting).
 */
export const formatINR = (amount: number): string => {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  } catch {
    // Fallback
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  }
};
