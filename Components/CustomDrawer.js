import React,{ useState,useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  Share
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {LogBox} from 'react-native';

const CustomDrawer = props => {
  // console.log(form.defaultProps);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Rugta Group | Sanjay Rungta Group of Institution',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const [mydata, setMydata] = useState([]);
  const getDrawerDetails = async () => {
      try {
      const userdetails = await AsyncStorage.getItem('Otp_details');
      const details = JSON.parse(userdetails);
      const otp_valued = details[0].otp_value; // is me value aa rahi hai
      const student_idd = details[0].student_id;
      console.log(student_idd);
      console.log('mystudent id');
      const requestOptions = {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({student_id: student_idd}),
      };
      const response = await fetch(
        'http://3.108.170.236/erp/apis/get_student_data.php',
        requestOptions,
      );
      const response1 = await fetch(
        'https://webhook.site/4326abbc-7ec9-41d0-b967-ad888f79c33a',
        requestOptions,
      );
      console.log('Otp fetched');
      const json_data = await response.json();
      await AsyncStorage.setItem('student_details', JSON.stringify(json_data));
      setMydata(json_data);
      console.log(json_data);
    } catch (error) {
      console.error(error);
    } finally {
      //setLoading(false);
    }
  };
  useEffect(() => {
    getDrawerDetails();
  }, []);

  return (
    <View style={{flex: 1}}>
          <DrawerContentScrollView
              {...props}
              contentContainerStyle={{backgroundColor: '#8200d6'}}>
          <ImageBackground
          source={require('../Assets/Images/menu-bg.jpeg')}
          style={{padding: 20}}>
               { 
        mydata.map((item,key) =>
        (
        <Image
            source={{
              uri: 'http://3.108.170.236/erp/StudentPanel/stud_photos/${item.stud_profile_pic}',
            }}

            // source={{
            //   uri: 'http://3.108.170.236/erp/StudentPanel/stud_photos/'+{item.stud_profile_pic},
            // }}
            // source={{
            //   uri: 'http://3.108.170.236/erp/StudentPanel/stud_photos/'+{item.stud_profile_pic},
            // }}
            // source = {{ uri:'http://3.108.170.236/erp/StudentPanel/stud_photos/22022022130223737460RSR_MTECH_50_Photo.jpeg'}}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
        )
      ) 
    }
   
          
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
      { 
        mydata.map((item,key) =>
        (
           <View><Text> {item.stud_name } </Text></View> 
        )
        ) 
      }
         
          </Text>
          <View style={{flexDirection: 'row'}}>
      <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
      { 
        mydata.map((item,key) =>
          (
            <View><Text>{item.stud_roll_no}</Text></View>
          )
        ) 
      }
      </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </ImageBackground>
       
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
          </DrawerContentScrollView>
   
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
              onPress={onShare}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
              onPress={() => {
                props.navigation.toggleDrawer();
                Alert.alert(
                  'Logout',
                  'Are you sure? You want to logout?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        console.log(
                          'Cancel is working.....................................',
                        );
                        return null;
                      },
                    },
                    {
                      text: 'Confirm',
                      onPress: async () => {
                        try {                                
                          AsyncStorage.clear();
                          //console.log(AsyncStorage.clear());
                          console.log(
                            '----------------------------------------AsyncStorage------------------------------------------',
                          );
                          props.navigation.replace('Auth');
                        } catch (e) {
                          console.error(e);
                        }
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View> 
    </View>
  );
};

export default CustomDrawer;
