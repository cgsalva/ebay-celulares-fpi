// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMaA7Jfq2t-RWuDyxYWks1HPZ9begSILM",
  authDomain: "ebay-celulares.firebaseapp.com",
  projectId: "ebay-celulares",
  storageBucket: "ebay-celulares.appspot.com",
  messagingSenderId: "666276739177",
  appId: "1:666276739177:web:aff83b37c44aa09141caf8",
  measurementId: "G-N6817XZFZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
