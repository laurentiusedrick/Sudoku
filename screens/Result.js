import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const Result = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { cheat, timeOut, time } = route.params

  const disableBack = () => {
    navigation.navigate('Leaderboard')
  }

  useEffect(() => {
    return () => { dispatch({ type: 'RESET_GAMESTATE' }) }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', disableBack);
      return () => BackHandler.removeEventListener('hardwareBackPress', disableBack)
    }, []))



  return (
    <>
      {!cheat && !timeOut &&
        <View style={styles.container}>
          <Text style={styles.title}>Congratulations!</Text>
          <Text>You solved the puzzle in {String(time)}!</Text>
        </View>
      }

      {!cheat && timeOut &&
        <View style={styles.container}>
          <Text style={styles.title}>Too bad..</Text>
          <Text>You ran out of time :(</Text>
        </View>
      }

      {cheat &&
        <View style={styles.container}>
          <Text style={styles.title}>Too bad..</Text>
          <Text>You used Auto Solve! :(</Text>
          <Text>Your time will not be recorded</Text>
        </View>
      }
      <Button title="Go to Leaderboard" onPress={
        () => navigation.navigate('Leaderboard', {
          playAgain: true
        })
      } />
      <StatusBar style="auto" />
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
  title: {
    fontSize: 30,
    marginBottom: 30
  }
});

export default Result