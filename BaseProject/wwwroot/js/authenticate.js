document.getElementById("LoginButton").addEventListener("click", function () {
    let username = document.getElementById("UsernameInput").value;
    let password = document.getElementById("PasswordInput").value;


    console.log(username);
    console.log(password);

    event.preventDefault();
    login(username, password);

    // send username + password to api
})

const url = 'http://localhost:4000/';
const frontend_url = 'https://localhost:7189/';

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username, password })
    }

    return fetch(url + 'users/authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = frontend_url;
            }
            return user;
        })
}


function logout() {
    localStorage.removeItem('user');
}

function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

function getAll() {
    const requestOptions = {
        method : "GET",
        headers : authHeader()
    };

    return fetch(url + 'users/', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
