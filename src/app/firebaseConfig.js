import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3cJRIzJqJrNov9CdUczNHG4X620WKUMI",
  authDomain: "devdrews-ffd56.firebaseapp.com",
  projectId: "devdrews-ffd56",
  storageBucket: "devdrews-ffd56.appspot.com",
  messagingSenderId: "1013910903693",
  appId: "1:1013910903693:web:63cf16f4385761c0dcbbc4",
  measurementId: "G-2YG0EZQQE1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
