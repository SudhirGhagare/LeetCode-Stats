/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './src/pages/Dashboard';

function App(){

  const Stack = createStackNavigator()

  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'> 
      <Stack.Screen name='Home' component={Dashboard} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;
