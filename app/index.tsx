import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText title style={styles.title}>
        DerDieDas
      </ThemedText>
      <Link href="/level" style={styles.link}>
        <ThemedText style={styles.buttonText}>Play Game</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 250,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Tomorrow_700Bold',
    color: Colors.text,
  },
  link: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 50,
  },
  testLink: {
    backgroundColor: '#ff6b6b', // Different color to distinguish it
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});
