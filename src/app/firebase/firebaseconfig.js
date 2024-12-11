// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3Tg_dGZkhkhU4V2mOE0cQElA0HdgjERo",
  authDomain: "printora-f1505.firebaseapp.com",
  projectId: "printora-f1505",
  storageBucket: "printora-f1505.firebasestorage.app",
  messagingSenderId: "1023676447353",
  appId: "1:1023676447353:web:369f773ab0fe23e988b2a8",
  measurementId: "G-RF5T8E80TB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Firestore Database
export const db = getFirestore(app);

export default app;
