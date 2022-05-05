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
  const [mydata, setData] = useState([]);

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
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({monumber: userMobile}),
    })
      .then(response => {
        console.log('fetching api');
        return response.json();
      })
      .catch(err => {
        console.log('fetch error' + err);
      });
  };

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
  };

  const  handleSubmitPressOTP = () => {
    // var formdata = new FormData();
    // formdata.append('monumber', userMobile);
    // alert(formdata['monumber']);

    alert(userMobile);
    setSendOtp('Resend OTP');
    console.log('manoj');
    //const response = otpsubmitted;

   fetch('http://3.108.170.236/erp/apis/login_otp.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        monumber: userMobile,
      }),
    })
      .then(async response => {
        console.log('fetching api');
        console.log(await response.json());
        return await response.json();
      })
      
      .catch(err => {
        console.log('fetch error' + err);
      });
 
    setshowTheThing(true);
  };

const handleasync_copy = async () => {
    setSendOtp('Resend OTP');
    const requestOptions = {
      method: 'post',
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json' },
      body: JSON.stringify({ monumber: userMobile })
  };

 const response = await fetch('http://3.108.170.236/erp/apis/login_otp.php', requestOptions);
 //const response1 = await fetch('https://webhook.site/4326abbc-7ec9-41d0-b967-ad888f79c33a', requestOptions);
 const data = await response.json();
 setData(data);

// const data1 = await response1.json();
 setshowTheThing(true);
};

  const  handleSubmitPressOTP_copy = () => {
    // var formdata = new FormData();
    // formdata.append('monumber', userMobile);
    // alert(formdata['monumber']);

    alert(userMobile);
    setSendOtp('Resend OTP');
    console.log('manoj');
    //const response = otpsubmitted;
/*
   fetch('http://3.108.170.236/erp/apis/login_otp.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain',
      },
      body: userMobile,
    })
      .then(async response => {
        console.log('fetching api');
        console.log(await response.json());
        return await response.json();
      })

      .catch(err => {
        console.log('fetch error' + err);
      }); 

*/

  /*
      fetch('http://3.108.170.236/erp/apis/login_otp.php', {
       method: 'post',
       headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
       },
      body: JSON.stringify({
                monumber: userMobile,
                })
      }).then((response) => response.json())
      .then((responseJson) => {
                console.log(responseJson);
     }); */
 
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
              <Text
                onPress={handleasync_copy}
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
                  keyboardType="numeric"
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
