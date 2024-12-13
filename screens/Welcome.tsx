import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Welcome: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to the App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Welcome;
