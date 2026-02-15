// 🔥 FIREBASE CONFIG (FINAL CLEAN V2)

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import { getAuth, GoogleAuthProvider } 
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvxM3XH5IOm66i_bZ4PIhwkDGU3Dq5diE",
  authDomain: "lagneshmitra-e57b8.firebaseapp.com",
  projectId: "lagneshmitra-e57b8",
  storageBucket: "lagneshmitra-e57b8.firebasestorage.app",
  messagingSenderId: "420798143606",
  appId: "1:420798143606:web:87cb00610e2be124415357"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
