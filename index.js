const express = require('express');
const app = express();
const mongoose = require('mongoose')
const http = require('http');
const httpServer = http.createServer(app);
const ObjectId = mongoose.Types.ObjectId;
var multer  = require('multer');
var cors = require('cors');
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')
var path = require('path');
const session = require('express-session');


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());




// Session Setup 
app.use(session({ 
    secret: 'asdf', 
    resave: true, 
    saveUninitialized: true
})) 


// Cors setup

  app.use(cors({origin: [
    'http://localhost',
    "http://localhost:4200",
    "http://localhost:8100",
    "http://127.0.0.1:8081",
  
  ], credentials: true}));

  // routes

  const menu = require('./models/menu');
  const menuRoutes = require('./routes/menu.js');
  const loginRoutes = require('./routes/login.js');
  const orderRoutes = require('./routes/order.js');




  app.use(menuRoutes);
  app.use(loginRoutes);
  app.use(orderRoutes);





// aws s3 setup

aws.config.update({
    secretAccessKey:'please fill from documet',
    accessKeyId:'please fill from document',
    region:'us-east-1'
})



    
        var s3 = new aws.S3()
        var upload = multer({
            storage: multerS3({
            s3: s3,
            bucket: 'cctech/img',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
            },
            key: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
            }
            })
        })


        app.post('/postMenu', upload.single('image'), (req, res, next) => {
            console.log(req.file)
            
            var newImage = new menu();
            newImage.Menu_name = req.body.Menu_name;
            newImage.Description = req.body.Description;
            newImage.Type = req.body.Type;
            newImage.Price = req.body.Price;
            newImage.Image = req.file.location;
           
          
            newImage.save(err => {
                if (err) {
                     console.log("error.........................");
                    return res.sendStatus(400);
                }
                console.log("Success.........................")
                res.status(200).send({ newImage });
            });
          });







// mongo db connection
mongoose
  .connect(
  'mongodb://localhost:27017/Pizza',
{ useUnifiedTopology: true,
  useNewUrlParser: true,
  useUnifiedTopology: true }
  )
  .then(result => {
    httpServer.listen(8000);
    console.log('Listening to port 8000')
  })
  .catch(err => {
    console.log(err);
  });


