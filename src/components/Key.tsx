import React, { useState } from 'react'
import styled from 'styled-components'
import { scale } from 'react-native-size-matters'
import { deletePin, setPin } from '../store/key'
import { useDispatch } from 'react-redux'

const Key = ({ value }) => {
  const dispatch = useDispatch()
  const [isPressed, setIsPressed] = useState(false)
  const handleKeyPress = () => {
    setIsPressed(true)
    setTimeout(() => {
      setIsPressed(false)
    }, 500) // Ad
    console.log(value)
    if (value == null) {
      dispatch(deletePin(null))
    } else {
      dispatch(setPin(value))
    }
  }
  return (
    <KeyContainer onPress={handleKeyPress} isPressed={isPressed}>
      {
        value == null ? <Delete source={require('../assets/dlt_ico.png')} /> : <KeyText>{value}</KeyText>
      }
    </KeyContainer>
  )
}

export default Key
const KeyContainer = styled.TouchableOpacity`
    width: ${scale(50)};
    height: ${scale(50)};
    border-radius: 50px;
    margin-left: ${scale(28)};
    margin-right: ${scale(28)};
    justify-content: center;
    align-items: center;
    background-color: ${(props: { isPressed: boolean }) => props.isPressed ? 'rgba(0,0,0,0.1)' : 'white'};
`
const KeyText = styled.Text`
    font-size: ${scale(20)};
    color: black;
`

const Delete = styled.ImageBackground`
    width: ${scale(25)};
    height: ${scale(25)};
    border-radius: 50px;
    margin-left: ${scale(28)};
    margin-right: ${scale(28)};
    justify-content: center;
    align-items: center;
`
