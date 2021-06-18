import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"
import Alert from "@material-ui/lab/Alert"
import React, { FC, Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SERVICE_WORKER_INIT } from "src/store/actions/types"
import { AppState } from "src/store/reducers/rootReducer"
import { localise } from "src/utils/localisation"

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  })
)

export const ServiceWorkerAlert: FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const serviceWorker = useSelector<AppState, AppState["serviceWorker"]>(
    (state) => state.serviceWorker
  )

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorker.serviceWorkerRegistration?.waiting
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: "SKIP_WAITING" })
      registrationWaiting.addEventListener("statechange", (event) => {
        const sw = event.target as ServiceWorker
        if (sw.state === "activated") {
          window.location.reload()
        }
      })
    }
  }

  const anchorOrigin: SnackbarOrigin = { vertical: "top", horizontal: "center" }

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={serviceWorker.initialised}
        autoHideDuration={4000}
        onClose={() => {
          dispatch({ type: SERVICE_WORKER_INIT, payload: false })
        }}
      >
        <Alert
          severity="success"
          onClose={() => {
            dispatch({ type: SERVICE_WORKER_INIT, payload: false })
          }}
        >
          {localise({
            english: "Page has been saved for offline use",
            korean: "오프라인에도 사용가능하게 페이지가 저장됐습니다",
          })}
        </Alert>
      </Snackbar>

      <Snackbar anchorOrigin={anchorOrigin} open={serviceWorker.updated}>
        <Alert
          severity="info"
          action={
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              onClick={updateServiceWorker}
            >
              {localise({ english: "UPDATE", korean: "업데이트" })}
            </Button>
          }
        >
          {localise({
            english: "New version available!",
            korean: "새로운 버전이 나왔습니다!",
          })}
        </Alert>
      </Snackbar>
    </Fragment>
  )
}
