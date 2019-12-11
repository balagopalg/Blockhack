const io = require('socket.io-client');
const fetch = require('node-fetch');
const { createContext, CryptoFactory } = require('sawtooth-sdk/signing')
const Decryps = require('../models/decrypt')
const encrypt = require('../encryption/encryptioninitialise')

const intldata = require('../models/International_Bank_Balances')
const hq = require('../models/HQ')

// const sawtoothclient = require('../../../Blockchain/client/src/bankclient')

var client = '';

const getCallBack = (fn) => {
    callBack = fn ;
}

const def = async (msg) => {
    let addressreceived = msg
    console.log("Address in event", addressreceived)
    try
    {
       let geturl = 'http://sawtooth-client:3000/get_data_from_state' 
       let response = await fetch(geturl, {
           method: 'POST',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
           body: JSON.stringify(addressreceived)
       })
       if (response.ok) 
       { 
           let jsondata = await response.json();
           console.log("Data in usercontroller : ",jsondata)
           // console.log(`response -> ${responseJson}`);
           let international_data = await Decryps.find({ status : 'Approved'})
           international_data = international_data[0]
           console.log("Data from international db : ", international_data)
           data_to_decode = international_data
           console.log("data to decode",data_to_decode)
           let data = encrypt.getdecodeddata(jsondata.data,data_to_decode.IV,data_to_decode.Key,data_to_decode.tag)
           intldata.update({},{ $inc : { balance : +data.amount }},(res) => {
               console.log("Balance update from international bank and branch : ",res)
           })
           const hqdata = new hq({
            ReconcileID: data.ReconcileID,
            transactionID: data.transactionID,
            branchcode: data.branchcode,
            GRICcode: data.GRICcode,
            status: data.status,
            amount: data.amount,
            time: data.time
           })
           hqdata.save().then(
               data =>{
                   console.log(data);
               }
           )
           console.log("Usercontroller response : ",resp)
           res.status(200).json({ data: data, message: "worked" });
       } 
       else 
       {
           alert("HTTP-Error: " + response.status);
       }
    }
   catch(error)
    {
        console.log(error.message)
    }
}

var callBack = def;

init = () => {
   client = io.connect('http://sawtooth-eventhandle:9000');

   client.on('international-bank-transfer-done', (msg) => {
    console.log(typeof(msg));
    callBack(msg);
});
}

module.exports = { init, getCallBack }
