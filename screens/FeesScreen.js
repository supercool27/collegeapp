import React, {useState, useEffect} from 'react';
import { View, Text, FlatList,StyleSheet,ScrollView,SafeAreaView, Button,Alert} from 'react-native';
import FlatListDemo from '../Components/FlatListDemo';
import TableExample from'../Components/DataTable';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

  const GetStudent_id= () => {
  const [myStudent_id,setMystudent_id] = useState();
  const userdetails= AsyncStorage.getItem("Otp_details");
  // const details = JSON.parse(userdetails);
  //setMystudent_id(details[0].student_id);
  return userdetails;
}

const FeesScreen = () => {
  useEffect(()=>{
  },[]);

  const [myData, setMyData] = useState([]);
  const [feeData,setFeeData] = useState([]);
  //console.log(JSON.stringify(myData));
  console.log('--------------------------------------message screen-------------------------------------------------');
  //const async_data =  GetStudent_id();
  //setTimeout(() => {
    AsyncStorage.getItem("Otp_details").then((value)=> { // console.log(value);
      setMyData(value);
    });
  //}, 6000);
  
  if(myData.length==0){
      console.log('no data from async storage');
      return (
        <View style={{flex:1,}}>
          <View style={{padding:10}}>
            <Text> Fees Details Goes Here </Text>
          </View>
        </View>
      )
  }
  else {
    const obj= JSON.parse(myData)
    //console.log(obj[0].student_id);
    fetch('http://3.108.170.236/erp/apis/fetch_current_academic_total_fees.php',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ student_id: obj[0].student_id})
   // body: JSON.stringify({ student_id: 3370 })
  })
    .then((response) => response.json())
    .then((json) => { 
      //console.log(json);
      setFeeData(json);
      console.log(feeData);
    })
    .catch((error) => {
      console.error(error);
    });
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
      <View style={{flex:1,}}>
      <View style={{padding:10}}>
    <DataTable style={styles.container}>
    <DataTable.Header style={styles.tableHeader}>
      <DataTable.Title>
          Fees Details
      </DataTable.Title>
      <DataTable.Title>
      </DataTable.Title>
      <DataTable.Title> 
      </DataTable.Title>
    </DataTable.Header>
      <View style={styles.container}>
        { feeData && (
          <View>
              {
                feeData.map((item,index) => 
                (
  <View>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Caution Money:</DataTable.Cell>
      <DataTable.Cell>   { item.caution_money }</DataTable.Cell>
      <DataTable.Cell>    </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Kit Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.kit_fee }  </DataTable.Cell>
      <DataTable.Cell>   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Apron Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.apron_fee }</DataTable.Cell>
      <DataTable.Cell>   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Other Fees:	</DataTable.Cell>
      <DataTable.Cell>   { item.other_fee }</DataTable.Cell>
      <DataTable.Cell>   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Sport Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.sport_fee }</DataTable.Cell>
      <DataTable.Cell>    </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Book Bank Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.book_bank_fee }</DataTable.Cell>
      <DataTable.Cell>    </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Tution Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.tution_fee }</DataTable.Cell>
      <DataTable.Cell>   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Tution Fees: </DataTable.Cell>
      <DataTable.Cell> {item.all_remark}  </DataTable.Cell>
      <DataTable.Cell>  </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Tution Fees:</DataTable.Cell>
      <DataTable.Cell> {item.all_remark} </DataTable.Cell>
      <DataTable.Cell> </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Tution Fees:</DataTable.Cell>
      <DataTable.Cell>
      </DataTable.Cell>
      <DataTable.Cell>
      <Button
          title="Pay Now"
          onPress={() => {
          } }
        />
      </DataTable.Cell>
    </DataTable.Row>
  </View>
                )
                )
              }
          </View>
        )
      }
      </View>
  </DataTable> 
      </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    )   
  }
}

const styles = StyleSheet.create({
  item: {
    color: "white",
    padding: 2,
    margin: 2,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  tableHeader: {
  },
  paddingforleft:{
   padding:1
  }
});


export default FeesScreen