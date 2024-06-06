// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6hTFob8LF8aQFgEbKq8OcgxQvF1wP39Y",
  authDomain: "mern-blog-65899.firebaseapp.com",
  projectId: "mern-blog-65899",
  storageBucket: "mern-blog-65899.appspot.com",
  messagingSenderId: "1020869413625",
  appId: "1:1020869413625:web:5bad76a65fba0cc1ddf028",
  measurementId: "G-7WQZR2PW06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Added semicolon here

export default app;
