console.log("ADMIN JS LOADED ✅");

import { db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// =====================================================
// 📩 LOAD CONSULTATIONS
// =====================================================
async function loadConsultations() {

  const list = document.getElementById("consultationList");
  if (!list) return;

  list.innerHTML = "Loading...";

  try {
    const snapshot = await getDocs(collection(db, "lm_queries"));

    list.innerHTML = "";

    if (snapshot.empty) {
      list.innerHTML = "No consultation queries yet.";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();

      const div = document.createElement("div");
      div.classList.add("admin-card");

      div.innerHTML = `
        <strong>${data.fullName || "No Name"}</strong><br/>
        <small>${data.email || "No Email"}</small><br/>
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


// =====================================================
// 📚 LOAD BOOK INTEREST
// =====================================================
async function loadBookInterest() {

  const list = document.getElementById("bookInterestList");
  if (!list) return;

  list.innerHTML = "Loading...";

  try {
    const snapshot = await getDocs(collection(db, "lm_book_interest"));

    list.innerHTML = "";

    if (snapshot.empty) {
      list.innerHTML = "No early access bookings yet.";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();

      const div = document.createElement("div");
      div.classList.add("admin-card");

      div.innerHTML = `
        <strong>${data.fullName || "No Name"}</strong><br/>
        <small>${data.email || "No Email"}</small><br/>
        <p>Interested In: ${data.interestedIn || "-"}</p>
        <hr/>
      `;

      list.appendChild(div);
    });

  } catch (error) {
    console.error("Book interest load error:", error);
    list.innerHTML = "Error loading book interest.";
  }
}


// =====================================================
// 📊 LOAD VISITS + BOOK VIEW COUNTERS
// =====================================================
async function loadCounters() {

  try {

    // 🌐 Total Website Visits
    const visitsSnapshot = await getDocs(collection(db, "lm_visits"));
    const totalVisitsEl = document.getElementById("totalVisits");

    if (totalVisitsEl) {
      totalVisitsEl.innerText = visitsSnapshot.size;
      console.log("Total Visits:", visitsSnapshot.size);
    }


    // 📖 Kaalprehari Book Views
    const bookViewsSnapshot = await getDocs(collection(db, "lm_book_views"));
    const bookViewsEl = document.getElementById("bookViews");

    if (bookViewsEl) {
      bookViewsEl.innerText = bookViewsSnapshot.size;
      console.log("Book Views:", bookViewsSnapshot.size);
    }

  } catch (error) {
    console.error("Counter load error:", error);
  }
}


// =====================================================
// 🚀 INIT ADMIN PANEL
// =====================================================
document.addEventListener("DOMContentLoaded", () => {

  loadConsultations();
  loadBookInterest();
  loadCounters();

});
