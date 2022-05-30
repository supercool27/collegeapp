var PaytmChecksum = require("./PaytmChecksum");

/* initialize JSON String */ 
body = "{/*YOUR_COMPLETE_REQUEST_BODY_HERE*/}"

/**
* Generate checksum by parameters we have
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var paytmChecksum = PaytmChecksum.generateSignature(body, "YOUR_MERCHANT_KEY");
paytmChecksum.then(function(result){
	console.log("generateSignature Returns: " + result);
}).catch(function(error){
	console.log(error);
});