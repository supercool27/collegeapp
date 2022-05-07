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
import {useNavigation} from '@react-navigation/native';
import { renderNode } from 'react-native-elements/dist/helpers';
const baseUrl = 'http://3.108.170.236/erp/apis/login_otp.php';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [sendOtp, setSendOtp] = useState('Send OTP');
  const [myText, setMyText] = useState('My Original Text');
  const [studentID, setStudentID] = useState('');
  const [showTheThing, setshowTheThing] = useState(false);
  const [userLoggedin,setUserLoggedin]  = useState(false);
  const [hideTheThing,setHideTheThing] = useState(true);
  const [otpData, setOtpData] = useState([]);
  const [myotp_value,setMyotp_value] = useState();
  const [mystudent_id,setMystudent_id]=useState();
  const passwordInputRef = createRef();
  const otpInputRef = createRef();
  const handleSubmitPress = async () => {
    setLoading(true);
    console.log('----------------------------------- OTP submitted------------------------------------------------');

   const userdetails= await AsyncStorage.getItem("Otp_details");
   const details = JSON.parse(userdetails);
   console.log(details);
   console.log('------------------------------------'+ details[0].otp_value);
   myotp = details[0].otp_value;
   setMyotp_value(myotp);
   console.log('----------------------------MY OTP value' + myotp);
   console.log('-----------------------------User OTP ----' + userOtp);
   if(myotp==userOtp){
      console.log('OTP verified');
      setUserLoggedin(true);
      setLoading(false);
      navigation.replace('DrawerNavigationRoutes');
   } 
   else{
    console.log('otp mismatched');
   }
  };

const handleasync_copy = async () => {

  
  if(userMobile==null || userMobile=='' || !userMobile){
    console.log('mobile blank submit');
    return;
  }

    setSendOtp('Resend OTP');
    setLoading(true);
    const requestOptions = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({monumber: userMobile}),
    };

    console.log('-------------requestOptions ---------------' + requestOptions);
    console.log('-------------baseUrl ---------------' +baseUrl);
    const response = await fetch(
      baseUrl,
      requestOptions,
    );
    const response1 = await fetch('https://webhook.site/4326abbc-7ec9-41d0-b967-ad888f79c33a', requestOptions);
    console.log('Otp fetched');
    
    const json_data = await response.json();

  console.log('----------json_data[0]------------'+json_data[0].otp_value);
  //alert("ye wali otp enter karna bro"+json_data[0].otp_value);
  setLoading(false);
  setshowTheThing(true);
  setHideTheThing(false);

   await AsyncStorage.setItem("Otp_details", JSON.stringify(json_data));

};
const resendOTP = async () => {

  console.log('mobile blank submit');
  if(userMobile==null || userMobile=='' || !userMobile){
   alert('Please fill Mobile Number');
    return;
  }

    setSendOtp('Resend OTP');
    setLoading(true);
    const requestOptions = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({monumber: userMobile}),
    };

    const response = await fetch(
      'http://3.108.170.236/erp/apis/login_otp.php',
      requestOptions,
    );
    //const response1 = await fetch('https://webhook.site/4326abbc-7ec9-41d0-b967-ad888f79c33a', requestOptions);
    console.log('Otp fetched');
    
    const json_data = await response.json();
    console.log('----------json_data[0]------------'+json_data[0].otp_value);
  
   
   setLoading(false);
   setshowTheThing(true);
   await AsyncStorage.setItem("Otp_details", JSON.stringify(json_data));
};

  if(!userLoggedin) {
  console.log('-------------------------------------------User not logged in ----------------------------------------');
  return(
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('./Image/logo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={ userMobile => setUserMobile(userMobile)
              
                }
                placeholder="Enter Mobile Number"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                maxLength={10}
              />
            </View>
            { hideTheThing && (
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleasync_copy}>
              <Text onPress={handleasync_copy} style={styles.buttonTextStyle}>
                {sendOtp}
              </Text>
            </TouchableOpacity>
            )}
            { showTheThing && (
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={resendOTP}>
              <Text onPress={resendOTP} style={styles.buttonTextStyle}>
                {sendOtp}
              </Text>
            </TouchableOpacity> ) }

            {showTheThing && (
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={userOtp => setUserOtp(userOtp)}
                  placeholder="Enter OTP" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="numeric"
                  ref={otpInputRef.current && otpInputRef.current.focus()}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
            )}
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            {showTheThing && (
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>Verify and login</Text>
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  ); 
}else 
{
  console.log('-------------------------------you are in else part----------------------------------------------------');
  {
    navigation.replace('DrawerNavigationRoutes');
    return(
    <View> 
      <Text>  </Text> 
      </View> 
    ); 
  
  }
}
};

export default LoginScreen;

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