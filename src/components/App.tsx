import { createMuiTheme, CssBaseline } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { MuiThemeProvider } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { isLoaded, useFirestoreConnect } from "react-redux-firebase"
import { BrowserRouter, Link, Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom"
import { Themes } from "src/types"
import WebFont from "webfontloader"

import { PrivateRoute } from "../auth/PrivateRoute"
import { AppState } from "../store/reducers/rootReducer"
import { ServiceWorkerAlert } from "./Level1/Alerts/ServiceWorkerAlert"
import { AppBarMain } from "./Level1/AppBars/AppBarMain"
import { LoadingBackdrop } from "./Level1/Backdrops/LoadingBackdrop"
import { Font } from "./Level1/Dialogs/FontDialog"
import { ProfileDialog } from "./Level2/Dialogs/ProfileDialog"
import { AdminPage } from "./Pages/AdminPage"
import { AuthPage } from "./Pages/AuthPage"
import { BiblePage } from "./Pages/BiblePage"
import { BulletinPage } from "./Pages/BulletinPage"
import { CalendarPage } from "./Pages/CalendarPage"
import { DatesPage } from "./Pages/DatesPage"
import { MembersPage } from "./Pages/MembersPage"
import { MyAccountPage } from "./Pages/MyAccountPage"
import { NoticesPage } from "./Pages/NoticesPage"
import { Playground } from "./Pages/Playground"
import { ReportsPage } from "./Pages/ReportsPage"
import { ThemeEditorPage } from "./Pages/ThemeEditorPage"

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
  useFirestoreConnect([{ collection: "access" }])

  const themes = useSelector<AppState, Themes>(
    (state) => state.firestore.data.themes
  )

  const fonts = useSelector<AppState, Font[]>(
    (state) => state.firestore.ordered.fonts
  )

  const settings = useSelector<AppState, any>(
    (state) => state.firestore.data.settings
  )

  const isAdmin = useSelector<AppState, boolean>((state) =>
    state.firestore.data.access?.admins.admins.includes(state.firebase.auth.uid)
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
          <CssBaseline />
          <div className={classes.root}>
            <ServiceWorkerAlert />
            <ProfileDialog />
            <BrowserRouter>
              <Switch>
                <PrivateRoute path="/" exact component={ReportsPage} />
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
                <PrivateRoute
                  path="/admin"
                  redirectConditionMet={!isAdmin}
                  redirectPath="/"
                  component={AdminPage}
                />
                <PrivateRoute path="/members" component={MembersPage} />
                <PrivateRoute path="/myaccount" component={MyAccountPage} />
                <PrivateRoute path="/dates" component={DatesPage} />
                <PrivateRoute path="/notices" component={NoticesPage} />
                <PrivateRoute path="/calendar" component={CalendarPage} />
                <PrivateRoute path="/reports" component={ReportsPage} />
                <PrivateRoute path="/theme" component={ThemeEditorPage} />
                <PrivateRoute path="/bulletin" component={BulletinPage} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </BrowserRouter>
          </div>
        </MuiThemeProvider>
      ) : (
        <LoadingBackdrop />
      )}
    </Fragment>
  )
}
