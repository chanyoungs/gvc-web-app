import { AppBarActionTypes, SEARCH_ON_CHANGE, SET_DRAWER_OPEN } from "../../types/actions"

export interface AppBarState {
  search: string
  drawerWidth: number
  drawerOpen: boolean
}

const initState: AppBarState = {
  search: "",
  drawerWidth: 240,
  drawerOpen: false,
}

export const appBarReducer = (
  state = initState,
  action: AppBarActionTypes
): AppBarState => {
  switch (action.type) {
    case SEARCH_ON_CHANGE:
      return { ...state, search: action.payload }
    case SET_DRAWER_OPEN:
      return { ...state, drawerOpen: action.payload }
    default:
      return state
  }
}
