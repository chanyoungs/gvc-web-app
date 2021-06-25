import {
  CLOSE_CELL_ALLOCATION_DIALOG,
  CLOSE_PROFILE_DIALOG,
  DialogActionTypes,
  OPEN_CELL_ALLOCATION_DIALOG,
  OPEN_PROFILE_DIALOG,
  UNMOUNT_CELL_ALLOCATION_DIALOG,
  UNMOUNT_PROFILE_DIALOG,
} from "../actions/types"

export interface DialogState {
  profile: { memberId: null | string; open: boolean }
  cellAllocation: {
    cellCurrent?: string
    cellRequest?: string
    open: boolean
    mount: boolean
    onConfirm: null | ((chosenCellId: string) => void)
  }
}

const initState: DialogState = {
  profile: { memberId: null, open: false },
  cellAllocation: { open: false, mount: false, onConfirm: null },
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
      return { ...state, profile: initState.profile }
    case OPEN_CELL_ALLOCATION_DIALOG:
      return {
        ...state,
        cellAllocation: {
          cellCurrent: action.payload.cellCurrent,
          cellRequest: action.payload.cellRequest,
          open: true,
          mount: true,
          onConfirm: action.payload.onConfirm,
        },
      }
    case CLOSE_CELL_ALLOCATION_DIALOG:
      return {
        ...state,
        cellAllocation: { ...state.cellAllocation, open: false },
      }
    case UNMOUNT_CELL_ALLOCATION_DIALOG:
      return {
        ...state,
        cellAllocation: initState.cellAllocation,
      }
    default:
      return state
  }
}
