const express = require('express');
const router = express.Router();
let Authentication = require('./Authentication');
const pagesService = require('../custom_modules/pages-service');

router.get('/', function(req, res, next) {
    pagesService.getLoginPage(req, res)
});

router.post('/', function(req, res, next) {
    let auth = new Authentication(req, res);
    auth.requestAndStoreToken();
});

router.post('/store-token', function (req, res, next) {
    req.session.token = req.body.token;
    res.send('Token stored in session');
});

module.exports = router;
