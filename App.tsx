import 'react-native-gesture-handler';
import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import LockScreen from './src/screens/LockScreen'
import { Provider } from 'react-redux'
import store from './src/store/store'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen';
import MapViewScreen from './src/hunt/MapViewScreen';
import LeafMap from './src/hunt/LeafMap';
import GeoLoc from './src/hunt/GeoLoc';

const App = () => {
  const Stack = createStackNavigator();
  useEffect(() => {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
  }, []);
  return (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LeafMap'>
            <Stack.Screen name="LeafMap" options={{headerShown: false}} component={LeafMap} />
            <Stack.Screen name="GeoLoc" options={{headerShown: false}} component={GeoLoc} />

            <Stack.Screen name="MapView" options={{headerShown: false}} component={MapViewScreen} />
                <Stack.Screen name="LockScreen" options={{headerShown: false}} component={LockScreen} />
                <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
     
    </Provider>
  )
}

export default App

