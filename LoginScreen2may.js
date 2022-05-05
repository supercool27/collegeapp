import React, {useState, useEffect,createRef} from 'react';
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
import { renderNode } from 'react-native-elements/dist/helpers';
const baseUrl = 'http://3.108.170.236/erp/apis/login_otp.php';
const CheckUserSignedIn = async () => {
  console.log('-----------------------------------------CheckUserSignedIn---------------------------');

  let context = this;
  try {
     let value = await AsyncStorage.getItem('Otp_details');
     if (value != null)
     {
        // do something 
        console.log('-----------------------------------------CheckUserSignedIn---if--------------------------');
        setUserLoggedin(true);
        navigation.replace('DrawerNavigationRoutes');
     }
     else 
     {
      console.log('.........................................-CheckUserSignedIn---else.....................');
      setUserLoggedin(false);
     // LoginScreen;
       //return null;
     }
  } catch (error) {
    // Error retrieving data
  }
};
const LoginScreen = ({navigation}) => {

  CheckUserSignedIn();
  console.log('--------------------------------------------CheckUserSignedIn called---------------------------------------------------');
  
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
  const [otpData, setOtpData] = useState([]);
  const [myotp_value,setMyotp_value] = useState('');
  const [mystudent_id,setMystudent_id]=useState('');
  const [resend_otp,setResend_otp] = useState(false);
  const passwordInputRef = createRef();
  const otpInputRef = createRef();


  console.log('Starting-------------------------------Login 1 Screen-------------------------------------');
 

  const handleSubmitPress = async () => {
   const userdetails= await AsyncStorage.getItem("Otp_details");
   const details = JSON.parse(userdetails);
   console.log(details);
   const otp_valued = details[0].otp_value; 
   const student_idd = details[0].student_id; 
   setMyotp_value('123');
   setMyotp_value(otp_valued);
   setMystudent_id(student_idd);                             
   console.log(myotp_value);
   console.log(userOtp);
   if(myotp_value==userOtp){
      console.log('OTP verified');
      navigation.replace('DrawerNavigationRoutes');
      return null;
   } 
   else
   {
    console.log('otp mismatched');
   }
  };

const handleasync_copy = async () => {

  console.log('------------------------------------------------handleeasync_copy-----------------------------------');
  // navigation.replace('DrawerNavigationRoutes');
  // return;
  if(!userMobile || userMobile==''|| userMobile==null){
      console.log('empty');
      alert('Please enter your mobile number');
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
   console.log(json_data);
   setLoading(false);
   setshowTheThing(true);
   await AsyncStorage.setItem("Otp_details", JSON.stringify(json_data));

  };
  
  useEffect(() => {
  console.log('--------------------------------------------------Use Effect--------------------------------------------');
     CheckUserSignedIn(); }, []);

 if(AsyncStorage.getItem('Otp_details')) {
  console.log('-----------------------------------------------Login True user Loggedin---------------------------------');
  console.log('--------------------------------------------------True--------------------------------------------------');
  navigation.replace('DrawerNavigationRoutes');
  
  
 }
 else{
  {
   // yaha aana hi nahi hai. 
   console.log('--------------------------------------Login  2 details Else------------------------------------------');
   console.log('------------------------------------------------------false 3--------------------------------------------------');
   return (
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
                source={require('./Image/aboutreact.png')}
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
                onChangeText={userMobile => setUserMobile(userMobile)}
                placeholder="Enter Mobile Number" //dummy@abc.com
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
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleasync_copy}>
              <Text onPress={handleasync_copy} style={styles.buttonTextStyle}>
                {sendOtp}
              </Text>
            </TouchableOpacity>
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
                  maxLength={6}
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
}
}
 return ({});
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
