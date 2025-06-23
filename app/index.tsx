import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>DerDieDas</ThemedText>
      <Link href="/level" style={styles.link}>
        <ThemedText style={styles.buttonText}>Play Game</ThemedText>
      </Link>
      {/* Temporary link for testing - remove in production */}
      <Link href="/complete" style={[styles.link, styles.testLink]}>
        <ThemedText style={styles.buttonText}>Test Complete Screen</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  testLink: {
    backgroundColor: '#ff6b6b', // Different color to distinguish it
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});
