import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SudokuField = (props) => {

  const styles = StyleSheet.create({
    container: {
      width: 40,
      height: 40,
      borderWidth: 0.5, 
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selected: {
      borderWidth: 2,
      borderColor: '#4287f5',
    },
    unselected: {
      borderRightWidth: (props.coordinate.col === 2 || props.coordinate.col === 5 ? 2 : 0.5),
      borderBottomWidth: (props.coordinate.row === 2 || props.coordinate.row === 5 ? 2 : 0.5)
    },
    valueText: {
      fontSize: 25,
      color: props.readOnly ? '#000' : '#4287f5'
    },
  })

  return (
    <TouchableOpacity style={[styles.container, props.selected ? styles.selected:styles.unselected]} onPress={props.onSelectBox}>
      <Text style={styles.valueText}>{props.value}</Text>
    </TouchableOpacity>
  )
}



export default SudokuField