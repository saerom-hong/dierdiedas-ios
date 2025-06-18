import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Colors } from '../constants/Colors';
import ThemedText from './ThemedText';

type WordBoxProps = {
  word: string;
  correctArticle: string;
  onDrop?: (article: string) => void;
};

const WordBox = ({ word, correctArticle, onDrop }: WordBoxProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <View style={styles.placeholder} />
        <ThemedText style={styles.word}>{word}</ThemedText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  box: {
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    padding: 20,
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 70,
    height: 40,
    backgroundColor: Colors.warning,
    opacity: 0.5,
    borderRadius: 20,
    marginRight: 20,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WordBox;
