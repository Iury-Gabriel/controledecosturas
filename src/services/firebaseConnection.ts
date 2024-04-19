import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBx0OEqhS-1W89IqBenDp-0C8aYNtoPcjg",
  authDomain: "controlecosturas.firebaseapp.com",
  projectId: "controlecosturas",
  storageBucket: "controlecosturas.appspot.com",
  messagingSenderId: "234156995694",
  appId: "1:234156995694:web:d05b33912430a092aca27f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };