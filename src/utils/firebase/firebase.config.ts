import { initializeApp as initializeClientApp } from "firebase/app";
import { getDatabase, Database, connectDatabaseEmulator } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let database: Database

if (process.env.NEXT_PUBLIC_ENV_STATUS === "development_with_emulators") {
  database = getDatabase(initializeClientApp(firebaseConfig, "emulators-app"));
  connectDatabaseEmulator(database, "localhost", 9000);
} else {
  const app = initializeClientApp(firebaseConfig, "default");
  database = getDatabase(app);
}

export {
  database
}
