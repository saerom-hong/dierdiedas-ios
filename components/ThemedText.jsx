import { Text } from 'react-native';
import { Colors } from '../constants/Colors';
import { useFontContext } from '../contexts/FontContext';

const ThemedText = ({ style, ...props }) => {
  const { fontsLoaded } = useFontContext();

  if (!fontsLoaded) {
    return null;
  }
  
  const theme = Colors;

  return (
    <Text 
      style={[{ color: theme.text, fontSize: 18, fontFamily: 'Tomorrow_400Regular' }, style]}
      {...props}
    />
  );
};

export default ThemedText;