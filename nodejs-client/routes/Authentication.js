const fetch = require('node-fetch');
const jwt = require('jwt-simple');
const optionsUtil = require('../custom_modules/options-util');

class Authentication {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    requestAndStoreToken() {
        let options = {
            method: 'POST',
            headers: {
                "Authorization": "Basic YXBwOnNlY3JldA==",
                "WWW-Authenticate": "Basic realm='oauth2/client'"
            }
        };

        let username = this.req.body.username;
        let password = this.req.body.password;

        fetch(`http://localhost:8090/oauth/token?grant_type=password&username=${username}&password=${password}`, options)
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw Error('Login failed')
                }
            })
            .then(response => response.text())
            .then(tokens => {
                storeAuthInSession(tokens, this.req);
                redirectToHomepage();
                this.res.redirect('/');
            })
            .catch(error => {
                console.log(error.message);
                let opt = optionsUtil.createBaseOptions('Login');
                this.res.render('login', Object.assign(opt, {error: error.message}));
                // pagesService.getLoginPageWithOptions(this.req, this.res, {error: error.message})
            });

        function redirectToHomepage() {
            console.log('redirected to homepage');
        }

        function storeAuthInSession(tokens, req) {
            let parsedTokens = JSON.parse(tokens);
            req.session.auth = {};
            req.session.auth.accessToken = parsedTokens.access_token;
            req.session.auth.refreshToken = parsedTokens.refresh_token;

            let decodedAccessToken = jwt.decode(req.session.auth.accessToken, req.app.get('jwtTokenSecret'));
            req.session.auth.displayName = decodedAccessToken.displayName;
            req.session.auth.email = decodedAccessToken.user_name;

            console.log('Auth stored in session');
        }
    }

    logout() {
        delete this.req.session.auth;
    }

    isAuthenticated() {
        return !!this.req.session.auth;

    }

    getUser() {
        if (this.isAuthenticated())
            return {
                email: this.req.session.auth.displayName,
                displayName: this.req.session.auth.email
            }
    }
}

module.exports = Authentication;
