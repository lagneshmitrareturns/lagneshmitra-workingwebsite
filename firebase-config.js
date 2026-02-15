// 🔥 FIREBASE CONFIG FINAL (LATEST SDK)

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvxM3XH5IOm66i_bZ4PIhwkDGU3Dq5diE",
  authDomain: "lagneshmitra-e57b8.firebaseapp.com",
  projectId: "lagneshmitra-e57b8",
  storageBucket: "lagneshmitra-e57b8.firebasestorage.app",
  messagingSenderId: "420798143606",
  appId: "1:420798143606:web:5c61b76b311161f4415357",
  measurementId: "G-19X0471X54"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
