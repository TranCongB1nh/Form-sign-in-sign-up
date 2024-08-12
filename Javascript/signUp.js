let signUpForm = document.getElementById('signUpForm')
let signInButton = document.getElementById('signUpForm__signInButton')

signUpForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem('users')) || []
    let userExist = users.some((user) => user.username = username)

    if (userExist) {
        alert('Username already exist')
    } else {
        users.push({ username: username, password: password })
        localStorage.setItem('users', JSON.stringify(users))
        alert('User registered successfully')
        window.location.href = '../HTML/signIn.html'
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