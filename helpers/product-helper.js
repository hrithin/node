const client = require('../config/connection');
var express = require('express');
const { reject, resolve } = require('promise');
const { ObjectId } = require('mongodb');


module.exports = {

    addProduct: async (data, image) => {

       var imgSrc;

        if (data) {



            if (image) {
 
              await image.mv('./public/images/' + image.md5 + '.jpg');

                imgSrc = image.md5 + '.jpg';

            }
            else
            {
                console.log("image not found")
            }

            var finalData = {

                pname: data.pname,
                pcat: data.pcategory,
                pdis:  data.pdis,
                pprice: parseInt(data.pprice) ,
                biduser : "",
                bidprice : parseInt( data.pprice),
                pimage: imgSrc
            }

            
            return new Promise((resolve, reject) => {

                client.db('user').collection('products').insertOne(finalData)
 
                resolve(console.log('done'))
 
           })


        }
    },

    getProduct : ()=>{

        return new Promise(async(resolve,reject)=>{

             done = await client.db('user').collection('products').find({})

               resolve(done)
  
    
        })

    },

    deleteProduct : (productId)=>{

        return new Promise((resolve,reject)=>{

               client.db('user').collection('products').deleteOne({_id:ObjectId(productId)},(err,result)=>{

                  console.log(result+"document deleted sucessfully")
                  var deleted= true;
                  resolve(deleted)

             })

              
  
    
        })

    },

    fetchProduct :   (productId)=>{

        return  new Promise( (resolve,reject)=>{

               client.db('user').collection('products').findOne({_id:ObjectId(productId)}, function  (err,result){

                 if (result)
                 {
                   resolve(result) 
                 }
                 else
                 {
                    reject(err)
                 }
                  

             })

              
  
    
        })

    },
    
    editProduct: async (data, image, productId) => {

        var imgSrc;
 
         if (data) {
 
 
 
             if (image) {
  
               await image.mv('./public/images/' + image.md5 + '.jpg');
 
                 imgSrc = image.md5 + '.jpg';
 
             }
             else
             {
                 console.log("image not found")
             }
 
             var finalData ={ $set : {
 
                pname: data.pname,
                pcat: data.pcategory,
                pdis:  data.pdis,
                pprice: parseInt(data.pprice) ,
                biduser : "",
                bidprice : parseInt( data.pprice),
                pimage: imgSrc
             }}
 
               
             return new Promise((resolve, reject) => {
 
                 client.db('user').collection('products').updateOne({_id:ObjectId(productId)},finalData,(err,result)=>{
                    
                    if(result)
                    {
                       resolve(console.log(result))

                    }

                 })
  
                
  
            })
 
 
         }
     },



}