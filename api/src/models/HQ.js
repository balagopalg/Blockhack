const mongoose = require('mongoose');

const reconcileSchema = mongoose.Schema({
      ReconcileID: {
            type: String,
            required: true
      },
      transactionID: {
            type: String,
            unique: true,
            required: true
      },
      GRICcode: {
            type: String,
            required: true
      },
      branchcode: {
            type: String,
            required: true
      },
      status : {
            type : String,
            required : true
      },
      amount:{
            type: Number,
            require: true,
      },
      time : { 
            type : Date,
            default: Date.now,
            required: true
    
      }


})

module.exports = mongoose.model('reconcile',reconcileSchema)