import React from 'react';
import { StyleSheet, Text } from 'react-native';

import ThemedView from '@/components/ThemedView';

const Complete = () => {
  return (
    <ThemedView style={styles.container}>
      <Text>Complete</Text>
    </ThemedView>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
