import React from 'react'
import { View, Text } from 'react-native'
import FlatListDemo from '../Components/FlatListDemo';
const MessagesScreen = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     <FlatListDemo/>
    </View>
  )
}

export default MessagesScreen