import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default ({navigation}) => {

  return (
      <View style={styles.container}>
        <Text>End of the game</Text>
        <Button title="Go to Leaderboard" onPress={
          ()=>navigation.navigate('Leaderboard', {
            playAgain: true
          })
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