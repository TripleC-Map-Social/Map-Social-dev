// Import the functions you need from the SDKs you need
import * as firebase from "firebase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm7iv_AHUo3O8x_FhM_7v3Qjze575J8W0",
  authDomain: "mapsocial-7c71d.firebaseapp.com",
  projectId: "mapsocial-7c71d",
  storageBucket: "mapsocial-7c71d.appspot.com",
  messagingSenderId: "997454292640",
  appId: "1:997454292640:web:3c988313a8a20172df4bc5",
  measurementId: "G-NZ5W6KFJBE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app);

const auth = firebase.auth();

export { auth };