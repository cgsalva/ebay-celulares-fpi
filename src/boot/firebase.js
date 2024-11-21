// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { boot } from "quasar/wrappers";
import { VueFire } from "vuefire";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMaA7Jfq2t-RWuDyxYWks1HPZ9begSILM",
  authDomain: "ebay-celulares.firebaseapp.com",
  projectId: "ebay-celulares",
  storageBucket: "ebay-celulares.firebasestorage.app",
  messagingSenderId: "666276739177",
  appId: "1:666276739177:web:aff83b37c44aa09141caf8",
  measurementId: "G-N6817XZFZ3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();

export default ({ app }) => {
  app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [

    ],
  })
}

export { provider, auth, db };
