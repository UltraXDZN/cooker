import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYb8YAH-Uh04D6L7Z1kauSVxUmk9Km3rI",
  authDomain: "stemgamesfoobar.firebaseapp.com",
  databaseURL:
    "https://stemgamesfoobar-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "stemgamesfoobar",
  storageBucket: "stemgamesfoobar.appspot.com",
  messagingSenderId: "1076912268607",
  appId: "1:1076912268607:web:88358f1940efcc705a5f8a",
  measurementId: "G-0GDXX1V9ZV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
