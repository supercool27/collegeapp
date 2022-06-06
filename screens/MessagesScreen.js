import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';
import FlatListDemo from '../Components/FlatListDemo';
import TableExample from '../Components/DataTable';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {DataTable} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { color } from 'react-native-reanimated';

const GetStudent_id = () => {
  const [myStudent_id, setMystudent_id] = useState();
  const userdetails = AsyncStorage.getItem('Otp_details');
  // const details = JSON.parse(userdetails);
  //setMystudent_id(details[0].student_id);
  return userdetails;
};

const MessagesScreen = () => {
  useEffect(() => {}, []);

  const [myData, setMyData] = useState([]);
  const [feeData, setFeeData] = useState([]);
  //console.log(JSON.stringify(myData));
  console.log(
    '--------------------------------------message screen-------------------------------------------------',
  );
  //const async_data =  GetStudent_id();
  //setTimeout(() => {
  AsyncStorage.getItem('Otp_details').then(value => {
    // console.log(value);
    setMyData(value);
  });
  //}, 6000);

  if (myData.length == 0) {
    console.log('no data from async storage');
    return (
      <View style={{flex: 1}}>
        <View style={{padding: 10}}>
          <Text> Fees Details Goes Here </Text>
        </View>
      </View>
    );
  } else {
    const obj = JSON.parse(myData);
    //console.log(obj[0].student_id);
    fetch('http://3.108.170.236/erp/apis/fetch_current_academic_fees.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({student_id: obj[0].student_id}),
      //body: JSON.stringify({ student_id: 3370 })
    })
      .then(response => response.json())
      .then(json => {
        //console.log(json);
        setFeeData(json);
        console.log(feeData);
      })
      .catch(error => {
        console.error(error);
      });
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={{flex: 1}}>
            <View style={{padding: 10}}>
              <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title>Fees Details</DataTable.Title>
                  <DataTable.Title></DataTable.Title>
                  <DataTable.Title></DataTable.Title>
                </DataTable.Header>
                <View style={styles.container}>
                  {feeData && (
                    <View>
                      {feeData.slice(0, 1).map((item, index) => (
                        <View>
                           <DataTable.Row>
                            <DataTable.Cell
                              style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>
                              Caution Money:
                            </DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>
                              {item.sum_book_bank}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row>
                            <DataTable.Cell style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>Kit Fees:
                            </DataTable.Cell>
                            <DataTable.Cell ></DataTable.Cell>
                            <DataTable.Cell>{item.sum_book_bank}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row >
                            <DataTable.Cell style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>Apron Fees:</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>{item.total_apron_fee}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row >
                            <DataTable.Cell style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>Other Fees:</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>{item.total_other_fee}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row >
                            <DataTable.Cell style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }} >Sport Fees:</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>{item.total_sport_fee}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row >
                            <DataTable.Cell style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>
                              Book Bank Fees:
                            </DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>{item.sum_book_bank}</DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row >
                            <DataTable.Cell style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>Scholarship:</DataTable.Cell>
                            <DataTable.Cell> </DataTable.Cell>
                            <DataTable.Cell>{item.scholarship_amt}</DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row >
                            <DataTable.Cell style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>Tution Fees:</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>{item.total_tution_fee}</DataTable.Cell>
                          </DataTable.Row>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                <View>
                  {feeData && (
                    <View>
                      {feeData.slice(1, 2).map((item, index) => (
                        <View>
                          <DataTable.Row>
                            <DataTable.Cell
                              style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>
                              Fine in Tution fees 
                              {'\n'} 
                              fine = 25 * days :
                            </DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>
                           
                            {item.total_academic_fine_days}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row>
                            <DataTable.Cell
                              style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>
                              Total fine on Tutions fees
                            </DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>
                              {item.total_academic_fine_amt}{' '}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row>
                            <DataTable.Cell
                              style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>
                              fine in Scholarship 
                              {'\n'}
                              fine = 25 * days :
                            </DataTable.Cell>
                            
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>
                              
                              { item.total_sch_fine_days }
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row>
                            <DataTable.Cell
                              style={{
                                flex: 3,
                                fontWeight: 'bold',
                                fontSize: 25,
                              }}>
                            Total fine on Scholarship
                            </DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell>
                              {item.total_sch_fine_paid}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <Button title="Pay Now" onPress={() => {}} />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </DataTable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 2,
    margin: 2,
  },
  container: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: '#ffffff',
  },
  fontboldheader: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  paddingforleft: {
    padding: 1,
  },
  paddingforall: {
    padding: 5,
  },
});

export default MessagesScreen;
