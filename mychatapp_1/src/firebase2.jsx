// firebaseFbData.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_STORAGE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_STORAGE_AUTH_DOMAIN,
  databaseURL:import.meta.env.VITE_FIREBASE_STORAGE_DATABASE_URL,
  projectId:import.meta.env.VITE_FIREBASE_STORAGE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_FIREBASE_STORAGE_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_FIREBASE_STORAGE_APP_ID
};

const appFbData = initializeApp(firebaseConfig, "fb-data");
const storage = getStorage(appFbData);

export { storage };
