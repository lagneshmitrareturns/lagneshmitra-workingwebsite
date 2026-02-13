import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "REAL_API_KEY",
  authDomain: "REAL_PROJECT.firebaseapp.com",
  projectId: "REAL_PROJECT_ID",
  storageBucket: "REAL_PROJECT.appspot.com",
  messagingSenderId: "REAL_SENDER_ID",
  appId: "REAL_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
