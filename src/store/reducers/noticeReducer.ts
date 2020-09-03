import { NoticeActionTypes } from "../actions/types"

export const noticeReducer = (state = null, action: NoticeActionTypes) => {
  switch (action.type) {
    case "CREATE_NOTICE":
      return state
    case "CREATE_NOTICE_ERROR":
      return state
    default:
      return state
  }
}
