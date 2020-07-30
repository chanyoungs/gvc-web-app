import { ExtendedFirestoreInstance, getFirebase } from "react-redux-firebase"
import { ThunkAction } from "redux-thunk"
import { Font } from "src/components/Level1/Dialogs/FontDialog"
import { IBibleRef } from "src/components/Pages/BiblePage"

import { IFBError, INotice, TPrayerQueries } from "."
import { AppState } from "../store/reducers/rootReducer"

// Setup
export type ThunkActionCustom<ReturnType> = ThunkAction<
  ReturnType,
  AppState,
  {
    getFirebase: typeof getFirebase
    // getFirebase: (() => typeof firebase) & typeof getFirebase
    getFirestore: () => ExtendedFirestoreInstance
  },
  AppActions
>

// Alert actions
export const ALERT_SAVED = "ALERT_SAVED"
export interface AlertSaved {
  type: typeof ALERT_SAVED
  payload: boolean
}

export const ALERT_SAVED_ERROR = "ALERT_SAVED_ERROR"
export interface AlertSavedError {
  type: typeof ALERT_SAVED_ERROR
  payload: IFBError
}

export type AlertActionTypes = AlertSaved | AlertSavedError

// Theme actions
export const UPLOAD_THEME = "UPLOAD_THEME"
export interface UploadTheme {
  type: typeof UPLOAD_THEME
}

export const UPLOAD_THEME_ERROR = "UPLOAD_THEME_ERROR"
export interface UploadThemeError {
  type: typeof UPLOAD_THEME_ERROR
  payload: IFBError
}

export const DELETE_THEME = "DELETE_THEME"
export interface DeleteTheme {
  type: typeof DELETE_THEME
}

export const DELETE_THEME_ERROR = "DELETE_THEME_ERROR"
export interface DeleteThemeError {
  type: typeof DELETE_THEME_ERROR
  payload: IFBError
}

export const SET_CURRENT_THEME_NAME = "SET_CURRENT_THEME_NAME"
export interface SetCurrentThemeName {
  type: typeof SET_CURRENT_THEME_NAME
  payload: string
}

export const SET_CURRENT_THEME_NAME_ERROR = "SET_CURRENT_THEME_NAME_ERROR"
export interface SetCurrentThemeNameError {
  type: typeof SET_CURRENT_THEME_NAME_ERROR
  payload: IFBError
}

export type ThemeActionTypes =
  | UploadTheme
  | UploadThemeError
  | SetCurrentThemeName
  | SetCurrentThemeNameError
  | DeleteTheme
  | DeleteThemeError

// Theme actions
export const UPLOAD_FONT = "UPLOAD_FONT"
export interface UploadFont {
  type: typeof UPLOAD_FONT
}

export const UPLOAD_FONT_ERROR = "UPLOAD_FONT_ERROR"
export interface UploadFontError {
  type: typeof UPLOAD_FONT_ERROR
  payload: IFBError
}

export const DELETE_FONT = "DELETE_FONT"
export interface DeleteFont {
  type: typeof DELETE_FONT
}

export const DELETE_FONT_ERROR = "DELETE_FONT_ERROR"
export interface DeleteFontError {
  type: typeof DELETE_FONT_ERROR
  payload: IFBError
}

export type FontActionTypes =
  | UploadFont
  | UploadFontError
  | DeleteFont
  | DeleteFontError

// Notice actions
export const CREATE_NOTICE = "CREATE_NOTICE"
export interface CreateNotice {
  type: typeof CREATE_NOTICE
  payload: INotice
}

export const CREATE_NOTICE_ERROR = "CREATE_NOTICE_ERROR"
export interface CreateNoticeError {
  type: typeof CREATE_NOTICE_ERROR
  payload: Error
}

export const DELETE_NOTICE = "DELETE_NOTICE"
export interface DeleteNotice {
  type: typeof DELETE_NOTICE
  payload: string
}

export const DELETE_NOTICE_ERROR = "DELETE_NOTICE_ERROR"
export interface DeleteNoticeError {
  type: typeof DELETE_NOTICE_ERROR
  payload: IFBError
}

export type NoticeActionTypes =
  | CreateNotice
  | CreateNoticeError
  | DeleteNotice
  | DeleteNoticeError

// Prayer actions
export const QUERY_PRAYER = "QUERY_PRAYER"
export interface QueryPrayer {
  type: typeof QUERY_PRAYER
  payload: TPrayerQueries
}

export const QUERY_PRAYER_ERROR = "QUERY_PRAYER_ERROR"
export interface QueryPrayerError {
  type: typeof QUERY_PRAYER_ERROR
  payload: IFBError
}

export type PrayerActionTypes = QueryPrayer | QueryPrayerError

// Auth actions
export const SIGN_UP = "SIGN_UP"
export interface SignUp {
  type: typeof SIGN_UP
}

export const SIGN_UP_ERROR = "SIGN_UP_ERROR"
export interface SignUpError {
  type: typeof SIGN_UP_ERROR
  payload: IFBError
}

export const MEMBER_PROFILE_CREATED = "MEMBER_PROFILE_CREATED"
export interface MemberProfileCreated {
  type: typeof MEMBER_PROFILE_CREATED
}

export const MEMBER_PROFILE_CREATED_ERROR = "MEMBER_PROFILE_CREATED_ERROR"
export interface MemberProfileCreatedError {
  type: typeof MEMBER_PROFILE_CREATED_ERROR
  payload: IFBError
}

export const SIGN_IN = "SIGN_IN"
export interface SignIn {
  type: typeof SIGN_IN
}

export const SIGN_IN_ERROR = "SIGN_IN_ERROR"
export interface SignInError {
  type: typeof SIGN_IN_ERROR
  payload: IFBError
}

export const REMEMBER_ME = "REMEMBER_ME"
export interface RememberMe {
  type: typeof REMEMBER_ME
  payload: boolean
}

export const REMEMBER_ME_ERROR = "REMEMBER_ME_ERROR"
export interface RememberMeError {
  type: typeof REMEMBER_ME_ERROR
  payload: IFBError
}

export const RESET_PASSWORD = "RESET_PASSWORD"
export interface ResetPassword {
  type: typeof RESET_PASSWORD
}

export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR"
export interface ResetPasswordError {
  type: typeof RESET_PASSWORD_ERROR
  payload: IFBError
}

export const SIGN_OUT = "SIGN_OUT"
export interface SignOut {
  type: typeof SIGN_OUT
}

export const SIGN_OUT_ERROR = "SIGN_OUT_ERROR"
export interface SignOutError {
  type: typeof SIGN_OUT_ERROR
  payload: IFBError
}

export const EDIT_PROFILE = "EDIT_PROFILE"
export interface EditProfile {
  type: typeof EDIT_PROFILE
}

export const EDIT_PROFILE_ERROR = "EDIT_PROFILE_ERROR"
export interface EditProfileError {
  type: typeof EDIT_PROFILE_ERROR
  payload: IFBError
}

export const UPLOAD_PHOTO = "UPLOAD_PHOTO"
export interface UploadPhoto {
  type: typeof UPLOAD_PHOTO
}

export const UPLOAD_PHOTO_ERROR = "UPLOAD_PHOTO_ERROR"
export interface UploadPhotoError {
  type: typeof UPLOAD_PHOTO_ERROR
  payload: Error
}

export const DELETE_PHOTO = "DELETE_PHOTO"
export interface DeletePhoto {
  type: typeof DELETE_PHOTO
}

export const DELETE_PHOTO_ERROR = "DELETE_PHOTO_ERROR"
export interface DeletePhotoError {
  type: typeof DELETE_PHOTO_ERROR
  payload: IFBError
}

export type AuthActionTypes =
  | SignUp
  | SignUpError
  | MemberProfileCreated
  | MemberProfileCreatedError
  | SignIn
  | SignInError
  | RememberMe
  | RememberMeError
  | ResetPassword
  | ResetPasswordError
  | SignOut
  | SignOutError
  | EditProfile
  | EditProfileError
  | UploadPhoto
  | UploadPhotoError
  | DeletePhoto
  | DeletePhotoError
  | DeleteNotice
  | DeleteNoticeError
  | UploadTheme
  | UploadThemeError
  | SetCurrentThemeName
  | SetCurrentThemeNameError
  | DeleteTheme
  | DeleteThemeError

// AppBar Actions
export const SEARCH_ON_CHANGE = "SEARCH_ON_CHANGE"
export interface SearchOnChange {
  type: typeof SEARCH_ON_CHANGE
  payload: string
}

export type AppBarActionTypes = SearchOnChange

// Bible Actions
export const SET_BIBLE_REFERENCE = "SET_BIBLE_REFERENCE"
export interface SetBibleReference {
  type: typeof SET_BIBLE_REFERENCE
  payload: IBibleRef
}

export const SET_BIBLE_REFERENCE_ERROR = "SET_BIBLE_REFERENCE_ERROR"
export interface SetBibleReferenceError {
  type: typeof SET_BIBLE_REFERENCE_ERROR
  payload: IFBError
}

export type BibleActionTypes = SetBibleReference | SetBibleReferenceError

// All Action types
export type AppActions =
  | NoticeActionTypes
  | PrayerActionTypes
  | AuthActionTypes
  | AppBarActionTypes
  | BibleActionTypes
  | ThemeActionTypes
  | FontActionTypes
  | AlertActionTypes
