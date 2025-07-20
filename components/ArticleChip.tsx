import React, { useRef } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { GermanArticles } from '@/types/german';
import ThemedText from './ThemedText';

type ArticleChipProps = {
  style: StyleProp<ViewStyle>;
  article: GermanArticles;
  correctArticle: GermanArticles;
  onDragEnd: (article: string, isCorrect: boolean) => void;
  onDragStart?: () => void;
  onDragUpdate?: (x: number, y: number) => void;
  dropZoneLayout?: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
};

const ArticleChip = ({
  style,
  article,
  correctArticle,
  onDragEnd,
  onDragStart,
  onDragUpdate,
  dropZoneLayout,
}: ArticleChipProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const isOverDropZone = useSharedValue(false);
  const viewRef = useRef<Animated.View>(null);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      if (onDragStart) {
        runOnJS(onDragStart)();
      }
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      if (onDragUpdate) {
        runOnJS(onDragUpdate)(event.absoluteX, event.absoluteY);
      }

      // Check if over drop zone
      if (dropZoneLayout) {
        const chipCenterX = event.absoluteX;
        const chipCenterY = event.absoluteY;

        const isOver =
          chipCenterX >= dropZoneLayout.x &&
          chipCenterX <= dropZoneLayout.x + dropZoneLayout.width &&
          chipCenterY >= dropZoneLayout.y &&
          chipCenterY <= dropZoneLayout.y + dropZoneLayout.height;

        isOverDropZone.value = isOver;
      }
    })
    .onEnd(() => {
      isDragging.value = false;

      if (article === correctArticle) {
        // Successfully dropped on WordBox
        console.log('isCorrect');
        runOnJS(onDragEnd)(article, true);

        // Return to original position
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      } else {
        console.log('not correct');
        // Return to original position
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }

      isOverDropZone.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: isDragging.value ? 1.1 : 1 },
      ],
      zIndex: isDragging.value ? 1000 : 1,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View ref={viewRef} style={[styles.container, animatedStyle]}>
        <Animated.View style={[styles.chip, style]}>
          <ThemedText style={styles.text}>{article}</ThemedText>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 23,
    fontFamily: 'Tomorrow_500Medium',
    color: '#fff',
  },
});

export default ArticleChip;
