import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD3O6vqQjX0vkNe6Z22g7zyBYcnjTOfCUE",
  authDomain: "swms-reksti.firebaseapp.com",
  databaseURL:
    "https://swms-reksti-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "swms-reksti",
  storageBucket: "swms-reksti.appspot.com",
  messagingSenderId: "167398741624",
  appId: "1:167398741624:web:b83c2f09549609e3f7ff8d",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
