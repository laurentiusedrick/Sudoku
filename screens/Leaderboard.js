import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getBoard } from '../store/actions/gameActions';
import { FlatList } from 'react-native-gesture-handler';
import LeaderboardCard from '../components/LeaderboardCard';

const Leaderboard = ({ navigation, route }) => {
  const { playAgain } = route.params || false
  const dispatch = useDispatch()
  const { name, difficulty } = useSelector(state => state.gameReducer)
  const { stat } = useSelector(state => state.statReducer)


  const handleStart = () => {
    if (name && difficulty) {
      dispatch({
        type: 'SET_BOARD',
        payload: {
          board: []
        }
      })
      dispatch(getBoard(difficulty))
      navigation.navigate('Game')
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>
        <LeaderboardCard
          name={'Name'}
          difficulty={'Difficulty'}
          time={'Time'}
          isTitle={true}
        />
        {!stat.length && <Text style={{ marginTop: 100 }}>==================//////==================</Text>}
        <FlatList
          data={stat}
          contentContainerStyle={{ flexDirection: 'column', justifyContent: 'center' }}
          renderItem={({ item, i, separator }) => (
            <LeaderboardCard
              name={item.name}
              difficulty={item.difficulty}
              time={item.time}
            />
          )}
          keyExtractor={(item, index) => `${index}`}
        >
        </FlatList>
      </View>
      {playAgain && <Button title="Play again?" onPress={handleStart} />}
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
    marginTop: 20
  }
});

export default Leaderboard