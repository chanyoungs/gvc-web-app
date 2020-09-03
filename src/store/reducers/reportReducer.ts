import { IReport, IReports } from "src/types"
import { ReportActionTypes, UPDATE_ATTENDANCE, UPDATE_PRAYER, UPDATE_REPORT } from "src/types/actions"

const initState: IReports = {}

export const reportReducer = (
  state = initState,
  action: ReportActionTypes
): IReports => {
  switch (action.type) {
    case UPDATE_REPORT:
      return {
        ...state,
        [action.payload.memberId]: action.payload,
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
