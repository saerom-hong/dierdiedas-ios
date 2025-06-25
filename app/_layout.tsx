import React from 'react';

import { Colors } from '@/constants/Colors';
import { FontProvider } from '@/contexts/FontContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <FontProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerBackTitle: 'Back',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="(level)/level"
          options={{ headerShown: true, title: 'Level' }}
        />
        <Stack.Screen name="(play)/play" options={{ headerShown: false }} />
        <Stack.Screen
          name="(complete)/complete"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </Stack>
    </FontProvider>
  );
}
