import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const Result = ({navigation, route}) => {
  const dispatch = useDispatch()
  const {cheat} = route.params

  const disableBack = () => {
    navigation.navigate('Leaderboard')
  }

  useEffect(()=>{
    return () => {dispatch({type: 'RESET_GAMESTATE'})}
  },[])

  useFocusEffect(
    React.useCallback(() => {
    BackHandler.addEventListener('hardwareBackPress',disableBack);
    return () => BackHandler.removeEventListener('hardwareBackPress',disableBack)
  }, []))

  

  return (
      <View style={styles.container}>
        <Text>End of the game</Text>
        {cheat && <Text>You used Auto Solve! :(</Text>}
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

export default Result