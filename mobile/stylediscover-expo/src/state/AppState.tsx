/*
 * File: mobile/stylediscover-expo/src/state/AppState.tsx
 * Purpose: Shared React context to store favorites, cart, and quiz preferences with AsyncStorage persistence.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Cart = Record<number, number>;

interface AppStateValue {
  favorites: Set<number>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<number>>>;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  quizCategories: Set<string>; // lowercased
  setQuizCategories: React.Dispatch<React.SetStateAction<Set<string>>>;
  quizColors: Set<string>; // lowercased
  setQuizColors: React.Dispatch<React.SetStateAction<Set<string>>>;
  quizStyles: Set<string>;
  setQuizStyles: React.Dispatch<React.SetStateAction<Set<string>>>;
  quizSeasons: Set<string>;
  setQuizSeasons: React.Dispatch<React.SetStateAction<Set<string>>>;
  quizOccasions: Set<string>;
  setQuizOccasions: React.Dispatch<React.SetStateAction<Set<string>>>;
  quizCompleted: boolean;
  setQuizCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<Cart>({});
  const [quizCategories, setQuizCategories] = useState<Set<string>>(new Set());
  const [quizColors, setQuizColors] = useState<Set<string>>(new Set());
  const [quizStyles, setQuizStyles] = useState<Set<string>>(new Set());
  const [quizSeasons, setQuizSeasons] = useState<Set<string>>(new Set());
  const [quizOccasions, setQuizOccasions] = useState<Set<string>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Load persisted data
  useEffect(() => {
    (async () => {
      try {
        const favRaw = await AsyncStorage.getItem('sd_favorites');
        if (favRaw) setFavorites(new Set(JSON.parse(favRaw)));
        const cartRaw = await AsyncStorage.getItem('sd_cart');
        if (cartRaw) setCart(JSON.parse(cartRaw));
        const catRaw = await AsyncStorage.getItem('sd_quiz_categories');
        if (catRaw) setQuizCategories(new Set(JSON.parse(catRaw)));
        const colRaw = await AsyncStorage.getItem('sd_quiz_colors');
        if (colRaw) setQuizColors(new Set(JSON.parse(colRaw)));
        const styRaw = await AsyncStorage.getItem('sd_quiz_styles');
        if (styRaw) setQuizStyles(new Set(JSON.parse(styRaw)));
        const seaRaw = await AsyncStorage.getItem('sd_quiz_seasons');
        if (seaRaw) setQuizSeasons(new Set(JSON.parse(seaRaw)));
        const occRaw = await AsyncStorage.getItem('sd_quiz_occasions');
        if (occRaw) setQuizOccasions(new Set(JSON.parse(occRaw)));
        const doneRaw = await AsyncStorage.getItem('sd_quiz_completed');
        if (doneRaw) setQuizCompleted(JSON.parse(doneRaw) === true);
      } catch {}
    })();
  }, []);

  // Persist changes
  useEffect(() => {
    try { AsyncStorage.setItem('sd_favorites', JSON.stringify(Array.from(favorites))); } catch {}
  }, [favorites]);

  useEffect(() => {
    try { AsyncStorage.setItem('sd_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { AsyncStorage.setItem('sd_quiz_categories', JSON.stringify(Array.from(quizCategories))); } catch {}
  }, [quizCategories]);

  useEffect(() => {
    try { AsyncStorage.setItem('sd_quiz_colors', JSON.stringify(Array.from(quizColors))); } catch {}
  }, [quizColors]);

  useEffect(() => {
    try { AsyncStorage.setItem('sd_quiz_styles', JSON.stringify(Array.from(quizStyles))); } catch {}
  }, [quizStyles]);

  useEffect(() => {
    try { AsyncStorage.setItem('sd_quiz_seasons', JSON.stringify(Array.from(quizSeasons))); } catch {}
  }, [quizSeasons]);

  useEffect(() => {
    try { AsyncStorage.setItem('sd_quiz_occasions', JSON.stringify(Array.from(quizOccasions))); } catch {}
  }, [quizOccasions]);

  useEffect(() => {
    try { AsyncStorage.setItem('sd_quiz_completed', JSON.stringify(quizCompleted)); } catch {}
  }, [quizCompleted]);

  const value = useMemo<AppStateValue>(() => ({
    favorites,
    setFavorites,
    cart,
    setCart,
    quizCategories,
    setQuizCategories,
    quizColors,
    setQuizColors,
    quizStyles,
    setQuizStyles,
    quizSeasons,
    setQuizSeasons,
    quizOccasions,
    setQuizOccasions,
    quizCompleted,
    setQuizCompleted,
  }), [favorites, cart, quizCategories, quizColors, quizCompleted]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
