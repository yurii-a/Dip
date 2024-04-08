import React from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInputComponent,
  TextInput,
} from 'react-native';
import Colors from '../styles/Colours';

export function Header() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      {/* <ImageBackground
        accessibilityRole="image"
        testID="new-app-screen-header"
        source={require('../assets/img/background.png')}
        style={[
          styles.background,
          {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
        ]}
        imageStyle={styles.logo}>
        <View>
          <Text style={styles.title}>Welcome Dip</Text>
          <Text style={styles.subtitle}>
            Manage your assets, points and open positions
          </Text>
        </View>
      </ImageBackground> */}
      <View>
        <Text style={styles.title}>Welcome to Dip</Text>
        {/* <Text style={styles.subtitle}>
          Manage your assets, points and open positions
        </Text> */}
      </View>
 
  </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.purple,
    paddingBottom: 40,
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  logo: {
    overflow: 'visible',
    resizeMode: 'cover',
  },
  subtitle: {
    color: '#333',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    color: '#000',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 40,
  },
});
