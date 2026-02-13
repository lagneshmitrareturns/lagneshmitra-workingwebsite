// ===============================
// 🔥 FIREBASE IMPORTS
// ===============================
import { db } from "./firebase-config.js";

import {
  collection,
  getDocs,
console.log("ADMIN JS LOADED ✅");

// ===============================
// 🔥 FIREBASE IMPORTS
// ===============================
import { db } from "./firebase-config.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ===============================
// 📩 LOAD CONSULTATION QUERIES
// ===============================
async function loadConsultations() {

  const list = document.getElementById("consultationList");
  list.innerHTML = "Loading...";

  try {
    const q = query(
      collection(db, "lm_queries"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    list.innerHTML = "";

    if (snapshot.empty) {
      list.innerHTML = "No consultations yet.";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();

      const div = document.createElement("div");
      div.classList.add("admin-card");

      div.innerHTML = `
        <strong>${data.fullName || "-"}</strong><br/>
        <small>${data.email || "-"}</small><br/>
        <p>${data.message || "-"}</p>
        <small>Status: ${data.status || "-"}</small>
        <hr/>
      `;

      list.appendChild(div);
    });

    console.log("Consultations Loaded:", snapshot.size);

  } catch (error) {
    console.error("Consultation load error:", error);
    list.innerHTML = "Error loading consultations.";
  }
}


// ===============================
// 📚 LOAD BOOK INTEREST
// ===============================
async function loadBookInterest() {

  const list = document.getElementById("bookInterestList");
  list.innerHTML = "Loading...";

  try {
    const q = query(
      collection(db, "lm_book_interest"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    list.innerHTML = "";

    if (snapshot.empty) {
      list.innerHTML = "No book interest yet.";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();

      const div = document.createElement("div");
      div.classList.add("admin-card");

      div.innerHTML = `
        <strong>${data.fullName || "-"}</strong><br/>
        <small>${data.email || "-"}</small><br/>
        <p>Interested In: ${data.interestedIn || "-"}</p>
        <small>Notified: ${data.notified ? "Yes" : "No"}</small>
        <hr/>
      `;

      list.appendChild(div);
    });

    console.log("Book Interest Loaded:", snapshot.size);

  } catch (error) {
    console.error("Book interest load error:", error);
    list.innerHTML = "Error loading book interest.";
  }
}


// ===============================
// 📊 LOAD VISIT COUNTERS
// ===============================
async function loadCounters() {

  try {

    const visitsSnapshot = await getDocs(collection(db, "lm_visits"));
    const bookViewsSnapshot = await getDocs(collection(db, "lm_book_views"));

    document.getElementById("totalVisits").innerText =
      visitsSnapshot.size;

    document.getElementById("bookViews").innerText =
      bookViewsSnapshot.size;

    console.log("Counters Loaded");

  } catch (error) {
    console.error("Counter load error:", error);
  }
}


// ===============================
// 🚀 INIT ADMIN PANEL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadConsultations();
  loadBookInterest();
  loadCounters();
});
