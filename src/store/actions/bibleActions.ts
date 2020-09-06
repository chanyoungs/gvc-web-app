import { IBibleRef } from "./../../components/Pages/BiblePage"
import { SET_BIBLE_REFERENCE, SET_BIBLE_REFERENCE_ERROR, ThunkActionCustom } from "./types"

// Set Bible Reference
export const uploadBibleRef = (
  bibleRef: IBibleRef,
  uid: string
): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()

  firestore
    .collection("bibleRefs")
    .doc(uid)
    .set(bibleRef, { merge: true })
    .then(() => {
      console.log("Bible reference set!")
      dispatch({ type: SET_BIBLE_REFERENCE, payload: bibleRef })
    })
    .catch((error) => {
      console.log("Bible reference set error!")
      dispatch({ type: SET_BIBLE_REFERENCE_ERROR, payload: error })
    })
}
