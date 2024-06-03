import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA3xQmOWvZRZf6jRK6rEAeW-nEqJw7xMCY",
  authDomain: "devdrews-fd976.firebaseapp.com",
  projectId: "devdrews-fd976",
  storageBucket: "devdrews-fd976.appspot.com",
  messagingSenderId: "533145843694",
  appId: "1:533145843694:web:0f72f226eabacc1a8ec0ff",
  measurementId: "G-MD4F8D8E3X",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

export { db };
