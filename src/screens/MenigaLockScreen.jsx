import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {View, TextInput, ImageBackground, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const VOWELS = {
  CURVED: {chars: ['o'], regex: '[o]'},
  MULTI_CURVED: {chars: ['u'], regex: '[u]'},
  NON_CURVED: {chars: ['a', 'e', 'i'], regex: '[aei]'},
};

const CONSONANTS = {
  CURVED: '[cqs]',
  NON_CURVED: '[fhklmntvwxyz]',
  DUAL_CURVED: '[bdgjpqr]',
};


const MenigaLockScreen = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const [deca, setDeca] = useState(false);

  const fetchWords = useCallback(async patterns => {
    try {
      const responses = await Promise.all(
        patterns.map(pattern =>
          axios.get(`https://api.datamuse.com/words?ml=&sp=${pattern}&md=p`),
        ),
      );
      const response = responses
        .flatMap(res => res.data)
        .sort((a, b) => b.score - a.score);
      console.log(response, 'nounsresponse');

      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }, []);

  const generatePatterns = useCallback(pinNums => {
    let patternLength = parseInt(pinNums[0]) || 10;
    if (deca) patternLength += 10;
    console.log(patternLength, 'patternLength', deca);

    const vowelPositions = [pinNums[1] - 1, pinNums[2] - 1];
    const vowelTypes = [
      parseInt(pinNums[3]) === 0
        ? VOWELS.CURVED
        : parseInt(pinNums[3]) === 1
        ? VOWELS.NON_CURVED
        : VOWELS.MULTI_CURVED,
      parseInt(pinNums[4]) === 0
        ? VOWELS.CURVED
        : parseInt(pinNums[4]) === 1
        ? VOWELS.NON_CURVED
        : VOWELS.MULTI_CURVED,
    ];

    return vowelTypes[0].chars.flatMap(vowel1 =>
      vowelTypes[1].chars.map(vowel2 => {
        const pattern = Array(patternLength).fill('?');
        if (vowelPositions[0] < patternLength)
          pattern[vowelPositions[0]] = vowel1;
        if (vowelPositions[1] < patternLength)
          pattern[vowelPositions[1]] = vowel2;
        return pattern.join('');
      }),
    );
  }, []);

  const generateRegex = useCallback(pinNums => {
    let patternLength = parseInt(pinNums[0]) || 10;
    if (deca) patternLength += 10;
    const vowelPositions = [pinNums[1] - 1, pinNums[2] - 1];
    const vowelTypes = [
      parseInt(pinNums[3]) === 0
        ? VOWELS.CURVED.regex
        : parseInt(pinNums[3]) === 1
        ? VOWELS.NON_CURVED.regex
        : VOWELS.MULTI_CURVED.regex,
      parseInt(pinNums[4]) === 0
        ? VOWELS.CURVED.regex
        : parseInt(pinNums[4]) === 1
        ? VOWELS.NON_CURVED.regex
        : VOWELS.MULTI_CURVED.regex,
    ];
    const firstLetterType =
      parseInt(pinNums[1]) === 1 ? null : parseInt(pinNums[5]);

    const pattern = Array(patternLength).fill('[bcdfghjklmnpqrstvwxyz]');
    vowelPositions.forEach((pos, index) => {
      if (pos < patternLength) pattern[pos] = vowelTypes[index];
    });
    for (let i = Math.max(...vowelPositions) + 1; i < patternLength; i++) {
      pattern[i] = '[a-z]';
    }
    if (firstLetterType !== null) {
      pattern[0] =
        firstLetterType === 0
          ? CONSONANTS.CURVED
          : firstLetterType === 1
          ? CONSONANTS.NON_CURVED
          : CONSONANTS.DUAL_CURVED;
    }

    return new RegExp(pattern.join(''));
  }, []);

  const handleSubmit = useCallback(async () => {
    const pinNums = pin.split('');
    const patterns = generatePatterns(pinNums);
    const regex = generateRegex(pinNums);
    console.log(patterns, regex, 'patterns');
    // return;
    const result = await fetchWords(patterns);
    const nounWords = result.filter(word => {
      // console.log(word,word.tags);
      return word.tags?.includes('n') || word.tags == undefined;
    });
    const filteredWords = nounWords.filter(word => regex.test(word.word));
    // const nouns = filteredWords.filter(word => word.word.includes('n'));
    console.log(filteredWords, nounWords, 'nounwords');

    navigation.navigate('MenigaListScreen', {
      data: filteredWords,
      result: nounWords,
    });
  }, [pin, generatePatterns, generateRegex, fetchWords, navigation]);

  useEffect(() => {
    if (pin === '.') {
      console.log(pin, 'pin');
      setPin('');
      setDeca(true);
    }
  }, [pin]);

  return (
    <ImageBackground
      source={require('../assets/meniga/lock.png')}
      style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={8}
          value={pin}
          onChangeText={setPin}
          onSubmitEditing={handleSubmit}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '50%',
    color: 'white',
    position: 'absolute',
    top: '32%',
    textAlign: 'center',
    // fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});

export default MenigaLockScreen;
