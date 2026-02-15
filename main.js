console.log("MAIN JS LOADED ✅");

import { db, auth, provider } from "./firebase-config.js";

import {
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// =======================================
// 🔐 AUTH PERSISTENCE (MOBILE MUST)
// =======================================
await setPersistence(auth, browserLocalPersistence);


// =======================================
// 🔥 GOOGLE LOGIN BUTTON
// =======================================
window.addEventListener("DOMContentLoaded", () => {
  const gBtn = document.getElementById("googleLoginBtn");

  if (!gBtn) return;

  gBtn.addEventListener("click", async () => {
    console.log("Redirecting to Google...");
    await signInWithRedirect(auth, provider);
  });
});


// =======================================
// ⭐⭐⭐ REAL LOGIN DETECTOR ⭐⭐⭐
// =======================================
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    console.log("User not logged in");
    return;
  }

  console.log("LOGIN SUCCESS:", user.email);

  // 🔥 Save user in Firestore
  await setDoc(doc(db, "lm_users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    createdAt: serverTimestamp()
  });

  // ⭐ Redirect ONLY from homepage
  const path = window.location.pathname;

  if (path === "/" || path.includes("index")) {
    console.log("Redirecting to ideology...");
    window.location.replace("/ideology.html");
  }
});


// =======================================
// 📊 VISIT TRACKER (Optional)
// =======================================
async function trackVisit() {
  try {
    await addDoc(collection(db, "lm_visits"), {
      page: window.location.pathname,
      createdAt: serverTimestamp()
    });
  } catch {}
}
trackVisit();
