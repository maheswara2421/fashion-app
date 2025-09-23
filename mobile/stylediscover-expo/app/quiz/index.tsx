/*
 * File: mobile/stylediscover-expo/app/quiz/index.tsx
 * Purpose: Dedicated quiz screen to collect style preferences (categories/colors) and update shared AppState.
 */
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppState } from '../../src/state/AppState';
import { outfits as data } from '../../src/shared/outfits';
import { Check, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react-native';

const CATEGORIES = ['Casual','Business','Evening','Seasonal','Street','Activewear','Bohemian'];
const STYLES = ['Relaxed','Professional','Elegant','Sporty','Edgy','Minimalist','Bohemian','Vintage','Trendy'];
const SEASONS = ['Spring','Summer','Fall','Winter','All Season'];
const OCCASIONS = ['Everyday','Work','Party','Date','Beach','Gym','Festival','Meeting','Vacation'];
const COLORS = ['Black','White','Gray','Navy','Blue','Red','Pink','Green','Yellow','Brown','Beige'];

export default function QuizScreen() {
  const router = useRouter();
  const { quizCategories, quizColors, setQuizCategories, setQuizColors, quizStyles, setQuizStyles, quizSeasons, setQuizSeasons, quizOccasions, setQuizOccasions, setQuizCompleted } = useAppState();

  const [localCats, setLocalCats] = useState<Set<string>>(new Set(quizCategories));
  const [localCols, setLocalCols] = useState<Set<string>>(new Set(quizColors));
  const [localStyles, setLocalStyles] = useState<Set<string>>(new Set(quizStyles));
  const [localSeasons, setLocalSeasons] = useState<Set<string>>(new Set(quizSeasons));
  const [localOccasions, setLocalOccasions] = useState<Set<string>>(new Set(quizOccasions));
  const steps = ['Categories','Styles','Seasons','Occasions','Colors'] as const;
  const [step, setStep] = useState(0);

  // Build representative thumbnails for each option from dataset
  const catThumb = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach(o => {
      const k = o.category.toLowerCase();
      if (!map.has(k)) map.set(k, o.image);
    });
    return map;
  }, []);
  const styleThumb = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach(o => {
      const k = o.style.toLowerCase();
      if (!map.has(k)) map.set(k, o.image);
    });
    return map;
  }, []);
  const seasonThumb = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach(o => {
      const k = o.season.toLowerCase();
      if (!map.has(k)) map.set(k, o.image);
    });
    return map;
  }, []);
  const occasionThumb = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach(o => {
      const k = o.occasion.toLowerCase();
      if (!map.has(k)) map.set(k, o.image);
    });
    return map;
  }, []);

  const catList = useMemo(() => CATEGORIES.map(c => ({
    key: c,
    active: localCats.has(c.toLowerCase()),
  })), [localCats]);

  const colorList = useMemo(() => COLORS.map(c => ({
    key: c,
    active: localCols.has(c.toLowerCase()),
  })), [localCols]);

  const styleList = useMemo(() => STYLES.map(s => ({ key: s, active: localStyles.has(s.toLowerCase()) })), [localStyles]);
  const seasonList = useMemo(() => SEASONS.map(s => ({ key: s, active: localSeasons.has(s.toLowerCase()) })), [localSeasons]);
  const occasionList = useMemo(() => OCCASIONS.map(o => ({ key: o, active: localOccasions.has(o.toLowerCase()) })), [localOccasions]);

  const toggleCat = (c: string) => setLocalCats(prev => { const n = new Set(prev); const k=c.toLowerCase(); n.has(k)?n.delete(k):n.add(k); return n; });
  const toggleCol = (c: string) => setLocalCols(prev => { const n = new Set(prev); const k=c.toLowerCase(); n.has(k)?n.delete(k):n.add(k); return n; });
  const toggleStyle = (s: string) => setLocalStyles(prev => { const n = new Set(prev); const k=s.toLowerCase(); n.has(k)?n.delete(k):n.add(k); return n; });
  const toggleSeason = (s: string) => setLocalSeasons(prev => { const n = new Set(prev); const k=s.toLowerCase(); n.has(k)?n.delete(k):n.add(k); return n; });
  const toggleOccasion = (o: string) => setLocalOccasions(prev => { const n = new Set(prev); const k=o.toLowerCase(); n.has(k)?n.delete(k):n.add(k); return n; });

  const apply = () => {
    setQuizCategories(new Set(localCats));
    setQuizStyles(new Set(localStyles));
    setQuizSeasons(new Set(localSeasons));
    setQuizOccasions(new Set(localOccasions));
    setQuizColors(new Set(localCols));
    setQuizCompleted(true);
    router.replace('/feed');
  };

  const clearAll = () => {
    setLocalCats(new Set());
    setLocalStyles(new Set());
    setLocalSeasons(new Set());
    setLocalOccasions(new Set());
    setLocalCols(new Set());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text className="text-4xl font-extrabold mb-2">Style Quiz</Text>
        <Text className="text-gray-600 text-lg">Tell us your preferences. You can adjust later.</Text>
        {/* Progress */}
        <View className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <View className="h-2 bg-purple-600" style={{ width: `${((step+1)/steps.length)*100}%` }} />
        </View>
        <Text className="mt-2 text-xs text-gray-500">Step {step+1} of {steps.length} • {steps[step]}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {step === 0 && (
          <>
            <Text className="text-2xl font-bold mb-4">Categories</Text>
            <View className="flex-row flex-wrap mb-8 -mx-1">
              {catList.map(({ key, active }) => {
                const uri = catThumb.get(key.toLowerCase());
                return (
                  <Pressable key={key} onPress={() => toggleCat(key)} className="w-1/2 px-1 mb-2">
                    <View className={`rounded-xl overflow-hidden ${active? 'ring-2 ring-purple-600':''}`}>
                      {uri ? (
                        <Image source={{ uri }} style={{ width: '100%', height: 120 }} resizeMode="cover" />
                      ) : (
                        <View style={{ height: 120 }} className="bg-gray-100" />
                      )}
                      <View className={`absolute inset-0 ${active? 'bg-black/20':''}`} />
                      <View className="absolute bottom-2 left-2 px-3 py-1.5 bg-black/50 rounded-lg">
                        <Text className="text-white text-lg">{key}</Text>
                      </View>
                      {/* Like / Dislike controls */}
                      <View className="absolute top-2 left-2 flex-row gap-2">
                        <Pressable onPress={() => { const k = key; setLocalCats(prev => { const n=new Set(prev); n.delete(k.toLowerCase()); return n; }); }} className="bg-white/90 rounded-full p-2">
                          <ThumbsDown size={20} color="#ef4444" />
                        </Pressable>
                      </View>
                      <View className="absolute top-2 right-2 flex-row gap-2">
                        <Pressable onPress={() => { const k = key; setLocalCats(prev => { const n=new Set(prev); n.add(k.toLowerCase()); return n; }); }} className="bg-white/90 rounded-full p-2">
                          <ThumbsUp size={20} color="#22c55e" />
                        </Pressable>
                      </View>
                      {active && (
                        <View className="absolute bottom-2 right-2 bg-white rounded-full p-2">
                          <Check size={18} color="#16a34a" />
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
        {step === 1 && (
          <>
            <Text className="text-2xl font-bold mb-4">Styles</Text>
            <View className="flex-row flex-wrap mb-8 -mx-1">
              {styleList.map(({ key, active }) => {
                const uri = styleThumb.get(key.toLowerCase());
                return (
                  <Pressable key={key} onPress={() => toggleStyle(key)} className="w-1/2 px-1 mb-2">
                    <View className={`rounded-xl overflow-hidden ${active? 'ring-2 ring-blue-600':''}`}>
                      {uri ? (
                        <Image source={{ uri }} style={{ width: '100%', height: 120 }} resizeMode="cover" />
                      ) : (
                        <View style={{ height: 120 }} className="bg-gray-100" />
                      )}
                      <View className={`absolute inset-0 ${active? 'bg-black/20':''}`} />
                      <View className="absolute bottom-2 left-2 px-3 py-1.5 bg-black/50 rounded-lg">
                        <Text className="text-white text-lg">{key}</Text>
                      </View>
                      {/* Like / Dislike controls */}
                      <View className="absolute top-2 left-2 flex-row gap-2">
                        <Pressable onPress={() => { const k = key; setLocalStyles(prev => { const n=new Set(prev); n.delete(k.toLowerCase()); return n; }); }} className="bg-white/90 rounded-full p-2">
                          <ThumbsDown size={20} color="#ef4444" />
                        </Pressable>
                      </View>
                      <View className="absolute top-2 right-2 flex-row gap-2">
                        <Pressable onPress={() => { const k = key; setLocalStyles(prev => { const n=new Set(prev); n.add(k.toLowerCase()); return n; }); }} className="bg-white/90 rounded-full p-2">
                          <ThumbsUp size={20} color="#22c55e" />
                        </Pressable>
                      </View>
                      {active && (
                        <View className="absolute bottom-2 right-2 bg-white rounded-full p-2">
                          <Check size={18} color="#16a34a" />
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
        {step === 2 && (
          <>
            <Text className="text-2xl font-bold mb-4">Seasons</Text>
            <View className="flex-row flex-wrap mb-8 -mx-1">
              {seasonList.map(({ key, active }) => {
                const uri = seasonThumb.get(key.toLowerCase());
                return (
                  <Pressable key={key} onPress={() => toggleSeason(key)} className="w-1/2 px-1 mb-2">
                    <View className={`rounded-xl overflow-hidden ${active? 'ring-2 ring-emerald-600':''}`}>
                      {uri ? (
                        <Image source={{ uri }} style={{ width: '100%', height: 120 }} resizeMode="cover" />
                      ) : (
                        <View style={{ height: 120 }} className="bg-gray-100" />
                      )}
                      <View className={`absolute inset-0 ${active? 'bg-black/20':''}`} />
                      <View className="absolute bottom-2 left-2 px-3 py-1.5 bg-black/50 rounded-lg">
                        <Text className="text-white text-lg">{key}</Text>
                      </View>
                      {/* Like / Dislike controls */}
                      <View className="absolute top-2 left-2 flex-row gap-2">
                        <Pressable onPress={() => { const k = key; setLocalSeasons(prev => { const n=new Set(prev); n.delete(k.toLowerCase()); return n; }); }} className="bg-white/90 rounded-full p-2">
                          <ThumbsDown size={20} color="#ef4444" />
                        </Pressable>
                      </View>
                      <View className="absolute top-2 right-2 flex-row gap-2">
                        <Pressable onPress={() => { const k = key; setLocalSeasons(prev => { const n=new Set(prev); n.add(k.toLowerCase()); return n; }); }} className="bg-white/90 rounded-full p-2">
                          <ThumbsUp size={20} color="#22c55e" />
                        </Pressable>
                      </View>
                      {active && (
                        <View className="absolute bottom-2 right-2 bg-white rounded-full p-2">
                          <Check size={18} color="#16a34a" />
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
        {step === 3 && (
          <>
            <Text className="text-2xl font-bold mb-4">Occasions</Text>
            <View className="flex-row flex-wrap mb-8 -mx-1">
              {occasionList.map(({ key, active }) => {
                const uri = occasionThumb.get(key.toLowerCase());
                return (
                  <Pressable key={key} onPress={() => toggleOccasion(key)} className="w-1/2 px-1 mb-2">
                    <View className={`rounded-xl overflow-hidden ${active? 'ring-2 ring-orange-600':''}`}>
                      {uri ? (
                        <Image source={{ uri }} style={{ width: '100%', height: 120 }} resizeMode="cover" />
                      ) : (
                        <View style={{ height: 120 }} className="bg-gray-100" />
                      )}
                      <View className={`absolute inset-0 ${active? 'bg-black/20':''}`} />
                      <View className="absolute bottom-2 left-2 px-3 py-1.5 bg-black/50 rounded-lg">
                        <Text className="text-white text-lg">{key}</Text>
                      </View>
                      {/* Like / Dislike controls */}
                      <View className="absolute top-2 left-2 flex-row gap-2">
                        <Pressable onPress={() => { const k = key; setLocalOccasions(prev => { const n=new Set(prev); n.delete(k.toLowerCase()); return n; }); }} className="bg-white/90 rounded-full p-2">
                          <ThumbsDown size={20} color="#ef4444" />
                        </Pressable>
                      </View>
                      <View className="absolute top-2 right-2 flex-row gap-2">
                        <Pressable onPress={() => { const k = key; setLocalOccasions(prev => { const n=new Set(prev); n.add(k.toLowerCase()); return n; }); }} className="bg-white/90 rounded-full p-2">
                          <ThumbsUp size={20} color="#22c55e" />
                        </Pressable>
                      </View>
                      {active && (
                        <View className="absolute bottom-2 right-2 bg-white rounded-full p-2">
                          <Check size={18} color="#16a34a" />
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
        {step === 4 && (
          <>
            <Text className="text-2xl font-bold mb-4">Colors</Text>
            <View className="flex-row flex-wrap mb-8 -mx-1">
              {colorList.map(({ key, active }) => (
                <Pressable key={key} onPress={() => toggleCol(key)} className="w-1/3 px-1 mb-2">
                  <View className={`rounded-xl h-24 items-center justify-center ${active? 'ring-2 ring-pink-600':''}`} style={{ backgroundColor: '#f3f4f6' }}>
                    <Text className={`${active? 'text-pink-700':'text-gray-700'} text-lg`}>{key}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </>
        )}

        <View className="flex-row justify-between gap-3 items-center">
          <Pressable onPress={() => setStep(s => Math.max(0, s-1))} disabled={step===0} className={`px-6 py-4 rounded-full flex-row items-center border-2 ${step===0? 'bg-gray-100 border-gray-200':'bg-gray-200 border-gray-400'}`}>
            <ChevronLeft size={22} color={step===0? '#9ca3af':'#111827'} />
            <Text className={`ml-2 ${step===0? 'text-gray-400':'text-gray-800'} text-xl`}>Back</Text>
          </Pressable>
          <View className="flex-row gap-3">
            <Pressable onPress={clearAll} className="px-6 py-4 bg-gray-100 rounded-full border-2 border-gray-400">
              <Text className="text-lg">Clear</Text>
            </Pressable>
            {step < steps.length - 1 ? (
              <Pressable onPress={() => setStep(s => Math.min(steps.length-1, s+1))} className="px-6 py-4 bg-purple-600 rounded-full border-2 border-purple-700 flex-row items-center">
                <Text className="text-white mr-2 text-xl">Next</Text>
                <ChevronRight size={22} color="#fff" />
              </Pressable>
            ) : (
              <Pressable onPress={apply} className="px-6 py-4 bg-purple-600 rounded-full border-2 border-purple-700 flex-row items-center">
                <Text className="text-white mr-2 text-xl">Finish</Text>
                <Check size={22} color="#fff" />
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
