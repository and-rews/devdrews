import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgm4pnnLRydmWexXAgUhWtnCum7_6rZvI",
  authDomain: "devdrews-bd0ff.firebaseapp.com",
  projectId: "devdrews-bd0ff",
  storageBucket: "devdrews-bd0ff.appspot.com",
  messagingSenderId: "1056913695756",
  appId: "1:1056913695756:web:287ab29862b2c46f07fa29",
  measurementId: "G-8W4B338D93"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
