import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRurb_O2X3EvT38rQNqRLAnrzlBCVQyco",
  authDomain: "next-instagram-54124.firebaseapp.com",
  projectId: "next-instagram-54124",
  storageBucket: "next-instagram-54124.appspot.com",
  messagingSenderId: "151017679890",
  appId: "1:151017679890:web:01def14ab9f48008b1fccb"
};
  
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }