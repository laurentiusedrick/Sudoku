import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header'
import SudokuField from '../components/SudokuField'
import { autoSolveBoard, validateBoard } from '../store/actions/gameActions';

const Game = ({navigation}) => {
  const dispatch = useDispatch()
  // const board = useSelector(state => state.gameReducer.board)
  // const difficulty = useSelector(state => state.gameReducer.difficulty)
  // const solution = useSelector(state => state.gameReducer.solution)
  // const done = useSelector(state => state.gameReducer.done)
  const {board, difficulty, solution, done} = useSelector(state => state.gameReducer)
  const [localBoard, setLocalBoard] = useState([])
  const [selected, setSelected] = useState({})
  const [errMsg, setErrMsg] = useState('')
  const [cheat, setCheat] = useState(false)

  const selectorArray = ['1','2','3','4','5','6','7','8','9','']
  let timer = '10:00'
  // if (difficulty === 'easy') timer = '60:00'
  // if (difficulty === 'medium') timer = '30:00'
  // if (difficulty === 'hard') timer = '10:00'

  useEffect(()=> {
    let temp = []
    let innerTemp = []
    board.forEach((x,xi)=>{
      x.forEach((y,yi)=>{
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
  }, [board])

  useEffect(()=>{
    if (board.length) {
      let temp = []
      let innerTemp = []
      localBoard.forEach((x,xi)=>{
        x.forEach((y,yi)=>{
          if (!y.readOnly) {
          innerTemp.push({
            row: xi,
            col: yi,
            value: solution[xi][yi],
            readOnly: false
          })} else if (y.readOnly) {
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
  },[solution])

  useEffect(()=>{
    if (done === false) {
      setErrMsg('Whoops, there are some mistakes in your answer!')
      setTimeout(()=>{
        setErrMsg('')
        dispatch({
          type: 'SET_GAMESTATUS',
          payload: {done: null}
        })
      },3000)
    }
    else if (done) {
      navigation.navigate('Result', {
        cheat,
      })
    }
  },[done])

  const onSelectBox = ({row,col}) => {
    if (localBoard[row][col].readOnly === false) {
      setSelected({
        col,
        row
      })
    }
  }

  const setSelectedValue = (num) => {
    if(selected.row !== undefined && selected.col !== undefined) {
      const newBoard = [...localBoard]
      newBoard[selected.row][selected.col].value = num ? Number(num) : null
      setLocalBoard(newBoard)
    }
  }

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
      setTimeout(()=>{
        setErrMsg('')
      },3000)
    }
  }

  const autoComplete = () => {
    dispatch(autoSolveBoard())
  }

  if (!board.length) return (
    <>
    <Header />
    <View style={styles.containerTitle}>
      <Text style={{ marginBottom:20, fontSize: 20 }}>Generating Board...</Text>
      <ActivityIndicator size="large" color="#4287f5"/>
    </View>
    </>
  )

  return (
      <>
      <Header />

      <View style={styles.containerTitle}>
        <Text style={styles.textHeader}>{difficulty}</Text>
        <Text style={[styles.textHeader, {fontSize: 30}]}>{timer}</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={{flex:5.1, marginTop:-30}}>

          <FlatList
            data={localBoard}
            contentContainerStyle={{flexGrow: 1, flexDirection: 'column',  justifyContent: 'center'}}
              renderItem={({ item,i,separator }) => (
                  // <FlatList
                  //   data={item}
                  //   contentContainerStyle={{flexGrow: 1, justifyContent: 'center', flexDirection: 'row'}}
                  //   renderItem={({ item,i,separator }) => (
                  //     <SudokuField
                  //       key={`R${item.row}C${item.col}`}
                  //       value={item.val}
                  //       readOnly={item.readOnly}
                  //     />
                  //   )}
                  //   keyExtractor={(box, index) => `${index}`}
                  // /> 
                <View style={{flexGrow: 1, flexDirection: 'row',  justifyContent: 'center'}}> 
                  {item.map(item => {
                    return (
                      <SudokuField
                        key={`R${item.row}C${item.col}`}
                        value={item.value}
                        coordinate={{row:item.row,col:item.col}}
                        readOnly={item.readOnly}
                        onSelectBox={()=>onSelectBox({row:item.row,col:item.col})}
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
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          data={selectorArray}
          renderItem={({item, i, separator}) => (
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
      </View>
      <View style={styles.containerButton}>
        <Button title="Submit and Check" onPress={submit}/>
        {/* <Button title="Move to Next Page (Debug)" onPress={()=>navigation.navigate('Result')}/> */}
      </View>
      <Button title="Auto Complete (Time will not be recorded)" color="#f00" onPress={autoComplete}/>
      </>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
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
    flexDirection:'row',
  },
  numberSelection: {
    flexDirection:'row',
    flexWrap:'wrap',
  },
  numberButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color:'#4287f5',
    minWidth:30,
    marginHorizontal: 5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5
  },
  fontButton: {
    fontSize:30,
    color: '#4287f5'
  },
  errText: {
    justifyContent: 'center',
    fontSize:20,
    color: 'red'
  },
});

export default Game