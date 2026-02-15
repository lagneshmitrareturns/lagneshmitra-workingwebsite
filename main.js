console.log("MAIN JS LOADED ✅");

import { db, auth } from "./firebase-config.js";

import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// ========================================
// 🔥 AUTH PERSISTENCE (VERY IMPORTANT)
// ========================================
await setPersistence(auth, browserLocalPersistence);


// ========================================
// 🔥 GOOGLE PROVIDER
// ========================================
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });


// ========================================
// 🔥 CONNECT GOOGLE BUTTON (AFTER PAGE LOAD)
// ========================================
window.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("googleLoginBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    console.log("Redirecting to Google...");
    await signInWithRedirect(auth, provider);
  });

});


// ========================================
// ⭐ REAL LOGIN DETECTOR (THE MAGIC)
// ========================================
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    console.log("User not logged in");
    return;
  }

  console.log("User logged in:", user.email);

  // Save / update user in Firestore
  await setDoc(doc(db, "lm_users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    createdAt: serverTimestamp()
  });

  // ⭐ REDIRECT IF USER ON LANDING PAGE
  const path = window.location.pathname;

  if (path === "/" || path.includes("index")) {
    console.log("Redirecting to ideology...");
    window.location.href = "/ideology.html";
  }
});


// ========================================
// 📊 VISIT TRACKER (RESTORED)
// ========================================
async function trackVisit() {
  try {
    await addDoc(collection(db, "lm_visits"), {
      page: window.location.pathname,
      device: navigator.userAgent,
      source: document.referrer || "direct",
      createdAt: serverTimestamp()
    });
  } catch {}
}
trackVisit();
