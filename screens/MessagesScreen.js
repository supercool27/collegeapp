import React, {useState, useEffect} from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import FlatListDemo from '../Components/FlatListDemo';
import TableExample from'../Components/DataTable';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const GetStudent_id= async() => {
  const [myStudent_id,setMystudent_id] = useState();
  const userdetails= await AsyncStorage.getItem("Otp_details");
  const details = JSON.parse(userdetails);
  setMystudent_id(details[0].student_id);
  return details;
}

const MessagesScreen = async() => {
  const [myData, setMyData] = useState([]);
  console.log('--------------------------------------message screen-------------------------------------------------');
  var async_data = await GetStudent_id();
  console.log(async_data[0].student_id);
  console.log('--------------------------------------async data-----------------------------------------------------');
  await fetch('http://3.108.170.236/erp/apis/fetch_current_academic_fees.php',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: async_data[0].student_id})
  })
    .then((response) => response.json())
    .then((json) =>{
      setMyData(json);
      console.log(json);
    })
    .catch((error) => {
      console.error(error);
    });

    
renderItem = ({item}) => {
  return (
          <View>
            <Text>
                {item.current_due} {"\n"}
                {item.sch_due_date}{"\n"}
                {item.scholarship_amt}{"\n"}
                {item.total_caution_money}{"\n"}
                {item.total_sport_fee}{"\n"}
                {item.total_paid_amt}{"\n"}
                {item.book_bank_status}{"\n"}
                {item.sum_applicable_scholarship}{"\n"}
                {item.sch_due_date}{"\n"}
            </Text>
          </View>  //clg_id, cor_id, branch_id, sem_id, paid_done_date, due_date, current_due, scholarship_amt, total_caution_money, total_kit_fee, total_apron_fee, total_other_fee, total_sport_fee, total_book_bank, total_tution_fee, total_current_due, total_paid_amt, sum_book_bank, book_bank_status, sum_applicable_scholarship, sch_due_date
        );
      }
  return (
    <View style={{flex:1,}}>
    <View style={{padding:10}}>
            <FlatList 
              data={ myData }
              renderItem={renderItem}
              keyExtractor={( item, index ) => index.toString() }
              extraData={ myData }
            />

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
      { myData && (
        <View>
          <Text>Your Fees Details Goes Below : </Text>
            {
              myData.map((item,index) => 
                (
                  <View>
                <Text key={item.id}>
                { index }
                { item.current_due } {"\n"}
                { item.sch_due_date }{"\n"}
                { item.scholarship_amt }{"\n"}
                { item.total_caution_money }{"\n"}
                { item.total_sport_fee }{"\n"}
                { item.total_paid_amt }{"\n"}
                { item.book_bank_status }{"\n"}
                { item.sum_applicable_scholarship }{"\n"}
                { item.sch_due_date }{"\n"}
                </Text>
                
                  </View>
                )
              )
            }
        </View>
      )}
    </View>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Student Roll:     </DataTable.Cell>
		<DataTable.Cell>   302902219312      </DataTable.Cell>
		<DataTable.Cell>   </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Caution Money:</DataTable.Cell>
		<DataTable.Cell>   0</DataTable.Cell>
		<DataTable.Cell>    </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Kit Fees:</DataTable.Cell>
		<DataTable.Cell>   0  </DataTable.Cell>
		<DataTable.Cell>   20</DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Apron Fees:</DataTable.Cell>
		<DataTable.Cell>   0</DataTable.Cell>
		<DataTable.Cell>   </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Other Fees:	</DataTable.Cell>
		<DataTable.Cell>   0</DataTable.Cell>
		<DataTable.Cell>   </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Sport Fees:</DataTable.Cell>
		<DataTable.Cell>   150</DataTable.Cell>
		<DataTable.Cell>    </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Book Bank Fees:</DataTable.Cell>
		<DataTable.Cell>   1000</DataTable.Cell>
		<DataTable.Cell>    </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Scholarship:</DataTable.Cell>
		<DataTable.Cell>   0</DataTable.Cell>
		<DataTable.Cell>   </DataTable.Cell>
	</DataTable.Row>
	<DataTable.Row style={styles.paddingforleft}>
		<DataTable.Cell>   Tution Fees:</DataTable.Cell>
		<DataTable.Cell>   12500</DataTable.Cell>
		<DataTable.Cell></DataTable.Cell>
	</DataTable.Row>
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
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "blue",
    color: "white",
    padding: 2,
    margin: 2,
  },
  container: {
    padding: 15,
    justifyContent: 'center'
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  paddingforleft:{
   width:400,
   padding:5
  }
});




export default MessagesScreen