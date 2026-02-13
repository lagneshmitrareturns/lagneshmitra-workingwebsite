console.log("MAIN JS LOADED ✅");

// ===============================
// 🔥 IMPORT FIREBASE DB
// ===============================
import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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
