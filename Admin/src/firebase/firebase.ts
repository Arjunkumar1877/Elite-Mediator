// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;





