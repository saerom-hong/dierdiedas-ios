import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProgressBar from 'react-native-progress/Bar';

import ArticleChip from '@/components/ArticleChip';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import WordBox from '@/components/WordBox';
import { Colors } from '@/constants/Colors';
import {
  VocabularyProvider,
  useVocabulary,
} from '@/contexts/VocabularyContext';
import { GERMAN_ARTICLES, GermanArticles } from '@/types/german';

const getArticleStyle = (article: string, styles: any) => {
  switch (article.toLowerCase()) {
    case 'der':
      return styles.der;
    case 'die':
      return styles.die;
    case 'das':
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
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wordBoxLayout, setWordBoxLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const currentWord = vocabularyData[currentWordIndex];
  const correctArticle =
    (currentWord?.article as GermanArticles) || GermanArticles.Der;
  const progress =
    vocabularyData.length > 0
      ? (currentWordIndex + 1) / vocabularyData.length
      : 0;

  const handleArticleSelect = (article: string, isCorrect: boolean) => {
    setSelectedArticle(article);
    setIsCorrect(isCorrect);
    setTimeout(() => {
      if (currentWordIndex < vocabularyData.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setSelectedArticle(null);
        setIsCorrect(false);
      } else {
        router.push(`/(complete)/complete?level=${level}`);
      }
    }, 1000);
  };

  const handleDragStart = () => {
    setIsDragOver(false);
  };

  const handleDragUpdate = (x: number, y: number) => {
    if (wordBoxLayout) {
      const isOver =
        x >= wordBoxLayout.x &&
        x <= wordBoxLayout.x + wordBoxLayout.width &&
        y >= wordBoxLayout.y &&
        y <= wordBoxLayout.y + wordBoxLayout.height;
      setIsDragOver(isOver);
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
            {GERMAN_ARTICLES.map((article) => {
              const articleStyle = getArticleStyle(article, styles);
              return (
                <ArticleChip
                  key={article}
                  style={articleStyle}
                  article={article}
                  correctArticle={correctArticle}
                  onDragEnd={handleArticleSelect}
                  onDragStart={handleDragStart}
                  onDragUpdate={handleDragUpdate}
                  dropZoneLayout={wordBoxLayout}
                />
              );
            })}
          </View>
          <WordBox
            word={currentWord?.word || ''}
            isCorrect={isCorrect}
            correctArticle={correctArticle}
            isDragOver={isDragOver}
            selectedArticle={selectedArticle}
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
