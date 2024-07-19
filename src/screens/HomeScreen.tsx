import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const HomeScreen = () => {
  const pinCollection = useSelector(state => state.key.pinCollection)
  return (
    <View>
      {
        pinCollection.map((key, index) => <Text key={index}>{key}</Text>)
      }
    </View>
  )
}

export default HomeScreen