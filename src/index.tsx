import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import firebase from "firebase/app"
import React from "react"
import ReactDOM from "react-dom"
import { Provider, useSelector } from "react-redux"
import { getFirebase, isLoaded, ReactReduxFirebaseProvider } from "react-redux-firebase"
import { BrowserRouter } from "react-router-dom"
import { applyMiddleware, compose, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createFirestoreInstance, getFirestore, reduxFirestore } from "redux-firestore"
import thunk, { ThunkMiddleware } from "redux-thunk"

import { AppState, rootReducer } from "../src/store/reducers/rootReducer"
import App from "./components/App"
import { LoadingBackdrop } from "./components/Level1/Backdrops/LoadingBackdrop"
import { messaging } from "./firebase"
import * as serviceWorker from "./serviceWorker"
import { SERVICE_WORKER_INIT, SERVICE_WORKER_UPDATE } from "./store/actions/types"
import { globalObjects } from "./utils/globalObjects"

// Define global objects for testing
globalObjects()

declare let module: any

const store = createStore(
  rootReducer,
  compose(
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument({
          getFirestore,
          getFirebase,
        }) as ThunkMiddleware
      )
    ),
    reduxFirestore(firebase)
  )
)

const rrfConfig = {
  userProfile: "members",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
}

const AuthIsLoaded = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector<AppState>((state) => state.firebase.auth)
  return isLoaded(auth) ? children : <LoadingBackdrop />
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
        </MuiPickersUtilsProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
)

if ("serviceWorker" in navigator) {
  serviceWorker.register({
    onSuccess: () =>
      store.dispatch({ type: SERVICE_WORKER_INIT, payload: true }),
    onUpdate: (serviceWorkerRegistration) =>
      store.dispatch({
        type: SERVICE_WORKER_UPDATE,
        payload: serviceWorkerRegistration,
      }),
  })

  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then((registration) => {
      messaging.useServiceWorker(registration)
    })
    .catch((err) => {
      console.log("Service worker registration failed, error:", err)
    })
}
