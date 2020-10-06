import { ALERT_CLOSE, ALERT_SAVED, AlertActionTypes } from "src/store/actions/types"

export interface IAlertState {
  open: boolean
  message: string
}

const initState: IAlertState = {
  open: false,
  message: "",
}

export const alertReducer = (
  state = initState,
  action: AlertActionTypes
): IAlertState => {
  switch (action.type) {
    case ALERT_SAVED:
      return { ...state, open: true, message: action.payload }
    case ALERT_CLOSE:
      return { ...state, open: false }
    default:
      return state
  }
}
