const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Login = new Schema({
    
    Username:{
        type: String
    },
    Password: {
      type: String
    },
    Email: {
        type: String
      },
    Address: {
        type: String
      }



});



module.exports = mongoose.model('Login', Login,'Login');
