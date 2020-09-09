import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header'
import SudokuField from '../components/SudokuField'
import { autoSolveBoard, validateBoard } from '../store/actions/gameActions';

const Game = ({ navigation }) => {
  const dispatch = useDispatch()
  const { name, board, difficulty, solution, done } = useSelector(state => state.gameReducer)
  const [localBoard, setLocalBoard] = useState([])
  const [selected, setSelected] = useState({})
  const [errMsg, setErrMsg] = useState('')
  const [cheat, setCheat] = useState(false)
  const [timer, setTimer] = useState(0)

  const selectorArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '']

  const timerTranslator = (time) => {
    return `${Math.floor(time / 60)}:${String(time % 60).length === 1 ? '0' + String(time % 60) : time % 60}`
  }
  const timerBegin = () => {
    if (difficulty === 'easy') return 3600
    else if (difficulty === 'medium') return 1800
    else if (difficulty === 'hard') return 600
  }

  //Initial Gamestart Timer Effect
  useEffect(() => {
    let time = timerBegin()
    const interval = setInterval(() => {
      time--
      setTimer(time)
      if (!time) {
        clearInterval(interval)
        navigation.navigate('Result', {
          cheat,
          timeOut: true,
          time: null
        })
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [board]);

  //Initial Game Start Board Effect
  useEffect(() => {
    let temp = []
    let innerTemp = []
    board.forEach((x, xi) => {
      x.forEach((y, yi) => {
        innerTemp.push({
          row: xi,
          col: yi,
          value: y ? y : null,
          readOnly: y ? true : false
        })
      })
      temp.push(innerTemp)
      innerTemp = []
    })
    setLocalBoard(temp)
    timerBegin()
  }, [board])

  //Auto Solve Effect
  useEffect(() => {
    if (board.length) {
      let temp = []
      let innerTemp = []
      localBoard.forEach((x, xi) => {
        x.forEach((y, yi) => {
          if (!y.readOnly) {
            innerTemp.push({
              row: xi,
              col: yi,
              value: solution[xi][yi],
              readOnly: false
            })
          } else if (y.readOnly) {
            innerTemp.push({
              row: xi,
              col: yi,
              value: localBoard[xi][yi].value,
              readOnly: true
            })
          }
        })
        temp.push(innerTemp)
        innerTemp = []
      })
      setLocalBoard(temp)
      setErrMsg('You have decided to use Auto Solve..')
      setCheat(true)
    }
  }, [solution])

  //Submit Effect
  useEffect(() => {
    if (done === false) {
      setErrMsg('Whoops, there are some mistakes!')
      setTimeout(() => {
        setErrMsg('')
        dispatch({
          type: 'SET_GAMESTATUS',
          payload: { done: null }
        })
      }, 3000)
    }
    else if (done) {
      if (!cheat) {
        dispatch({
          type: 'ADD_STAT',
          payload: {
            name,
            difficulty,
            time: {
              int: Math.abs(timer - timerBegin()),
              str: timerTranslator(Math.abs(timer - timerBegin()))
            }
          }
        })
      }
      navigation.navigate('Result', {
        cheat,
        timeOut: false,
        time: cheat ? null : timerTranslator(Math.abs(timer - timerBegin()))
      })
    }
  }, [done])

  //Set Selected Box By Pressing
  const onSelectBox = ({ row, col }) => {
    if (localBoard[row][col].readOnly === false) {
      setSelected({
        col,
        row
      })
    }
  }

  //Entering Value to Selected Box from Previous Selection
  const setSelectedValue = (num) => {
    if (selected.row !== undefined && selected.col !== undefined) {
      const newBoard = JSON.parse(JSON.stringify(localBoard))
      newBoard[selected.row][selected.col].value = num ? Number(num) : null
      setLocalBoard(newBoard)
    }
  }

  //Submit onPress Event
  const submit = () => {
    let done = true
    localBoard.forEach(row => {
      row.forEach(box => {
        if (!box.value) done = false
      })
    })
    if (done) {
      let simplifiedBoard = localBoard.map(x => {
        return x.map(y => {
          return y.value
        })
      })
      dispatch(validateBoard(simplifiedBoard))
    } else {
      setErrMsg('You have not finished the Sugoku yet!')
      setTimeout(() => {
        setErrMsg('')
      }, 3000)
    }
  }

  //Auto Complete onPress Event
  const autoComplete = () => {
    dispatch(autoSolveBoard())
  }

  //Loading Screen
  if (!board.length) return (
    <>
      <Header />
      <View style={styles.containerTitle}>
        <Text style={{ marginBottom: 20, fontSize: 20 }}>Generating Board...</Text>
        <ActivityIndicator size="large" color="#4287f5" />
      </View>
    </>
  )

  return (
    <>
      <Header />
      <View style={styles.containerTitle}>
        <Text style={styles.textHeader}>{difficulty}</Text>
        <Text style={[styles.textHeader, { fontSize: 30 }]}>{timerTranslator(timer)}</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={{ flex: 5.1, marginTop: -30 }}>

          <FlatList
            data={localBoard}
            contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'center' }}
            renderItem={({ item, i, separator }) => (
              <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center' }}>
                {item.map(item => {
                  return (
                    <SudokuField
                      key={`R${item.row}C${item.col}`}
                      value={item.value}
                      coordinate={{ row: item.row, col: item.col }}
                      readOnly={item.readOnly}
                      onSelectBox={() => onSelectBox({ row: item.row, col: item.col })}
                      selected={selected.row === item.row && selected.col === item.col ? true : false}
                    />
                  )
                })}
              </View>
            )}
            keyExtractor={(item, index) => `${index}`}
          />

        </View>
        <View style={styles.numberSelection}>
          <FlatList
            horizontal
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            data={selectorArray}
            renderItem={({ item, i, separator }) => (
              <TouchableOpacity style={styles.numberButton} onPress={() => setSelectedValue(item)}>
                <Text style={styles.fontButton}>{item}</Text>
              </TouchableOpacity>
            )
            }
            keyExtractor={(item) => String(item)}
          />
        </View>
      </View>
      <View style={styles.containerButton}>
        <Text style={styles.errText}>{errMsg}</Text>
        <Button title="Submit and Check" onPress={submit} />
      </View>
      <Button title="Auto Complete (Time will not be recorded)" color="#f00" onPress={autoComplete} />
    </>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textHeader: {
    fontSize: 20,
    textTransform: "capitalize"
  },
  mainContainer: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingBottom: 60
  },
  numberSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  numberButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4287f5',
    minWidth: 30,
    marginHorizontal: 5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5
  },
  fontButton: {
    fontSize: 30,
    color: '#4287f5'
  },
  errText: {
    justifyContent: 'center',
    fontSize: 20,
    color: 'red'
  },
});

export default Game