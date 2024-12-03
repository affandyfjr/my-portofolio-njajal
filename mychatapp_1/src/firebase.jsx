
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";  
  //untuk memberi autentikasi email dan password
import { getAuth } from "firebase/auth";
//lokasi penyimpanan file
import { getFirestore} from "firebase/firestore";
//storage untuk menyimpan gambar
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL:import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)
// const storage = getStorage(app)

// supaya bisa di rute
export {auth, db}

//==================