import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Start from './Start'
import Leaderboard from './Leaderboard'
import Header from '../components/Header'
import { useSelector } from 'react-redux';


const Tab = createBottomTabNavigator()

const Home = () => {
  const stat = useSelector(state => state.statReducer.stat)

  return (
    <>
      <Header />
      <Tab.Navigator>
        <Tab.Screen name="Start" component={Start} options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => {
            return <Icon name="home" size={25} color="#4287f5" />
          }
        }} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} initialParams={{
          playAgain: false
        }} options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: () => {
            return <Icon name="medal" size={25} color="#4287f5" />
          },
          tabBarBadge: stat.length ? stat.length : null
        }} />
      </Tab.Navigator>
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
});

export default Home