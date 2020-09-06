import { Dispatch } from "redux"

import { SEARCH_ON_CHANGE } from "./types"

export const appBarSearchOnChange = (search: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: SEARCH_ON_CHANGE, payload: search })
  }
}
