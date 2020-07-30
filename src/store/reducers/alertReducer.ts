import { ALERT_SAVED, AlertActionTypes } from "src/types/actions"

export interface IAlertState {
  saved: boolean
}

const initState: IAlertState = {
  saved: false,
}

export const alertReducer = (
  state: IAlertState = initState,
  action: AlertActionTypes
): IAlertState => {
  switch (action.type) {
    case ALERT_SAVED:
      return { ...state, saved: action.payload }
    default:
      return state
  }
}
