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
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import home from '../assets/meniga/home.png';
import {TextInput} from 'react-native-gesture-handler';
import {findBestPosition} from '../utils/letter';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import identifyPhysicalObjects from '../utils/gemini';
import axios from 'axios';

const MenigaListScreen = () => {
  const route = useRoute();
  const {data, result} = route.params || {};
  const navigation = useNavigation();
  const [displayData, setDisplayData] = React.useState(data);
  const [showData, setShowData] = React.useState(false);
  const [background, setBackground] = React.useState(home);
  const [bestPosition, setBestPosition] = React.useState(0);

  console.log(data, 'data');
  console.log(result, 'result');

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

  useEffect(() => {
    if (displayData) {
      const bestPosition = findBestPosition(displayData, [1, 3, 4]);
      console.log(bestPosition, 'bestPosition');
      setBestPosition(bestPosition);
    }
  }, [displayData]);

  const handleSpacePres = () => {
    console.log('handleSpacePres', result);

    const wordsWithSpace = result.filter(item => {
      return item.word.includes(' ');
    });
    console.log(wordsWithSpace, 'wordsWithSpace');
    setDisplayData(wordsWithSpace);
  };

  const sortWordObjects = (wordObjects, referenceArray) => {
    // Create a map of words to their index in the referenceArray
    const referenceMap = new Map(
      referenceArray.map((word, index) => [word, index]),
    );

    // Custom sorting function
    const customSort = (a, b) => {
      const indexA = referenceMap.get(a.word);
      const indexB = referenceMap.get(b.word);

      // If both words are in the referenceArray, sort by their order in referenceArray
      if (indexA !== undefined && indexB !== undefined) {
        return indexA - indexB;
      }
      // If only a is in the referenceArray, it should come first
      if (indexA !== undefined) {
        return -1;
      }
      // If only b is in the referenceArray, it should come first
      if (indexB !== undefined) {
        return 1;
      }
      // If neither word is in the referenceArray, maintain their original order
      return 0;
    };

    // Sort the wordObjects array using the custom sorting function
    return wordObjects.sort(customSort);
  };

  const classiFyGemini = async () => {
    const words = displayData.map(item => `${item.word}`);
    console.log(words, 'classiFyGemini');
    let data = JSON.stringify({
      words: words,
    });

    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    };

    try {
      let response = await fetch(
        'https://word-classifier.vercel.app/api/classifyWords',
        config,
      );
      let result = await response.json();
      // let result =
      //   'bridge, plasma, bridle, prince, dredge, grille, branca, grange, griffe, bhakti, bleyme, gramma, bhakta, bhangi, brahmi, bregma, britta, blanda, brandi, brilla, blimbi, brachi, briski, britni, bressi';
      let resultArray = result.split(', ');
      console.log(result, resultArray, 'response.data');
      const sortedWordObjects = sortWordObjects(displayData, resultArray);
      console.log(sortedWordObjects, 'sortedWordObjects');
      setDisplayData(sortedWordObjects);
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    if (data) {
      // const wordArray = data.map(item => `${item.word}`);
      // classiFyGemini(wordArray);
      // console.log(wordArray, 'wordArray');
    }
  }, [data]);

  return (
    <View
      style={{flex: 1}}
      onPress={() => {
        setShowData(true);
      }}>
      <ImageBackground
        source={background}
        style={{
          flex: 1,
          backgroundColor: 'gray',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 50,
        }}>
        <View
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            right: scale(105),
            top: verticalScale(235),
            height: scale(20),
            width: scale(20),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {bestPosition}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSpacePres}
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            right: scale(27),
            bottom: verticalScale(166),
            height: scale(54),
            width: scale(55),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>SPACE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BrowserList', {
              data: displayData,
              bestPosition: bestPosition,
            });
          }}
          style={{
            backgroundColor: 'green',
            position: 'absolute',
            right: scale(189),
            bottom: verticalScale(166),
            height: scale(54),
            width: scale(55),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>OPEN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={classiFyGemini}
          style={{
            backgroundColor: 'blue',
            position: 'absolute',
            right: scale(27),
            bottom: verticalScale(270),
            height: scale(54),
            width: scale(55),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>CLASS</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default MenigaListScreen;
