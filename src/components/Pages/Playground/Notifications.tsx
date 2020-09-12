import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { messaging } from "src/firebase"
import { deleteToken, uploadToken } from "src/store/actions/noticeActions"
import { AppState } from "src/store/reducers/rootReducer"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface NotificationsProps {}

messaging.onTokenRefresh(() => {
  console.log("Listener triggered!")
})

export const Notifications: FC<NotificationsProps> = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const uid = useSelector<AppState, string>((state) => state.firebase.auth.uid)

  useFirestoreConnect([{ collection: "notificationTokens", doc: uid }])

  const tokens = useSelector<AppState, undefined | { [key: string]: string }>(
    (state) =>
      state.firestore.data.notificationTokens &&
      state.firestore.data.notificationTokens[uid] &&
      state.firestore.data.notificationTokens[uid]["tokens"]
  )

  const [token, setToken] = useState<string | null>(null)

  const updateToken = async (upload?: boolean) => {
    try {
      const t = await messaging.getToken()
      setToken(t)
      if (upload && !(tokens && t in tokens)) {
        dispatch(uploadToken(t))
      } else {
        console.log(t)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    updateToken()
  }, [])

  return (
    <Fragment>
      <Button
        onClick={async () => {
          if (token && tokens && token in tokens) {
            dispatch(deleteToken(token))
            await messaging.deleteToken(token)
            setToken(null)
            console.log("Successfully unsubscribed!")
          } else {
            updateToken(true)
          }
        }}
      >
        {token && tokens && token in tokens ? "Unsubscribe" : "Subscribe"}
      </Button>
    </Fragment>
  )
}

// messaging.onTokenRefresh(() => {
//   console.log("Listener triggered!")
//   updateToken()
// })

// const handleTokenRefresh = async () => {
//   const token = await messaging.getToken()
//   // return FIREBASE_DATABASE.ref("/tokens").push({
//   //     token: token,
//   //     uid: FIREBASE_AUTH.currentUser.uid,
//   //   })
//   }

// function checkSubscription() {
//   FIREBASE_DATABASE.ref("/tokens")
//     .orderByChild("uid")
//     .equalTo(FIREBASE_AUTH.currentUser.uid)
//     .once("value")
//     .then((snapshot) => {
//       if (snapshot.val()) {
//         subscribeButton.setAttribute("hidden", "true")
//         unsubscribeButton.removeAttribute("hidden")
//       } else {
//         unsubscribeButton.setAttribute("hidden", "true")
//         subscribeButton.removeAttribute("hidden")
//       }
//     })
// }

// const subscribeToNotifications = async () => {
//   try {
//     await messaging.requestPermission()
//     await handleTokenRefresh()
//     await checkSubscription()
//   } catch (error) {
//     console.error("error getting permission :(")
//   }
// }

// const unsubscribeFromNotifications = async () => {
//   try {
//     const token = await messaging.getToken()
//     await messaging.deleteToken(token)
//     // const snapshot = await FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value'))
//     //   const key = await Object.keys(snapshot.val())[0];
//     //  await FIREBASE_DATABASE.ref('/tokens').child(key).remove();
//     await checkSubscription()
//   } catch (error) {
//     console.log("error deleting token :(")
//   }
// }

// const sendNotification = (event) => {
//   event.preventDefault()

//   const notificationMessage = document.getElementById("notification-message")
//     .value
//   if (!notificationMessage) return

//   FIREBASE_DATABASE.ref("/notifications")
//     .push({
//       user: FIREBASE_AUTH.currentUser.displayName,
//       message: notificationMessage,
//       userProfileImg: FIREBASE_AUTH.currentUser.photoURL,
//     })
//     .then(() => {
//       document.getElementById("notification-message").value = ""
//     })
//     .catch(() => {
//       console.log("error sending notification :(")
//     })
// }
