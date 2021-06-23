import { createSelector } from "reselect"
import { AppState } from "src/store/reducers/rootReducer"
import { IMembersDownload, IMembersWithId } from "src/types"

import { CELL_MEMBERS_DOWNLOAD } from "./../../components/App"

export const getMembersWithIds = createSelector<
  AppState,
  IMembersDownload,
  IMembersWithId
>(
  (state) => state.firestore.data[CELL_MEMBERS_DOWNLOAD],
  (membersDownloadData) => {
    const membersWithId: IMembersWithId = {}
    membersDownloadData &&
      Object.keys(membersDownloadData).forEach((id) => {
        membersWithId[id] = { ...membersDownloadData[id], id }
      })
    return membersWithId
  }
)
