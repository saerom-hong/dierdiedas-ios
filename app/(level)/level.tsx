import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const Level = () => {
  const router = useRouter();
  const Levels = ['A1', 'A2', 'B1', 'B2', 'C1'];

  const handleLevelSelect = (level: string) => {
    router.push({
      pathname: '/play',
      params: { level },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Choose a level</ThemedText>
      {Levels.map((level) => (
        <TouchableOpacity
          key={level}
          style={styles.link}
          onPress={() => handleLevelSelect(level)}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  link: {
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    width: '50%',
    alignItems: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
