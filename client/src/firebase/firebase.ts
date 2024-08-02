// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app: any = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);



const requestPermission = async (): Promise<any> => {
  console.log("Requesting User Permission");

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log("Notification user Permission granted");

      const currentToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY });
      if (currentToken) {
        console.log("Client Token:   ", currentToken);
        return currentToken;
      } else {
        console.log("Failed to generate the app registration token.");
      }
    } else {
      console.log("User Permission Denied.");
    }
  } catch (err) {
    console.log("An error occurred when requesting to receive token. ", err);
  }
};

const onMessageListener = (): Promise<any> => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload);
      resolve(payload);
    });
  });
};

// requestPermission();
onMessageListener()

export { requestPermission, onMessageListener };
