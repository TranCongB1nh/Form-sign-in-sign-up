document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const rememberMe = document.getElementById('rememberMe');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Function to check login status
    function checkLoginStatus() {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        const rememberMeStatus = localStorage.getItem('rememberMeStatus');

        if (loggedInUser) {
            if (welcomeMessage) {
                welcomeMessage.textContent = `Hello ${loggedInUser} Đã đăng nhập`;
            }
            if (logoutBtn) {
                logoutBtn.style.display = 'block';
            }
        } else if (rememberMeStatus === 'true') {
            const rememberedUser = localStorage.getItem('loggedInUser');
            if (rememberedUser) {
                sessionStorage.setItem('loggedInUser', rememberedUser);
                if (welcomeMessage) {
                    welcomeMessage.textContent = `Hello ${rememberedUser} Đã đăng nhập`;
                }
                if (logoutBtn) {
                    logoutBtn.style.display = 'block';
                }
            }
        } else {
            if (loginBtn) {
                loginBtn.disabled = false;
            }
        }
    }

    // Handle Sign In Form Submission
    if (signInForm) {
        signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const storedPassword = localStorage.getItem(username);

            if (storedPassword === password) {
                sessionStorage.setItem('loggedInUser', username);
                if (rememberMe.checked) {
                    localStorage.setItem('loggedInUser', username);
                    localStorage.setItem('rememberMeStatus', 'true');
                } else {
                    localStorage.removeItem('loggedInUser');
                    localStorage.setItem('rememberMeStatus', 'false');
                }
                window.location.href = 'main.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Handle Sign Up Form Submission
    if (signUpForm) {
        signUpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;

            if (localStorage.getItem(newUsername)) {
                alert('Username already exists');
            } else {
                localStorage.setItem(newUsername, newPassword);
                alert('Sign Up successful');
                window.location.href = 'index.html';
            }
        });
    }

    // Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('rememberMeStatus');
            window.location.href = 'index.html';
        });
    }

    // Redirect to Main if already logged in
    if (document.location.pathname.endsWith('signup.html')) {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            window.location.href = 'main.html';
        }
    }

    // Initial check for login status
    checkLoginStatus();
});