import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Start, Leaderboard } from './'

const Tab = createBottomTabNavigator()

export default () => {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Start" component={Start}/>
      <Tab.Screen name="Leaderboard" component={Leaderboard} initialParams={{
        playAgain: false
      }}/>
    </Tab.Navigator>
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
