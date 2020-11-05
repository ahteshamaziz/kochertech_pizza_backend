const express = require('express')
const routes =  express.Router();
var bodyPaser = require('body-parser');
var jsonParser = bodyPaser.json();
const loginController = require('../controllers/login');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
jwtkey = 'jwt';

routes.post("/postregister",jsonParser,loginController.postregister);
routes.post("/postlogIn",jsonParser,loginController.postlogin);
routes.get("/getlogin",verifyToken,loginController.getlogin);
routes.post("/postUpdateLogin",jsonParser,loginController.postUpdateLogin);
routes.get("/deleteLogin",jsonParser,loginController.deleteLogin);




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