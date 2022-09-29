var express = require('express');
const client = require('../config/connection');
var router = express.Router();
const accountHelper = require('../helpers/account-helper');
const coinHelper = require('../helpers/coin-helper');


router.get('/', function (req, res, next) {

    res.render('user/register')
});



router.post('/action', function (req, res, next) {

    accountHelper.doSignup(req.body).then()

    res.redirect('/login')

})




module.exports = router;