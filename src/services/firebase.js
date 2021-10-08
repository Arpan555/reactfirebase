import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
  apiKey: "AIzaSyC_0CS4Sd8KGskEROMLD2EUkby_VhD1TJw",
  authDomain: "chatty-5697e.firebaseapp.com",
  databaseURL: "https://chatty-5697e-default-rtdb.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();


 