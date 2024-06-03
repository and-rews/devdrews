import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3xQmOWvZRZf6jRK6rEAeW-nEqJw7xMCY",
  authDomain: "devdrews-fd976.firebaseapp.com",
  projectId: "devdrews-fd976",
  storageBucket: "devdrews-fd976.appspot.com",
  messagingSenderId: "533145843694",
  appId: "1:533145843694:web:0f72f226eabacc1a8ec0ff",
  measurementId: "G-MD4F8D8E3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
