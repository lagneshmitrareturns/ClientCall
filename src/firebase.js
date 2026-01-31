// src/firebase.js
// ======================================================
// 🔥 LagneshMitra – Firebase Core (Single Source of Truth)
// ======================================================

// Firebase SDKs (CDN – Web Safe)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ------------------------------------------------------
// 🔐 Firebase Configuration
// ⚠️ Replace with REAL keys before production
// ------------------------------------------------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// ------------------------------------------------------
// 🚀 Initialize Firebase App (Singleton)
// ------------------------------------------------------
const app = initializeApp(firebaseConfig);

// ------------------------------------------------------
// 🔑 Core Services
// ------------------------------------------------------
const auth = getAuth(app);
const db = getFirestore(app);

// ------------------------------------------------------
// 📤 Exports
// Used by:
// - chat.html
// - chat-admin.html
// - posts / PEM (future)
// - admin dashboards
// ------------------------------------------------------
export {
  app,
  auth,
  db,
  serverTimestamp
};

// ------------------------------------------------------
// 🛑 DO NOT:
// - Re-initialize Firebase elsewhere
// - Duplicate configs
// - Modify without versioning
// ------------------------------------------------------
