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
  onAuthStateChanged,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// 🔐 AUTH PERSISTENCE
await setPersistence(auth, browserLocalPersistence);


// 🔥 GOOGLE PROVIDER
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });


// 🔥 GOOGLE BUTTON
const gBtn = document.querySelector(".g-btn");
if (gBtn) {
  gBtn.addEventListener("click", async () => {
    await signInWithRedirect(auth, provider);
  });
}


// =====================================================
// 💣 REAL LOGIN DETECTOR (THIS FIXES REDIRECT)
// =====================================================
let firstCheckDone = false;

onAuthStateChanged(auth, async (user) => {

  const path = window.location.pathname;
  console.log("Auth state:", user ? user.email : "No user");

  // Ignore first null load
  if (!firstCheckDone) {
    firstCheckDone = true;
    return;
  }

  // ⭐ USER LOGGED IN
  if (user) {

    // Save user if not exists
    await setDoc(doc(db, "lm_users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      createdAt: serverTimestamp()
    });

    console.log("User saved/updated");

    // ⭐⭐⭐ REDIRECT HERE (ONLY HERE)
    if (path === "/" || path.includes("index")) {
      window.location.replace("/ideology.html");
      return;
    }
  }

  // ⭐ USER NOT LOGGED IN
  else {
    if (path.includes("ideology")) {
      window.location.replace("/");
    }
  }

});
