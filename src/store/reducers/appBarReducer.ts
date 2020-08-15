import { AppBarActionTypes } from "../../types/actions"

export interface AppBarState {
  search: string
}

const initState: AppBarState = {
  search: "",
}

export const appBarReducer = (
  state = initState,
  action: AppBarActionTypes
): AppBarState => {
  switch (action.type) {
    case "SEARCH_ON_CHANGE":
      return { ...state, search: action.payload }

    default:
      return state
  }
}
