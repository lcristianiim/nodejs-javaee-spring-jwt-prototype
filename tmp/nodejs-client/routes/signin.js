const express = require('express');
const router = express.Router();
const environment = require('../custom_modules/environment');
const pagesService = require('../custom_modules/pages-service');
const fetch = require('node-fetch');
var request = require('request');

router.get('/', function(req, res, next) {
    pagesService.getSignInPage(req, res);
});

router.post('/', function(req, res, next) {
    if (req.body && (req.body.password === req.body.confirmPassword)) {

        let options = {
            method: 'POST',
            headers: {
                "Authorization": environment.userCreationServiceCredentials,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    email: req.body.email,
                    password: req.body.password,
                    roles: [
                        "ROLE_GUEST"
                    ],
                    username: req.body.displayName
                })
        };

        request.post(`${environment.userService}/user`, options,function(err,response,body) {
            if (err) {
                pagesService.getSignInPageWithOptions(req, res, {
                    result: `User was not created`,
                    error: err.message
                });
                // res.render('signin', pagesService.getSignInPageWithOptions(req, res, {result: `User created`}))
            }
            if (!err &&response && response.statusCode !== 200) {
                console.log('cool');
                pagesService.getSignInPageWithOptions(req, res, {
                    result: `User was not created. Please make sure your password is at least 8 characters
                    and the email is not already registered. Otherways contact the administrator.`,
                    error: JSON.parse(response.body).message
                });
                // res.render('signin', pagesService.getSignInPageWithOptions(req, res, {
                //     result: `User was not created`,
                //     error: `Something went wrong`
                // }))
            }
            if (response && (response.statusCode === 200)) {

                pagesService.getSignInPageWithOptions(req, res, {
                    result: `User was created.`
                });
            }
        })
    }
});

module.exports = router;
