import { ThunkAction } from "redux-thunk"

import { INotice } from "./../../types"
import { AppState } from "./../reducers/rootReducer"
import { AppActions, ThunkActionCustom } from "./types"

export const createNotice = (notice: INotice): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const fs = getFirestore()
  const fb = getFirebase()

  fs.collection("notices")
    .add({ ...notice, createdAt: new Date() })
    .then(() => {
      dispatch({ type: "CREATE_NOTICE", payload: notice })
    })
    .catch((error: Error) => {
      dispatch({ type: "CREATE_NOTICE_ERROR", payload: error })
    })
}
