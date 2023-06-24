// Signup function
function signup(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const signupSuccessMessage = document.getElementById('signup-success');
    const signupErrorMessage = document.getElementById('signup-error');

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Validate inputs
    if (!username || !password) {
        signupErrorMessage.textContent = 'Please enter username and password';
        signupSuccessMessage.textContent = '';
        return;
    }

    // Generate random access token
    const accessToken = generateAccessToken();

    // Save user state to local storage
    const userState = {
        username: username,
        password: password,
        accessToken: accessToken
    };
    localStorage.setItem('userState', JSON.stringify(userState));

    // Clear input fields
    usernameInput.value = '';
    passwordInput.value = '';

    // Show success message
    signupSuccessMessage.textContent = 'Signup successful. Redirecting to profile...';
    signupErrorMessage.textContent = '';

    // Redirect to profile page
    setTimeout(() => {
        window.location.href = '/profile';
    }, 2000);
}

// Profile page initialization
function initProfilePage() {
    const profilePage = document.getElementById('profile');
    const profileDetails = document.getElementById('profile-details');

    // Get user state from local storage
    const userState = JSON.parse(localStorage.getItem('userState'));

    // Check if user is authenticated
    if (!userState || !userState.accessToken) {
        window.location.href = '/signup';
        return;
    }

    // Display user's details
    profileDetails.textContent = `Username: ${userState.username}`;
    profilePage.style.display = 'block';
}

// Logout function
function logout() {
    // Clear user state from local storage
    localStorage.removeItem('userState');
    
    // Redirect to signup page
    window.location.href = '/signup';
}

// Generate random access token
function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

// Check if the current page is the signup or profile page
function checkPage() {
    const currentPage = window.location.pathname;
    const userState = JSON.parse(localStorage.getItem('userState'));

    if (currentPage === '/signup' && userState && userState.accessToken) {
        window.location.href = '/profile';
    } else if (currentPage === '/profile' && (!userState || !userState.accessToken)) {
        window.location.href = '/signup';
    }
}

// Event listener for page load
window.addEventListener('load', () => {
    const currentPage = window.location.pathname;
    if (currentPage === '/signup') {
        const signupForm = document.getElementById('signup-form');
        signupForm.addEventListener('submit', signup);
    } else if (currentPage === '/profile') {
        initProfilePage();
    }

    checkPage();
});
