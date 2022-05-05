import React from 'react';
import {View, FlatList, Text, SafeAreaView} from 'react-native';
import { StyleSheet } from 'react-native';
import StudentScreen from './StudentScreen';
import AsyncStorage from '@react-native-community/async-storage';
import Shimmer from 'react-native-shimmer';
import TableExample from '../Components/DataTable';

const HomeScreen = () => {
 
 return (
    <SafeAreaView style={{flex: 1}}>
        <StudentScreen/>
        {/* <TableExample/> */}
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            
            {'\n\n'}
           
          </Text>
        </View>

        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
       
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
       
        </Text>
      </View>

    </SafeAreaView>
  );
};

export default HomeScreen;
