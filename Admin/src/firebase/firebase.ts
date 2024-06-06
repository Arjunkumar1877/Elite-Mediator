// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiKMgXAyxHTNe37A9mq7CbflZCV_G080E",
  authDomain: "elite-mediator.firebaseapp.com",
  projectId: "elite-mediator",
  storageBucket: "elite-mediator.appspot.com",
  messagingSenderId: "144513732823",
  appId: "1:144513732823:web:33a6a583a38005f582e092",
  measurementId: "G-K8GD4K1D70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export default app;
