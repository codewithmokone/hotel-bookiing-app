// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/storage'


// Initializing firebase authentication
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyC4cuh01cJpmXnAv49VIm8kCI7CaE99C48",
  authDomain: "hotel-booking-app-9ad18.firebaseapp.com",
  projectId: "hotel-booking-app-9ad18",
  storageBucket: "hotel-booking-app-9ad18.appspot.com",
  messagingSenderId: "689570765092",
  appId: "1:689570765092:web:ee88b2cf9d39aef17abbb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


export { auth, db, storage }