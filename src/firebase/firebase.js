import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRZF3cr4txcEaNfBLlw1UKwh4oMBmQ-zs",
    authDomain: "shoppintoday-ea185.firebaseapp.com",
    databaseURL: "https://shoppintoday-ea185.firebaseio.com",
    projectId: "shoppintoday-ea185",
    storageBucket: "shoppintoday-ea185.appspot.com",
    messagingSenderId: "439885958955",
    appId: "1:439885958955:web:0323593df300fdb2a2ff6e",
    measurementId: "G-82WBFSZL6J"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;