import React,{useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  Switch
} from 'react-native';
import AllInOneSDKManager from 'paytm_allinone_react-native';



const CartScreen = () => {


  const [mid, setMid] = useState('GDREdu50085170778323');
  const [orderId, setOrderId] = useState('15942011933');
  const [amount, setAmount] = useState('1');
  const [urlScheme, setURLScheme] = useState('');
  const [tranxToken, setTranxToken] = useState('b9097bda72af4db0a9aa2d00e58a7d451594201196818');
  const [checksumData, setChecksumData] = useState([]);
  const [showToast, setShowToast] = useState('');
  const [isStaging, setIsStaging] = useState(false);
  const [appInvokeRestricted, setIsAppInvokeRestricted] = useState(false);
  const [result, setResult] = useState('');
 
  const [isOrderIdUpdated, setOrderIdUpdated] = useState(false);
  
  useEffect(() => {
    if (!isOrderIdUpdated) {
      generateOrderId();
      setOrderIdUpdated(true);
      generateCheckSumData();
    }
  });


  const generateCheckSumData = () => {
    console.log('----------------------------------CartScreen----------------------------');
  //console.log(obj[0].student_id);
  fetch('http://3.108.170.236/erp/apis/paytm_send_link.php',{
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  // body: JSON.stringify({ student_id: obj[0].student_id})
  // body: JSON.stringify({ student_id: 729 })
  })
  .then((response) => response.json())
  .then((json) => {
    //setChecksumData(json);
    //setTranxToken(json);

   // console.log(json);
    console.log(json);
    //console.log(obj);
  })
  .catch((error) => {
    console.error(error);
  });
  
  }

  const generateOrderId = () => {
    const r = Math.random() * new Date().getMilliseconds();
    setOrderId(
      'PARCEL' +
        (1 + Math.floor(r % 2000) + 10000) +
        'b' +
        (Math.floor(r % 100000) + 10000),
    );
  };

  const startRawTransaction = async () => {
    //console.log(tranxToken);
    setShowToast('');
    setResult('');
    AllInOneSDKManager.startTransaction(
      orderId,
      mid,
      tranxToken,
      amount,
      '',
      isStaging,
      appInvokeRestricted,
      urlScheme,
    )
    .then((result) => {
      console.log("result", result);
      setShowToast(JSON.stringify(result));
      setOrderIdUpdated(false);
    })
    .catch((err) => {
      setResult(err);
      setShowToast("Error: " + err);
      setOrderIdUpdated(false);
    });
}
   return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <View style={{margin: 16}}>
              <Text style={styles.textStyle}>Merchant Id</Text>
              <TextInput
                style={styles.textInput}
                defaultValue={mid}
                onChangeText={(e) => setMid(e)}
              />
              <Text style={styles.textStyle}>Order Id</Text>
              <TextInput
                style={styles.textInput}
                defaultValue={orderId}
                onChangeText={(e) => setOrderId(e)}
              />
              <Text style={styles.textStyle}>URL Scheme</Text>
              <TextInput
                style={styles.textInput}
                defaultValue={urlScheme}
                onChangeText={(e) => setURLScheme(e)}
              />
              <Text style={styles.textStyle}>Amount</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                defaultValue={amount}
                onChangeText={(e) => setAmount(e)}
              />
              <Text style={styles.textStyle}>Transaction token</Text>
              <TextInput
                style={styles.textInput}
                defaultValue={tranxToken}
                onChangeText={(e) => setTranxToken(e)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: 'bold',
                    }}>
                    Staging : {isStaging ? 'true' : 'false'}
                    </Text>
                    </View>

                    <View
                  style={{
                    flex: 1,
                  }}>
                    <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isStaging ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      isStaging ? setIsStaging(false) : setIsStaging(true)
                    }
                    value={isStaging}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
              <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: 'bold',
                    }}>
                    isInvokeRestricted : {appInvokeRestricted ? 'true' : 'false'}
                    </Text>
                    </View>
                    <View
                  style={{
                    flex: 0.5,
                  }}>
                    <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={appInvokeRestricted ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      appInvokeRestricted ? setIsAppInvokeRestricted(false) : setIsAppInvokeRestricted(true)
                    }
                    value={appInvokeRestricted}
                  />
                </View>
                </View>
              <View style={styles.buttonStyle}>
                <Button
                  title="Start Transaction"
                  onPress={() => startRawTransaction()}
                />
              </View>
              <Text style={styles.textStyle}>Message :</Text>
              <Text style={styles.messageText}> {showToast}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#2c86d4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    padding: 8,
  },
  textStyle: {
    marginTop: 16,
    marginStart: 4,
    fontSize: 19,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 18,
    padding: 8,
    borderColor: 'gray',
    marginStart: 8,
    marginEnd: 8,
    borderBottomWidth: 1,
  },
  buttonStyle: {
    padding: 8,
    margin: 8,
  },
  messageText: {
    fontSize: 16,
    padding: 8,
  },
});

export default CartScreen;
