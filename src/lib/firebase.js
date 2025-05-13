// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2MOXXmwIktNJ0_MS93OjSjswtUzKv-Pc",
  authDomain: "assignment15-1bb77.firebaseapp.com",
  projectId: "assignment15-1bb77",
  storageBucket: "assignment15-1bb77.firebasestorage.app",
  messagingSenderId: "926213252317",
  appId: "1:926213252317:web:61edd8d8c805baf8a0e734"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 export
export const db = getFirestore(app);