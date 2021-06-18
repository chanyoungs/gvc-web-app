import { ThunkActionCustom } from "src/store/actions/types"
import { IMemberDownload, IMemberWithId, Language } from "src/types"

import { CELL_MEMBERS_DOWNLOAD } from "./../components/App"

export const languageSwitcher =
  (text: { english: string; korean: string }): ThunkActionCustom<void> =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    const state = getState()

    const member: IMemberWithId = {
      ...state.firestore.data[CELL_MEMBERS_DOWNLOAD][state.firebase.auth.uid],
      id: state.firebase.auth.uid,
    }
    let language: Language = "english"

    if (member?.settings) {
      language = member.settings.language
    }

    return text[language]
  }
