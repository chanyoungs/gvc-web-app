import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import SwipeableViews from "react-swipeable-views"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { MembersList } from "src/components/Level2/Lists/MembersList"
import { Notices } from "src/components/Level2/SwipeableListViews/Notices"
import { AppState } from "src/store/reducers/rootReducer"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

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
          <Tab label="Full Congregation" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={adminModeIndex}
          onChangeIndex={setAdminModeIndex}
        >
          <>New members list</>
          <MembersList members={membersArr} />
        </SwipeableViews>
      </ContainerMain>
    </Fragment>
  )
}
