import {
  CLOSE_PROFILE_DIALOG,
  OPEN_PROFILE_DIALOG,
  ProfileDialogActionTypes,
  UNMOUNT_PROFILE_DIALOG,
} from "../actions/types"

export interface ProfileDialogState {
  memberId: null | string
  open: boolean
}

const initState: ProfileDialogState = {
  memberId: null,
  open: false,
}

export const profileDialogReducer = (
  state = initState,
  action: ProfileDialogActionTypes
): ProfileDialogState => {
  switch (action.type) {
    case OPEN_PROFILE_DIALOG:
      return { memberId: action.payload, open: true }
    case CLOSE_PROFILE_DIALOG:
      return { ...state, open: false }
    case UNMOUNT_PROFILE_DIALOG:
      return { memberId: null, open: false }
    default:
      return state
  }
}
