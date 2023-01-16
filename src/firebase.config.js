// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcJtsYE7DkvDe9rkRwpWWphz8Dk4FJ_Oo",
  authDomain: "car-marketplace-8f3c3.firebaseapp.com",
  projectId: "car-marketplace-8f3c3",
  storageBucket: "car-marketplace-8f3c3.appspot.com",
  messagingSenderId: "742047420037",
  appId: "1:742047420037:web:67c02a1cd20a135faca3ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
