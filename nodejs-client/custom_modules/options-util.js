const environment = require('../custom_modules/environment');

function createBaseOptions(title) {
    return {
        title: title,
        oauthUrl: environment.oauth,
        baseUrl: environment.clientBaseUrl,
        homeLabel: 'home',
        homeHref: '/',
        signInLabel: 'Sign In',
        signInHref: '/signin',
        loginLabel: 'login',
        loginHref: '/login'
    };
}

function addElementsToNavbarAfterAuthentication(displayName, options) {
    options.profileLabel = displayName;
    options.profileHref = '/profile';

    options.logoutLabel = 'logout';
    options.logoutHref = '/logout';
}

function clearNavbarAfterAuthentication(options) {
    delete options.loginLabel;
    delete options.signInLabel;
}

module.exports = {createBaseOptions,
    clearNavbarAfterAuthentication,
    addElementsToNavbarAfterAuthentication
};
