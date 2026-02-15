console.log("MAIN JS LOADED ✅");

// ===============================
// 🔥 IMPORT FIREBASE DB + AUTH
// ===============================
import { db, auth } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// =====================================================
// 🔥 INIT AUTH SYSTEM (CRITICAL FIX)
// =====================================================
async function initAuthSystem() {

  // ⭐ SESSION PERSISTENCE (MOBILE FIX)
  await setPersistence(auth, browserLocalPersistence);
  console.log("Firebase persistence ready ✅");

  startAuthFlow();
}

initAuthSystem();


// =====================================================
// 🔥 AUTH FLOW START
// =====================================================
function startAuthFlow() {

  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  provider.addScope("profile");
  provider.setCustomParameters({ prompt: "select_account" });

  // ================= GOOGLE LOGIN BUTTON =================
  window.signInWithGoogle = async function () {
    try {
      console.log("Redirecting to Google...");
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Redirect Error:", error);
      alert("Google Login Failed ❌");
    }
  };

  // ================= HANDLE GOOGLE RETURN =================
  getRedirectResult(auth)
    .then(async (result) => {

      if (!result) return;

      const user = result.user;
      console.log("User Logged In:", user.email);

      // Save user in Firestore
      await setDoc(doc(db, "lm_users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: serverTimestamp()
      });

      // ⭐⭐⭐ DIRECT REDIRECT AFTER LOGIN (REAL FIX)
      window.location.href = "/ideology.html";

    })
    .catch((error) => {
      console.error("Google Login Error:", error);
    });


  // ================= SESSION CHECK ENGINE =================
  onAuthStateChanged(auth, (user) => {

    const currentPage = window.location.pathname;
    console.log("Auth state checked on:", currentPage);

    // USER LOGGED IN
    if (user) {

      // If user opens landing page manually → send to ideology
      if (
        currentPage === "/" ||
        currentPage.includes("index.html") ||
        currentPage === ""
      ) {
        window.location.href = "/ideology.html";
      }

    }

    // USER NOT LOGGED IN
    else {

      // Protect ideology page
      if (currentPage.includes("ideology")) {
        window.location.href = "/";
      }

    }

  });

}
