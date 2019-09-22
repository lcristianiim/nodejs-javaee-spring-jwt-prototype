const optionsUtil = require('../custom_modules/options-util');
const environment = require('../custom_modules/environment');
let Authentication = require('../routes/Authentication');

function getPageConditionedByAuthenticatedState(req, res, pageTitle, page, customOptions) {
    let auth = new Authentication(req, res);
    if (auth.isAuthenticated()) {
        res.redirect(environment.clientBaseUrl)
    } else {
        let options = optionsUtil.createBaseOptions(pageTitle);
        if (customOptions) {
            res.render(page, Object.assign(options, customOptions));
        } else {
            res.render(page, options);
        }
    }
}

function getPage(req, res, pageTitle, page, customOptions) {
        let options = optionsUtil.createBaseOptions(pageTitle);
        if (customOptions) {
            res.render(page, Object.assign(options, customOptions));
        } else {
            res.render(page, options);
        }
}

function getSignInPage(req, res) {
    getPageConditionedByAuthenticatedState(req, res, 'Sign In', 'signin');
}

function getSignInPageWithOptions(req, res, customOptions) {
    getPageConditionedByAuthenticatedState(req, res, 'Sign In', 'signin', customOptions);
}

function getLoginPage(req, res) {
    getPageConditionedByAuthenticatedState(req, res, 'Login', 'login');
}

function getLoginPageWithOptions(req, res, customOptions) {
    getPage(req, res, 'Login', 'login', customOptions);
}

module.exports = {
    getSignInPage,
    getSignInPageWithOptions,
    getLoginPage,
    getLoginPageWithOptions
};
