import React, {useState, createRef,useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import DrawerNavigationRoutes from './DrawerNavigationRoutes';
import axios from 'react-native-axios/lib/core/Axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
import { or } from 'react-native-reanimated';
import Onboarding from 'react-native-onboarding-swiper';
import { renderNode } from 'react-native-elements/dist/helpers';


const OnboardingScreen = ({navigation}) => {
  return <Onboarding
   onDone={() => console.log('done')}
   pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('./Image/circle.png')} />,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
    {
      backgroundColor: '#fe6e58',
      image: <Image source={require('./Image/square.png')} />,
      title: 'The Title',
      subtitle: 'This is the subtitle that sumplements the title.',
    },
    {
      backgroundColor: '#999',
      image: <Image source={require('./Image/triangle.png')} />,
      title: 'Triangle',
      subtitle: "Beautiful, isn't it?",
    },
  ]}
  />;
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
