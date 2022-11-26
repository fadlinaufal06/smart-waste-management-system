import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDq0OEPAxPBPh1mBuC_evqOJ-q8L0an2KM",
  authDomain: "swms-3c669.firebaseapp.com",
  databaseURL: "https://swms-3c669-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "swms-3c669",
  storageBucket: "swms-3c669.appspot.com",
  messagingSenderId: "120653094187",
  appId: "1:120653094187:web:69b147baac87b45e35796e",
  measurementId: "G-X7FETJK1T7"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
