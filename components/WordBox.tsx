import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../constants/Colors';
import ThemedText from './ThemedText';

type WordBoxProps = {
  word: string;
  correctArticle: string;
  isCorrect: boolean;
  onDrop?: (article: string, isCorrect: boolean) => void;
  snappedArticle?: string | null;
  isTransitioning?: boolean;
};

const WordBox = ({
  word,
  isCorrect = false,
  snappedArticle = null,
  isTransitioning = false,
}: WordBoxProps) => {
  const viewRef = useRef<View>(null);

  let boxColor = Colors.background_wordbox_shadow;
  if (isCorrect) {
    boxColor = Colors.background_wordbox_correct;
  }

  const getArticleStyle = (article: string) => {
    switch (article.toLowerCase()) {
      case 'der':
        return { backgroundColor: Colors.chip_color_der };
      case 'die':
        return { backgroundColor: Colors.chip_color_die };
      case 'das':
        return { backgroundColor: Colors.chip_color_das };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.box,
          {
            borderColor: boxColor,
            shadowColor: boxColor,
            shadowOffset: {
              width: isCorrect ? 6 : 3,
              height: isCorrect ? 10 : 5,
            },
            shadowOpacity: isCorrect ? 0.7 : 0.5,
            shadowRadius: isCorrect ? 7.68 : 3.84,
            elevation: isCorrect ? 10 : 5,
          },
        ]}
      >
        <View ref={viewRef} style={styles.placeholder}>
          {snappedArticle && !isTransitioning ? (
            <View style={[styles.snappedChip, getArticleStyle(snappedArticle)]}>
              <ThemedText style={styles.snappedChipText}>
                {snappedArticle}
              </ThemedText>
            </View>
          ) : null}
        </View>
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
  },
  placeholder: {
    width: 85,
    height: 50,
    backgroundColor: Colors.background_placeholder,
    opacity: 0.8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snappedChip: {
    width: 85,
    height: 50,
    opacity: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snappedChipText: {
    fontSize: 23,
    fontFamily: 'Tomorrow_500Medium',
    color: '#fff',
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
