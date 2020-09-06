import { ThunkActionCustom } from "src/store/actions/types"
import { IMemberDownload, Language } from "src/types"

export const languageSwitcher = (text: {
  english: string
  korean: string
}): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const state = getState()

  const member: IMemberDownload =
    state.firestore.data.members[state.firebase.auth.uid]
  let language: Language = "english"

  if (member?.settings) {
    language = member.settings.language
  }

  return text[language]
}
