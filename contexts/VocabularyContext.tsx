import { VocabularyItem } from '@/types/german';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface VocabularyContextType {
  vocabularyData: VocabularyItem[];
  loading: boolean;
  currentWordIndex: number;
  setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>;
  loadVocabulary: (level: string) => void;
}

const VocabularyContext = createContext<VocabularyContextType | undefined>(
  undefined
);

export const VocabularyProvider: React.FC<{
  level: string;
  children: React.ReactNode;
}> = ({ level, children }) => {
  const [vocabularyData, setVocabularyData] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const loadVocabulary = async (level: string) => {
    try {
      setLoading(true);
      const vocabularyFiles: Record<string, () => Promise<VocabularyItem[]>> = {
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
      const shuffledData = [...data].sort(() => Math.random() - 0.5);

      setVocabularyData(shuffledData);
      setCurrentWordIndex(0);
    } catch (error) {
      console.error('Error loading vocabulary data:', error);
      setVocabularyData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (level) {
      loadVocabulary(level);
    }
  }, [level]);

  return (
    <VocabularyContext.Provider
      value={{
        vocabularyData,
        loading,
        currentWordIndex,
        setCurrentWordIndex,
        loadVocabulary,
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
};

export const useVocabulary = () => {
  const context = useContext(VocabularyContext);
  if (!context) {
    throw new Error('useVocabulary must be used within a VocabularyProvider');
  }
  return context;
};
