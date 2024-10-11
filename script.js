// Check if user is logged in on page load
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Redirect to the main page if not logged in
        window.location.href = 'https://mostbadgeuser.github.io/Castify.com/';
    }
}

// Function to display user's nickname
function displayUsername() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const usernameDisplay = document.querySelector('.username');
        usernameDisplay.textContent = currentUser; // Set username in profile section
    }
}

// Handle logout
function logout() {
    localStorage.removeItem('currentUser'); // Remove current user from local storage
    alert('Logged out! Redirecting to main page...');
    window.location.href = 'https://mostbadgeuser.github.io/Castify.com/'; // Redirect after logout
}

// Call functions on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    displayUsername();
});