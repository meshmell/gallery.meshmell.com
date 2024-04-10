// Import the functions you need from the SDKs you need
import { initializeApp as initializeClientApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeClientApp(firebaseConfig, "default");
const database = getDatabase(app);

if (process.env.NEXT_PUBLIC_ENV_STATUS === "development_with_emulators") {
  connectDatabaseEmulator(database, "localhost", 9000);
}

export {
  database
}
