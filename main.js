console.log("MAIN JS LOADED ✅");

import { db, auth } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  signInWithRedirect,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// 🔥 persistence
await setPersistence(auth, browserLocalPersistence);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });


// ===============================
// 🔥 LOGIN BUTTON
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("googleLoginBtn");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    console.log("Redirecting to Google...");
    await signInWithRedirect(auth, provider);
  });
});


// ===============================
// ⭐⭐ REAL LOGIN DETECTOR ⭐⭐
// ===============================
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    console.log("User not logged in");
    return;
  }

  console.log("User logged in:", user.email);

  // save/update user
  await setDoc(doc(db, "lm_users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    createdAt: serverTimestamp()
  });

  // If user is on home page → send to ideology
  const path = window.location.pathname;

  if (path === "/" || path.includes("index")) {
    console.log("Redirecting to ideology...");
    window.location.href = "/ideology.html";
  }
});


// ===============================
// VISIT TRACKER
// ===============================
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
