import React from 'react'
import styled from 'styled-components'
import { scale } from 'react-native-size-matters'

const GooglLogo = () => {
  return (
   <Logo source={require('../assets/ggl_logo.png')}/>
  )
}

export default GooglLogo

const Logo = styled.ImageBackground`
    width: 100%;
    height: 100%;
`

