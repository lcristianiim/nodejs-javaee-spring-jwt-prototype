loginForm.addEventListener('submit', event => {

    let loginForm = document.getElementById('loginForm');
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('pw').value;

    let options = {
        method: 'POST',
        headers: {
            "Authorization": "Basic YXBwOnNlY3JldA==",
            "WWW-Authenticate": "Basic realm='oauth2/client'"
        },
        body: JSON.stringify({ username: username, password: password, grant_type: 'password' })
    };

    fetch(`http://localhost:8090/oauth/token?grant_type=password&username=${username}&password=${password}`,
        options)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw Error('Login failed')
            }
        })
        .then(response => response.text())
        .then(token => {
            storeTokenInSession(token);
            redirectToHomepage();
        })
        .catch(error => {
            console.log('not good');
            console.log(error.message)
        })
});

function redirectToHomepage() {
    window.location.replace('/');
}

function storeTokenInSession(token) {
    fetch('http://localhost:3000/login/store-token', {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token })
    }).then(response => {
        if (response.ok) {
            console.log('Token recieved and stored successfully');
        }
    })
}
