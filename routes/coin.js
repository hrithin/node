var express = require('express');
const client = require('../config/connection');
var router = express.Router();
const accountHelper = require('../helpers/account-helper');
const coinHelper = require('../helpers/coin-helper');



router.get('/', function (req, res, next) {
  
    let sdata = req.session.user;
   
     if(sdata){
       var name = sdata.name
       var admin = sdata.admin
       var coin = sdata.coin
       res.render('coin',{name,admin,coin})
     }else
     {
      res.redirect('/')
     }
  
  
    
    
  });





module.exports = router;