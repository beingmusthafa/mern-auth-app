// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-app-cf358.firebaseapp.com",
  projectId: "mern-auth-app-cf358",
  storageBucket: "mern-auth-app-cf358.appspot.com",
  messagingSenderId: "704359358194",
  appId: "1:704359358194:web:21b4f45bc70f866274ba6b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
