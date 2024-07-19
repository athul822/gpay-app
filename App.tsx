import 'react-native-gesture-handler';
import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import LockScreen from './src/screens/LockScreen'
import { Provider } from 'react-redux'
import store from './src/store/store'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  const Stack = createStackNavigator();
  useEffect(() => {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
  }, []);
  return (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LockScreen'>
                <Stack.Screen name="LockScreen" options={{headerShown: false}} component={LockScreen} />
                <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
     
    </Provider>
  )
}

export default App

