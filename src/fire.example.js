import * as firebase from "firebase/app";
// import * as Firebase from "firebase";
import "firebase/auth"; //Enabling Auth
import "firebase/firestore"; //Enabling Firestore

//Initialize Firebase App
const app = firebase.initializeApp({
  apiKey: "YOUR FIREBASE API KEY",
  authDomain: "YOUR FIREBASE APP DOMAIN",
  databaseURL: "YOUR FIREBASE DATABASE URL",
  projectId: "YOUR FIREBASE PROJECT ID",
  storageBucket: "YOUR FIREBASE STORAGE BUCKET",
  messagingSenderId: "YOUR FIREBASE MESSENGER ID",
  appId: "YOUR FIREBASE APP ID",
  measurementId: "YOUR FIREBASE MEASUREMENT ID",
});

//Export the App
export default app;
