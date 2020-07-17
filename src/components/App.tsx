import { createMuiTheme } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { isLoaded, useFirestoreConnect } from "react-redux-firebase"
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom"
import { Themes } from "src/types"
import WebFont from "webfontloader"

import { PrivateRoute } from "../auth/PrivateRoute"
import { AppState } from "../store/reducers/rootReducer"
import { AppBarMain } from "./Level1/AppBars/AppBarMain"
import { Font } from "./Level1/Dialogs/FontDialog"
import { AuthPage } from "./Pages/AuthPage"
import { BiblePage } from "./Pages/BiblePage"
import { CalendarPage } from "./Pages/CalendarPage"
import { DatesPage } from "./Pages/DatesPage"
import { LeaderFormPage } from "./Pages/LeaderFormPage"
import { MembersPage } from "./Pages/MembersPage"
import { MyAccountPage } from "./Pages/MyAccountPage"
import { NoticesPage } from "./Pages/NoticesPage"
import { Playground } from "./Pages/Playground"
import { PrayersPage } from "./Pages/PrayersPage"
import SignInUpPage from "./Pages/SignInUpPage"
import { PrayersPage as PrayersPage2 } from "./Pages2/PrayersPage"
import { ThemeEditorPage } from "./Pages2/ThemeEditorPage"

// import LeaderDatePage from "./Pages/LeaderDatePage"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // background: theme.palette.background.default,
      // height: "100%",
      padding: 0,
      margin: 0,
    },
  })
)

export default function App() {
  const styles = useSelector((state: { styles: any }) => state.styles)
  const classes = useStyles(styles)
  const isAuthenticated = useSelector<AppState, boolean>(
    (state) => !state.firebase.auth.isEmpty
  )

  const location = useLocation<{ from: string }>()
  const fromOrHome: string = location.state?.from || "/"

  useFirestoreConnect([{ collection: "themes" }])
  useFirestoreConnect([{ collection: "fonts" }])
  useFirestoreConnect([{ collection: "settings" }])

  const themes = useSelector<AppState, Themes>(
    (state) => state.firestore.data.themes
  )

  const fonts = useSelector<AppState, Font[]>(
    (state) => state.firestore.ordered.fonts
  )

  const settings = useSelector<AppState, any>(
    (state) => state.firestore.data.settings
  )

  if (isLoaded(fonts) && fonts.length > 0) {
    WebFont.load({
      google: {
        families: fonts.map((font) => font.font),
      },
    })
  }

  return (
    <Fragment>
      {isLoaded(themes) && isLoaded(settings) ? (
        <MuiThemeProvider
          theme={createMuiTheme(
            JSON.parse(themes[settings.theme.name]["output"])
          )}
        >
          <div className={classes.root}>
            <BrowserRouter>
              <Switch>
                <PrivateRoute path="/" exact component={MembersPage} />
                <Route path="/public" component={Playground} />
                <Route path="/bible" component={BiblePage} />
                <Route path="/playground" component={Playground} />
                <PrivateRoute
                  path="/auth"
                  redirectConditionMet={isAuthenticated}
                  checkFrom
                  component={AuthPage}
                />
                <PrivateRoute path="/private" component={MembersPage} />
                <PrivateRoute path="/members" component={MembersPage} />
                <PrivateRoute path="/myaccount" component={MyAccountPage} />
                <PrivateRoute path="/prayers" component={PrayersPage} />
                <PrivateRoute path="/dates" component={DatesPage} />
                <PrivateRoute path="/notices" component={NoticesPage} />
                <PrivateRoute path="/calendar" component={CalendarPage} />
                <PrivateRoute path="/prayers2" component={PrayersPage2} />
                <PrivateRoute path="/theme" component={ThemeEditorPage} />
              </Switch>
            </BrowserRouter>
          </div>
        </MuiThemeProvider>
      ) : (
        "Loading..."
      )}
    </Fragment>
  )
}
