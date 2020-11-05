const express = require('express')
const routes =  express.Router();
var bodyPaser = require('body-parser');
var jsonParser = bodyPaser.json();
const orderController = require('../controllers/order');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
jwtkey = 'jwt';

routes.post("/postOrder",jsonParser,orderController.postOrder);
routes.get("/getOrder",verifyToken,orderController.getOrder);
routes.get("/deleteOrder",jsonParser,orderController.deleteOrder);




function verifyToken(req,res,next){
    console.log(req.headers);

    const bearerHeader = req.headers['authorization'];
     console.log(bearerHeader);
     if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        req.token = bearer[1];
    
        jwt.verify(req.token,jwtkey,(err,authData)=>{
            if(err){
                res.json({result:err})
            }else{
                 next();
            }
        }) 
     }else{
         res.send({"result":"Token not provided"})
     }

   
}

module.exports = routes;