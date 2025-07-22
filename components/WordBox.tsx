import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../constants/Colors';
import ThemedText from './ThemedText';

type WordBoxProps = {
  word: string;
  correctArticle: string;
  isCorrect: boolean;
  onDrop?: (article: string, isCorrect: boolean) => void;
  isDragOver?: boolean;
  selectedArticle?: string | null;
};

const WordBox = ({
  word,
  isDragOver = false,
  isCorrect = false,
  selectedArticle = null,
}: WordBoxProps) => {
  const viewRef = useRef<View>(null);

  let boxColor = Colors.background_wordbox_shadow;
  if (isCorrect) {
    boxColor = Colors.background_wordbox_correct;
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.box, { borderColor: boxColor, shadowColor: boxColor }]}
      >
        <View ref={viewRef} style={styles.placeholder} />
        <ThemedText style={styles.word} numberOfLines={2} adjustsFontSizeToFit>
          {word}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 50,
    maxWidth: 350,
  },
  box: {
    backgroundColor: Colors.background_wordbox,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    borderWidth: 1,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeholder: {
    width: 75,
    height: 45,
    backgroundColor: Colors.background_placeholder,
    opacity: 0.8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 20,
  },
  word: {
    fontSize: 27,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 32,
    color: Colors.text,
  },
});

export default WordBox;
