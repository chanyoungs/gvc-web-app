import { IReports } from "src/types"

import {
  ALERT_SAVED,
  ALERT_SAVED_ERROR,
  ThunkActionCustom,
  UPDATE_ATTENDANCE,
  UPDATE_PRAYER,
  UPDATE_REPORT,
} from "../../types/actions"
import { IFBError, IReport } from "./../../types"

const getDocId = (report: IReport) => `${report.date}-${report.memberId}`

export const updateReport = (report: IReport) => ({
  type: UPDATE_REPORT,
  payload: report,
})

export const updatePrayer = (reportId: string, prayer: string) => ({
  type: UPDATE_PRAYER,
  payload: { reportId, prayer },
})

export const updateAttendance = (
  reportId: string,
  attendance: IReport["attendance"]
) => ({
  type: UPDATE_ATTENDANCE,
  payload: { reportId, attendance },
})

export const uploadReport = (report: IReport): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()

  firestore
    .collection("reports")
    .doc(getDocId(report))
    .set(report)
    .then(() => {
      dispatch({ type: ALERT_SAVED, payload: true })
    })
    .catch((error: IFBError) => {
      dispatch({ type: ALERT_SAVED_ERROR, payload: error })
      console.error("Upload Report Error", error)
    })
}

export const batchUploadReports = (
  callback: () => void
): ThunkActionCustom<void> => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const reports = getState().reports

  const Promises = Object.keys(reports).map((key) =>
    firestore
      .collection("reports")
      .doc(getDocId(reports[key]))
      .set(reports[key])
  )

  try {
    await Promise.all(Promises)
    dispatch({ type: ALERT_SAVED, payload: true })
    callback()
  } catch (error) {
    dispatch({ type: ALERT_SAVED_ERROR, payload: error })
    console.error("Upload Report Error", error)
  }
}
