console.log("ADMIN JS LOADED ✅");

import { db } from "./firebase-config.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ===============================
// LOAD CONSULTATIONS
// ===============================
async function loadConsultations() {
  const list = document.getElementById("consultationList");
  list.innerHTML = "Loading...";

  try {
    const snapshot = await getDocs(collection(db, "lm_queries"));

    list.innerHTML = "";

    snapshot.forEach(doc => {
      const data = doc.data();

      const div = document.createElement("div");
      div.classList.add("admin-card");

      div.innerHTML = `
        <strong>${data.fullName}</strong><br/>
        <small>${data.email}</small><br/>
        <p>${data.message || "-"}</p>
        <hr/>
      `;

      list.appendChild(div);
    });

  } catch (error) {
    console.error("Consultation load error:", error);
    list.innerHTML = "Error loading consultations.";
  }
}


// ===============================
// LOAD BOOK INTEREST
// ===============================
async function loadBookInterest() {
  const list = document.getElementById("bookInterestList");
  list.innerHTML = "Loading...";

  try {
    const snapshot = await getDocs(collection(db, "lm_book_interest"));

    list.innerHTML = "";

    snapshot.forEach(doc => {
      const data = doc.data();

      const div = document.createElement("div");
      div.classList.add("admin-card");

      div.innerHTML = `
        <strong>${data.fullName}</strong><br/>
        <small>${data.email}</small><br/>
        <p>Interested In: ${data.interestedIn}</p>
        <hr/>
      `;

      list.appendChild(div);
    });

  } catch (error) {
    console.error("Book interest load error:", error);
    list.innerHTML = "Error loading book interest.";
  }
}


// ===============================
// LOAD VISITS + BOOK VIEW COUNTERS
// ===============================
async function loadCounters() {
  try {

    // Total Website Visits
    const visitsSnapshot = await getDocs(collection(db, "lm_visits"));
    const totalVisitsEl = document.getElementById("totalVisits");
    if (totalVisitsEl) {
      totalVisitsEl.innerText = visitsSnapshot.size;
    }

    // Kaalprehari Book Views
    const bookViewsSnapshot = await getDocs(collection(db, "lm_book_views"));
    const bookViewsEl = document.getElementById("bookViews");
    if (bookViewsEl) {
      bookViewsEl.innerText = bookViewsSnapshot.size;
    }

  } catch (error) {
    console.error("Counter load error:", error);
  }
}


// INIT
document.addEventListener("DOMContentLoaded", () => {
  loadConsultations();
  loadBookInterest();
  loadCounters();
});
