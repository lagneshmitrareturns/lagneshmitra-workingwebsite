// ===============================
// 🔥 IMPORT FIREBASE
// ===============================
import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


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
// 🔥 USER PROFILE SYSTEM
// ===============================
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhoto = document.getElementById("userPhoto");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    userName.innerText = user.displayName;
    userEmail.innerText = user.email;
    userPhoto.src = user.photoURL;
  } else {
    // 🔥 Not logged in → send back to home
    window.location.href = "/";
  }
});


// ===============================
// 🔥 LOGOUT BUTTON
// ===============================
logoutBtn.onclick = async () => {
  await signOut(auth);
  window.location.href = "/";
};
