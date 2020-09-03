import { Dispatch } from "redux"
import { QUERY_PRAYER } from "src/store/actions/types"
import { TPrayerQueries } from "src/types"

export const queryPrayer = (
  prayerQueries: TPrayerQueries,
  navigateToPrayerPage: () => void
) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: QUERY_PRAYER,
      payload: prayerQueries,
    })
    navigateToPrayerPage()
  }
}
