import { ALERT_SAVED, ALERT_SAVED_ERROR, ThunkActionCustom } from "../../types/actions"
import { IFBError, IReport } from "./../../types"

const getDocId = (report: IReport) => `${report.date}-${report.memberId}`

export const updateReport = (report: IReport): ThunkActionCustom<void> => (
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
