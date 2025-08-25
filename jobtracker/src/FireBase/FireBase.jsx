// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa78lGC2OpRcgehQwFsKok-vhfyrfGNKw",
  authDomain: "jobtracker-d4f61.firebaseapp.com",
  projectId: "jobtracker-d4f61",
  storageBucket: "jobtracker-d4f61.firebasestorage.app",
  messagingSenderId: "328606336600",
  appId: "1:328606336600:web:b1cf4c3badd95bce2dac2d",
  measurementId: "G-8VNMJ1ZMH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app)
