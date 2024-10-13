// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase Setup
const firebaseConfig = {
    apiKey: "AIzaSyDTqZeTMNIAjBt9ArxAVG3HWL0zXiU9GnM",
    authDomain: "castify-d259d.firebaseapp.com",
    projectId: "castify-d259d",
    storageBucket: "castify-d259d.appspot.com",
    messagingSenderId: "809904193970",
    appId: "1:809904193970:web:af4a99b6e3b8738adc64ab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Update Profile UI
async function updateProfileUI(user) {
    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.querySelector('.username').textContent = userData.username;
            document.querySelector('.profile-pic').src = userData.profilePic;
        } else {
            console.warn("User document not found.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Monitor Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateProfileUI(user);
    } else {
        document.querySelector('.username').textContent = "Guest";
    }
});

// Login Function
document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfileUI(user);
        alert('Login successful!');
        window.location.href = 'https://mostbadgeuser.github.io/Castify1.com/';
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
});

// Logout Function
document.querySelector('.logout-button').addEventListener('click', () => {
    auth.signOut().then(() => {
        alert('Logged out!');
        window.location.reload();
    }).catch((error) => {
        console.error('Logout error:', error);
    });
});