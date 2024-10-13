// Function to check the registration date and redirect if 13 days have passed
function checkRegistrationDate() {
    const registrationDate = localStorage.getItem('registrationDate');
    if (registrationDate) {
        const registeredOn = new Date(registrationDate);
        const currentDate = new Date();
        const timeDifference = currentDate - registeredOn;
        const daysSinceRegistration = timeDifference / (1000 * 3600 * 24);

        // Check if 13 days have passed
        if (daysSinceRegistration >= 13) {
            // Redirect to the specified URL
            window.location.href = 'https://mostbadgeuser.github.io/Castify1.com/';
        }
    }
}

// Display username and nickname on load
function getUserData() {
    const urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get('username') || localStorage.getItem('username') || 'Anonymous';
    let nickname = urlParams.get('nickname') || localStorage.getItem('nickname') || 'Guest';
    return { username, nickname };
}

window.onload = function () {
    const { username, nickname } = getUserData();
    document.getElementById('username-display').textContent = username;
    document.getElementById('nickname-display').textContent = `(${nickname})`;
    checkRegistrationDate(); // Check registration date
};

// Example logout function
function logoutUser() {
    localStorage.clear();
    window.location.reload();
}