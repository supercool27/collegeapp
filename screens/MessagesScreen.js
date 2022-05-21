import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import FlatListDemo from '../Components/FlatListDemo';
import TableExample from'../Components/DataTable';
import { DrawerContentScrollView } from '@react-navigation/drawer';
const MessagesScreen = () => {
  const [myData, setMyData] = useState([]);
  fetch('http://3.108.170.236/erp/apis/fetch_current_academic_fees.php')
    .then((response) => response.json())
    .then((json) =>{
      setMyData(json);
      console.log(myData);
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <View style={{flex:1,}}>
      { <Text style={{paddingLeft:15}}>Fees </Text> }
      { /* <TableExample user={myData}/>*/ } 
        { 
          myData.map((data,index) => 
            {<Text>{data.total_paid_amt}</Text>}
          )
        }

      {/* { myData.map((item, key) => 
        (
          console.log(item),
          <View>
            {<Text style={{paddingLeft:15}}> {mydata.sch_due_date} </Text>}
          </View>
        )
        )
      } */}
    </View>
  )
}


export default MessagesScreen