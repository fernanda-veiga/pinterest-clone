import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyA5zlb3ZRJKVvsTd4AhgVBPphllKL4s9zI",
  authDomain: "pinterest-clone-31ee6.firebaseapp.com",
  projectId: "pinterest-clone-31ee6",
  storageBucket: "pinterest-clone-31ee6.appspot.com",
  messagingSenderId: "157598674816",
  appId: "1:157598674816:web:1d5eaa127428de1fed1b65",
  measurementId: "G-8XQHWG2M82",
};

//Initialize Firebase products
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const APIKeyPath = firebase.firestore().collection("API").doc("APIKey");

export default APIKeyPath;
