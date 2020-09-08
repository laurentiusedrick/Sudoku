import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default ({navigation}) => {
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
      navigation.navigate('Game')
    }
    else if (!info.name) setErrMsg('Please enter your name')
    else setErrMsg('Please choose the difficulty')
  }

  return (
    <>
    <View style={styles.containerTitle}>
      <Text style={styles.title}>SUGOKU</Text>
    </View>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Sugoku!</Text>
        <Text>Please put in your name and the preferred difficulty</Text>
        <TextInput style={styles.nameInput} placeholder="Name.." onChange={handleNameChange}/>
        <View style={styles.difficultySelector}>
        <TouchableOpacity style={info.difficulty === 'easy'? styles.difficultySelected : styles.difficulty} onPress={() => handleDiffChange('easy')}>
          <Text>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={info.difficulty === 'normal'? styles.difficultySelected : styles.difficulty} onPress={() => handleDiffChange('normal')}>
          <Text>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={info.difficulty === 'hard'? styles.difficultySelected : styles.difficulty} onPress={() => handleDiffChange('hard')}>
          <Text>Hard</Text>
        </TouchableOpacity>
        </View>
        <Button 
          title="Play Sugoku!"
          onPress={handleStart}
        />
        <Text style={{color: 'red', marginTop: 10}}>{errMsg}</Text>
        {/* <StatusBar style="auto" /> */}
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
  },
  title: {
    fontSize: 50,
    color: '#fff'
  },
  welcome: {
    fontSize: 30,
    color: '#000',
    marginBottom: 30,
  },
  nameInput: {
    width: 350,
    height: 30,
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 30,
    padding: 5,
  },
  diffInput: {
    width: 250,
    height: 30,
    borderWidth: 1,
    marginBottom: 30,
    marginTop: 10,
    padding: 5,
  },
  container: {
    flex: 7,
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
    width: 100,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#4287f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  }
});