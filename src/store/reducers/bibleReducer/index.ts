import { IBibleRef } from "src/components/Pages/BiblePage"
import { BibleActionTypes } from "src/store/actions/types"

import { bibleIndex, BibleIndex } from "./bibleIndex"

export interface BibleState {
  index: BibleIndex
  ref: IBibleRef
}

const initState = {
  index: bibleIndex,
  ref: {
    translation: "niv" as IBibleRef["translation"],
    book: null,
    chapter: null,
  },
}

export const bibleReducer = (
  state: BibleState = initState,
  action: BibleActionTypes
): BibleState => {
  switch (action.type) {
    case "SET_BIBLE_REFERENCE":
      return { ...state, ref: action.payload }
    case "SET_BIBLE_REFERENCE_ERROR":
      return state
    default:
      return state
  }
}
