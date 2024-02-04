// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQTAGIZ7H28Qed-WKz5frLpJ6FEMune7o",
  authDomain: "baymax-1559c.firebaseapp.com",
  projectId: "baymax-1559c",
  storageBucket: "baymax-1559c.appspot.com",
  messagingSenderId: "819251949490",
  appId: "1:819251949490:web:004c1662b1547aa832feab"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db
