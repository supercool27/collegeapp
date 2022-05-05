// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
// Import React and Component
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
import axios from 'react-native-axios/lib/core/Axios';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Components/Loader';
const baseUrl = 'http://3.108.170.236/erp/apis/login_otp.php';


const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [sendOtp, setSendOtp] = useState('Send OTP');
  const [myText, setMyText] = useState('My Original Text');
  const [studentID, setStudentID] = useState('');
  const [showTheThing, setshowTheThing] = useState(false);

  const passwordInputRef = createRef();

  const otpsubmitted = () => {
    // var formdata = new FormData();
    // formdata.append('monumber', userMobile);
    console.log(userMobile);

//     (async () => {
//     const rawResponse = await fetch('http://3.108.170.236/erp/apis/login_otp.php', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({monumber:userMobile})
//     });
//     const content = await rawResponse.json();
//     console.log(content);
//     return content;

//     console.log("manojContent");
  
// });

fetch('http://3.108.170.236/erp/apis/login_otp.php', {
        method: 'GET',
        headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({monumber:userMobile})
    })
    .then(response => {
      console.log('fetching api');
      return response.json();})
    .catch(err => {
        console.log("fetch error" + err);
    });
}
    
    // fetch('http://3.108.170.236/erp/apis/login_otp.php', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'text/html; ',
    //   },
    //   body: userMobile,
    // })
    //   .then(response => {
    //     return response.json();
        
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

  

  const handleSubmitPress = () => {

    //const response = otpsubmitted;
    navigation.replace('DrawerNavigationRoutes');

    // setErrortext('');
    // if (!userEmail) {
    //   alert('Please fill Email');
    //   return;
    // }
    // if (!userPassword) {
    //   alert('Please fill Password');
    //   return;
    // }
    // setLoading(true);
    // let dataToSend = {user_email: userEmail, user_password: userPassword};
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    // fetch('https://aboutreact.herokuapp.com/login.php', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status == 1) {
    //       AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
    //       console.log(responseJson.data[0].user_id);
    //       navigation.replace('DrawerNavigationRoutes');
    //     } else {
    //       setErrortext('Please check your email id or password');
    //       console.log('Please check your email id or password');
    //     }
    //   })
    //   .catch((error) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });

  };

  const handleSubmitPressOTP = () => {
    
    // var formdata = new FormData();
    // formdata.append('monumber', userMobile);
    // alert(formdata['monumber']);
    
    setSendOtp('Resend OTP');
    console.log("manoj");
    //const response = otpsubmitted;

    fetch('http://3.108.170.236/erp/apis/login_otp.php', {
        method: 'POST',
        headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json'
        },
        body :  JSON.stringify ({
          monumber : userMobile
                    })
    })
    .then(response => {

      console.log('fetching api');
      console.log(response.json());
      return response.json();})
    .catch(err => {

        console.log("fetch error" + err);
    });

  
    
    // axios
    // .post('http://3.108.170.236/erp/apis/login_otp.php', {
    //   monumber: '7987274435',
    // })
    // .then(function (response) {
    //   // handle success
    //   console.log(JSON.stringify(response.data));
    //   return JSON.stringify(response.data);
    // })
    // .catch(function (error) {
    //   // handle error
    //   alert(error.message);
    // });

    setshowTheThing(true);
  };

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
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPressOTP}>
              <Text
                onPress={handleSubmitPressOTP}
                style={styles.buttonTextStyle}>
                {sendOtp}
              </Text>
            </TouchableOpacity>
            {showTheThing && (
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserPassword => setUserPassword(UserPassword)}
                  placeholder="Enter OTP" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
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
