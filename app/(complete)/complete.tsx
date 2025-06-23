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
        You have completed the level {level}
      </ThemedText>
      <ThemedLink
        href="/level"
        style={styles.button}
        textStyle={styles.buttonText}
      >
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
