import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import ThemedLink from '../../components/ThemedLink';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';

const Complete = () => {
  const animation = useRef<LottieView>(null);
  const { level } = useLocalSearchParams<{ level: string }>();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Congratulations!</ThemedText>
      <LottieView
        ref={animation}
        source={require('../../assets/animation/confetti.json')}
        autoPlay
        loop
        style={styles.confetti}
      />
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
  confetti: {
    width: 500,
    height: 500,
    marginVertical: 20,
    position: 'absolute',
    top: 0,
    left: -50,
    right: 0,
    bottom: 0,
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
    marginTop: 100,
  },
});
