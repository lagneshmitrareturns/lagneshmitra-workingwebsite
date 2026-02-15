console.log("MAIN JS LOADED ✅");

// ========================================
// 🔥 IMPORT FIREBASE
// ========================================
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
// 🔥 AUTH PERSISTENCE (VERY IMPORTANT)
// ========================================
await setPersistence(auth, browserLocalPersistence);
console.log("Auth persistence ready ✅");


// ========================================
// 🔥 GOOGLE PROVIDER
// ========================================
const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("profile");
provider.setCustomParameters({ prompt: "select_account" });


// ========================================
// 🔥 CONNECT G BUTTON (MODULE SAFE)
// ========================================
const gBtn = document.getElementById("googleLoginBtn");

if (gBtn) {
  gBtn.addEventListener("click", async () => {
    console.log("Redirecting to Google...");
    await signInWithRedirect(auth, provider);
  });
}


// ========================================
// 💣 GOOGLE RETURN HANDLER (ONLY REDIRECT HERE)
// ========================================
getRedirectResult(auth)
  .then(async (result) => {

    // 👉 User returning from Google login
    if (!result?.user) return;

    const user = result.user;
    console.log("🔥 LOGIN SUCCESS:", user.email);

    // 🔥 Save user to Firestore (first login / update)
    await setDoc(doc(db, "lm_users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      createdAt: serverTimestamp()
    });

    console.log("User saved in Firestore ✅");

    // ⭐ FINAL REDIRECT (ONLY PLACE WHERE REDIRECT HAPPENS)
    window.location.href = "/ideology.html";

  })
  .catch((error) => {
    console.error("Google Login Error:", error);
  });


// ========================================
// 🔐 SESSION LOG (NO REDIRECT HERE)
// ========================================
onAuthStateChanged(auth, (user) => {
  console.log("Session state:", user ? user.email : "No user");
});


// ========================================
// 📊 WEBSITE VISIT TRACKER (RESTORED)
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


// ========================================
// 📌 CONSULTATION FORM (RESTORED)
// ========================================
const consultForm = document.getElementById("consultForm");

if (consultForm) {
  consultForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullName || !email) {
      alert("Please fill required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "lm_queries"), {
        fullName,
        email,
        message,
        status: "new",
        source: "website",
        createdAt: serverTimestamp()
      });

      alert("Query Submitted Successfully 🔥");
      consultForm.reset();

    } catch (error) {
      console.error("Consultation Error:", error);
      alert("Something went wrong.");
    }
  });
}


// ========================================
// 📌 BOOK EARLY ACCESS FORM (RESTORED)
// ========================================
const bookForm = document.getElementById("bookForm");

if (bookForm) {
  bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("bookName").value.trim();
    const email = document.getElementById("bookEmail").value.trim();
    const interestedIn = document.getElementById("interestedIn").value;

    if (!fullName || !email || !interestedIn) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "lm_book_interest"), {
        fullName,
        email,
        interestedIn,
        earlyAccessConsent: true,
        notified: false,
        createdAt: serverTimestamp()
      });

      alert("Early Access Registered 🔥");
      bookForm.reset();

    } catch (error) {
      console.error("Book Interest Error:", error);
      alert("Something went wrong.");
    }
  });
}
