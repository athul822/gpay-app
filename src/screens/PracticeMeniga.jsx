import {View, Text, Button, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import identifyPhysicalObjects from '../utils/gemini';
import AsyncStorage from '@react-native-async-storage/async-storage';
const VOWELS = {
  CURVED: {chars: ['o']},
  MULTI_CURVED: {chars: ['u']},
  NON_CURVED: {chars: ['a', 'e', 'i']},
};
const CONSONANTS = {
  CURVED: {chars: ['c', 'q', 's']},
  NON_CURVED: {
    chars: ['f', 'h', 'k', 'l', 'm', 'n', 't', 'v', 'w', 'x', 'y', 'z'],
  },
  DUAL_CURVED: {chars: ['b', 'd', 'g', 'j', 'p', 'q', 'r']},
};
const PracticeMeniga = () => {
  // Add state to manage wordArray
  const [words, setWords] = useState('');
  const [question, setQuestion] = useState(0);
  const [position, setPosition] = useState(0);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [showWords, setShowWords] = useState(false);
  useEffect(() => {
    // Create separate async function since useEffect callback cannot be async
    const loadWords = async () => {
      try {
        const storedWordArray = await AsyncStorage.getItem('wordArray');
        const wordsArray = storedWordArray && JSON.parse(storedWordArray);
        if (wordsArray) {
          console.log(wordsArray, 'wordsArray2');
          setWords(wordsArray[0].replace(/\s/g, ''));
          return;
        }
        // return;
        const data = await identifyPhysicalObjects();
        const newWordArray = data.split(',');
        // Since we don't have access to previous wordArray here,
        // we need to get it first if we want to append
        const updatedWords = [...newWordArray];
        console.log(updatedWords, 'updatedWords');
        await AsyncStorage.setItem('wordArray', JSON.stringify(updatedWords));
        setWords(updatedWords[0]);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    loadWords();
  }, []); // Only run on mount

  useEffect(() => {
    console.log(words, 'words');
  }, [words]);

  const manageQuestions = () => {
    const secretWord = words?.toLowerCase();
    const findNthVowelPositionAndShape = (inputWord, n) => {
      let vowelCount = 0;
      for (let i = 0; i < inputWord.length; i++) {
        const letter = inputWord[i].toLowerCase();
        const shape = getVowelShape(letter);

        if (shape) {
          // If it's a vowel, shape will not be null
          vowelCount++;
          if (vowelCount === n) {
            return {position: i + 1, shape: shape}; // Return 1-based index and shape
          }
        }
      }
      return {position: -1, shape: ''}; // No vowel found or vowel count is less than n
    };

    const getVowelShape = letter => {
      if (VOWELS.CURVED.chars.includes(letter)) {
        return 'Curved';
      } else if (VOWELS.MULTI_CURVED.chars.includes(letter)) {
        return 'Straigt & Curved';
      } else if (VOWELS.NON_CURVED.chars.includes(letter)) {
        return 'Straight Line';
      }
      return null; // Not a vowel
    };
    const getConsonantShape = letter => {
      console.log(letter, 'letter');
      
      if (CONSONANTS.CURVED.chars.includes(letter)) {
        return 'Curved';
      } else if (CONSONANTS.DUAL_CURVED.chars.includes(letter)) {
        return 'Straigt & Curved';
      } else if (VOWELS.NON_CURVED.chars.includes(letter)) {
        return 'Straight Line';
      }
      return null; // Not a vowel
    };

    if (question == 0) {
      return (
        <Text>{`length of the word is ${
          secretWord?.replace(/\s/g, '').length
        }`}</Text>
      );
    }
    if (question == 1) {
      const vowelPosition = findNthVowelPositionAndShape(secretWord, 1);
      return <Text>{`first vowel position is ${vowelPosition.position}`}</Text>;
    }
    if (question == 2) {
      const vowelPosition = findNthVowelPositionAndShape(secretWord, 1);
      return <Text>{`first vowel shape is ${vowelPosition.shape}`}</Text>;
    }
    if (question == 3) {
      const vowelPosition = findNthVowelPositionAndShape(secretWord, 2);
      return (
        <Text>{`Second vowel position is ${vowelPosition.position}`}</Text>
      );
    }
    if (question == 4) {
      const vowelPosition = findNthVowelPositionAndShape(secretWord, 1);
      return <Text>{`first vowel shape is ${vowelPosition.shape}`}</Text>;
    }
    if (question == 5) {
      const FirstLetterShape = getConsonantShape(secretWord.replace(/\s/g, '')[0]);
      return <Text>{`first Letter shape is ${FirstLetterShape}`}</Text>;
    }
  };
  const handleDelete = async () => {
    const storedWordArray = await AsyncStorage.getItem('wordArray');
    const wordsArray = storedWordArray && JSON.parse(storedWordArray);
    if (wordsArray) {
      const updatedWords = [...wordsArray];
      updatedWords.shift();
      console.log(updatedWords, 'updatedWords');
      await AsyncStorage.setItem('wordArray', JSON.stringify(updatedWords));
      setWords(updatedWords[0]);
    }

  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}>
      {showWords && (
        <Text>{words}</Text>
      )}

      <Button
        title={displayPosition ? 'Hide' : 'Show'}
        onPress={() => {
          setShowWords(prevState => !prevState);
        }}
      />
      <TextInput
        placeholder="Type here"
        onChangeText={text => setPosition(text)}
        keyboardType="number-pad"
      />
      {displayPosition && position && (
        <Text>{words[position - 1].toUpperCase()}</Text>
      )}

      <Button
        title={displayPosition ? 'Hide' : 'Show'}
        onPress={() => {
          setDisplayPosition(prevState => !prevState);
        }}
      />
      {manageQuestions()}
      <Button
        title="Next"
        onPress={() => {
          setQuestion(prevQuestion => prevQuestion + 1);
        }}
      />
      <Button
        style={{backgroundColor: 'red', marginTop: 20, color: 'white'}}
        title="DELETE"
        onPress={handleDelete}
      />
    </View>
  );
};

export default PracticeMeniga;
