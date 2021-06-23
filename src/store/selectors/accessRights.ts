import { createSelector } from "reselect"
import { AppState } from "src/store/reducers/rootReducer"
import { ICells, IMemberDownload } from "src/types"

export const checkAdmin = createSelector<AppState, string[], string, boolean>(
  [
    (state) => state.firestore.data.access?.admins.admins,
    (state) => state.firebase.auth.uid,
  ],
  (admins, uid) => admins && admins.includes(uid)
)

export const checkCellLeader = createSelector<
  AppState,
  string,
  IMemberDownload,
  ICells,
  boolean
>(
  [
    (state) => state.firebase.auth.uid,
    (state) => state.firebase.profile,
    (state) => state.firestore.data.cells?.cells,
  ],
  (uid, profile, cells) =>
    profile.cell in cells && cells[profile.cell].leaders.includes(uid)
)
