import {
  View,
  Text,
  Button,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const LandigScreen = () => {
  const navigation = useNavigation();

  const handleGPayPress = () => {
    navigation.navigate('LockScreen');
  };

  const handleMenigaPress = () => {
    navigation.navigate('MenigaLockScreen');
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        hidden={false}
      />
      <ImageBackground
        source={require('../assets/landing-screen.jpg')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          resizeMode: 'cover',
          gap: 10,
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            height: 60,
            width: 60,
            top: 540,
            left: 33,
            borderRadius: 50,
          }}
          onPress={handleGPayPress}></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            height: 60,
            width: 60,
            top: 540,
            right: 33,
            borderRadius: 50,
          }}
          onPress={handleMenigaPress}></TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            height: 60,
            width: 60,
            top: 426,
            right: 33,
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('practice')}>
          <Text>Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            height: 60,
            width: 60,
            bottom: 170,
            left: 129,
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('birthday')}>
          <Text>Birth</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            height: 60,
            width: 60,
            bottom: 170,
            left: 34,
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('peek')}>
          <Text></Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
};

export default LandigScreen;
