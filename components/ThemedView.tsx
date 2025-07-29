import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

interface ThemedViewProps extends ViewProps {
  safe?: boolean;
}

const ThemedView: React.FC<ThemedViewProps> = ({
  style,
  safe = false,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const theme = Colors;

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
        },
        safe && {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedView;
