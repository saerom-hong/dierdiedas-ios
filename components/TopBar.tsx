import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '../constants/Colors';

type TopBarProps = {
  onHome: () => void;
  onReplay: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const TopBar: React.FC<TopBarProps> = ({
  onHome,
  onReplay,
  disabled = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Go back home"
        onPress={onHome}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={styles.iconButton}
        disabled={disabled}
      >
        <Ionicons name="home" size={25} color={Colors.secondary} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Replay level"
        onPress={onReplay}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={styles.iconButton}
        disabled={disabled}
      >
        <Ionicons name="refresh" size={25} color={Colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
});

export default TopBar;
