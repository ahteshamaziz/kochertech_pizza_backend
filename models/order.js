const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
    Orders: {
        type: [String],
        required:true
    },
    Total_price: {
        type: Number,
        required:true
    },
    Email : {
        type: String,
        required:true
    },
    Username : {
        type: String,
        required:true
    },
    Address :  {
        type: String,
        required:true
    }
});



module.exports = mongoose.model('Order', Order,'Order');
