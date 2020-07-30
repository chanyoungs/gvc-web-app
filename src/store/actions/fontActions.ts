import { ThunkActionCustom } from "../../types/actions"
import { Font } from "./../../components/Level1/Dialogs/FontDialog"
import { IFBError } from "./../../types"

export const uploadFont = (font: Font): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()

  firestore
    .collection("fonts")
    .doc(font.name)
    .set(font)
    .then(() => {
      dispatch({ type: "UPLOAD_FONT" })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "UPLOAD_FONT_ERROR", payload: error })
    })
}

export const deleteFont = (name: Font["name"]): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()

  firestore
    .collection("fonts")
    .doc(name)
    .delete()
    .then(() => {
      dispatch({ type: "DELETE_FONT" })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "DELETE_FONT_ERROR", payload: error })
    })
}
