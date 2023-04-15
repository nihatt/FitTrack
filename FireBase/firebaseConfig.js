// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUKn3RwJ4sIq63N4ePNgeN5jki4OnJh9M",
  authDomain: "fittrack-883f9.firebaseapp.com",
  projectId: "fittrack-883f9",
  storageBucket: "fittrack-883f9.appspot.com",
  messagingSenderId: "850742217537",
  appId: "1:850742217537:web:299bae3a5a01476d67efc0",
  measurementId: "G-W9DVK6JJLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);