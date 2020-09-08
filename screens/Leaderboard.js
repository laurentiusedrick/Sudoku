import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Leaderboard = ({navigation, route}) => {
  const {playAgain} = route.params || false

  return (
    <>
      <View style={styles.container}>
        <Text>Leaderboard</Text>
        {playAgain && <Button title="Play again?" onPress={
          ()=>navigation.navigate('Game')
        }/>}
        <StatusBar style="auto" />
      </View>
    </>
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

export default Leaderboard