import {
  Tomorrow_100Thin,
  Tomorrow_200ExtraLight,
  Tomorrow_300Light,
  Tomorrow_400Regular,
  Tomorrow_500Medium,
  Tomorrow_600SemiBold,
  Tomorrow_700Bold,
  Tomorrow_800ExtraBold,
  Tomorrow_900Black,
  useFonts,
} from '@expo-google-fonts/tomorrow';
import React, { createContext, ReactNode, useContext } from 'react';

interface FontContextType {
  fontsLoaded: boolean;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Tomorrow_100Thin,
    Tomorrow_200ExtraLight,
    Tomorrow_300Light,
    Tomorrow_400Regular,
    Tomorrow_500Medium,
    Tomorrow_600SemiBold,
    Tomorrow_700Bold,
    Tomorrow_800ExtraBold,
    Tomorrow_900Black,
  });

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontContext = (): FontContextType => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFontContext must be used within a FontProvider');
  }
  return context;
};
