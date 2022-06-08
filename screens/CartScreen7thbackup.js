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
import AsyncStorage from '@react-native-community/async-storage';

const CartScreen = () => {
  
  const [isOrderIdUpdated, setOrderIdUpdated] = useState(false);

 // bank details trasaction for saving trasaction details //
 
  useEffect(() => {

  console.log('--------------------------------------use effect ---------------------------------------');
   setTimeout(() => 
   {
    // if (!isOrderIdUpdated) {
    //  console.log('In if Condtion----------------------------------'); 
    //   setTimeout(() => {
    //     setTimeout(() => {

    //       // problematic code 

    //       generateOrderId();

    //       // problematic code

    //       console.log(orderId+'--------------New order_id generated------------------');

    //     }, 2000);
    //   setTimeout(() => {
    //     setOrderIdUpdated(true);
    //   }, 2000);
    //   setTimeout(() => {
    //     generateCheckSumData();
    //   }, 2000);
    //   }, 2000);
    // }
    // else{

    //     setTimeout(() => {
    //       console.log('In else condition.......................................');
    //     setTimeout(() => {
    //       setTimeout(() => {
    //         generateOrderId();
    //       }, 1000);
    //       setOrderIdUpdated(true);
    //       generateCheckSumData();
    //     }, 2000);
    //     }, 2000);
    //   }

    generateCheckSumData();
    if(!setOrderIdUpdated){
      console.log('----------------------------------!setOrderIdUpdated--------------------------');
      generateOrderId__from__backend();
      setOrderIdUpdated(true);

    }
   }, 2000);

},[]);


    const [mid, setMid] = useState('GDREdu50085170778323');

    //problematic code //
    const [orderId, setOrderId] = useState('1111111111111111111111111111111123456');
    console.log('---------------------------------------Order id---'+ orderId +'--------------------------------------');
    //problematic code //
  
    console.log(orderId+'----------------------------------------initial----------------------------------');
    const [amount, setAmount] = useState('1');
    const [urlScheme, setURLScheme] = useState('');
    const [tranxToken, setTranxToken] = useState('');
    const [checksumData, setChecksumData] = useState([]);
    const [showToast, setShowToast] = useState('');
    const [isStaging, setIsStaging] = useState(false);
    const [appInvokeRestricted, setIsAppInvokeRestricted] = useState(false);
    const [result, setResult] = useState('');
    const [txnFailure,setTxnFailure] = useState(false);
    
    
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

    

    const generateOrderId = () => {
      const r = Math.random() * new Date().getMilliseconds();
      setTimeout(() => {
        // try {
        //   AsyncStorage.setItem('order_id',  'PARCEL' +
        //   (1 + Math.floor(r % 2000) + 10000) +
        //   'b' +
        //   (Math.floor(r % 100000) + 10000))
        // } catch(e) {
        //   // save error
        // }
        setOrderId(
          'PARCEL' +
            (1 + Math.floor(r % 2000) + 10000) +
            'b' +
            (Math.floor(r % 100000) + 10000),
        );
      }, 2000);
  // problematic code 
  // here new order id logged. 
    console.log(orderId);
  // problmatic code
  
    };

    const generateOrderId__from__backend=() =>{

      try{
        fetch('http://3.108.170.236/erp/apis/order__id__generation.php',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          //body: JSON.stringify({ student_id: 729 })
          })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
           // setChecksumData(json);
            setTimeout(() => {

              setOrderId(json[0].order_id);
              
              console.log(json[0].order_id);
              console.log(orderId);
            }, 2000);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      catch(e){
        console.log(e);
      }


    };

  // useEffect(() => {
  //   if (isOrderIdUpdated) {
  //     setTimeout(() => {
  //       generateOrderId();
  //       setOrderIdUpdated(false);  
  //     }, 2000);
  //   }
  // });


  const generateCheckSumData = async() => {

if(!txnFailure){
  console.log('----------------------------------CartScreen---------------------------------');
  //console.log(obj[0].student_id);
  
  console.log('------------------checking which order id is going for trasaction'+ orderId);
  
    try{
      const myorder_id = orderId;
      console.log(myorder_id+'-------------my order-id-');
      fetch('http://3.108.170.236/erp/apis/paytm_app_stagging.php',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ order_id: myorder_id,
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

}
else{
  console.log('----------------------------------CartScreen---------------------------------');
  //console.log(obj[0].student_id);
  
  console.log('------------------checking which order id is going for trasaction'+ orderId);
  
    try{
      const myorder_id = orderId;
      console.log(myorder_id+'-------------my order-id-');
      fetch('http://3.108.170.236/erp/apis/paytm_app_stagging.php',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ order_id: myorder_id,
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

  const startRawTransaction = async () => {

    //Payment failure case  // set repayment true;
    

    try{

      // try {
      //   const order_id = await AsyncStorage.getItem('@order_id')
      //   order_idjson= JSON.parse(order_id);
      // } catch(e) {
      //   // read error
      // }
    


    console.log(tranxToken+'-----------------------Transaction Token------------------------------');
    console.log(orderId+'--------------------------Transaction for Order id-----------------------');
    //console.log(order_idjson);
    setShowToast('');
    setResult('');


    // problematic code ----------------------------------------------
    

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
      
      if(result.STATUS === 'TXN_FAILURE')
      {
       console.log('--------------------------------------txn--failure-----------------------------------');
       setTxnFailure(true);
       generateOrderId__from__backend();
       generateCheckSumData();

      }
    
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
  // problematic code ----------------------------------------------

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
