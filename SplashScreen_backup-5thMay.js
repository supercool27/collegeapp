import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import DrawerNavigationRoutes from './DrawerNavigationRoutes';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
const SplashScreen = ({navigation}) => {
 // const navigation = useNavigation();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      value = AsyncStorage.getItem('Otp_details');
      if(value===null){
        navigation.replace('Auth');
      } 
      else{ 
        navigation.replace('DrawerNavigationRoutes');
      }
    }, 5000);
  }, []);

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
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
