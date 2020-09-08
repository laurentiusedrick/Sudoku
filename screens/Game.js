import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default ({navigation}) => {

  return (
      <View style={styles.container}>
        <Text>The game</Text>
        <Button title="Submit" onPress={
          ()=>navigation.navigate('Result')
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