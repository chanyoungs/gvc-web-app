import { firebaseReducer } from "react-redux-firebase"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"

import { authReducer } from "./authReducer"
import { noticeReducer } from "./noticeReducer"
import { stylesReducer } from "./stylesReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  notice: noticeReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  styles: stylesReducer,
})

export type AppState = ReturnType<typeof rootReducer>
