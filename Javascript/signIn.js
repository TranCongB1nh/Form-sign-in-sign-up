let signInForm = document.getElementById("signInForm")
let signUpButton = document.getElementById("signInForm__signUpButton")

signInForm.addEventListener("submit" , function (e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let rememberMeStatus = document.getElementById('rememberMe').checked;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        // Store username in localStorage for later use
        localStorage.setItem('username', username);

        if (rememberMeStatus) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        window.location.href = '../HTML/main.html';
    } else {
        alert("Invalid username or password!");
    }
})

signUpButton.addEventListener('click', function (e) {
    window.location.href = '../HTML/signUp.html'
}) 

function checkRememberMeStatus() {
    if (localStorage.getItem('currentUser')) {
        window.location.href = '../HTML/main.html';
    }
}
checkRememberMeStatus()

if(sessionStorage.getItem('currentUser')) {
    window.location.href = '../HTML/main.html'
}