// ===============================
// 🔥 FIREBASE IMPORTS
// ===============================
import { db } from "./firebase-config.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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
// 📊 LOAD VISIT COUNTERS
// ===============================
async function loadCounters() {
  try {
    const visitsSnapshot = await getDocs(collection(db, "lm_visits"));
    const totalVisits = visitsSnapshot.size;

    document.getElementById("totalVisits").innerText = totalVisits;

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
