import React from 'react';
import { Text, TextProps } from 'react-native';
import { Colors } from '../constants/Colors';
import { useFontContext } from '../contexts/FontContext';

interface ThemedTextProps extends TextProps {
  title?: boolean;
  darkmode?: boolean;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  title,
  darkmode,
  ...props
}) => {
  const { fontsLoaded } = useFontContext();

  if (!fontsLoaded) {
    return null;
  }

  const theme = Colors;

  return (
    <Text
      style={[
        {
          color: darkmode ? theme.text_dark : theme.text,
          fontSize: title ? 40 : 18,
          fontFamily: title ? 'Tomorrow_700Bold' : 'Tomorrow_400Regular',
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedText;
