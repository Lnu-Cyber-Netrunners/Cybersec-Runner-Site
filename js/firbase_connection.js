import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

  const firebaseConfig = {
  apiKey: "AIzaSyB6ZgyfZYsvVt0CEzKhhpMyAES8Eg9HgYM",
  authDomain: "cyberstudy-2a707.firebaseapp.com",
  projectId: "cyberstudy-2a707",
  storageBucket: "cyberstudy-2a707.appspot.com",
  messagingSenderId: "828016555027",
  appId: "1:828016555027:web:df00c4c34f8de426447be6",
  measurementId: "G-ZD3B90B348"
};
