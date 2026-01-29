// src/chat.js

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

// 🔹 Send message
export async function sendMessage(chatId, userId, text) {
  if (!text.trim()) return;

  const messagesRef = collection(db, "lm_chats", chatId, "messages");

  await addDoc(messagesRef, {
    text: text,
    sender: userId,
    createdAt: serverTimestamp(),
    seen: false,
  });
}

// 🔹 Listen to messages (real-time)
export function listenMessages(chatId, callback) {
  const messagesRef = collection(db, "lm_chats", chatId, "messages");

  const q = query(messagesRef, orderBy("createdAt", "asc"));

  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });
}
