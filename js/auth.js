// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg03KV2t64Q1ecVNs3MmyF1ITHAmNH17s",
  authDomain: "todo-d745e.firebaseapp.com",
  projectId: "todo-d745e",
  storageBucket: "todo-d745e.firebasestorage.app",
  messagingSenderId: "709848713565",
  appId: "1:709848713565:web:ffee9a579eb1a338fd40b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register User
window.registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered:', userCredential.user);
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Registration Error:', error.message);
    alert(error.message);
  }
};

// Login User
window.loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
    localStorage.setItem('userId', userCredential.user.uid);
    window.location.href = 'todo.html';
  } catch (error) {
    console.error('Login Error:', error.message);
    alert(error.message);
  }
};

// Logout User
window.logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('userId');
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Logout Error:', error.message);
  }
};

// Check Auth State
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is logged in:', user.uid);
    localStorage.setItem('userId', user.uid);
  } else {
    console.log('User is logged out');
    localStorage.removeItem('userId');
  }
});