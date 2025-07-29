// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALZPiVYmgqNbg3A7Y0sKO6j4u6Qb_b3p4",
  authDomain: "hotel-booking-5fadc.firebaseapp.com",
  databaseURL:
    "https://hotel-booking-5fadc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotel-booking-5fadc",
  storageBucket: "hotel-booking-5fadc.firebasestorage.app",
  messagingSenderId: "565154022037",
  appId: "1:565154022037:web:b6777f1fb87d8e9318d19c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
