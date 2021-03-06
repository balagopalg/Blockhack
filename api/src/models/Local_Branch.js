const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
      transferID: {
        type: String,
        unique: true,
        required: true
      },
      remark: {
            type: String,
            required: false
          },
      transactionID: {
            type: String,
            unique: true,
            required: true
      },
      amount: {
            type: Number,
            required: true
      },
      time : { 
            type : Date,
            default: Date.now,
            required: true
      }


})

module.exports = mongoose.model('transferSchema', transferSchema)