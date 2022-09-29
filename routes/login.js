var express = require('express');
const client = require('../config/connection');
var router = express.Router();
const accountHelper = require('../helpers/account-helper')

router.get('/', function (req, res, next) {

  res.render('user/login')

});

router.get('/logout', function (req, res, next) {


  req.session.destroy()
  res.redirect('/')

});



router.post('/action', function (req, res, next) {

  accountHelper.doLogin(req.body).then((done) => {

    if (done.Status == true) {
      req.session.status = true
      req.session.user = done.user
      console.log(req.session.user)
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  })


})





module.exports = router;