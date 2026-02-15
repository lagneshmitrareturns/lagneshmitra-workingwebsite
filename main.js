console.log("MAIN JS LOADED ✅");

// ========================================
// 🔥 IMPORT FIREBASE (FINAL)
// ========================================
import { db, auth, provider } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// ========================================
// 🔥 AUTH PERSISTENCE (MOBILE FIX)
// ========================================
await setPersistence(auth, browserLocalPersistence);
console.log("Auth persistence ready ✅");


// ========================================
// 🔥 GOOGLE LOGIN BUTTON CONNECTOR
// ========================================
window.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("googleLoginBtn");

  if (!btn) {
    console.log("Google button not found on this page");
    return;
  }

  console.log("Google button connected ✅");

  btn.addEventListener("click", async () => {
    try {
      console.log("Redirecting to Google...");
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error("Google redirect error:", err);
      alert("Google Login Failed ❌");
    }
  });

});


// ========================================
// ⭐⭐⭐ MASTER LOGIN DETECTOR ⭐⭐⭐
// ========================================
onAuthStateChanged(auth, async (user) => {

  const path = window.location.pathname;

  // ===== USER NOT LOGGED IN =====
  if (!user) {
    console.log("User not logged in");

    // Protect ideology page
    if (path.includes("ideology")) {
      window.location.href = "/";
    }

    return;
  }

  // ===== USER LOGGED IN =====
  console.log("User logged in:", user.email);

  // Save/update user in Firestore
  await setDoc(doc(db, "lm_users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    createdAt: serverTimestamp()
  });

  // If logged-in user opens landing page → redirect
  if (path === "/" || path.includes("index")) {
    console.log("Redirecting to ideology...");
    window.location.href = "/ideology.html";
  }

});


// ========================================
// 📊 WEBSITE VISIT TRACKER
// ========================================
async function trackVisit() {
  try {
    await addDoc(collection(db, "lm_visits"), {
      page: window.location.pathname,
      device: navigator.userAgent,
      source: document.referrer || "direct",
      createdAt: serverTimestamp()
    });
    console.log("Visit tracked ✅");
  } catch (err) {
    console.error("Visit tracking error:", err);
  }
}
trackVisit();
