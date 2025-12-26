import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const TUTORIAL_STORAGE_KEY = 'tutorial:play-drag';

const usePlayTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(true);
  const tutorialPulse = useRef(new Animated.Value(0)).current;

  // Load tutorial visibility once
  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(TUTORIAL_STORAGE_KEY)
      .then((value) => {
        if (isMounted && value !== 'dismissed') {
          setShowTutorial(true);
        }
      })
      .catch((error) => console.warn('Failed to load tutorial flag', error));
    return () => {
      isMounted = false;
    };
  }, []);

  // Gentle pulse animation for the tutorial bubble
  useEffect(() => {
    let animation: Animated.CompositeAnimation | undefined;
    if (showTutorial) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(tutorialPulse, {
            toValue: 1,
            duration: 650,
            useNativeDriver: true,
          }),
          Animated.timing(tutorialPulse, {
            toValue: 0,
            duration: 650,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    }
    return () => {
      animation?.stop();
    };
  }, [showTutorial, tutorialPulse]);

  const dismissTutorial = () => {
    if (!showTutorial) return;
    setShowTutorial(false);
    AsyncStorage.setItem(TUTORIAL_STORAGE_KEY, 'dismissed').catch((error) =>
      console.warn('Failed to save tutorial flag', error)
    );
  };

  return { showTutorial, dismissTutorial, tutorialPulse };
};

export default usePlayTutorial;

