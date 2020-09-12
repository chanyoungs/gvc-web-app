import { INotice, INoticeWithMeta } from "./../../types"
import { CREATE_NOTICE, CREATE_NOTICE_ERROR, DELETE_NOTICE, ThunkActionCustom } from "./types"

export const uploadToken = (token: string): ThunkActionCustom<void> => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const state = getState()
  const uid = state.firebase.auth.uid

  const documentSnapshot = await firestore
    .collection("notificationTokens")
    .doc(uid)
    .get()
  const data = documentSnapshot.data()

  const prevTokens = data && "tokens" in data ? data["tokens"] : {}

  if (!(token in prevTokens)) {
    await firestore
      .collection("notificationTokens")
      .doc(uid)
      .set({ uid, tokens: { ...prevTokens, [token]: true } })
    console.log("Token uploaded on cloud!")
  }
}

export const deleteToken = (token: string): ThunkActionCustom<void> => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const state = getState()
  const uid = state.firebase.auth.uid

  const documentSnapshot = await firestore
    .collection("notificationTokens")
    .doc(uid)
    .get()
  const data = documentSnapshot.data()

  const prevTokens =
    data && "tokens" in data
      ? (data["tokens"] as { [key: string]: string })
      : {}

  if (token in prevTokens) {
    const { [token]: omit, ...newTokens } = prevTokens

    await firestore
      .collection("notificationTokens")
      .doc(uid)
      .set({ uid, tokens: newTokens })
    console.log("Token deleted on cloud!")
  }
}

export const createNotice = (notice: INotice): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  console.log("createNotice", notice)
  const firestore = getFirestore()
  const firebase = getFirebase()

  firestore
    .collection("notices")
    .add({ ...notice, createdAt: new Date() })
    .then(() => {
      dispatch({ type: CREATE_NOTICE, payload: notice })
    })
    .catch((error: Error) => {
      dispatch({ type: CREATE_NOTICE_ERROR, payload: error })
    })
}

export const deleteNotice = (id: string): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()

  console.log("deleteNotice", id)
  let deleteDoc = firestore
    .collection("notices")
    .doc(id)
    .delete()
    .then(() => {
      dispatch({ type: DELETE_NOTICE, payload: id })
    })
    .catch((error: Error) => {
      dispatch({ type: CREATE_NOTICE_ERROR, payload: error })
    })

  console.log("deleteDoc", deleteDoc)
}

export const updateNotice = (
  notice: INoticeWithMeta
): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()

  firestore
    .collection("notices")
    .doc(notice.id)
    .set(notice)
    .then(() => {
      dispatch({ type: CREATE_NOTICE, payload: notice })
    })
    .catch((error: Error) => {
      dispatch({ type: CREATE_NOTICE_ERROR, payload: error })
    })
}
