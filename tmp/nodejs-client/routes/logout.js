const express = require('express');
const router = express.Router();
const environment = require('../custom_modules/environment');
let Authentication = require('./Authentication');

router.get('/', function(req, res, next) {
    let auth = new Authentication(req, res);
    if (auth.isAuthenticated()) {
        delete req.session.auth;
        res.redirect(environment.clientBaseUrl);
    }
});

module.exports = router;
