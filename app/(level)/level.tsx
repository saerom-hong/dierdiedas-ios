import { StyleSheet } from 'react-native';

import ThemedLink from '@/components/ThemedLink';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const Level = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Choose a level</ThemedText>
      <ThemedLink
        href="/(play)/play"
        style={styles.link}
        textStyle={styles.linkText}
      >
        A1
      </ThemedLink>
      <ThemedLink
        href="/(play)/play"
        style={styles.link}
        textStyle={styles.linkText}
      >
        A2
      </ThemedLink>
      <ThemedLink
        href="/(play)/play"
        style={styles.link}
        textStyle={styles.linkText}
      >
        B1
      </ThemedLink>
      <ThemedLink
        href="/(play)/play"
        style={styles.link}
        textStyle={styles.linkText}
      >
        B2
      </ThemedLink>
      <ThemedLink
        href="/(play)/play"
        style={styles.link}
        textStyle={styles.linkText}
      >
        C1
      </ThemedLink>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
  },
});
