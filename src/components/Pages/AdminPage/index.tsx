import Divider from "@material-ui/core/Divider"
import InputBase from "@material-ui/core/InputBase"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import SearchIcon from "@material-ui/icons/Search"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import SwipeableViews from "react-swipeable-views"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { MembersList } from "src/components/Level2/Lists/MembersList"
import { Notices } from "src/components/Level2/SwipeableListViews/Notices"
import { AppState } from "src/store/reducers/rootReducer"

import { SortMenu } from "../../Level2/Menus/SortMenu"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      paddingLeft: theme.spacing(1),
      display: "flex",
      alignItems: "center",
    },
    searchBar: {
      flex: 1,
    },
    icon: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    iconButton: {
      padding: 0,
    },
    padding: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
)

export interface AdminPageProps {}

export const AdminPage: FC<AdminPageProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [adminModeIndex, setAdminModeIndex] = useState(0)

  // Get notices from Firestore
  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])

  // Get members from Firestore
  useFirestoreConnect([
    {
      collection: "members",
    },
  ])
  const stateFS = useSelector<AppState, any>((state) => state.firestore)
  const membersArr = stateFS.ordered.members
  const noticesArr = stateFS.ordered.notices

  return (
    <Fragment>
      <AppBarMain title="Admin" />
      <ContainerMain>
        <Notices notices={noticesArr} />
        <Tabs
          variant="fullWidth"
          value={adminModeIndex}
          onChange={(event: React.ChangeEvent<{}>, value: number) =>
            setAdminModeIndex(value)
          }
        >
          <Tab label="New Members" />
          <Tab label="All Members" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={adminModeIndex}
          onChangeIndex={setAdminModeIndex}
        >
          <Fragment>New members list</Fragment>
          <Fragment>
            <div className={classes.padding}>
              <Paper className={classes.search}>
                <div className={classes.icon}>
                  <SearchIcon />
                </div>
                <InputBase className={classes.searchBar} />
                <Divider orientation="vertical" flexItem />
                <SortMenu />
              </Paper>
            </div>
            <div className={classes.padding}>
              <MembersList members={membersArr} />
            </div>
          </Fragment>
        </SwipeableViews>
      </ContainerMain>
    </Fragment>
  )
}
