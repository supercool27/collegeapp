import React, {useEffect, useState, TouchableOpacity} from 'react';
import {
  Text,
  FlatList,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DataTable} from 'react-native-paper';
import Loader from '../Components/Loader';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {Shimmer} from 'react-native-shimmer';
const StudentScreen = ({navigation}) => {

  const [loading, setLoading] = useState(false);
  const [mydata, setMydata] = useState([]);
  const getStudentDetails = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };
  useEffect(() => {
    getStudentDetails();
  }, []);
  return (
    <View style={{padding:20}}>
      <Loader loading={loading} />
      {mydata.map((item, key) => (
        <View style={{borderColor:'lightgrey',borderWidth:1}}>
            <Text style={{padding:10}}> Hello, {item.stud_name} </Text>
            {mydata.map((u, i) => {
              return (
                <View key={i}>
                  <Image
                    resizeMode="cover"
                    source={{uri: 'http://3.108.170.236/erp/StudentPanel/stud_photos/'+ item.stud_profile_pic }}
                  />
                  <Text style={{padding:10}}> {u.name} </Text>
                  <Text style={{padding:10}}> Father Name :  { item.stud_fathername} </Text>
                  <Text style={{padding:10}}> Current Status : { item.current_status} </Text>
                  <Text style={{padding:10}}> Student Roll : { item.stud_roll_no} </Text>
                  <Text style={{padding:10}}> University Roll no: { item.university_roll_no} </Text>
                  <Text style={{padding:10}}> Parent Group : { item.parent_group} </Text>
                  <Text style={{padding:10}}> Mobile Number : { item.stud_contactno} </Text>
                  <Text style={{padding:10}}> Mobile Mother Contact : {item.stud_mother_mobno} </Text>
                  <Text style={{padding:10}}> Mobile Number :   { item.stud_contactno} </Text>
                  <Text style={{padding:10}}> Addmission Date : { item.admission_date} </Text>
                  <Text style={{padding:10}}> Temporary Address : {item.temp_address} </Text>
                  <Text style={{padding:10}}> parent_group : { item.stud_full_permanent_address } </Text>
                  <Text style={{padding:10}}> Student Id :  { item.student_id} </Text>
                  <Text style={{padding:10}}> Mobile Number :   {item.stud_contactno} </Text>
                </View>
              );
            })}
        </View>
      ))}
    </View>
  );
};


export default StudentScreen;
