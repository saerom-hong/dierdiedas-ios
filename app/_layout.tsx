import React from 'react';

import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerBackTitle: 'Back',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(level)/level" options={{ title: 'Level' }} />
        <Stack.Screen name="(play)/play" options={{ title: 'Play' }} />
        <Stack.Screen
          name="(complete)/complete"
          options={{ title: 'Complete' }}
        />
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </Stack>
    </>
  );
}
