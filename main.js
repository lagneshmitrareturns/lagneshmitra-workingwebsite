console.log("MAIN JS LOADED ✅");

// ===============================
// 🔥 IMPORT FIREBASE DB + AUTH
// ===============================
import { db, auth, provider } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// =====================================================
// 📌 0. GOOGLE LOGIN SYSTEM 🔥🔥🔥
// =====================================================

// Google Login Button Function (global)
window.signInWithGoogle = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("User Logged In:", user.email);

    // 🔥 Save user to Firestore
    await setDoc(doc(db, "lm_users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      createdAt: serverTimestamp()
    });

    // 🔥 First login redirect → ideology page
    window.location.href = "/ideology.html";

  } catch (error) {
    console.error("Google Login Error:", error);
    alert("Login failed. Try again.");
  }
};


// Detect already logged in users
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Already logged in:", user.email);
  }
});


// =====================================================
// 📌 1. WEBSITE VISIT TRACKER
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
// 📌 1.5 BOOK IMAGE VIEW TRACKER 🔥
// =====================================================
const bookImage = document.getElementById("bookImage");

if (bookImage) {
  bookImage.addEventListener("click", async () => {
    try {
      await addDoc(collection(db, "lm_book_views"), {
        page: "kaalprehari",
        createdAt: serverTimestamp()
      });
      console.log("Book view tracked 🔥");
    } catch (error) {
      console.error("Book view tracking error:", error);
    }
  });
}


// =====================================================
// 📌 2. CONSULTATION FORM
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
// 📌 3. BOOK EARLY ACCESS FORM
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


// =====================================================
// 📌 4. PAYMENT ENTRY (Future Use)
// =====================================================
const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {
  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("payName").value;
    const email = document.getElementById("payEmail").value;
    const amount = document.getElementById("amount").value;
    const transactionId = document.getElementById("transactionId").value;
    const serviceType = document.getElementById("serviceType").value;

    try {
      await addDoc(collection(db, "lm_payments"), {
        fullName,
        email,
        amount,
        transactionId,
        serviceType,
        paymentMethod: "UPI",
        status: "pending",
        verified: false,
        createdAt: serverTimestamp()
      });

      alert("Payment submitted. Verification pending.");
      paymentForm.reset();

    } catch (error) {
      console.error("Payment Error:", error);
    }
  });
}
