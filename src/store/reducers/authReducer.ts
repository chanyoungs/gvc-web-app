import { IFBError } from "../../types"
import { AuthActionTypes } from "../actions/types"

export interface AuthState {
  signInError: IFBError | null
  signUpError: IFBError | null
  resetPasswordError: IFBError | null
  resetPasswordSuccess: string | null
}

const initState: AuthState = {
  signInError: null,
  signUpError: null,
  resetPasswordError: null,
  resetPasswordSuccess: null,
}

export const authReducer = (
  state = initState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case "SIGN_UP":
      console.log("Sign up successful!")
      return { ...state, signUpError: null }

    case "SIGN_UP_ERROR":
      console.log("Sign up error!")
      console.error(action.payload)
      return { ...state, signUpError: action.payload }

    case "MEMBER_PROFILE_CREATED":
      console.log("Member Profile Created Successfully!")
      return initState

    case "MEMBER_PROFILE_CREATED_ERROR":
      console.log("Member Profile Creating Error!")
      console.error(action.payload)
      return state

    case "SIGN_IN":
      console.log("Sign in successful!")
      return initState

    case "SIGN_IN_ERROR":
      console.log("Sign in error!")
      console.error(action.payload)
      return { ...state, signInError: action.payload }

    case "REMEMBER_ME":
      console.log(
        action.payload
          ? "Login made persistent successful!"
          : "Login made non-persistent successful!"
      )
      return state

    case "REMEMBER_ME_ERROR":
      console.log("Persistence login error!")
      console.error(action.payload)
      return state

    case "RESET_PASSWORD":
      console.log("Passsword reset link sent!")
      return {
        ...initState,
        resetPasswordSuccess:
          "Password reset link has been sent to your email. Please check your email.",
      }

    case "RESET_PASSWORD_ERROR":
      console.log("Passsword reset link sending error!")
      console.error(action.payload)
      return { ...state, resetPasswordError: action.payload }

    case "SIGN_OUT":
      console.log("Sign out successful!")
      return initState

    case "SIGN_OUT_ERROR":
      console.log("Sign out error!")
      console.error(action.payload)
      return state

    case "EDIT_PROFILE":
      console.log("Profile edit successful!")
      return state

    case "EDIT_PROFILE_ERROR":
      console.log("Profile edit error!")
      console.error(action.payload)
      return state

    case "UPLOAD_PHOTO":
      console.log("Photo upload successful!")
      return state

    case "UPLOAD_PHOTO_ERROR":
      console.log("Photo upload error!")
      console.error(action.payload)
      return state

    default:
      return state
  }
}
