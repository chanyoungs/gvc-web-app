import { createSelector } from "reselect"
import { AppState } from "src/store/reducers/rootReducer"
import { IMembersDownloadCollection, IMembersWithIdCollection, IMemberWithId } from "src/types"

import { CELL_MEMBERS_DOWNLOAD } from "./../../components/App"

export const getCellMembersWithIds = createSelector<
  AppState,
  IMembersDownloadCollection,
  IMembersWithIdCollection
>(
  (state) => state.firestore.data[CELL_MEMBERS_DOWNLOAD],
  (membersDownloadData) => {
    const membersWithId: IMembersWithIdCollection = {}
    membersDownloadData &&
      Object.keys(membersDownloadData).forEach((id) => {
        membersWithId[id] = { ...membersDownloadData[id], id }
      })
    return membersWithId
  }
)

export const getAllMembersWithIds = createSelector<
  AppState,
  IMembersDownloadCollection,
  IMembersWithIdCollection
>(
  (state) => state.firestore.data.members,
  (membersDownloadData) => {
    const membersWithId: IMembersWithIdCollection = {}
    membersDownloadData &&
      Object.keys(membersDownloadData).forEach((id) => {
        membersWithId[id] = { ...membersDownloadData[id], id }
      })
    return membersWithId
  }
)

export const getProfileWithId = createSelector<
  AppState,
  string,
  AppState["firebase"]["profile"],
  IMemberWithId
>(
  [(state) => state.firebase.auth.uid, (state) => state.firebase.profile],
  (uid, profile) => ({ ...profile, id: uid })
)
