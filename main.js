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


// 🔥 Persistence
await setPersistence(auth, browserLocalPersistence);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });


// =====================================
// 🔥 GOOGLE BUTTON
// =====================================
window.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("googleLoginBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    console.log("Redirecting to Google...");
    await signInWithRedirect(auth, provider);
  });

});


// =====================================
// ⭐ REAL LOGIN DETECTOR (NO REDIRECT)
// =====================================
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    console.log("User NOT logged in");
    return;
  }

  console.log("🔥 USER LOGGED IN:", user.email);

  // Save user in Firestore
  await setDoc(doc(db, "lm_users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    createdAt: serverTimestamp()
  });

  // 🔥 SHOW LOGIN SUCCESS ON INDEX PAGE
  const loginText = document.querySelector(".g-text");
  if (loginText) loginText.innerText = "Logged in ✅";

});
