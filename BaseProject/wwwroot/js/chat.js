"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


var user = localStorage.getItem('user');
if (user != null) {
    document.getElementById("userInput").value = JSON.parse(user).username;
}

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


const url = 'http://localhost:4000/';

// get list of user
document.getElementById("loadButton").addEventListener("click", function (event) {
    document.getElementById("Loading").hidden = true;
    const token = JSON.parse(localStorage.getItem('user')).token;
    const requestOptions = {
        method: 'GET',
        headers: { 
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }
    var result = fetch(url + 'users', requestOptions)
        .then(handleResponse)
        .then(users => {
            for (let user of users) {
                var li = document.createElement("li");
                document.getElementById("userList").appendChild(li);
                li.textContent = user.username;
            }
        })

    console.log(result);
})


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
