import { auth } from "../../firebase"
import { IFBError, ISignIn, ISignUp } from "../../types"
import { ThunkActionCustom } from "../../types/actions"

interface ISetSubmitting {
  setSubmitting: (isSubmitting: boolean) => void
}

// Sign Up Member
export const signUp = ({
  email,
  pw,
  name,
  dob,
  agreeTAndC,
  setSubmitting,
}: ISignUp & ISetSubmitting): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  setSubmitting(true)
  const firestore = getFirestore()
  const firebase = getFirebase()

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pw)
    .then(value => {
      dispatch({ type: "SIGN_UP" })
      console.log("Sign up succesful!")

      // Create Member Profile
      firestore
        .collection("members")
        .doc(value.user?.uid)
        .set({
          name,
          dob,
          cell: "",
          positions: [],
          agreeTAndC,
        })
        .then(() => {
          dispatch({ type: "MEMBER_PROFILE_CREATED" })
          setSubmitting(false)
        })
        .catch((error: IFBError) => {
          dispatch({ type: "MEMBER_PROFILE_CREATED_ERROR", payload: error })
          console.log(error)
          setSubmitting(false)
        })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "SIGN_UP_ERROR", payload: error })
      console.log(error)
      setSubmitting(false)
    })
}

// Sign In Member
export const signIn = ({
  email,
  pw,
  rememberMe,
  setSubmitting,
}: ISignIn & ISetSubmitting): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  setSubmitting(true)
  console.log("Remember me: ", rememberMe)
  const firebase = getFirebase()
  firebase
    .auth()
    .setPersistence(
      rememberMe ? auth.Auth.Persistence.LOCAL : auth.Auth.Persistence.SESSION // There are some type definition missing on ExtendedFirebaseInstance and so used original auth function from firebase
    )
    .then(() => {
      dispatch({ type: "REMEMBER_ME", payload: rememberMe })
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pw)
        .then(() => {
          dispatch({ type: "SIGN_IN" })
          console.log("Sign in succesful!")
          setSubmitting(false)
        })
        .catch((error: IFBError) => {
          dispatch({ type: "SIGN_IN_ERROR", payload: error })
          console.log(error)
          setSubmitting(false)
        })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "REMEMBER_ME_ERROR", payload: error })
      console.log(error)
      setSubmitting(false)
    })
}

// Send reset password link
export const resetPassword = ({
  email,
  setSubmitting,
}: { email: string } & ISetSubmitting): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  setSubmitting(true)
  const firebase = getFirebase()
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Password reset link sent!")
      dispatch({ type: "RESET_PASSWORD" })
      setSubmitting(false)
    })
    .catch((error: IFBError) => {
      console.log("Password reset link sending error!")
      dispatch({ type: "RESET_PASSWORD_ERROR", payload: error })
      setSubmitting(false)
    })
}

// Sign Out Member
export const signOut = (): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firebase = getFirebase()

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "SIGN_OUT" })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "SIGN_OUT_ERROR", payload: error })
      console.log(error)
    })
}
