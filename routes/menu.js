const express = require('express')
const routes =  express.Router();
const menuController = require('../controllers/menu')
var bodyPaser = require('body-parser');
var jsonParser = bodyPaser.json();

const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
jwtkey = 'jwt';

routes.post("/updatebyidMenu",jsonParser,menuController.updatebyidMenu);
routes.get("/findOneMenu",jsonParser,menuController.findOneMenu);
routes.get("/deleteMenu",jsonParser,menuController.deleteMenu);
routes.get("/getMenu",verifyToken,menuController.getMenu);

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





