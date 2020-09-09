import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import Game from './screens/Game'
import Result from './screens/Result'
import { Provider } from 'react-redux'
import store from './store'

const Stack = createStackNavigator()

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{
            headerTitle: null
          }
          }/>
          <Stack.Screen name="Game" component={Game} options={
          {
            headerTitle: null,
            headerLeft: null
          }
        }/>
          <Stack.Screen name="Result" component={Result} options={
          {
            headerTitle: null,
            headerLeft: null
          }
        }/>
        </Stack.Navigator>
      </NavigationContainer>  
    </Provider>
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
