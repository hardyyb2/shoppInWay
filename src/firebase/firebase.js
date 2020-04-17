import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "shoppintoday-ea185.firebaseapp.com",
    databaseURL: "https://shoppintoday-ea185.firebaseio.com",
    projectId: "shoppintoday-ea185",
    storageBucket: "shoppintoday-ea185.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: "G-82WBFSZL6J"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const firebase1 = firebase
export const db = baseDb;