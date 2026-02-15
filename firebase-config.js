/* ==========================================
   🔥 FIREBASE CONFIG — FINAL CLEAN VERSION
========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getAuth, GoogleAuthProvider } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// ⭐ NEW APP CONFIG (v3)
const firebaseConfig = {
  apiKey: "AIzaSyDvxM3XH5IOm66i_bZ4PIhwkDGU3Dq5diE",
  authDomain: "lagneshmitra-e57b8.firebaseapp.com",
  projectId: "lagneshmitra-e57b8",
  storageBucket: "lagneshmitra-e57b8.firebasestorage.app",
  messagingSenderId: "420798143606",
  appId: "1:420798143606:web:5c61b76b311161f4415357",
  measurementId: "G-19X0471X54"
};


// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Services
const db = getFirestore(app);
const auth = getAuth(app);

// ⭐ Google Provider (IMPORTANT)
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });


// EXPORT EVERYTHING
export { db, auth, provider };
