/*
 * File: mobile/stylediscover-expo/app/_layout.tsx
 * Purpose: Root layout for Expo Router. Declares a hidden-header Stack and SafeArea wrapper.
 * Notes:
 * - Expo SDK 51 + React Native 0.74.
 * - Entry configured via package.json main: "expo-router/entry".
 */
import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppStateProvider, useAppState } from '../src/state/AppState';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <AppStateProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <AuthGate />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppStateProvider>
  );
}

function AuthGate() {
  const { quizCompleted } = useAppState();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inQuiz = segments[0] === 'quiz';
    const inFeed = segments[0] === 'feed' || segments.length === 0;
    if (!quizCompleted && !inQuiz) {
      router.replace('/quiz');
      return;
    }
    if (quizCompleted && !inFeed && !inQuiz) {
      router.replace('/feed');
    }
  }, [quizCompleted, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
