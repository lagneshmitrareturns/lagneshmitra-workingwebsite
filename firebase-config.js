/* ==========================================
   🔥 FIREBASE CONFIG (DB + AUTH FINAL)
========================================== */

// Core Firebase
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Firestore DB
import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Auth + Google Provider
import { 
  getAuth, 
  GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// 🔐 Firebase Config
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

// 🔥 Initialize Firebase Auth
const auth = getAuth(app);


// =================================================
// ⭐ SINGLE GLOBAL GOOGLE PROVIDER (FINAL FIX)
// =================================================
const provider = new GoogleAuthProvider();

// ⭐ REQUIRED SCOPES
provider.addScope("email");
provider.addScope("profile");

// ⭐ Force account picker every time (mobile fix)
provider.setCustomParameters({
  prompt: "select_account"
});


// ==========================================
// EXPORT SERVICES
// ==========================================
export { db, auth, provider };
