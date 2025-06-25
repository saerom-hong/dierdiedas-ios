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
import React, { createContext, useContext } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
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

export const useFontContext = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFontContext must be used within a FontProvider');
  }
  return context;
}; 