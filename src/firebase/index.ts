import "firebase/auth"
import "firebase/firestore"
import "firebase/messaging"
import "firebase/storage"

import firebase from "firebase/app"

export const app = firebase.initializeApp({
  apiKey: "AIzaSyBQf0kjL5VgL9IJuEtqWHevRkOMTBmVwiE",
  authDomain: "london-gvc.firebaseapp.com",
  databaseURL: "https://london-gvc.firebaseio.com",
  projectId: "london-gvc",
  storageBucket: "london-gvc.appspot.com",
  messagingSenderId: "139635867699",
  appId: "1:139635867699:web:649f0b856111fee7",
})
export const auth = firebase.auth

export const db = firebase.firestore()
db.enablePersistence().catch((err) => {
  if (err.code === "failed-precondition") {
    console.log(
      "Multiple tabs open, persistence can only be enabled in one tab at a a time."
    )
  } else if (err.code === "unimplemented") {
    console.log(
      "The current browser does not support all of the features required to enable persistence"
    )
  }
})

export const messaging = firebase.messaging()
messaging.usePublicVapidKey(
  "BK-h_vuvlmqGDlaevF1JJuveMTqIDMEvdPh8s-yb3PuRKn1sCfjHTA_cm0u3lLCu9n4B7MACvOfe--B90BfsCZM"
)
// messaging
//   .getToken()
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log("currentToken", currentToken)
//     } else {
//       // Show permission request.
//       console.log(
//         "No Instance ID token available. Request permission to generate one."
//       )
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err)
//   })

export default firebase
