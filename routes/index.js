var express = require('express');
const client = require('../config/connection');
var router = express.Router();


router.get('/', function (req, res, next) {
  
  let sdata = req.session.user;
 
   if(sdata){
     var name = sdata.name
     var admin = sdata.admin
     var coin = sdata.coin
     res.render('index',{name,admin,coin})
   }else
   {
    res.render('index')
   }


  
  
});








module.exports = router;
