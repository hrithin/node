const client = require('../config/connection');
var express = require('express');
const { reject, resolve } = require('promise');


module.exports = {

     doSignup: (userData) => {

         var finalData = {

               name : userData.name,
               email: userData.email,
               pass : userData.pass,
               admin : false ,
               coin : 0    
          }

          return new Promise((resolve, reject) => {

               client.db('user').collection('account').insertOne(finalData)

               resolve(console.log('done'))

          })

     },

     doLogin : (loginData) =>{
          
          var done = {
             Status : false
            
          }

          return new Promise(async (resolve,reject)=>{
             
            let fetchedData = await client.db('user').collection('account').findOne({email:loginData.email})

             if(fetchedData)
             {
               if(loginData.pass==fetchedData.pass)
                   {  
                    console.log("login sucessfully..")
                    done.Status=true
                    done.user=fetchedData
                   
                    resolve(done)
                    
                   }
                   else
                   {
                     console.log("Wrong Password..")
                     resolve(done)
                   }

             }
             else{
               console.log("invlid email")
               resolve(done)
             }

          })


     }

     

}