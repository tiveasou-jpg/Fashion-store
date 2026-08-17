// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const isFirebaseConfigured = Object.entries(firebaseConfig)
  .filter(([key]) => key !== 'measurementId') // optional field
  .every(([, value]) => !!value);

if (!isFirebaseConfigured) {
  console.warn(
    "[firebase.js] Missing Firebase environment variables. " +
    "Create a .env file in the project root (see .env.example) with your " +
    "Firebase project credentials, then restart the dev server. " +
    "Login, Checkout, Admin, and other Firebase-dependent pages will not work until this is fixed."
  );
}

// Use safe placeholder values when unset so initializeApp() doesn't throw
// and blank out the entire app. Firebase calls will simply fail gracefully
// at runtime (and are already caught in try/catch in App.jsx / pages).
const safeConfig = isFirebaseConfigured
  ? firebaseConfig
  : {
      apiKey:"AIzaSyC4wG55eYqw14x5nVqD3YHrh6V4_pYi5Dw",
      authDomain:"fashion-store-6a046.firebaseapp.com",
      projectId: "fashion-store-6a046",
      storageBucket:"fashion-store-6a046.firebasestorage.app",
      messagingSenderId:"1057338117583",
      appId:"1:1057338117583:web:1d38bed1194ffd3fe296ba",
    };

const app = initializeApp(safeConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
