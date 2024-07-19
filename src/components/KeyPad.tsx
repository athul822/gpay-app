import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { moderateScale, scale } from 'react-native-size-matters'
import Key from './Key'

const KeyPad = () => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9','', '0',null];
  return (
    <KeyPadContainer>
        {
            keys.map((key, index) =>  <Key value={key}/>)
        }
      
    </KeyPadContainer>
  )
}

export default KeyPad

const KeyPadContainer = styled.View`
margin-left: ${moderateScale(0)};
margin-right: ${moderateScale(0)};
flex-direction: row;
flex-wrap: wrap;
gap: ${moderateScale(10)};
align-items: center;
justify-content: center;
`
