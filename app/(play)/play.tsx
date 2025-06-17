import React from 'react';
import { StyleSheet } from 'react-native';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

const Play = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>play Page</ThemedText>
    </ThemedView>
  );
};

export default Play;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
