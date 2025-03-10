import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Button,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import home from '../assets/meniga/chrmsearch.png';
import {TextInput} from 'react-native-gesture-handler';
import {findBestPosition} from '../utils/letter';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const BrowserList = () => {
  const route = useRoute();
  const {data, bestPosition} = route.params || {};
  const [displayData, setDisplayData] = React.useState(data);
  const [background, setBackground] = React.useState(home);
  const [showData, setShowData] = React.useState(false);
  const renderItem = ({item}) => (
    <View
      style={{
        width: '100%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
      <ImageBackground
        source={{
          uri: `https://via.placeholder.com/400x300?text=${item.word}`,
        }}
        style={{width: 30, height: 30}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          width: '80%',
        }}>
        <Text style={{color: 'black', fontWeight: '600'}}>
          {item.word} - {item.score}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/search?tbm=isch&q=${item.word}`,
            );
          }}>
          <Text style={{color: 'blue'}}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <ImageBackground
      source={background}
      style={{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: moderateScale(50),
        paddingBottom: moderateScale(20),
      }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          //   borderWidth: 1,
          width: '100%',
          color: 'black',
        }}
        onFocus={() => {
          setShowData(true);
        }}
        placeholder="Enter a word"
        placeholderTextColor="black"
        onChangeText={text => {
          if (!text) {
            setDisplayData(data);
            return;
          }
          let newData = data.filter(item => {
            return (
              item.word.replace(/\s+/g, '')[bestPosition - 1] ===
              text.toLowerCase()
            );
          });
          console.log(newData, 'newData');
          setDisplayData(newData);
        }}
      />
      {showData && (
        <FlatList
          data={displayData}
          renderItem={renderItem}
          style={{width: '100%', padding: 10, backgroundColor: 'white'}}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
      )}
    </ImageBackground>
  );
};

export default BrowserList;
