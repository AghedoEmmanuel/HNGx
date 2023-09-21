// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjbXFQt6UVq8HS9_Y63wcfnECToWfZDxE",
  authDomain: "draganddrop-d1a70.firebaseapp.com",
  projectId: "draganddrop-d1a70",
  storageBucket: "draganddrop-d1a70.appspot.com",
  messagingSenderId: "324608687571",
  appId: "1:324608687571:web:82e2368389d492f88e4326",
  measurementId: "G-2HK3956VY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)