import { firebaseReducer } from "react-redux-firebase"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"

import { alertReducer } from "./alertReducer"
import { appBarReducer } from "./appBarReducer"
import { authReducer } from "./authReducer"
import { bibleReducer } from "./bibleReducer"
import { noticeReducer } from "./noticeReducer"
import { prayerReducer } from "./prayerReducer"
import { reportReducer } from "./reportReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  bible: bibleReducer,
  notice: noticeReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  appBar: appBarReducer,
  prayers: prayerReducer,
  alert: alertReducer,
  reports: reportReducer,
})

export type AppState = ReturnType<typeof rootReducer>
