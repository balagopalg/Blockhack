const mongoose = require('mongoose');

const LocalBalSchema = mongoose.Schema({
    _id : {
        type : Number,
        required : true
    },
    accountNo : {
        type : Number,
        required : true
    },
    balance: {
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('localbal',LocalBalSchema);