import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme"
import firebase from "firebase"

// ---Themes---
export type Themes = {
  [key: string]: { output: string; input: string }
}

// ---Members---

export type Language = "english" | "korean"

interface IMember {
  id: string
  name: string
  cell: string
  positions: string[]
  photoUrl: string
  thumbnailUrl: string
  settings?: { language: Language }
}

export interface IMemberDownload extends IMember {
  dob: firebase.firestore.Timestamp // dob passed from Firestore is a Timestamp data type which needs to be converted first to Date type
}

export interface IMemberUpload extends IMember {
  dob: Date | null // dob passed from Firestore is a Timestamp data type which needs to be converted first to Date type
}

// ---Notices---
export interface INotice {
  title: string
  content: string
}

export interface INoticeWithMeta extends INotice {
  id: string
  createdAt: firebase.firestore.Timestamp
}

// ---Prayers---
export interface IPrayer {
  content: string
  id?: string
  date: any
  memberId: string
}

export type TPrayerQueries = [string, string, any][]

// --Reports--
export interface IReport {
  id?: string
  memberId: string
  cell: string
  date: string
  prayer: string
  attendance: {
    service: boolean
    cell: boolean
    info: string
  }
}

export type IReports = { [key: string]: IReport }

// ---Auth---
// Types
export type AuthTypes = {
  email: string
  password: string
  name: string
  dob: Date | null
  gender: "male" | "female" | null
  phoneNumber: string
  kakaoId: string
  previousChurch: string
  previousVolunteering: string
  faithStart?: "child" | "elementary" | "middle" | "high" | "youth" | "recent"
  londonPurpose?:
    | "work"
    | "workingHoliday"
    | "university"
    | "language"
    | "businessTrip"
    | "travel"
  occupation: string
  howDidYouHearInternet: boolean
  howDidYouHearIntroduced: string
  howDidYouHearOther: string
  serviceFeedback: string
  rememberMe: boolean
  agreeTAndC: boolean
  photoUrl: string
}

// Auth Interface
export type IResetPassword = Pick<AuthTypes, "email">
export type ISignIn = Pick<AuthTypes, "email" | "password" | "rememberMe">
export type ISignUp = Pick<
  AuthTypes,
  | "email"
  | "password"
  | "name"
  | "dob"
  | "gender"
  | "phoneNumber"
  | "kakaoId"
  | "previousChurch"
  | "previousVolunteering"
  | "faithStart"
  | "londonPurpose"
  | "occupation"
  | "howDidYouHearInternet"
  | "howDidYouHearIntroduced"
  | "howDidYouHearOther"
  | "serviceFeedback"
  | "agreeTAndC"
>

// Firebase Error Interface
export interface IFBError {
  code: string
  message: string
}

// ---Pages---
export type Paths =
  | "/"
  | "/auth"
  | "/bible"
  | "/bulletin"
  | "/calendar"
  | "/dates"
  | "/members"
  | "/myaccount"
  | "/notices"
  | "/playground"
  | "/prayers"
  | "/private"
  | "/public"
  | "/reports"
  | "/theme"

// ---Bibles---
export interface IBibles {
  info: {
    bookEng: string
    bookEnglish: string
    bookKor: string
    bookKorean: string
    chapter: number
    indexChapter: number
    ref: string
  }
  verses: {
    verse: number
    indexVerse: number
    text: string
  }[]
}
