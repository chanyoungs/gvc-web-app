import { IMemberWithId } from "src/types"

import { ADD_MEMBERS_WITH_ID, MembersActionTypes } from "../actions/types"

export interface MembersReducer {
  data: { [key: string]: IMemberWithId }
  ordered: IMemberWithId[]
}
const initState: MembersReducer = { data: {}, ordered: [] }

export const membersReducer = (
  state = initState,
  action: MembersActionTypes
): MembersReducer => {
  switch (action.type) {
    case ADD_MEMBERS_WITH_ID:
      return action.payload
    default:
      return state
  }
}
