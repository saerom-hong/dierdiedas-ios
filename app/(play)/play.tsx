import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProgressBar from 'react-native-progress/Bar';

import { clearProgress } from '@/utils/storage';
import ArticleChip from '../../components/ArticleChip';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import WordBox from '../../components/WordBox';
import { Colors } from '../../constants/Colors';
import {
  VocabularyProvider,
  useVocabulary,
} from '../../contexts/VocabularyContext';
import { GERMAN_ARTICLES, GermanArticles } from '../../types/german';
import {
  loadSounds,
  playCorrectSound,
  playWrongSound,
  unloadSounds,
} from '../../utils/sound';

import type { StyleProp, ViewStyle } from 'react-native';
type ArticleStyles = {
  der: StyleProp<ViewStyle>;
  die: StyleProp<ViewStyle>;
  das: StyleProp<ViewStyle>;
};

const getArticleStyle = (article: GermanArticles, styles: ArticleStyles) => {
  switch (article) {
    case GermanArticles.Der:
      return styles.der;
    case GermanArticles.Die:
      return styles.die;
    case GermanArticles.Das:
      return styles.das;
    default:
      return {};
  }
};

const Play = () => {
  const { vocabularyData, loading, currentWordIndex, setCurrentWordIndex } =
    useVocabulary();
  const { level } = useLocalSearchParams<{ level: string }>();
  const router = useRouter();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [snappedArticle, setSnappedArticle] = useState<GermanArticles | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Load sounds when component mounts
  useEffect(() => {
    loadSounds();

    // Cleanup sounds when component unmounts
    return () => {
      unloadSounds();
    };
  }, []);

  const currentWord = vocabularyData[currentWordIndex];
  const correctArticle =
    (currentWord?.article as GermanArticles) || GermanArticles.Der;
  const progress =
    vocabularyData.length > 0
      ? (currentWordIndex + 1) / vocabularyData.length
      : 0;

  const handleArticleSelect = async (
    article: GermanArticles,
    isCorrect: boolean
  ) => {
    setIsCorrect(isCorrect);

    if (isCorrect) {
      // Play correct sound
      await playCorrectSound();
      setSnappedArticle(article);

      // Start transition after 1 second
      const outer = setTimeout(() => {
        setIsTransitioning(true);

        // Move to next word after animation completes (additional 500ms for animation)
        const inner = setTimeout(() => {
          setCurrentWordIndex((prev) => {
            const isLast = prev >= vocabularyData.length - 1;
            if (!isLast) {
              return prev + 1;
            }
            return prev;
          });
          setIsCorrect(undefined);
          setSnappedArticle(null);
          setIsTransitioning(false);
          // If last, navigate
          if (currentWordIndex >= vocabularyData.length - 1) {
            clearProgress(level as string);
            router.push(`/(complete)/complete?level=${level}`);
          }
        }, 500);
        // Track inner timeout for cleanup
        timeoutsRef.current.push(inner);
      }, 1000);
      // Track outer timeout for cleanup
      timeoutsRef.current.push(outer);
    } else {
      // Play wrong sound
      await playWrongSound();
      setIsCorrect(false);

      const reset = setTimeout(() => {
        setIsCorrect(undefined);
      }, 500);
      // Track reset timeout for cleanup
      timeoutsRef.current.push(reset);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.mainContent}>
          <ThemedText style={styles.title}>Loading...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (vocabularyData.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.mainContent}>
          <ThemedText style={styles.title}>
            No vocabulary data found for level {level}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.topSection}>
          <ProgressBar
            progress={progress}
            width={200}
            color={Colors.secondary}
          />
          <ThemedText style={styles.progressText}>
            {currentWordIndex + 1} / {vocabularyData.length}
          </ThemedText>
        </View>
        <View style={styles.mainContent}>
          <ThemedText style={styles.title}>Level {level}</ThemedText>
          <View style={styles.chipsContainer}>
            {GERMAN_ARTICLES.map((article: GermanArticles) => {
              const articleStyle = getArticleStyle(article, styles);
              const isSnapped = snappedArticle === article;
              return (
                <ArticleChip
                  key={article}
                  style={articleStyle}
                  article={article}
                  correctArticle={correctArticle}
                  onDragEnd={handleArticleSelect}
                  isSnapped={isSnapped}
                  isTransitioning={isTransitioning}
                />
              );
            })}
          </View>
          <WordBox
            word={currentWord?.word || ''}
            isCorrect={isCorrect}
            snappedArticle={snappedArticle}
            isTransitioning={isTransitioning}
          />
        </View>
      </ThemedView>
    </GestureHandlerRootView>
  );
};

const PlayScreen = () => {
  const { level } = useLocalSearchParams<{ level: string }>();
  if (!level) return null;
  return (
    <VocabularyProvider level={level}>
      <Play />
    </VocabularyProvider>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background_play,
    flex: 1,
  },
  topSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  mainContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingTop: 70,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Tomorrow_600SemiBold',
    marginBottom: 60,
  },
  der: {
    backgroundColor: Colors.chip_color_der,
  },
  die: {
    backgroundColor: Colors.chip_color_die,
  },
  das: {
    backgroundColor: Colors.chip_color_das,
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    zIndex: 10,
  },
});
