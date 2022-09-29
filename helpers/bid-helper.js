const client = require('../config/connection');
const productHelper = require('../helpers/product-helper');
const coinHelper = require('../helpers/coin-helper');
var express = require('express');
const { reject, resolve } = require('promise');
const { ObjectId } = require('mongodb');

var pro;

module.exports = {

    placeBid: async (id, bid, suser) => {
        var lastBid = bid;
        var proId = id;

        console.log(lastBid)
        console.log(proId)

        finalData = {
            $set: {
                bidprice: parseInt(lastBid),
                biduser: suser._id
            }

        }






        await productHelper.fetchProduct(id).then((resu) => {

            pro = resu;
        })



        return new Promise((resolve, reject) => {

            if (pro.bidprice < lastBid && pro.biduser != suser._id && pro.biduser != null) {

              
                
                coinHelper.setCoin(pro.biduser,pro.bidprice)
                
                coinHelper.getCoin(suser._id, lastBid)

                client.db('user').collection('products').updateOne({ _id: ObjectId(id) }, finalData, function (err, result) {

                    if (result) {

                        var r = "done";

                        resolve(r);
                    }

                    else {



                    }





                })

            }
            else if (pro.bidprice < lastBid && pro.biduser == null) {

                coinHelper.getCoin(suser._id, lastBid)

                client.db('user').collection('products').updateOne({ _id: ObjectId(id) }, finalData, function (err, result) {

                    if (result) {

                        var r = "done";

                        resolve(r);
                    }

                    else {



                    }





                })

            }
            else {
                r = "fail";
                resolve(r);



            }


        })



    },

    fetchBiduser: (id) => {

        return new Promise(async (resolve, reject) => {

            let fetchedData = await client.db('user').collection('account').findOne({ _id: ObjectId(id) })

            resolve(fetchedData)


        })

    }





}