import { IReports } from "src/types"

import { IFBError, IReport } from "./../../types"
import {
  ALERT_SAVED,
  ALERT_SAVED_ERROR,
  ThunkActionCustom,
  UPDATE_ATTENDANCE,
  UPDATE_BATCH_REPORTS,
  UPDATE_PRAYER,
  UPDATE_REPORT,
} from "./types"

export const getReportDocId = (report: IReport) =>
  `${report.date}-${report.memberId}`

export const updateBatchReports = (reports: IReports) => ({
  type: UPDATE_BATCH_REPORTS,
  payload: reports,
})

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

export const uploadReport = (
  report: IReport,
  alert: boolean = true
): ThunkActionCustom<void> => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  try {
    await firestore
      .collection("reports")
      .doc(getReportDocId(report))
      .set(report)
    if (alert)
      dispatch({
        type: ALERT_SAVED,
        payload: "Changes saved.",
      })
  } catch (error) {
    dispatch({ type: ALERT_SAVED_ERROR, payload: error })
    console.error("Upload Report Error", error)
  }
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
      .doc(getReportDocId(reports[key]))
      .set(reports[key])
  )

  try {
    await Promise.all(Promises)
    dispatch({
      type: ALERT_SAVED,
      payload: "Changes saved.",
    })
    callback()
  } catch (error) {
    dispatch({ type: ALERT_SAVED_ERROR, payload: error })
    console.error("Upload Report Error", error)
  }
}
