import { Language } from "src/types"

export const languageRef: { value: Language } = { value: "korean" }

export const localise = (texts: { [key in Language]: string }) =>
  texts[languageRef.value]
