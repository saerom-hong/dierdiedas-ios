import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ArticleChip from '@/components/ArticleChip';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import WordBox from '@/components/WordBox';
import { GERMAN_ARTICLES } from '@/types/german';

const Play = () => {
  const { level } = useLocalSearchParams<{ level: string }>();
  const correctArticle = 'Der';
  const sampleWord = 'Hund'; // This will be replaced with actual words from your data

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Level {level}</ThemedText>

        <View style={styles.chipsContainer}>
          {GERMAN_ARTICLES.map((article) => (
            <ArticleChip key={article} article={article} />
          ))}
        </View>

        <WordBox word={sampleWord} correctArticle={correctArticle} />
      </ThemedView>
    </GestureHandlerRootView>
  );
};

export default Play;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    zIndex: 10,
  },
});
