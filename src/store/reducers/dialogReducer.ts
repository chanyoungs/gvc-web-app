import {
  CLOSE_PROFILE_DIALOG,
  DialogActionTypes,
  OPEN_CELL_ALLOCATION_DIALOG,
  OPEN_PROFILE_DIALOG,
  UNMOUNT_PROFILE_DIALOG,
} from "../actions/types"

export interface DialogState {
  profile: { memberId: null | string; open: boolean }
  cellAllocation: {
    memberId: null | string
    open: boolean
    onConfirm: null | ((chosenCellId: string) => void)
  }
}

const initState: DialogState = {
  profile: { memberId: null, open: false },
  cellAllocation: { memberId: null, open: false, onConfirm: null },
}

export const dialogReducer = (
  state = initState,
  action: DialogActionTypes
): DialogState => {
  switch (action.type) {
    case OPEN_PROFILE_DIALOG:
      return { ...state, profile: { memberId: action.payload, open: true } }
    case CLOSE_PROFILE_DIALOG:
      return { ...state, profile: { ...state.profile, open: false } }
    case UNMOUNT_PROFILE_DIALOG:
      return { ...state, profile: { memberId: null, open: false } }
    case OPEN_CELL_ALLOCATION_DIALOG:
      return {
        ...state,
        cellAllocation: {
          memberId: action.payload.memberId,
          open: true,
          onConfirm: action.payload.onConfirm,
        },
      }
    default:
      return state
  }
}
