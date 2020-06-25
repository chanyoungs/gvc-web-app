import DateFnsUtils from "@date-io/date-fns"
import { CssBaseline } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import firebase from "firebase"
import React, { Fragment } from "react"
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
import { theme } from "./theme"
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
  return isLoaded(auth) ? children : <div>splash screen...</div>
}

ReactDOM.render(
  <Fragment>
    <CssBaseline />
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <AuthIsLoaded>
                <App />
              </AuthIsLoaded>
            </MuiPickersUtilsProvider>
          </ReactReduxFirebaseProvider>
        </Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Fragment>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
