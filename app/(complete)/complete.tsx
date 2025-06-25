import React from 'react';
import { StyleSheet } from 'react-native';

import ThemedLink from '@/components/ThemedLink';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';

const Complete = () => {
  const { level } = useLocalSearchParams<{ level: string }>();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Congratulations!</ThemedText>
      <ThemedText style={styles.subtitle}>
        You have completed the level{' '}
        <ThemedText style={styles.boldText}>{level}</ThemedText>
      </ThemedText>
      <ThemedLink href="/level" style={styles.button}>
        Play Again
      </ThemedLink>
    </ThemedView>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 200,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Tomorrow_600SemiBold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Tomorrow_400Regular',
    marginBottom: 20,
  },
  boldText: {
    fontFamily: 'Tomorrow_600SemiBold',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
});
