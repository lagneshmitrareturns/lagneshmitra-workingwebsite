console.log("MAIN JS LOADED ✅");

// ===============================
// 🔥 IMPORT FIREBASE DB + AUTH
// ===============================
import { db, auth } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// =====================================================
// 🔥 CREATE GOOGLE PROVIDER
// =====================================================
const provider = new GoogleAuthProvider();


// =====================================================
// 📌 GOOGLE LOGIN BUTTON (GLOBAL)
// =====================================================
window.signInWithGoogle = async function () {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Redirect Error:", error);
    alert("Google Login Failed ❌");
  }
};


// =====================================================
// 📌 HANDLE GOOGLE REDIRECT RETURN (FIRST LOGIN)
// =====================================================
getRedirectResult(auth)
  .then(async (result) => {

    if (!result) return;

    const user = result.user;

    console.log("User Logged In:", user.email);

    // 🔥 Save user first time
    await setDoc(doc(db, "lm_users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      createdAt: serverTimestamp()
    });

    console.log("User saved in Firestore 🔥");

  })
  .catch((error) => {
    console.error("Google Login Error:", error);
  });


// =====================================================
// 🔥 AUTH STATE REDIRECT ENGINE (MOST IMPORTANT)
// =====================================================
onAuthStateChanged(auth, (user) => {

  const currentPage = window.location.pathname;

  if (user) {
    console.log("Session active:", user.email);

    // If user on landing page → send to ideology
    if (currentPage === "/" || currentPage.includes("index")) {
      window.location.href = "/ideology.html";
    }

  } else {
    console.log("User not logged in");

    // If user tries protected page → send back home
    if (currentPage.includes("ideology")) {
      window.location.href = "/";
    }
  }

});


// =====================================================
// 📌 WEBSITE VISIT TRACKER (RESTORED)
// =====================================================
async function trackVisit() {
  try {
    await addDoc(collection(db, "lm_visits"), {
      page: window.location.pathname,
      device: navigator.userAgent,
      source: document.referrer || "direct",
      createdAt: serverTimestamp()
    });
    console.log("Visit tracked ✅");
  } catch (error) {
    console.error("Visit tracking error:", error);
  }
}
trackVisit();


// =====================================================
// 📌 CONSULTATION FORM (RESTORED)
// =====================================================
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


// =====================================================
// 📌 BOOK EARLY ACCESS FORM (RESTORED)
// =====================================================
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
