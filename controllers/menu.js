var mongoose = require('mongoose');
const menu = require('../models/menu');
const ObjectId = mongoose.Types.ObjectId;


exports.getMenu =(req,res)=>{
  
  console.log(req.session.name);           
    
  menu.find({})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.log(err)
  })
}


exports.findOneMenu = (req,res) => {
    var id = req.query.id;
    menu.aggregate([
      {
        '$match': {
          '_id': ObjectId(id)
        }
      }
    
    ]).then(result => {
     
      res.send(result)
    })
    .catch(err=> console.log(err))
  }




  exports.updatebyidMenu = (req, res)=>{

            console.log(req.body);
           
            var Menu_name = req.body.Menu_name;
            var Description = req.body.Description;
            var Type = req.body.Type;
            var Price = req.body.Price;

  
    var myquery = { _id: ObjectId(req.body.id) };
  
    var newvalues = { 
      Menu_name:Menu_name,
      Description :Description,
      Type:Type,
      Price:Price
    }
  
    user.findOneAndUpdate(myquery, newvalues, function(err, result){
      if (err) throw err;
      console.log("1 document Update")
      var success = [{mssg: "success"}];
      res.send(success);
    });
     }





     exports.deleteMenu =(req,res) => {
        var id = req.query.id;
        console.log(id);
        menu.deleteOne({_id:ObjectId(id)}, err =>{
          if(err){
            throw err
          }else{
            var rs = {"result":"success"}
            res.send(rs)
          }
        })

    }











    


