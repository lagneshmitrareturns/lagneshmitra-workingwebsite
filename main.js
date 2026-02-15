console.log("🔥 MAIN JS LOADED 🔥");

// Firebase imports (SAME VERSION!)
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

await setPersistence(auth, browserLocalPersistence);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");

  const btn = document.getElementById("googleLoginBtn");
  if (!btn) return;

  btn.onclick = () => {
    console.log("Redirecting to Google...");
    signInWithRedirect(auth, provider);
  };
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log("No session");
    return;
  }

  console.log("User logged in:", user.email);

  await setDoc(doc(db, "lm_users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    createdAt: serverTimestamp()
  });

  if (window.location.pathname === "/" || window.location.pathname.includes("index")) {
    window.location.href = "/ideology.html";
  }
});
