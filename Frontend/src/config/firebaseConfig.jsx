import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
const fire = firebase.initializeApp(firebaseConfig);

// Exporting the auth object and google auth provider for use in other files
export const auth = fire.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export { firebase }; // Exporting the firebase object for consistency
export default fire;
