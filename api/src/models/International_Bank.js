const mongoose = require('mongoose');

const transactionReconcileSchema = mongoose.Schema({
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
      branchcode : {
            type : String,
            required : true
      },
      amount: {
            type: Number,
            required: true
      },
      time : { 
            type : Date,
            default: Date.now,
            required: true
    
      },
      status : { 
            type : String,
            required: true
    
      }


})

module.exports = mongoose.model('transactionReconcile', transactionReconcileSchema)