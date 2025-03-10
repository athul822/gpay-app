import 'react-native-gesture-handler';
import {View, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import LockScreen from './src/screens/LockScreen';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MapViewScreen from './src/hunt/MapViewScreen';
import LeafMap from './src/hunt/LeafMap';
import GeoLoc from './src/hunt/GeoLoc';
import MenigaLockScreen from './src/screens/MenigaLockScreen';
import LandigScreen from './src/screens/LandigScreen';
import MenigaListScreen from './src/screens/MenigaListScreen';
import BrowserList from './src/screens/BrowserList';
import PracticeMeniga from './src/screens/PracticeMeniga';
import Birthday from './src/screens/birthday/Birthday';
import Peek from './src/screens/Peek/Peek';

const App = () => {
  const Stack = createStackNavigator();
  useEffect(() => {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="landing">
          <Stack.Screen
            name="LeafMap"
            options={{headerShown: false}}
            component={LeafMap}
          />
          <Stack.Screen
            name="landing"
            options={{headerShown: false}}
            component={LandigScreen}
          />
          <Stack.Screen
            name="GeoLoc"
            options={{headerShown: false}}
            component={GeoLoc}
          />
          <Stack.Screen
            name="MapView"
            options={{headerShown: false}}
            component={MapViewScreen}
          />
          <Stack.Screen
            name="LockScreen"
            options={{headerShown: false}}
            component={LockScreen}
          />
          <Stack.Screen
            name="HomeScreen"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="MenigaLockScreen"
            options={{headerShown: false}}
            component={MenigaLockScreen}
          />
          <Stack.Screen
            name="MenigaListScreen"
            options={{headerShown: false}}
            component={MenigaListScreen}
          />
          <Stack.Screen
            name="BrowserList"
            options={{headerShown: false}}
            component={BrowserList}
          />
          <Stack.Screen
            name="practice"
            options={{headerShown: false}}
            component={PracticeMeniga}
          />
          <Stack.Screen
            name="birthday"
            options={{headerShown: false}}
            component={Birthday}
          />
          <Stack.Screen
            name="peek"
            options={{headerShown: false}}
            component={Peek}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
