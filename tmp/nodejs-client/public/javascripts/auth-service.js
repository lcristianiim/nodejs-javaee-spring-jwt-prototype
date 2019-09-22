// getLoggedUser();
import {User} from './user';

class Authentication {
    constructor() {
        this.user = new User();
    };

    // function getLoggedUser() {
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         let user = parseJwt(token).sub;
    //         if (user) {
    //             let profileNav = document.getElementById('profile-nav');
    //             profileNav.classList.remove('hidden');
    //             profileNav.innerText = user;
    //             document.getElementById('login-nav').classList.add('hidden')
    //         }
    //     }
    //
    //     function parseJwt (token) {
    //         var base64Url = token.split('.')[1];
    //         var base64 = base64Url.replace('-', '+').replace('_', '/');
    //         return JSON.parse(window.atob(base64));
    //     };
    // }

}

export {Authentication}
