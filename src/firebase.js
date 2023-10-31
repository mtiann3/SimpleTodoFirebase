// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmP6bI1ewBaDjHKghhEkJ-DvM1zVgLFhk",
    authDomain: "dulcet-chiller-362019.firebaseapp.com",
    projectId: "dulcet-chiller-362019",
    storageBucket: "dulcet-chiller-362019.appspot.com",
    messagingSenderId: "168498579000",
    appId: "1:168498579000:web:9bf04656a291df979d48cd",
    measurementId: "G-BCYCWJY1LB"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

