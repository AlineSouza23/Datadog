import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSWTYImsrk9G7UTIKyF-aemomzCBB_J3E",
  authDomain: "campos-datadog.firebaseapp.com",
  projectId: "campos-datadog",
  storageBucket: "campos-datadog.firebasestorage.app",
  messagingSenderId: "1038152208885",
  appId: "1:1038152208885:web:90178fa3b37c3c062090bc",
  measurementId: "G-P2C6MCYKX5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);