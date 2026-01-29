import {
  collection,
  doc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

/* =========================
   CONFIG / STATE
========================= */

let currentChatId = null;
let unsubscribeMessages = null;

/* =========================
   START OR OPEN CHAT
========================= */

export async function openChat(chatId) {
  currentChatId = chatId;

  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("createdAt", "asc"));

  // Clear previous listener
  if (unsubscribeMessages) unsubscribeMessages();

  unsubscribeMessages = onSnapshot(q, snapshot => {
    const chatBox = document.getElementById("chatMessages");
    chatBox.innerHTML = "";

    snapshot.forEach(doc => {
      const msg = doc.data();
      renderMessage(msg.sender, msg.text);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

/* =========================
   SEND MESSAGE
========================= */

export async function sendMessage(text, sender = "admin") {
  if (!currentChatId || !text.trim()) return;

  const messagesRef = collection(
    db,
    "chats",
    currentChatId,
    "messages"
  );

  await addDoc(messagesRef, {
    sender: sender,          // "admin" or "client"
    text: text.trim(),
    createdAt: serverTimestamp()
  });

  // Update parent chat (inbox view)
  const chatDocRef = doc(db, "chats", currentChatId);
  await updateDoc(chatDocRef, {
    lastMessage: text.trim(),
    updatedAt: serverTimestamp()
  });
}

/* =========================
   RENDER MESSAGE (UI)
========================= */

function renderMessage(sender, text) {
  const chatBox = document.getElementById("chatMessages");

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");

  if (sender === "admin") {
    msgDiv.classList.add("admin");
  } else {
    msgDiv.classList.add("client");
  }

  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
}

/* =========================
   LOAD CHAT LIST (INBOX)
========================= */

export function loadInbox() {
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, orderBy("updatedAt", "desc"));

  onSnapshot(q, snapshot => {
    const inbox = document.getElementById("chatList");
    inbox.innerHTML = "";

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const chatId = docSnap.id;

      const item = document.createElement("div");
      item.classList.add("chat-item");

      item.innerHTML = `
        <strong>${data.clientName || "Unknown"}</strong><br/>
        <small>${data.lastMessage || "No messages yet"}</small>
      `;

      item.onclick = () => openChat(chatId);
      inbox.appendChild(item);
    });
  });
}
