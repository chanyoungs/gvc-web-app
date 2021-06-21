import Button from "@material-ui/core/Button"
import React, { FC, Fragment, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { deleteToken, uploadToken } from "src/store/actions/noticeActions"
import { AppState } from "src/store/reducers/rootReducer"
import { localise } from "src/utils/localisation"

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
// const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface NotificationsProps {
  messaging: firebase.messaging.Messaging
}

export const Notifications: FC<NotificationsProps> = ({ messaging }) => {
  // const classes = useStyles()
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

  const updateToken = useCallback(async (upload?: boolean) => {
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
  }, [dispatch, messaging, tokens])

  useEffect(() => {
    updateToken()
  }, [updateToken])

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
        {token && tokens && token in tokens
          ? localise({ english: "Unsubscribe", korean: "구독취소" })
          : localise({ english: "Subscribe", korean: "구독" })}
      </Button>
    </Fragment>
  )
}
