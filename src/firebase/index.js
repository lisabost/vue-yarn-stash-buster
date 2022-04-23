import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuqvwKhrs6IgiGGCWuHZovWH-R9GMNTMg",
    authDomain: "fir-demo-3c08d.firebaseapp.com",
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