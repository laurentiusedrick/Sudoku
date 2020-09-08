import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome5'
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux'
import { getBoard } from '../store/actions/gameActions';

const Start = ({navigation}) => {
  const dispatch = useDispatch()

  const [info, setInfo] = useState({
    name: '',
    difficulty: ''
  })
  const [errMsg, setErrMsg] = useState('')

  const handleNameChange = text => {
    setInfo({...info, name: text})
  }

  const handleDiffChange = text => {
    setInfo({...info, difficulty: text})
  }

  const handleStart = () => {
    if (info.name && info.difficulty) {
      setErrMsg('')
      dispatch({
        type: 'SET_BOARD',
        payload: {
          board: []
        }
      })
      dispatch({
        type: 'SET_GAMESTART',
        payload: info
      })
      dispatch(getBoard(info.difficulty))
      navigation.navigate('Game')
    }
    else if (!info.name) setErrMsg('Please enter your name')
    else setErrMsg('Please choose the difficulty')
  }

  const difficultyArray = ['easy','medium','hard']

  return (
    <>

      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Sugoku!</Text>
        <Text>Please put in your name and the preferred difficulty</Text>
        <TextInput style={styles.nameInput} placeholder="Name.." onChangeText={handleNameChange}/>
        <View style={styles.difficultySelector}>
        <FlatList
          horizontal
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          data={difficultyArray}
          renderItem={({item, i, separator}) => (
            <TouchableOpacity style={info.difficulty === item ? [styles.difficultySelected, styles.difficulty] : styles.difficulty} onPress={() => handleDiffChange(item)}>
              <Text style={{textTransform:'capitalize'}}>{item}</Text>
            </TouchableOpacity>
            )
          }
          keyExtractor={(item,i) => String(i)}
        />
        </View>
        <Button 
          title="Play Sugoku!"
          onPress={handleStart}
        />
        <Text style={{color: 'red', marginTop: 10}}>{errMsg}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    flex: 1,
    backgroundColor: '#4287f5',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap:'wrap',
    maxHeight: 70
  },
  title: {
    fontSize: 50,
    color: '#fff',
    marginLeft: 20
  },
  welcome: {
    fontSize: 30,
    color: '#000',
    marginBottom: 20,
  },
  nameInput: {
    width: 350,
    height: 30,
    borderBottomWidth: 1,
    marginTop: 30,
    marginBottom: 30,
    padding: 5,
  },
  container: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultySelector: {
    flexDirection:'row',
    flexWrap:'wrap',
    marginBottom: 30
  },
  difficulty: {
    width: 100,
    height: 30,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  difficultySelected: {
    borderWidth: 2,
    borderColor: '#4287f5',
  }
});

export default Start