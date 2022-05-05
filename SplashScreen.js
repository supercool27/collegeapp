import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import DrawerNavigationRoutes from './DrawerNavigationRoutes';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
const SplashScreen = ({navigation}) => {
 // const navigation1 = useNavigation();
  const [animating, setAnimating] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setAnimating(true);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('Otp_details').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'DrawerNavigationRoutes'
        ),
      );
    }, 5000);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setAnimating(false);
  //     //Check if user_id is set or not
  //     //If not then send for Authentication
  //     //else send to Home Screen
  //     value = AsyncStorage.getItem('Otp_details');
  //     console.log(AsyncStorage.getItem("Otp_details"));
  //     console.log(AsyncStorage.getItem("Otp_details").otp_value);
  //     console.log(AsyncStorage.getItem("Otp_details").student_id);
  //     if(AsyncStorage.getItem("Otp_details").otp_value===null){
  //       console.log('-------------------------------------------Auth-------------------------------------------');
  //       navigation.replace('Auth');
  //     } 
  //     else{ 
  //       console.log('------------------------------------DrawerNavigationRoutes--------------------------------');
  //       navigation.replace('DrawerNavigationRoutes');
  //       // navigation.navigate('DrawerNavigationRoutes', {
  //       //   screen: 'The name of the screen you want to go inside DraweNavigatonRoutes stack navigator',
  //       // });
  //     }
  //   }, 5000);
  // }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./Image/logo.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A8A8',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
