
const user = require('../models/Login')
var crypto = require('crypto');
const mongoose  = require('mongoose');
var key = 'password';
var algo = 'aes256';
const jwt = require('jsonwebtoken');
jwtkey = 'jwt'
var ObjectId = require('mongodb').ObjectID;

exports.postregister =(req, res)=>{
    var  username = req.body.Username;
    var password = req.body.Password;
    var email = req.body.Email;
    var address = req.body.Address;
    var cipher = crypto.createCipher(algo,key);
    var encrypted = cipher.update(password, 'utf8', 'hex')+cipher.final('hex');
    
    const data = new user({
        _id: mongoose.Types.ObjectId(),
        Username: username,
        Password : encrypted,
        Email: email,
        Address: address
    })

    data.save().then((result)=>{
                var results = {"result":"success"}
                res.status(200).json({results})
    }).catch((err)=>console.log(err))
  
}





exports.postUpdateLogin = (req, res)=>{

    console.log(req.body);
   
    var  username = req.body.Username;
    var password = req.body.Password;
    var email = req.body.Email;
    var address = req.body.Address;
    var cipher = crypto.createCipher(algo,key);
    var encrypted = cipher.update(password, 'utf8', 'hex')+cipher.final('hex');

    var myquery = { _id: ObjectId(req.body.id) };

    var newvalues = { 
    Username:username,
    Password :encrypted,
    Email:email,
    Address:address
    }

    user.findOneAndUpdate(myquery, newvalues, function(err, result){
    if (err) throw err;
    console.log("1 document Update")
    var success = [{mssg: "success"}];
    res.send(success);
    });
}





exports.postlogin = (req, res)=>{
     
    user.findOne({Username:req.body.Username}).then((data)=>{
       if(!data){
        var result = {"result":"user not found"}
        res.status(200).json({result})
       }else{
        var decipher = crypto.createDecipher(algo,key);
        var decrypted = decipher.update(data.Password,'hex','utf8')+decipher.final('utf8');
     
        if(decrypted == req.body.Password){
           
            jwt.sign({data},jwtkey,{expiresIn:'300s'},(err,token)=>{
                var result = {"result":"success","token":token,"session":req.session}
                req.session.name = req.body.Username;     
                req.session.email = data.Email;
                req.session.address = data.Address;
                res.status(200).json({result})
            })
        }else{
            var result = {"result":"unsuccess"}
            res.status(200).json({result})
        }
       }
    })
  
} 
    


exports.getlogin = (req,res) => {
    user.find().then((result)=>{
        res.status(200).json(result)
    })
 }  


 exports.deleteLogin =(req,res) => {
    var id = req.query.id;
    console.log(id);
    user.deleteOne({_id:ObjectId(id)}, err =>{
      if(err){
        throw err
      }else{
        var rs = {"result":"success"}
        res.send(rs)
      }
    })

}