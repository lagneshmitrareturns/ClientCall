// src/payments.js

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

// 🔹 Create payment order in Firestore
export async function createOrder({
  userId,
  chatId,
  amount,
  serviceType,
}) {
  const ordersRef = collection(db, "lm_chats", chatId, "Orders");

  const orderDoc = await addDoc(ordersRef, {
    userId: userId,
    amount: amount,
    currency: "INR",
    serviceType: serviceType,
    status: "created",
    createdAt: serverTimestamp(),
  });

  return orderDoc.id;
}

// 🔹 Mark order as paid
export async function markOrderPaid(chatId, orderId, paymentId) {
  const orderRef = doc(db, "lm_chats", chatId, "Orders", orderId);

  await updateDoc(orderRef, {
    status: "paid",
    paymentId: paymentId,
    paidAt: serverTimestamp(),
  });

  // Also mark chat as paid
  const chatRef = doc(db, "lm_chats", chatId);
  await updateDoc(chatRef, {
    isPaid: true,
    status: "paid",
  });
}
