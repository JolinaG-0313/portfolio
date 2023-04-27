import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MainScreen = ({ navigation }) => {
  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Art App!</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('ArtistsScreen')}>
        <Text style={styles.buttonText}>Artists</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Quiz')}>
        <Text style={styles.buttonText}>Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
