let signUpForm = document.getElementById('signUpForm')
let signInButton = document.getElementById('signUpForm__signInButton')

signUpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExist = users.some((user) => user.username === username);

    if (isUserExist) {
        alert('Username already exists');
    } else {
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));

        // Store username in localStorage for later use
        localStorage.setItem('username', username);

        alert('User registered successfully');
        window.location.href = '../HTML/signIn.html';
    }
})

signInButton.addEventListener('click', function (e) {
    window.location.href = '../HTML/signIn.html'
}) 

function checkLoggedIn () {
    if(localStorage.getItem('rememberMeStatus') === 'true' || sessionStorage.getItem('currentUser')) {
        window.location.href = '../HTML/main.html'
    }
}
checkLoggedIn()