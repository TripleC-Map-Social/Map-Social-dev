// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyA0nMJBQ2I6UFwqBemtg00vhSlmLht4JGo",

  authDomain: "crud-test-23d0f.firebaseapp.com",

  projectId: "crud-test-23d0f",

  storageBucket: "crud-test-23d0f.appspot.com",

  messagingSenderId: "1097533899621",

  appId: "1:1097533899621:web:ce14294ccca2dc8917578c",

  measurementId: "G-K51FPKH4B6"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);


