import { TPrayerQueries } from "src/types"

import { PrayerActionTypes } from "../actions/types"

export interface PrayerState {
  queries: TPrayerQueries
}

const initState: PrayerState = {
  queries: [],
}

export const prayerReducer = (
  state = initState,
  action: PrayerActionTypes
): PrayerState => {
  switch (action.type) {
    case "QUERY_PRAYER":
      console.log("Prayer query:", action.payload)
      return { ...state, queries: action.payload }
    default:
      return state
  }
}
