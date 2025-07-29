import React, { useEffect, useRef } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { GermanArticles } from '../types/german';
import ThemedText from './ThemedText';

type ArticleChipProps = {
  style: StyleProp<ViewStyle>;
  article: GermanArticles;
  correctArticle: GermanArticles;
  onDragEnd: (article: string, isCorrect: boolean) => void;
  isSnapped?: boolean;
  isTransitioning?: boolean;
  snapPosition?: {
    x: number;
    y: number;
  } | null;
};

const ArticleChip = ({
  style,
  article,
  correctArticle,
  onDragEnd,
  isSnapped = false,
  isTransitioning = false,
  snapPosition = null,
}: ArticleChipProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const viewRef = useRef<Animated.View>(null);

  // Handle transition animation
  useEffect(() => {
    if (isTransitioning && isSnapped) {
      // Animate back to original position
      translateX.value = withTiming(0, { duration: 500 });
      translateY.value = withTiming(0, { duration: 500 });
    }
  }, [isTransitioning, isSnapped, translateX, translateY]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (isSnapped || isTransitioning) return; // Prevent dragging if snapped or transitioning
      isDragging.value = true;
    })
    .onUpdate((event) => {
      if (isSnapped || isTransitioning) return; // Prevent dragging if snapped or transitioning
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      if (isSnapped || isTransitioning) return; // Prevent dragging if snapped or transitioning
      isDragging.value = false;

      if (article === correctArticle) {
        // Successfully dropped on WordBox - snap to position
        console.log('isCorrect - snapping');
        runOnJS(onDragEnd)(article, true);

        // Snap to the specified position
        if (snapPosition) {
          translateX.value = withSpring(snapPosition.x);
          translateY.value = withSpring(snapPosition.y);
        }
      } else {
        console.log('not correct or not over drop zone');
        // Return to original position
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: isDragging.value ? 1.1 : 1 },
      ],
      zIndex: isDragging.value ? 1000 : 1,
      opacity: isSnapped && !isTransitioning ? 0 : 1, // Hide the chip if it's snapped and not transitioning
    };
  });

  // Don't render if snapped and not transitioning
  if (isSnapped && !isTransitioning) {
    return null;
  }

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
