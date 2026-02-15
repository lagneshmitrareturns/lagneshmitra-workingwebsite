// ==========================================
// 🔥 FIREBASE CONFIG (CDN MODULE VERSION)
// ==========================================

// Core Firebase
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Firestore DB
import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔐 ADD THIS (Google Login ke liye)
import { getAuth } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// 🔐 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCX8yGRJc5AcxSEaaC6AzNLZzxtOCz83Sk",
  authDomain: "lagneshmitra-e57b8.firebaseapp.com",
  projectId: "lagneshmitra-e57b8",
  storageBucket: "lagneshmitra-e57b8.firebasestorage.app",
  messagingSenderId: "420798143606",
  appId: "1:420798143606:web:ace6aec7d195492a415357",
  measurementId: "G-NK57FXBJE6"
};


// 🔥 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore Database
const db = getFirestore(app);

// 🔥 Initialize Firebase Auth (Google Login ke liye)
const auth = getAuth(app);


// ==========================================
// EXPORT SERVICES
// ==========================================
export { db, auth };
