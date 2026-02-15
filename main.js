console.log("🔥 MAIN JS LOADED SUCCESSFULLY 🔥");

// ======================================================
// 🚨 PAGE DEBUGGER — SABSE PEHLA TEST
// ======================================================
console.log("Current URL:", window.location.href);
console.log("Current PATH:", window.location.pathname);

// ======================================================
// 🔥 IMPORT FIREBASE
// ======================================================
import { db, auth } from "/firebase-config.js";

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

console.log("Firebase modules loaded ✅");

// ======================================================
// 🔥 AUTH PERSISTENCE
// ======================================================
await setPersistence(auth, browserLocalPersistence);
console.log("Auth persistence ready ✅");

// ======================================================
// 🔥 GOOGLE PROVIDER
// ======================================================
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// ======================================================
// 🔥 CONNECT GOOGLE BUTTON
// ======================================================
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded ✅");

  const btn = document.getElementById("googleLoginBtn");

  if (!btn) {
    console.log("❌ Google button NOT FOUND on this page");
    return;
  }

  console.log("✅ Google button connected");

  btn.addEventListener("click", async () => {
    console.log("🚀 Starting Google Redirect...");
    await signInWithRedirect(auth, provider);
  });
});

// ======================================================
// ⭐ REAL LOGIN DETECTOR (MOST IMPORTANT)
// ======================================================
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    console.log("👤 No user session");
    return;
  }

  console.log("🎉 USER LOGGED IN:", user.email);

  await setDoc(doc(db, "lm_users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    createdAt: serverTimestamp()
  });

  const path = window.location.pathname;

  console.log("User currently on:", path);

  if (path === "/" || path.includes("index")) {
    console.log("➡️ Redirecting to ideology page...");
    window.location.replace("/ideology.html");
  }
});

// ======================================================
// 📊 VISIT TRACKER
// ======================================================
async function trackVisit() {
  try {
    await addDoc(collection(db, "lm_visits"), {
      page: window.location.pathname,
      createdAt: serverTimestamp()
    });
    console.log("Visit tracked 📊");
  } catch {}
}
trackVisit();
