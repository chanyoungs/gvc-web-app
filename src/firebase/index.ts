import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

import firebase from "firebase/app"

var config = {
  apiKey: "AIzaSyBQf0kjL5VgL9IJuEtqWHevRkOMTBmVwiE",
  authDomain: "london-gvc.firebaseapp.com",
  databaseURL: "https://london-gvc.firebaseio.com",
  projectId: "london-gvc",
  storageBucket: "london-gvc.appspot.com",
  messagingSenderId: "139635867699",
  appId: "1:139635867699:web:649f0b856111fee7",
}

export const app = firebase.initializeApp(config)
export const auth = firebase.auth
export const db = firebase.firestore()

export default firebase
