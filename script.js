// Registration and Login Handling
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const loginErrorMessage = document.getElementById('login-error-message');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Check if the username already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.username === username);

            if (userExists) {
                errorMessage.textContent = 'Username is already taken.';
            } else {
                users.push({ username, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', username);
                window.location.href = 'dashboard.html';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            // Validate the user
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const validUser = users.find(user => user.username === username && user.password === password);

            if (validUser) {
                localStorage.setItem('currentUser', username);
                window.location.href = 'dashboard.html';
            } else {
                loginErrorMessage.textContent = 'Invalid username or password.';
            }
        });
    }

    // Display welcome message in dashboard
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            welcomeMessage.textContent = `Welcome, ${currentUser}!`;
        } else {
            window.location.href = 'login.html';
        }
    }

    // Logout functionality
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});
