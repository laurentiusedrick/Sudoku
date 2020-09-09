import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const LeaderboardCard = (props) => {

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 30,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: Dimensions.get('window').width / 3 * 2
    },
    valueText: {
      fontSize: 15
    },
    title: {
      marginVertical: 30,
    }
  })

  return (
    <View style={[styles.container, props.isTitle ? styles.title : styles.container]}>
      <Text style={styles.valueText}>{props.name.slice(0, 18)}</Text>
      <Text style={styles.valueText}>{props.difficulty} :: {props.time.str}</Text>
    </View>
  )
}



export default LeaderboardCard