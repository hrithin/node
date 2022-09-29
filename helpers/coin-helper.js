const client = require('../config/connection');
var express = require('express');
const { reject, resolve } = require('promise');
const { ObjectId } = require('mongodb');
const productHelper = require('../helpers/product-helper');
const session = require('express-session');

let pro ;

module.exports = {

     
      
       getCoin : async (user,coin)=>{

        let userData = await client.db('user').collection('account').findOne({ _id : ObjectId(user)})

        console.log(userData);
        
        coin = parseInt(coin)

       let usercoin = parseInt(userData.coin) ;
       

          if(usercoin > coin)
          {
            
            var last = usercoin - coin;

              
           

            var finalData ={ $set : {
 
                coin : parseInt(last),
             }}

            client.db('user').collection('account').updateOne({ _id : ObjectId(user)},finalData,(err,result)=>{
           
             return new Promise((resolve, reject) => {
                   
                let a = "done"
                 resolve(a)

              })
               

            })


          }


              

         

       },

       setCoin : async (user,coin)=>{
           
           

        let userData = await client.db('user').collection('account').findOne({ _id : ObjectId(user)})

         
       var tcoin = parseInt(userData.coin) ;
        
        coin = parseInt(coin);

         tcoin = tcoin + coin;



        console.log(tcoin)

         var finalData ={ $set : {
 
            coin : tcoin,
         }}

        client.db('user').collection('account').updateOne({ _id : ObjectId(user)},finalData,(err,result)=>{
       
         return new Promise((resolve, reject) => {
               
            let a = "done"
             resolve(a)

          })
           

        })

       }



}