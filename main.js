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
  getRedirectResult,
  onAuthStateChanged,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// ========================================
// 🔥 INIT AUTH (MOBILE REQUIRED)
await setPersistence(auth, browserLocalPersistence);


// ========================================
// 🔥 GOOGLE PROVIDER
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });


// ========================================
// 🔥 LOGIN BUTTON
window.signInWithGoogle = async function () {
  await signInWithRedirect(auth, provider);
};


// ========================================
// 💣 THE REAL FIX — REDIRECT HERE ONLY
getRedirectResult(auth)
  .then(async (result) => {

    // 👉 If user just came back from Google
    if (result?.user) {

      const user = result.user;
      console.log("🔥 LOGIN RETURN SUCCESS:", user.email);

      // save user first time
      await setDoc(doc(db, "lm_users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: serverTimestamp()
      });

      // ⭐⭐⭐ REDIRECT ONLY HERE
      window.location.href = "/ideology.html";
    }

  })
  .catch((error) => console.error(error));


// ========================================
// 🔐 SESSION CHECK (NO REDIRECT HERE)
onAuthStateChanged(auth, (user) => {
  console.log("Session:", user ? user.email : "No user");
});


// ========================================
// 📊 VISIT TRACKER
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
