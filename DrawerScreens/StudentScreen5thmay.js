import React from 'react';
import { useEffect, useState } from 'react';
import { Text,FlatList,View ,Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper';
import Loader from '../Components/Loader';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Shimmer from 'react-native-shimmer';

const StudentScreen = () => {
  const [loading, setLoading] = useState(false);
  const [mydata, setMydata] = useState([]);
 
  const getStudentDetails = async () => {
    setLoading(true);
    try {
      const userdetails= await AsyncStorage.getItem("Otp_details");
      const details = JSON.parse(userdetails);
     // const otp_valued = details[0].otp_value; // is me value aa rahi hai 
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
      const response1 = await fetch('https://webhook.site/4326abbc-7ec9-41d0-b967-ad888f79c33a', requestOptions);
      console.log('Otp fetched'); 
      const json_data = await response.json();
      await AsyncStorage.setItem("student_details", JSON.stringify(json_data));
      setMydata(json_data);
      console.log(json_data);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }
 useEffect(() => {
  getStudentDetails();
 }, []);

return (
<View>
<Loader loading={loading} />
 {
    mydata.map((item,key)=> (      
<View>
<Card>
  <Card.Title>Hello, {item.stud_name}</Card.Title>
  <Card.Divider/>
  {
    mydata.map((u, i) => {
      return (
        <View key={i}>
          <Image
            resizeMode="cover"
            source={{ uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'}}
          />
          <Text >{u.name}</Text>
          <Text> Current Status : {item.current_status} </Text>
          <Text> Student Roll    :  {item.stud_roll_no} </Text>
          <Text> University Roll no:  {item.university_roll_no} </Text>
          <Text> Mobile Number :  {item.stud_contactno} </Text>
        </View>
      );
    })
  }
</Card>
     </View>
    )
   )
  }
</View>
);
}

export default StudentScreen;
