/*
 * File: mobile/stylediscover-expo/app/index.tsx
 * Purpose: Home screen for Expo Router. Lists outfits and opens a full-screen image viewer.
 * Notes:
 * - Uses NativeWind classes via className for styling on RN components.
 * - Data resides in src/shared/ to mirror web dataset structure.
 * - Expo SDK 51 + RN 0.74; entry configured via package.json main: "expo-router/entry".
 */
import 'react-native-gesture-handler';
import React, { useState, useMemo, useRef } from 'react';
import { View, Text, FlatList, Image, Pressable, TextInput, Modal, TouchableOpacity, Share, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomImageViewer from '../src/components/CustomImageViewer';
import { outfits as data } from '../src/shared/outfits';
import { Outfit } from '../src/shared/types';
import { useAppState } from '../src/state/AppState';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { favorites, setFavorites, cart, setCart, quizCategories, quizColors, quizStyles, quizSeasons, quizOccasions, setQuizCategories, setQuizColors, setQuizStyles, setQuizSeasons, setQuizOccasions } = useAppState();
  const [search, setSearch] = useState('');
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerImages, setViewerImages] = useState<{ uri: string }[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [viewerItem, setViewerItem] = useState<Outfit | null>(null);
  type Toast = { message: string; actionLabel?: string; onAction?: () => void } | null;
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const showToast = (t: string | { message: string; actionLabel?: string; onAction?: () => void }) => {
    const next: Toast = typeof t === 'string' ? { message: t } : t;
    setToast(next);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1500);
  };
  const [cartPulse, setCartPulse] = useState(false);

  const outfits = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter(o =>
      o.name.toLowerCase().includes(term) ||
      o.description.toLowerCase().includes(term) ||
      o.tags.some(t => t.toLowerCase().includes(term))
    );
  }, [search]);

  const filtered = useMemo(() => {
    return outfits.filter((o) => {
      const matchesCategory = quizCategories.size === 0 || quizCategories.has(o.category.toLowerCase());
      const matchesStyle = quizStyles.size === 0 || quizStyles.has(o.style.toLowerCase());
      const matchesSeason = quizSeasons.size === 0 || quizSeasons.has(o.season.toLowerCase());
      const matchesOccasion = quizOccasions.size === 0 || quizOccasions.has(o.occasion.toLowerCase());
      const matchesColor = quizColors.size === 0 || o.colors.some(c => quizColors.has(c.toLowerCase()));
      return matchesCategory && matchesStyle && matchesSeason && matchesOccasion && matchesColor;
    });
  }, [outfits, quizCategories, quizStyles, quizSeasons, quizOccasions, quizColors]);

  const openViewer = (outfit: Outfit) => {
    const imgs = (outfit.images && outfit.images.length > 0 ? outfit.images : [outfit.image])
      .map(uri => ({ uri }));
    setViewerImages(imgs);
    setViewerIndex(0);
    setViewerVisible(true);
    setViewerItem(outfit);
  };

  const renderItem = ({ item }: { item: Outfit }) => (
    <Pressable
      onPress={() => openViewer(item)}
      className="bg-white rounded-2xl overflow-hidden shadow mx-2 my-3 w-[48%]"
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: '100%', aspectRatio: 1 }}
        resizeMode="cover"
      />
      <View className="p-3 gap-2">
        <Text className="font-semibold text-base text-left" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-gray-500 text-xs text-left" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-purple-600 font-semibold">₹{Math.round(item.price)}</Text>
          <View className="flex-row items-center">
            <Text className="text-[11px] text-gray-500">{String(item.rating ?? 4.0)}</Text>
          </View>
        </View>
        <View className="flex-row gap-2 mt-2">
          <Pressable
            onPress={() => { setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 })); showToast('Added to cart'); setCartPulse(true); setTimeout(() => setCartPulse(false), 220); }}
            className="flex-1 bg-purple-600 rounded-lg py-2"
          >
            <Text className="text-white text-center text-sm">Add to Cart</Text>
          </Pressable>
          <Pressable
            onPress={async () => {
              try { await Share.share({ title: item.name, message: `${item.name} - ${item.description}` }); } catch {}
            }}
            className="w-10 bg-gray-100 rounded-lg items-center justify-center"
          >
            <Text>↗</Text>
          </Pressable>
          <Pressable
            onPress={() => setFavorites(prev => { const n = new Set(prev); if (n.has(item.id)) { n.delete(item.id); showToast({ message: 'Removed from favorites', actionLabel: 'Undo', onAction: () => setFavorites(p => new Set(p).add(item.id)) }); } else { n.add(item.id); showToast('Added to favorites'); } return n; })}
            className="w-10 bg-gray-100 rounded-lg items-center justify-center"
          >
            <Text style={{ color: favorites.has(item.id) ? 'red' : '#555' }}>♥</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="px-4 pb-2 pt-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold">StyleDiscover</Text>
          <View className="flex-row items-center">
            <Pressable onPress={() => router.push('/quiz')} className="px-3 py-2 bg-purple-600 rounded-lg">
              <Text className="text-white text-sm">Take Quiz</Text>
            </Pressable>
            <Pressable onPress={() => setCartOpen(true)} className="ml-2 px-3 py-2 bg-gray-100 rounded-lg">
              <Text className="text-sm">Cart ({Object.values(cart).reduce((a,b)=>a+b,0)})</Text>
            </Pressable>
          </View>
        </View>
        <TextInput
          placeholder="Search outfits..."
          value={search}
          onChangeText={setSearch}
          className="mt-3 px-4 py-3 rounded-xl bg-gray-100"
        />
      </View>

      {/* Quiz preferences banner */}
      {(quizCategories.size>0 || quizStyles.size>0 || quizSeasons.size>0 || quizOccasions.size>0 || quizColors.size>0) && (
        <View className="mx-4 mb-2 bg-purple-50 rounded-xl p-3">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-purple-700 text-xs">
              Your style preferences are applied
              {quizCategories.size>0 ? ` • ${quizCategories.size} cat` : ''}
              {quizStyles.size>0 ? ` • ${quizStyles.size} styles` : ''}
              {quizSeasons.size>0 ? ` • ${quizSeasons.size} seasons` : ''}
              {quizOccasions.size>0 ? ` • ${quizOccasions.size} occasions` : ''}
              {quizColors.size>0 ? ` • ${quizColors.size} colors` : ''}
            </Text>
            <Pressable
              onPress={() => {
                setQuizCategories(new Set());
                setQuizStyles(new Set());
                setQuizSeasons(new Set());
                setQuizOccasions(new Set());
                setQuizColors(new Set());
              }}
              className="px-3 py-1 bg-purple-100 rounded-lg"
            >
              <Text className="text-purple-700 text-xs">Clear</Text>
            </Pressable>
          </View>
          {/* Active selection chips */}
          <View className="flex-row flex-wrap gap-2">
            {Array.from(quizCategories).slice(0,8).map((c) => (
              <Pressable key={`cat-${c}`} onPress={() => setQuizCategories(prev => { const n = new Set(prev); n.delete(c); return n; })} className="px-2 py-1 bg-white rounded-full border border-purple-200">
                <Text className="text-[11px] text-purple-700">{c} ×</Text>
              </Pressable>
            ))}
            {Array.from(quizStyles).slice(0,8).map((s) => (
              <Pressable key={`sty-${s}`} onPress={() => setQuizStyles(prev => { const n = new Set(prev); n.delete(s); return n; })} className="px-2 py-1 bg-white rounded-full border border-blue-200">
                <Text className="text-[11px] text-blue-700">{s} ×</Text>
              </Pressable>
            ))}
            {Array.from(quizSeasons).slice(0,8).map((s) => (
              <Pressable key={`sea-${s}`} onPress={() => setQuizSeasons(prev => { const n = new Set(prev); n.delete(s); return n; })} className="px-2 py-1 bg-white rounded-full border border-emerald-200">
                <Text className="text-[11px] text-emerald-700">{s} ×</Text>
              </Pressable>
            ))}
            {Array.from(quizOccasions).slice(0,8).map((o) => (
              <Pressable key={`occ-${o}`} onPress={() => setQuizOccasions(prev => { const n = new Set(prev); n.delete(o); return n; })} className="px-2 py-1 bg-white rounded-full border border-orange-200">
                <Text className="text-[11px] text-orange-700">{o} ×</Text>
              </Pressable>
            ))}
            {Array.from(quizColors).slice(0,8).map((c) => (
              <Pressable key={`col-${c}`} onPress={() => setQuizColors(prev => { const n = new Set(prev); n.delete(c); return n; })} className="px-2 py-1 bg-white rounded-full border border-pink-200">
                <Text className="text-[11px] text-pink-700">{c} ×</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 24 }}
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      <CustomImageViewer
        images={viewerImages}
        imageIndex={viewerIndex}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
        onImageIndexChange={(i) => setViewerIndex(i)}
        FooterComponent={() => (
          <View style={{ paddingBottom: 16 }}>
            {/* Controls */}
            <View className="mx-4 mb-2 bg-black/50 rounded-xl px-3 py-2 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Pressable onPress={() => setViewerVisible(false)} className="px-2 py-1 bg-white/20 rounded">
                  <Text className="text-white text-xs">Close</Text>
                </Pressable>
                <Text className="text-white text-xs" numberOfLines={1}>
                  {viewerItem?.name || ''}  •  {viewerIndex + 1}/{viewerImages.length}
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Pressable
                  onPress={async () => { if (viewerItem) { try { await Share.share({ title: viewerItem.name, message: `${viewerItem.name} - ${viewerItem.description}` }); } catch {} } }}
                  className="px-2 py-1 bg-white/20 rounded"
                >
                  <Text className="text-white text-xs">Share</Text>
                </Pressable>
                <Pressable
                  onPress={() => { if (viewerItem) setFavorites(prev => { const n = new Set(prev); if (n.has(viewerItem.id)) { n.delete(viewerItem.id); showToast({ message: 'Removed from favorites', actionLabel: 'Undo', onAction: () => setFavorites(p => new Set(p).add(viewerItem.id)) }); } else { n.add(viewerItem.id); showToast('Added to favorites'); } return n; }); }}
                  className="px-2 py-1 bg-white/20 rounded"
                >
                  <Text className="text-white text-xs">{viewerItem && favorites.has(viewerItem.id) ? '♥ Liked' : '♡ Like'}</Text>
                </Pressable>
                <Pressable
                  onPress={() => { if (viewerItem) { setCart(prev => ({ ...prev, [viewerItem.id]: (prev[viewerItem.id] || 0) + 1 })); showToast('Added to cart'); setCartPulse(true); setTimeout(() => setCartPulse(false), 220); } }}
                  className="px-2 py-1 bg-white/20 rounded"
                >
                  <Text className="text-white text-xs">Add to Cart</Text>
                </Pressable>
              </View>
            </View>
            {/* Thumbnails */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
              <View className="flex-row gap-2">
                {viewerImages.map((img, idx) => (
                  <Pressable key={idx} onPress={() => setViewerIndex(idx)}>
                    <Image
                      source={{ uri: img.uri }}
                      style={{ width: 64, height: 64, borderRadius: 8, borderWidth: idx === viewerIndex ? 2 : 0, borderColor: '#a855f7' }}
                      resizeMode="cover"
                    />
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      />

      {/* Cart Modal */}
      <Modal visible={cartOpen} transparent animationType="slide" onRequestClose={() => setCartOpen(false)}>
        <Pressable onPress={() => setCartOpen(false)} style={{ flex:1, backgroundColor:'rgba(0,0,0,0.4)' }} />
        <View style={{ position:'absolute', bottom:0, left:0, right:0, backgroundColor:'#fff', borderTopLeftRadius:16, borderTopRightRadius:16, maxHeight:'60%' }}>
          <View className="p-4">
            <Text className="text-lg font-semibold mb-2">Cart</Text>
            {Object.keys(cart).length === 0 && (
              <Text className="text-gray-500">Your cart is empty</Text>
            )}
            {Object.entries(cart).map(([id, qty]) => {
              const item = data.find(o => o.id === Number(id));
              if (!item) return null;
              return (
                <View key={id} className="flex-row items-center mb-3">
                  <Image source={{ uri: item.image }} style={{ width: 48, height: 48, borderRadius: 8 }} />
                  <View className="flex-1 ml-3">
                    <Text className="font-medium" numberOfLines={1}>{item.name}</Text>
                    <Text className="text-xs text-gray-500">Qty: {qty}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setCart(prev => { const n = { ...prev }; const next = (n[Number(id)]||0) - 1; if (next<=0) delete n[Number(id)]; else n[Number(id)] = next; return n; })}>
                    <Text className="text-sm text-purple-600">Remove</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </Modal>

      {/* Toast */}
      {toast && (
        <View style={{ position:'absolute', bottom: 24, left: 0, right: 0, alignItems: 'center' }}>
          <View style={{ backgroundColor:'rgba(0,0,0,0.8)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, flexDirection:'row', alignItems:'center' }}>
            <Text style={{ color:'#fff', fontSize:12 }}>{toast.message}</Text>
            {toast.actionLabel && toast.onAction && (
              <TouchableOpacity onPress={() => { toast.onAction?.(); setToast(null); }}>
                <Text style={{ color:'#fff', fontSize:12, marginLeft: 10, textDecorationLine:'underline' }}>{toast.actionLabel}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
