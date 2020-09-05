import { AppBarActionTypes, SEARCH_ON_CHANGE, SET_DRAWER_OPEN, SET_DRAWER_TRANSITION } from "../actions/types"

export interface AppBarState {
  search: string
  drawerWidth: number
  drawerOpen: boolean
  drawerTransition: boolean
}

const initState: AppBarState = {
  search: "",
  drawerWidth: 240,
  drawerOpen: false,
  drawerTransition: true,
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
    case SET_DRAWER_TRANSITION:
      return { ...state, drawerTransition: action.payload }
    default:
      return state
  }
}
