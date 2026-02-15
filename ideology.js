// ===============================
// 🔥 IMPORT FIREBASE
// ===============================
import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// =====================================================
// 🔐 AUTH GUARD (FINAL FIX ⭐)
// =====================================================
console.log("Ideology page auth check starting...");

let authChecked = false;

onAuthStateChanged(auth, (user) => {

  // ⏳ Ignore FIRST null state (Firebase loading)
  if (!authChecked) {
    authChecked = true;
    console.log("Firebase auth loading...");
    return;
  }

  // ❌ User NOT logged in → go back home
  if (!user) {
    console.log("User not logged in → redirect home");
    window.location.replace("/");
    return;
  }

  // ✅ User logged in → allow page + fill profile
  console.log("User allowed:", user.email);

  userName.innerText = user.displayName;
  userEmail.innerText = user.email;
  userPhoto.src = user.photoURL;
});


// ===============================
// 🔥 IMAGE SLIDESHOW SYSTEM
// ===============================
const images = [
  "Ideology1.jpg",
  "Ideology2.jpg",
  "Ideology3.jpg",
  "Ideology4.jpg",
  "Ideology5.jpg"
];

let currentPage = 0;

const pageImage = document.getElementById("pageImage");
const pageIndicator = document.getElementById("pageIndicator");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function updatePage() {
  pageImage.src = images[currentPage];
  pageIndicator.innerText = `Page ${currentPage + 1} / ${images.length}`;
}

nextBtn.onclick = () => {
  if (currentPage < images.length - 1) {
    currentPage++;
    updatePage();
  }
};

prevBtn.onclick = () => {
  if (currentPage > 0) {
    currentPage--;
    updatePage();
  }
};

updatePage();


// ===============================
// 🔥 LOGOUT BUTTON
// ===============================
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = async () => {
  await signOut(auth);
  window.location.replace("/");
};
