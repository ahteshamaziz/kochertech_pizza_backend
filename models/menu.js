const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Menu = new Schema({
    
    Menu_name : {
        type: String,
        required:true
    },
    Description: {
        type: String,
        required:true
    },
    Type: {
        type: String,
        required:true,
        unique:true
    },
    Price: {
        type: String,
        required:true
    },
    Image:{
        type: String,
        required:true
    }



});



module.exports = mongoose.model('Menu', Menu,'Menu');
