import AsyncStorage from '@react-native-async-storage/async-storage';
import { VocabularyItem } from '@/types/german';

export interface SavedProgress {
  vocabularyData: VocabularyItem[];
  currentWordIndex: number;
}

const getProgressKey = (level: string) => `progress:${level}`;

export async function loadProgress(level: string): Promise<SavedProgress | null> {
  try {
    const key = getProgressKey(level);
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    const parsed = JSON.parse(value) as SavedProgress;
    if (
      typeof parsed?.currentWordIndex === 'number' &&
      Array.isArray(parsed?.vocabularyData)
    ) {
      return parsed;
    }
    return null;
  } catch (error) {
    console.warn('Failed to load progress:', error);
    return null;
  }
}

export async function saveProgress(
  level: string,
  vocabularyData: VocabularyItem[],
  currentWordIndex: number
): Promise<void> {
  try {
    const key = getProgressKey(level);
    const payload: SavedProgress = { vocabularyData, currentWordIndex };
    await AsyncStorage.setItem(key, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to save progress:', error);
  }
}

export async function clearProgress(level: string): Promise<void> {
  try {
    const key = getProgressKey(level);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear progress:', error);
  }
}
