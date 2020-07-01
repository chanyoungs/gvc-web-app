import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme"

import { ThunkActionCustom } from "../../types/actions"
import { IFBError } from "./../../types"

export const uploadTheme = (
  name: string,
  theme: { input: string; output: string },
  setCreateNewThemeMode: (b: boolean) => void
): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()

  firestore
    .collection("themes")
    .doc(name)
    .set(theme)
    .then(() => {
      setCreateNewThemeMode(false)
      dispatch({ type: "UPLOAD_THEME" })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "UPLOAD_THEME_ERROR", payload: error })
    })
}

export const deleteTheme = (name: string): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()

  firestore
    .collection("themes")
    .doc(name)
    .delete()
    .then(() => {
      dispatch({ type: "DELETE_THEME" })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "DELETE_THEME_ERROR", payload: error })
    })
}

export const setCurrentThemeName = (name: string): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()

  firestore
    .collection("settings")
    .doc("theme")
    .set({ name: name })
    .then(() => {
      dispatch({ type: "SET_CURRENT_THEME_NAME", payload: name })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "SET_CURRENT_THEME_NAME_ERROR", payload: error })
    })
}
