import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
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
            Student fees Details Goes here
            {'\n\n'}
           {/* its my desktop code */}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
         {/* its my desktop code */}
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

export default SettingsScreen;