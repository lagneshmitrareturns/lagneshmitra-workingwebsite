// ======================================
// 🔥 MAIN JS START
// ======================================
console.log("🔥 MAIN JS LOADED 🔥");

// 🔥 JS LOAD DETECTOR (mobile banner)
window.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("jsTestBanner");
  if (banner) {
    banner.innerText = "MAIN.JS LOADED ✅";
    banner.style.background = "green";
  }
});


// ======================================
// 🔥 FIREBASE IMPORTS (v12 MATCHED)
// ======================================
import { auth, db } from "/firebase-config.js";

import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


// ======================================
// 🔥 AUTH PERSISTENCE (VERY IMPORTANT)
// ======================================
await setPersistence(auth, browserLocalPersistence);
console.log("Auth persistence enabled");


// ======================================
// 🔥 GOOGLE PROVIDER
// ======================================
const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("profile");
provider.setCustomParameters({ prompt: "select_account" });


// ======================================
// 🔥 CONNECT GOOGLE BUTTON AFTER DOM LOAD
// ======================================
window.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("googleLoginBtn");

  if (!btn) {
    console.log("Google button not found");
    return;
  }

  console.log("Google button connected ✅");

  btn.addEventListener("click", async () => {
    try {
      console.log("Redirecting to Google...");
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error("Google Login Error:", err);
      alert("Google Login Failed ❌");
    }
  });

});


// ======================================
// ⭐⭐⭐ REAL LOGIN DETECTOR ⭐⭐⭐
// ======================================
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    console.log("No active session");
    return;
  }

  console.log("🔥 USER LOGGED IN:", user.email);

  // 🔥 SAVE USER IN FIRESTORE
  await setDoc(doc(db, "lm_users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    createdAt: serverTimestamp()
  });

  console.log("User saved to Firestore ✅");

  // ==================================
  // 🔥 REDIRECT ENGINE
  // ==================================
  const path = window.location.pathname;
  console.log("Current path:", path);

  if (path === "/" || path.includes("index")) {
    console.log("Redirecting to ideology page...");
    window.location.href = "/ideology.html";
  }

});
