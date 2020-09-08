import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Header = () => {
  return (
    <View style={styles.containerTitle}>
      <Icon name="sort-numeric-down" size={40} color="#fff"/>
      <Text style={styles.title}>SUGOKU</Text>
    </View>
  )
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
  }
})

export default Header