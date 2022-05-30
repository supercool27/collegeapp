import React, {useState, useEffect} from 'react';
import { View, Text, FlatList,StyleSheet,ScrollView,SafeAreaView} from 'react-native';
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

const MessagesScreen = () => {

  useEffect(()=>{

    

  },[]);

  const [myData, setMyData] = useState([]);
  const [feeData,setFeeData] = useState([]);
 // console.log(JSON.stringify(myData));
  console.log('--------------------------------------message screen-------------------------------------------------');
  //const async_data =  GetStudent_id();
  // setTimeout(() => {
    AsyncStorage.getItem("Otp_details").then((value)=> { // console.log(value);
      setMyData(value);
    });
 // }, 6000);
  
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
     fetch('http://3.108.170.236/erp/apis/fetch_current_academic_fees.php',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify({ student_id: obj[0].student_id})
     body: JSON.stringify({ student_id: 1398 })
  })
    .then((response) => response.json())
    .then((json) => { 
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
                    {/* <Text key={item.id}>
                    { index }
                    { item.current_due } {"\n"}
                    { item.sch_due_date }{"\n"}
                    { item.scholarship_amt }{"\n"}
                   {"\n"}
                    { item.total_sport_fee }{"\n"}
                    { item.total_paid_amt }{"\n"}
                    { item.book_bank_status }{"\n"}
                    { item.sum_applicable_scholarship }{"\n"}
                    { item.sch_due_date }{"\n"}
                    </Text> */}
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Student Roll:     </DataTable.Cell>
      <DataTable.Cell>         </DataTable.Cell>
      <DataTable.Cell>   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Caution Money:</DataTable.Cell>
      <DataTable.Cell>   { item.total_academic_fine_days }</DataTable.Cell>
      <DataTable.Cell>    </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Kit Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.total_academic_fine_days }  </DataTable.Cell>
      <DataTable.Cell>   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Apron Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.total_academic_fine_days }</DataTable.Cell>
      <DataTable.Cell>   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Other Fees:	</DataTable.Cell>
      <DataTable.Cell>   { item.total_academic_fine_days }</DataTable.Cell>
      <DataTable.Cell>   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Sport Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.total_academic_fine_days }</DataTable.Cell>
      <DataTable.Cell>    </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Book Bank Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.total_book_bank }</DataTable.Cell>
      <DataTable.Cell>    </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Scholarship:</DataTable.Cell>
      <DataTable.Cell>   { item.total_academic_fine_days }</DataTable.Cell>
      <DataTable.Cell>   </DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={styles.paddingforleft}>
      <DataTable.Cell>   Tution Fees:</DataTable.Cell>
      <DataTable.Cell>   { item.total_academic_fine_days }</DataTable.Cell>
      <DataTable.Cell></DataTable.Cell>
    </DataTable.Row>
    </View>
    )
                )
              }
          </View>
        )}
      </View>
  </DataTable> 
              {/* { 
              myData.map((data,index)=>{ 
                {data.current_due} {"\n"}
                  {data.sch_due_date}{"\n"}
                  {data.scholarship_amt}{"\n"}
                  {data.total_caution_money}{"\n"}
                  {data.total_sport_fee}{"\n"}
                  {data.total_paid_amt}{"\n"}
                  {data.book_bank_status}{"\n"}
                  {data.sum_applicable_scholarship}{"\n"}
                  {data.sch_due_date}{"\n"}
              })} */}
      </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    
    )   
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "blue",
    color: "white",
    padding: 2,
    margin: 2,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#9387F1',
    marginHorizontal: 20,
  },
  tableHeader: {
    backgroundColor: '#9336F1',
  },
  paddingforleft:{

   padding:1
  }
});




export default MessagesScreen