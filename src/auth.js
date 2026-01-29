// src/auth.js

import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { app, db } from "./firebase.js";

const auth = getAuth(app);

// 🔹 Anonymous login (auto, silent)
export async function initAuth() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        resolve(user);
      } else {
        try {
          const result = await signInAnonymously(auth);
          resolve(result.user);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

// 🔹 Create / update user record
export async function registerUser(user) {
  const userRef = doc(db, "users", user.uid);

  await setDoc(
    userRef,
    {
      uid: user.uid,
      createdAt: serverTimestamp(),
      role: "client",
      source: "website",
    },
    { merge: true }
  );

  return user.uid;
}
