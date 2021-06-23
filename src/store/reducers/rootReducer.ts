import { FirebaseReducer, firebaseReducer } from "react-redux-firebase"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"
import { IMemberDownload } from "src/types"

import { alertReducer } from "./alertReducer"
import { appBarReducer } from "./appBarReducer"
import { authReducer } from "./authReducer"
import { bibleReducer } from "./bibleReducer"
import { dialogReducer } from "./dialogReducer"
import { noticeReducer } from "./noticeReducer"
import { prayerReducer } from "./prayerReducer"
import { reportReducer } from "./reportReducer"
import { serviceWorkerReducer } from "./serviceWorkerReducer"

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
  serviceWorker: serviceWorkerReducer,
  dialog: dialogReducer,
})

export type AppState = Omit<ReturnType<typeof rootReducer>, "firebase"> & {
  firebase: FirebaseReducer.Reducer<IMemberDownload>
}
