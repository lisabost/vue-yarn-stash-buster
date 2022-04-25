import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "fir-demo-3c08d",
    storageBucket: "fir-demo-3c08d.appspot.com",
    messagingSenderId: "355307027614",
    appId: "1:355307027614:web:377dc6d3f5627dcf570f8f"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref('/');

export {firebase, db, auth, storage}