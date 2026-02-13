// ===============================
// 🔥 FIREBASE INITIALIZATION
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔐 Replace with your REAL Firebase project config
const firebaseConfig = {
  apiKey: "REAL_API_KEY",
  authDomain: "REAL_PROJECT.firebaseapp.com",
  projectId: "REAL_PROJECT_ID",
  storageBucket: "REAL_PROJECT.appspot.com",
  messagingSenderId: "REAL_SENDER_ID",
  appId: "REAL_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export database instance
export { db };
