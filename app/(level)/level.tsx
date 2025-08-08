import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';

const Level = () => {
  const router = useRouter();
  const Levels = ['A1', 'A2', 'B1', 'B2'];
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleLevelSelect = (level: string) => {
    router.push({ pathname: '/play', params: { level } });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Choose a level</ThemedText>
      {Levels.map((level) => (
        <TouchableOpacity
          key={level}
          style={[styles.link, activeButton === level && styles.linkActive]}
          onPress={() => handleLevelSelect(level)}
          onPressIn={() => setActiveButton(level)}
          onPressOut={() => setActiveButton(null)}
          activeOpacity={0.7}
        >
          <ThemedText style={styles.linkText}>{level}</ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
};

export default Level;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Tomorrow_600SemiBold',
    marginBottom: 40,
  },
  link: {
    marginVertical: 15,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.secondary,
    shadowColor: '#E65100',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    width: '50%',
    alignItems: 'center',
  },
  linkActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  linkText: {
    fontFamily: 'Tomorrow_500Medium',
    fontSize: 20,
  },
});
