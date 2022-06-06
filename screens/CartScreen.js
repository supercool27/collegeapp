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
  const [orderId, setOrderId] = useState('5877878679078');
  const [amount, setAmount] = useState('1');
  const [urlScheme, setURLScheme] = useState('');
  const [tranxToken, setTranxToken] = useState('');
  const [checksumData, setChecksumData] = useState([]);
  const [showToast, setShowToast] = useState('');
  const [isStaging, setIsStaging] = useState(false);
  const [appInvokeRestricted, setIsAppInvokeRestricted] = useState(false);
  const [result, setResult] = useState('');
  const [isOrderIdUpdated, setOrderIdUpdated] = useState(true);

  //bank details trasaction for saving trasaction details//

  const [BANKTXNID, setBANKTXNID] = useState('');
  const [CHECKSUMHASH, setCHECKSUMHASH] = useState('');
  const [CURRENCY, setCURRENCY] = useState('');
  const [GATEWAYNAME, setGATEWAYNAME] = useState('');
  const [MID, setMID] = useState('');
  const [ORDERID, setORDERID] = useState('');
  const [PAYMENTMODE, setPAYMENTMODE] = useState('');
  const [RESPCODE, setRESPCODE] = useState('');
  const [RESPMSG, setRESPMSG] = useState('');
  const [STATUS, setSTATUS] = useState('');
  const [TXNAMOUNT, setTXNAMOUNT] = useState('');
  const [TXNDATE, setTXNDATE] = useState('');
  const [TXNID, setTXNID] = useState('');

 // bank details trasaction for saving trasaction details //

  useEffect(() => {

  console.log('--------------------------------------use effect ---------------------------------------');
   setTimeout(() => 
   {
    if (!isOrderIdUpdated) {
     console.log('In if condtion----------------------------------'); 
      setTimeout(() => {
        setTimeout(() => {
          generateOrderId();
        }, 1000);
      setTimeout(() => {
        setOrderIdUpdated(true);
      }, 2000);
      setTimeout(() => {
        generateCheckSumData();
      }, 2000);
      }, 2000);
    }
    else{
        setTimeout(() => {
          console.log('In else condition.......................................');
        setTimeout(() => {
          generateCheckSumData();
        }, 2000);
        }, 2000);
      }
    }, 2000);
    },[]);

  const generateCheckSumData = () => {
  console.log('----------------------------------CartScreen---------------------------------');
  //console.log(obj[0].student_id);

  
    try{
      fetch('http://3.108.170.236/erp/apis/paytm_app_stagging.php',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ order_id: orderId,
                               mid: mid,
        })
        //body: JSON.stringify({ student_id: 729 })
        })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setChecksumData(json);
          setTimeout(() => {
            setTranxToken(json.body.txnToken);
            console.log(json);
            console.log(tranxToken);
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    catch(e){
      console.log(e);
    }
   
// try{
//         fetch('http://3.108.170.236/erp/apis/paytm__payment__data__response.php',{
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         })
//         .then((response) => response.json())
//         .then((json) => {
//           console.log(json);
//           setTimeout(() => {
//             json.map((data,index)=>{
//               setBANKTXNID(data.BANKTXNID);
//               setCHECKSUMHASH(data.CHECKSUMHASH);
//               setCURRENCY(data.CURRENCY);
//               setGATEWAYNAME(data.GATEWAYNAME);
//               setMID(data.MID);
//               setORDERID(data.ORDERID);
//               setPAYMENTMODE(data.PAYMENTMODE);
//               setRESPCODE(data.RESPCODE);
//               setRESPMSG(data.RESPMSG);
//               setSTATUS(data.STATUS);
//               setTXNAMOUNT(data.TXNAMOUNT);
//               setTXNDATE(data.TXNDATE);
//               setTXNID(data.TXNID);
     
//                })
//           }, 2000);

//           try{
//             fetch('http://3.108.170.236/erp/apis/paytm__app__transaction__save.php',{
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ BANKTXNID: BANKTXNID,
//               CHECKSUMHASH: CHECKSUMHASH,
//               CURRENCY:CURRENCY,
//               GATEWAYNAME:GATEWAYNAME,
//               MID:MID,
//               ORDERID:ORDERID,
//               PAYMENTMODE:PAYMENTMODE,
//               RESPCODE:RESPCODE,
//               RESPMSG:RESPMSG,
//               STATUS:STATUS,
//               TXNAMOUNT:TXNAMOUNT,
//               TXNDATE:TXNDATE,
//               TXNID:TXNID,
//             })
            
//             })
//             .then((response) => response.json())
//             .then((json) => {
//               console.log(json);
    
//             })
//             .catch((error) => {
//               console.error(error);
//             });
//         }
//         catch(e){
//           console.log(e);
//         }

//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//     catch(e){
//       console.log(e);
//     }

}

  const generateOrderId = () => {
    const r = Math.random() * new Date().getMilliseconds();
    setTimeout(() => {
      
      setOrderId(
        'PARCEL' +
          (1 + Math.floor(r % 2000) + 10000) +
          'b' +
          (Math.floor(r % 100000) + 10000),
      );
    }, 2000);

  //console.log(orderId);

  };

  const startRawTransaction = async () => {
    try{
    console.log(tranxToken);
    console.log(orderId);
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
      console.log(err);
      setResult(err);
      setShowToast("Error: " + err);
      setOrderIdUpdated(false);
    });
    }
    catch(e){console.log(e)}
}
   return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <View style={{margin: 16}}>
              <View style={styles.buttonStyle}>
                <Button
                  title="Pay Now"
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
