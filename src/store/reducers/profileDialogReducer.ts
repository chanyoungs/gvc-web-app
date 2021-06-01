import { IMemberDownload } from "src/types"

import {
  CLOSE_PROFILE_DIALOG,
  OPEN_PROFILE_DIALOG,
  ProfileDialogActionTypes,
  UNMOUNT_PROFILE_DIALOG,
} from "../actions/types"

export interface ProfileDialogState {
  member: null | IMemberDownload
  open: boolean
}

const initState: ProfileDialogState = {
  member: null,
  open: false,
}

export const profileDialogReducer = (
  state = initState,
  action: ProfileDialogActionTypes
): ProfileDialogState => {
  switch (action.type) {
    case OPEN_PROFILE_DIALOG:
      return { member: action.payload, open: true }
    case CLOSE_PROFILE_DIALOG:
      return { ...state, open: false }
    case UNMOUNT_PROFILE_DIALOG:
      return { member: null, open: false }
    default:
      return state
  }
}
