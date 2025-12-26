import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '../constants/Colors';
import ThemedText from './ThemedText';

type PlayTutorialProps = {
  visible: boolean;
  onDismiss: () => void;
  pulse: Animated.Value;
};

const PlayTutorial = ({ visible, onDismiss, pulse }: PlayTutorialProps) => {
  if (!visible) return null;

  return (
    <View style={styles.tutorialOverlay} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.tutorialBubble,
          {
            transform: [
              {
                translateY: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -6],
                }),
              },
            ],
          },
        ]}
      >
        <ThemedText darkmode={true} style={styles.tutorialTitle}>
          Drag the correct article into the empty box
        </ThemedText>
        <TouchableOpacity style={styles.tutorialButton} onPress={onDismiss}>
          <ThemedText style={styles.tutorialButtonText}>Got it</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  tutorialOverlay: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  tutorialBubble: {
    backgroundColor: Colors.background_tutorial_bubble,
    borderRadius: 24,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.secondary,
    paddingVertical: 32,
    paddingHorizontal: 25,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8,
  },
  tutorialTitle: {
    fontSize: 22,
    fontFamily: 'Tomorrow_600SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tutorialButton: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: Colors.button_tutorial,
  },
  tutorialButtonText: {
    fontSize: 17,
    fontFamily: 'Tomorrow_600SemiBold',
  },
});

export default PlayTutorial;
