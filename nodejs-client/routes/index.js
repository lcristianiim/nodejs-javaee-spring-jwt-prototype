const express = require('express');
const router = express.Router();
let Authentication = require('./Authentication');
const optionsUtil = require('../custom_modules/options-util');

/* GET home page. */
router.get('/', function(req, res, next) {

    let options = optionsUtil.createBaseOptions('Homepage');

    let auth = new Authentication(req, res);

    if (auth.isAuthenticated()) {
        optionsUtil.addElementsToNavbarAfterAuthentication(auth.getUser().displayName, options);
        optionsUtil.clearNavbarAfterAuthentication(options);
    }
    res.render('index', options);
});

module.exports = router;
