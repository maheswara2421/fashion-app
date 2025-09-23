import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Image, Pressable, Text, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type ViewerImage = { uri: string };

type Props = {
  images: ViewerImage[];
  imageIndex: number;
  visible: boolean;
  onRequestClose: () => void;
  onImageIndexChange?: (index: number) => void;
  FooterComponent?: React.ComponentType | (() => JSX.Element) | null;
  captions?: string[];
};

export default function CustomImageViewer({ images, imageIndex, visible, onRequestClose, onImageIndexChange, FooterComponent, captions }: Props) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const listRef = useRef<any>(null);
  const [index, setIndex] = useState(imageIndex ?? 0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);

  useEffect(() => {
    setIndex(imageIndex ?? 0);
  }, [imageIndex, visible]);

  useEffect(() => {
    if (visible && listRef.current) {
      try {
        listRef.current.scrollToIndex({ index: index, animated: false });
      } catch {}
    }
  }, [visible]);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const next = Math.round(offsetX / width);
    if (next !== index) {
      setIndex(next);
      onImageIndexChange?.(next);
      // reset zoom on image change
      scale.value = withTiming(1);
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
      savedScale.value = 1;
      savedX.value = 0;
      savedY.value = 0;
    }
  };

  const pinch = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((e) => {
      scale.value = Math.min(4, Math.max(1, savedScale.value * e.scale));
    });

  const pan = Gesture.Pan()
    .onStart(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    })
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = savedX.value + e.translationX;
        translateY.value = savedY.value + e.translationY;
      }
    })
    .onEnd(() => {
      // snap back if zoomed out
      if (scale.value <= 1) {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        scale.value = withTiming(1);
      }
    });

  // Double-tap to zoom centered on tap position
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((e) => {
      const nextScale = scale.value > 1 ? 1 : 2.2;
      // adjust translate so the tapped point stays near center
      const dx = e.x - width / 2;
      const dy = e.y - height / 2;
      const deltaScale = nextScale - scale.value;
      translateX.value = withTiming(translateX.value - dx * deltaScale);
      translateY.value = withTiming(translateY.value - dy * deltaScale);
      scale.value = withTiming(nextScale);
    });

  // Vertical swipe-down to close when not zoomed
  const swipeDown = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value <= 1) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (scale.value <= 1 && e.translationY > 120) {
        translateY.value = withTiming(0);
        onRequestClose();
      } else {
        translateY.value = withTiming(0);
      }
    });

  const composed = Gesture.Simultaneous(doubleTap, pinch, pan, swipeDown);

  const imgStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent={true} animationType="fade">
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)' }}>
        {/* Header */}
        <View style={{ position: 'absolute', top: 40, left: 16, right: 16, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable onPress={onRequestClose} style={{ backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
            <Text style={{ color: '#fff', fontSize: 14 }}>Close</Text>
          </Pressable>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>{index + 1}/{images.length}</Text>
            <Text style={{ color: '#ddd', fontSize: 10 }}>{Math.round(scale.value * 100)}%</Text>
          </View>
        </View>
        {/* Caption */}
        {captions && captions[index] ? (
          <View style={{ position: 'absolute', top: 84, left: 16, right: 16, zIndex: 9 }}>
            <Text style={{ color: '#fff', fontSize: 12 }} numberOfLines={2}>{captions[index]}</Text>
          </View>
        ) : null}

        <Animated.FlatList
          ref={listRef}
          horizontal
          pagingEnabled
          data={images}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <View style={{ width, height, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
              <GestureDetector gesture={composed}>
                <Animated.Image source={{ uri: item.uri }} style={[{ width, height, resizeMode: 'contain' }, imgStyle]} />
              </GestureDetector>
            </View>
          )}
          onMomentumScrollEnd={onMomentumEnd}
          getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
          initialScrollIndex={index}
          showsHorizontalScrollIndicator={false}
        />

        {/* Footer */}
        {FooterComponent ? (
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
            {typeof FooterComponent === 'function' ? <FooterComponent /> : <FooterComponent />}
          </View>
        ) : null}
      </View>
    </Modal>
  );
}
