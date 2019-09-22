var express = require('express');
var router = express.Router();
var request = require('request');
const environment = require('../custom_modules/environment');

/* GET users listing. */
router.get('/', function(req, res, next) {

    let options = {
        method: 'GET',
        headers: {
            "Authorization": environment.userCreationServiceCredentials,
            "Content-Type": "application/json"
        }
    };


    request.get(`${environment.userService}/test`, options,function(err,response,body) {
        if (err) {
            console.log("bad error");
        }
        if (!err &&response && response.statusCode !== 200) {
            console.log("some error");
        }
        if (response && (response.statusCode === 200)) {
            console.log("hello");
            res.render("index");
        }
    });
});

module.exports = router;
