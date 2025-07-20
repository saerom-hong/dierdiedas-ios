import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProgressBar from 'react-native-progress/Bar';

import ArticleChip from '@/components/ArticleChip';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import WordBox from '@/components/WordBox';
import { Colors } from '@/constants/Colors';
import {
  GERMAN_ARTICLES,
  GermanArticles,
  VocabularyItem,
} from '@/types/german';

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
  const { level } = useLocalSearchParams<{ level: string }>();
  const router = useRouter();
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [vocabularyData, setVocabularyData] = useState<VocabularyItem[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wordBoxLayout, setWordBoxLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    const loadVocabularyData = async () => {
      try {
        setLoading(true);

        const vocabularyFiles: Record<string, () => Promise<VocabularyItem[]>> =
          {
            A1: async () =>
              (await import('@/assets/data/voca_A1.json'))
                .default as VocabularyItem[],
            A2: async () =>
              (await import('@/assets/data/voca_A2.json'))
                .default as VocabularyItem[],
            B1: async () =>
              (await import('@/assets/data/voca_B1.json'))
                .default as VocabularyItem[],
            B2: async () =>
              (await import('@/assets/data/voca_B2.json'))
                .default as VocabularyItem[],
          };

        const data = await vocabularyFiles[level]();
        setVocabularyData(data);
        setCurrentWordIndex(0);
      } catch (error) {
        console.error('Error loading vocabulary data:', error);
        setVocabularyData([]);
      } finally {
        setLoading(false);
      }
    };

    if (level) {
      loadVocabularyData();
    }
  }, [level]);

  const currentWord = vocabularyData[currentWordIndex];
  const correctArticle =
    (currentWord?.article as GermanArticles) || GermanArticles.Der;
  const progress =
    vocabularyData.length > 0
      ? (currentWordIndex + 1) / vocabularyData.length
      : 0;

  const handleArticleSelect = (article: string) => {
    setSelectedArticle(article);

    // Check if the answer is correct
    setIsCorrect(isCorrect);

    // Move to the next word after a delay
    setTimeout(() => {
      if (currentWordIndex < vocabularyData.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setSelectedArticle(null);
        setIsCorrect(false);
      } else {
        // Game completed - navigate to completion screen
        console.log('Game completed!');
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
                  article={article as GermanArticles}
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
          />
        </View>
      </ThemedView>
    </GestureHandlerRootView>
  );
};

export default Play;

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
    fontWeight: 'bold',
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
