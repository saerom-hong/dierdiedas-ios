import React from 'react';

import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const theme = Colors;
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.text,
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
