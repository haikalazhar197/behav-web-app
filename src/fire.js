import * as firebase from "firebase/app";
// import * as Firebase from "firebase";
import "firebase/auth"; //Enabling Auth
import "firebase/firestore"; //Enabling Firestore

//Initialize Firebase App
const app = firebase.initializeApp({
  apiKey: "AIzaSyB0jA7LYoIMB_Rh_s-CuhsmjDBkmR9bSEw",
  authDomain: "behav-web-app.firebaseapp.com",
  databaseURL: "https://behav-web-app.firebaseio.com",
  projectId: "behav-web-app",
  storageBucket: "behav-web-app.appspot.com",
  messagingSenderId: "337939344595",
  appId: "1:337939344595:web:add8783c8d5ad72194b826",
  measurementId: "G-7ZH0QS95MB",
});

//Export the App
export default app;
