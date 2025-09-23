/*
 * File: mobile/stylediscover-expo/app/feed/index.tsx
 * Purpose: One-by-one product feed across categories with like/dislike.
 */
import React, { useMemo, useState } from 'react';
import { View, Text, Image, Pressable, SafeAreaView, Dimensions, Modal, TouchableOpacity, Share } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useAppState } from '../../src/state/AppState';
import { outfits as data } from '../../src/shared/outfits';
import { Outfit } from '../../src/shared/types';
import { useRouter } from 'expo-router';

function interleaveByCategory(items: Outfit[]): Outfit[] {
  const byCat = new Map<string, Outfit[]>();
  items.forEach(o => {
    const k = o.category.toLowerCase();
    if (!byCat.has(k)) byCat.set(k, []);
    byCat.get(k)!.push(o);
  });
  const cats = Array.from(byCat.keys());
  let done = false;
  let i = 0;
  const out: Outfit[] = [];
  while (!done) {
    done = true;
    for (const c of cats) {
      const arr = byCat.get(c)!;
      if (i < arr.length) {
        out.push(arr[i]);
        done = false;
      }
    }
    i++;
  }
  return out;
}

export default function FeedScreen() {
  const router = useRouter();
  const { favorites, setFavorites, cart, setCart, quizCategories, quizStyles, quizSeasons, quizOccasions, quizColors, quizCompleted } = useAppState();

  const filtered = useMemo(() => {
    return data.filter(o => {
      const catOk = quizCategories.size === 0 || quizCategories.has(o.category.toLowerCase());
      const styOk = quizStyles.size === 0 || quizStyles.has(o.style.toLowerCase());
      const seaOk = quizSeasons.size === 0 || quizSeasons.has(o.season.toLowerCase());
      const occOk = quizOccasions.size === 0 || quizOccasions.has(o.occasion.toLowerCase());
      const colOk = quizColors.size === 0 || o.colors.some(c => quizColors.has(c.toLowerCase()));
      return catOk && styOk && seaOk && occOk && colOk;
    });
  }, [quizCategories, quizStyles, quizSeasons, quizOccasions, quizColors]);

  const ordered = useMemo(() => interleaveByCategory(filtered), [filtered]);
  const [idx, setIdx] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  // Gestures removed per request; keep simple fade-in for card transitions
  const opacity = useSharedValue(1);

  const current = ordered[idx];
  const width = Dimensions.get('window').width;

  if (!quizCompleted) {
    router.replace('/quiz');
    return null;
  }

  if (!current) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text className="text-lg font-semibold mb-2">You are all caught up</Text>
        <Text className="text-gray-500 mb-6 text-center">No more outfits match your preferences. Update your quiz to see more.</Text>
        <Pressable onPress={() => router.push('/quiz')} className="px-4 py-3 bg-purple-600 rounded-xl">
          <Text className="text-white">Refine Preferences</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const advance = () => setIdx(i => Math.min(ordered.length, i + 1));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text className="text-3xl font-extrabold">For You</Text>
        <Pressable onPress={() => router.push('/quiz')} className="px-5 py-3 bg-gray-100 rounded-full border-2 border-gray-300">
          <Text className="text-2xl">Adjust</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Animated.View style={[{ width: width - 32, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 2 }, cardStyle]}>
          <Image source={{ uri: current.image }} style={{ width: '100%', height: width - 32 }} resizeMode="cover" />
          <View style={{ padding: 12 }}>
            <Text className="text-3xl font-extrabold">{current.name}</Text>
            <Text className="text-gray-600 mt-2 text-2xl">{current.description}</Text>
            <Text className="text-purple-600 font-extrabold mt-3 text-2xl">₹{Math.round(current.price)}</Text>
            <View className="flex-row flex-wrap gap-2 mt-3">
              {current.colors.slice(0,3).map((c, i) => (
                <Text key={i} className="text-lg bg-gray-100 rounded-full px-3 py-1.5 mr-2 mb-2">{c}</Text>
              ))}
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 24, paddingBottom: 24 }}>
        <Pressable onPress={advance} className="px-10 py-4 bg-purple-600 rounded-full border-2 border-purple-700">
          <Text className="text-white text-2xl">Next</Text>
        </Pressable>
        <Pressable onPress={() => setInfoOpen(true)} className="px-8 py-4 bg-gray-100 rounded-full border-2 border-gray-300">
          <Text className="text-gray-700 text-2xl">Details</Text>
        </Pressable>
      </View>

      {/* Info Sheet */}
      <Modal visible={infoOpen} transparent animationType="slide" onRequestClose={() => setInfoOpen(false)}>
        <Pressable onPress={() => setInfoOpen(false)} style={{ flex:1, backgroundColor:'rgba(0,0,0,0.4)' }} />
        <View style={{ position:'absolute', bottom:0, left:0, right:0, backgroundColor:'#fff', borderTopLeftRadius:16, borderTopRightRadius:16, maxHeight:'70%' }}>
          <View style={{ padding: 16 }}>
            <Text className="text-2xl font-extrabold mb-1">{current.name}</Text>
            <Text className="text-gray-600 mb-3 text-lg">{current.brand}</Text>
            <Image source={{ uri: current.image }} style={{ width: '100%', height: 240, borderRadius: 12 }} resizeMode="cover" />
            <Text className="mt-3 text-gray-700 text-lg">{current.description}</Text>
            <Text className="mt-3 text-purple-600 font-extrabold text-2xl">₹{Math.round(current.price)}</Text>
            <View className="flex-row gap-3 mt-10 items-center">
              <TouchableOpacity onPress={() => { setCart(prev => ({ ...prev, [current.id]: (prev[current.id] || 0) + 1 })); }} className="flex-1">
                <View className="bg-purple-600 rounded-full py-4 border-2 border-purple-700"><Text className="text-white text-center text-xl">Add to Cart</Text></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={async () => { try { await Share.share({ title: current.name, message: `${current.name} - ${current.description}` }); } catch {} }}>
                <View className="px-6 py-4 bg-gray-100 rounded-full border-2 border-gray-300"><Text className="text-lg">Share</Text></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
