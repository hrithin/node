var express = require('express');
const client = require('../config/connection');
var router = express.Router();
const accountHelper = require('../helpers/account-helper');
const coinHelper = require('../helpers/coin-helper');
const productHelper = require('../helpers/product-helper');
const bidHelper = require('../helpers/bid-helper');
const { ObjectId } = require('mongodb');



router.get('/:productId', async function  (req, res,) {
  
    let sdata = req.session.user;
   let  productId = req.params.productId;

   const userd = await client.db('user').collection('account').findOne({_id:ObjectId(req.session.user._id)})
  console.log(userd.coin + "point")
  req.session.user.coin = userd.coin
   
     if(sdata){
       var name = sdata.name
       var admin = sdata.admin
       var coin = sdata.coin

      
    
       productHelper.fetchProduct(productId).then((product)=>{
           
        
              if(product)
              {
                bidHelper.fetchBiduser(product.biduser).then((user)=>{
                     
                  if(user){
                   res.render('bid',{name,admin,coin,product,user})    
                  }
                  else
                  {
                   
                    res.render('bid',{name,admin,coin,product})

                  }

                })

                    
            
              }
              

       })

      
     }else
     {
      res.redirect('/')
     }
  
  
    
    
  });

 router.get('/bid-pro/placed/:proId' , async (req,res)=>{
 
  
  
        var proId = req.params.proId;

        lastBid = req.query.bid;
        
       var suser = req.session.user;
  
     bidHelper.placeBid(proId,lastBid,suser).then( async (result)=>{

        if(result=="done")
        {
          console.log("bid sucessful")
          
          let fetchedData = await client.db('user').collection('account').findOne({_id: ObjectId(suser._id) })
          req.session.user.coin = fetchedData.coin;

          res.redirect('back')
        }
        else if( result == "fail")
        {
        
          console.log("bid failed")
          res.redirect('back')

        }
         
        

     })

   

 })



module.exports = router;