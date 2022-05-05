import React, {useState, createRef} from 'react';
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

import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
const baseUrl = 'http://3.108.170.236/erp/apis/login_otp.php';
const LoginCheck = async ({navigation}) => {

   const userdetails= await AsyncStorage.getItem("Otp_details");
   const details = JSON.parse(userdetails);
   const otp_valued = details[0].otp_value; 
   const student_idd = details[0].student_id;
   console.log('login check...')
   console.log(student_idd);
   console.log(otp_valued)

   if(student_idd!=null || student_idd !=''){
         navigation.replace('DrawerNavigationRoutes');
   }
   
};

export default LoginCheck;
