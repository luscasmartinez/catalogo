import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCuY6HxbV-YATsanGGd8wOOZ0BOnoKgTg",
  authDomain: "catalogo-ondelaine.firebaseapp.com",
  projectId: "catalogo-ondelaine",
  storageBucket: "catalogo-ondelaine.firebasestorage.app",
  messagingSenderId: "541136559142",
  appId: "1:541136559142:web:ea802b9a8626ecd2f89ae7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;