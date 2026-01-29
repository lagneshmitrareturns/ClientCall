// src/utils.js

import {
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firestore timestamp
export function now() {
  return serverTimestamp();
}

// Chat status helpers
export const CHAT_STATUS = {
  OPEN: "open",
  PAID: "paid",
  CLOSED: "closed"
};

// Format amount (future UI use)
export function formatAmount(amount) {
  if (!amount) return "₹0";
  return "₹" + Number(amount).toLocaleString("en-IN");
}

// Simple logger (disable later)
export function log(...args) {
  console.log("[LM]", ...args);
}
