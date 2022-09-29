var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helper');

/* GET users listing. */
router.get('/user', function (req, res, next) {

  let sdata = req.session.user;

  if (sdata) {
    var name = sdata.name
    var admin = sdata.admin
    var coin = sdata.coin
    


    productHelper.getProduct().then((products) => {

      products.toArray(async (err, result) => {
        var pro = await result;
        if (result) {
          res.render('products', { name, admin, pro, coin })
        }
        else {
          res.render('products', { name, admin, coin })

        }

      })
    })



  } else {
    res.redirect('/')
  }


});

router.get('/admin', function (req, res,) {

  let sdata = req.session.user;

  if (sdata) {
    var name = sdata.name
    var admin = sdata.admin
    var coin = sdata.coin



    productHelper.getProduct().then((products) => {

      products.toArray(async (err, result) => {
        var pro = await result;
        if (result) {
          res.render('products-admin', { name, admin, pro , coin})
        }
        else {
          res.render('products-admin', { name, admin , coin})

        }

      })
    })



  } else {
    res.redirect('/')
  }


});

router.get('/admin/addproducts', function (req, res,) {

  let sdata = req.session.user;
  if (sdata) {
    var name = sdata.name
    var admin = sdata.admin
    var coin = sdata.coin
    res.render('add-product', { name, admin, coin })


  } else {
    res.redirect('/')
  }

});

router.post('/admin/addproducts', function (req, res,) {

  let data = req.body;
  let image = req.files.pimage;
  productHelper.addProduct(data, image).then(() => {

    res.redirect('/products/admin')

  })

});

router.get('/admin/delete/:id', function (req, res,) {

    productHelper.deleteProduct(req.params.id).then((deleted)=>{
      if(deleted==true)
      {
        res.redirect('/products/admin')
      }

    })

});

router.get('/admin/edit/:id', function (req, res,) {

  let sdata = req.session.user;
  if (sdata) {
    var name = sdata.name
    var admin = sdata.admin
    productHelper.fetchProduct(req.params.id).then((product)=>{
  
      res.render('products-edit', { name, admin, product })
         console.log(product)
    })
    
    .catch((err)=>{
      res.redirect('/products/admin')
    })
      
  } else {
    res.redirect('/')
  }



});

router.post('/admin/edit/do-edit/:id', function (req, res,) {

  let data = req.body;
  let image = req.files.pimage;
  let id = req.params.id;
  productHelper.editProduct(data, image,id).then(() => {

    res.redirect('/products/admin')

  })

});


module.exports = router;
