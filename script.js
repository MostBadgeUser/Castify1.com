// Check if user is logged in on page load
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Redirect to the main page if not logged in
        window.location.href = 'https://mostbadgeuser.github.io/Castify.com/';
    } else {
        // If logged in, display the username
        displayUsername();
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

// Check if user is already registered
function isUserRegistered(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
}

// Register user and store in localStorage
function registerUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    // Save the registered username (nickname) to localStorage for the session
    localStorage.setItem('currentUser', username);
}

// Send welcome email using EmailJS
function sendWelcomeEmail(email, username) {
    emailjs.send("service_eaz5mxs", "template_your_template_id", {
        to_email: email,
        username: username
    })
    .then(function(response) {
        console.log('Email sent successfully:', response);
    }, function(error) {
        console.error('Failed to send email:', error);
    });
}

// Handle registration form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!isUserRegistered(username)) {
        registerUser(username, email, password);
        sendWelcomeEmail(email, username); // Send welcome email
        alert('Registration successful! Redirecting...');
        // Redirect to the main page after successful registration
        window.location.href = 'index.html'; // Adjust to your main page
    } else {
        alert('Username already taken!');
    }
});

// Load channels on the channel page
function loadChannels() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const channelsContainer = document.getElementById('channelsContainer');

    if (users.length === 0) {
        channelsContainer.innerHTML = '<p>No channels available.</p>'; // Message if no channels
        return;
    }

    users.forEach(user => {
        const channelDiv = document.createElement('div');
        channelDiv.classList.add('channel-item');
        channelDiv.innerHTML = `
            <img class="channel-icon" src="https://i.ibb.co/Ksjms5W/icon.png" alt="Channel Icon">
            <div class="channel-info">
                <h2>${user.username}</h2>
                <p>Email: ${user.email}</p>
            </div>
        `;
        channelsContainer.appendChild(channelDiv);
    });
}

// Call functions on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus(); // Check if user is logged in
    loadChannels(); // Load channels on the channel page
});