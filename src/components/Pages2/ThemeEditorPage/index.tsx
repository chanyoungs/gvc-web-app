import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { isLoaded, useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { AppState } from "src/store/reducers/rootReducer"
import { Themes } from "src/types"

import { ThemeEditor } from "./ThemeEditor"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

interface ISThemeEditorPage {
  name: string
}

export const ThemeEditorPage: FC = () => {
  const classes = useStyles()

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
      <AppBarMain title="Theme Editor" />

      {isLoaded(themes) && isLoaded(settings) ? (
        <ThemeEditor themes={themes} currentThemeName={settings.theme.name} />
      ) : (
        "Loading..."
      )}
    </Fragment>
  )
}
