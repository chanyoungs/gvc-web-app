// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { isLoaded, useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { LoadingBackdrop } from "src/components/Level1/Backdrops/LoadingBackdrop"
import { AppState } from "src/store/reducers/rootReducer"
import { Themes } from "src/types"
import { localise } from "src/utils/localisation"

import { ThemeEditor } from "./ThemeEditor"

// const useStyles = makeStyles((theme: Theme) => createStyles({}))

interface ISThemeEditorPage {
  name: string
}

export const ThemeEditorPage: FC = () => {
  // const classes = useStyles()

  useFirestoreConnect([{ collection: "themes" }])
  useFirestoreConnect([{ collection: "settings" }])

  const themes = useSelector<AppState, Themes>(
    (state) => state.firestore.data.themes
  )

  const settings = useSelector<AppState, any>(
    (state) => state.firestore.data.settings
  )

  return (
    <Fragment>
      <AppBarMain
        title={localise({ english: "Theme Editor", korean: "테마 편집기" })}
      />

      {isLoaded(themes) && isLoaded(settings) ? (
        <ThemeEditor themes={themes} currentThemeName={settings.theme.name} />
      ) : (
        <LoadingBackdrop background={false} />
      )}
    </Fragment>
  )
}
