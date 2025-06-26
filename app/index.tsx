import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const Home = () => {
  const animation = useRef<LottieView>(null);
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 2000);

    const flashInterval = setInterval(() => {
      if (showTitle) {
        setTitleVisible((prev) => !prev);
      }
    }, 500);

    const buttonTimer = setTimeout(() => {
      setTitleVisible(true);
      setShowButton(true);
      clearInterval(flashInterval);
    }, 4000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(buttonTimer);
      clearInterval(flashInterval);
    };
  }, [showTitle]);

  return (
    <ThemedView style={styles.container}>
      <LottieView
        ref={animation}
        style={{
          width: 200,
          height: 200,
          marginTop: 50,
        }}
        source={require('@/assets/animation/main.json')}
        autoPlay
        loop
      />
      {showTitle && titleVisible && (
        <ThemedText title style={styles.title}>
          DerDieDas
        </ThemedText>
      )}
      {showButton && (
        <Link href="/level" style={styles.link}>
          <ThemedText style={styles.buttonText}>Play Game</ThemedText>
        </Link>
      )}
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Tomorrow_700Bold',
    color: Colors.text,
    marginTop: 50,
  },
  link: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 50,
  },
  testLink: {
    backgroundColor: '#ff6b6b', // Different color to distinguish it
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});
