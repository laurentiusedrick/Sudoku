import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default ({navigation}) => {

  return (
      <View style={styles.container}>
        <Text>Beginning of the game</Text>
        <Button title="Go to Game" onPress={
          ()=>navigation.navigate('Game')
        }/>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});