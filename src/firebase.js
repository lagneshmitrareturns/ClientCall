// src/firebase.js
// ======================================================
// 🔥 LagneshMitra – Firebase Core (Single Source of Truth)
// ======================================================

// ------------------------------------------------------
// Firebase SDKs (CDN – Web Safe, v10+ Modular)
// ------------------------------------------------------
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
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
// 🚀 Initialize Firebase App (SAFE SINGLETON)
// Prevents re-initialization bugs
// ------------------------------------------------------
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// ------------------------------------------------------
// 🔑 Core Services
// ------------------------------------------------------
const auth = getAuth(app);
const db = getFirestore(app);

// ------------------------------------------------------
// 📤 Central Exports
// Used by:
// - chat.html (client messages)
// - chat-admin.html (admin inbox)
// - PEM / PSM modules (future)
// - Admin dashboards
// ------------------------------------------------------
export {
  app,
  auth,
  db,
  serverTimestamp
};

// ------------------------------------------------------
// 🛑 ENGINEERING RULES (DO NOT BREAK)
// ------------------------------------------------------
// ❌ Do NOT initialize Firebase elsewhere
// ❌ Do NOT duplicate config in other JS files
// ❌ Do NOT directly access Firestore without importing from here
// ✅ All writes & reads must flow through this core
// ------------------------------------------------------
