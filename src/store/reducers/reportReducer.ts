import {
  ReportActionTypes,
  UPDATE_ATTENDANCE,
  UPDATE_BATCH_REPORTS,
  UPDATE_PRAYER,
  UPDATE_REPORT,
} from "src/store/actions/types"
import { IReports } from "src/types"

import { getReportDocId } from "../actions/reportActions"

const initState: IReports = {}

export const reportReducer = (
  state = initState,
  action: ReportActionTypes
): IReports => {
  switch (action.type) {
    case UPDATE_REPORT:
      return {
        ...state,
        [getReportDocId(action.payload)]: action.payload,
      }
    case UPDATE_BATCH_REPORTS:
      return {
        ...state,
        ...action.payload,
      }
    case UPDATE_PRAYER:
      return {
        ...state,
        [action.payload.reportId]: {
          ...state[action.payload.reportId],
          prayer: action.payload.prayer,
        },
      }
    case UPDATE_ATTENDANCE:
      return {
        ...state,
        [action.payload.reportId]: {
          ...state[action.payload.reportId],
          attendance: action.payload.attendance,
        },
      }
    default:
      return state
  }
}
