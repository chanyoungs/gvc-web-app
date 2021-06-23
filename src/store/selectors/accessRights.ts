import { createSelector } from "reselect"
import { AppState } from "src/store/reducers/rootReducer"
import { getProfileWithId } from "src/store/selectors/members"
import { ICells, IMemberWithId } from "src/types"

export const checkAdmin = createSelector<AppState, string[], string, boolean>(
  [
    (state) => state.firestore.data.access?.admins.admins,
    (state) => state.firebase.auth.uid,
  ],
  (admins, uid) => admins && admins.includes(uid)
)

export const checkCellLeader = createSelector<
  AppState,
  IMemberWithId,
  ICells,
  boolean
>(
  [getProfileWithId, (state) => state.firestore.data.cells?.cells],
  (profile, cells) =>
    profile.cell in cells && cells[profile.cell].leaders.includes(profile.id)
)
