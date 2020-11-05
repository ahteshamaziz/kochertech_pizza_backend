
const order = require('../models/order')
const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');
jwtkey = 'jwt'
var ObjectId = require('mongodb').ObjectID;

exports.postOrder =(req, res)=>{
    var  Orders = req.body.Orders;
    var Email = req.session.email;
    var Username = req.session.name;
    var Address = req.session.address;
    var Total = req.body.Total;

    const data = new order({
        _id: mongoose.Types.ObjectId(),
        Orders: Orders,
        Username : Username,
        Email: Email,
        Total_price: Total,
        Address : Address
    })

    data.save().then((result)=>{
                var results = {"result":"success"}

                /*                 Mail gun                      */

                var api_key = 'f07afeccced1821bd3955c16a66f6631-ea44b6dc-4734fe06';
                var domain = 'sandboxfbd241ffad6342a1bb57874fe17c530b.mailgun.org';
                var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
                
                var data = {
                  from: 'Pizza Order <me@samples.mailgun.org>',
                  to: Email,
                  subject: 'Hello Your Order',
                  html: '<h1>Yours Order</h1><p>Orders :</p>'+Orders+'<br><p>Total :</p>'+Total
                };
                
                mailgun.messages().send(data, function (error, body) {
                  console.log(body);
                });

                //////// end ///////////////////

                res.status(200).json({results})
    }).catch((err)=>console.log(err))
  
}












    


exports.getOrder = (req,res) => {
    order.find().then((result)=>{
        res.status(200).json(result)
    })
 }  


 exports.deleteOrder =(req,res) => {
    var id = req.query.id;
    console.log(id);
    order.deleteOne({_id:ObjectId(id)}, err =>{
      if(err){
        throw err
      }else{
        var rs = {"result":"success"}
        res.send(rs)
      }
    })

}