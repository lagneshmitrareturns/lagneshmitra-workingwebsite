// ===== FIREBASE IMPORTS =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== FIREBASE CONFIG =====
// 🔥 Replace with your actual config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
  } catch (error) {
    console.error("Visit tracking error:", error);
  }
}
trackVisit();

// =====================================================
// 📌 2. QUERY FORM SUBMISSION
// =====================================================
const queryForm = document.getElementById("queryForm");

if (queryForm) {
  queryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const queryType = document.getElementById("queryType").value;
    const message = document.getElementById("message").value;

    try {
      await addDoc(collection(db, "lm_queries"), {
        fullName,
        email,
        phone,
        queryType,
        message,
        status: "new",
        source: "website",
        paymentStatus: "pending",
        createdAt: serverTimestamp()
      });

      alert("Query submitted successfully 🔥");
      queryForm.reset();
    } catch (error) {
      console.error("Query Error:", error);
      alert("Something went wrong.");
    }
  });
}

// =====================================================
// 📌 3. BOOK EARLY ACCESS FORM
// =====================================================
const bookForm = document.getElementById("bookInterestForm");

if (bookForm) {
  bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("bookName").value;
    const email = document.getElementById("bookEmail").value;
    const country = document.getElementById("country").value;
    const interestedIn = document.getElementById("interestedIn").value;

    try {
      await addDoc(collection(db, "lm_book_interest"), {
        fullName,
        email,
        country,
        interestedIn,
        earlyAccessConsent: true,
        notified: false,
        createdAt: serverTimestamp()
      });

      alert("Early access registered 🔥");
      bookForm.reset();
    } catch (error) {
      console.error("Book interest error:", error);
    }
  });
}

// =====================================================
// 📌 4. PAYMENT ENTRY (Manual UPI Submit)
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
      console.error("Payment error:", error);
    }
  });
}
