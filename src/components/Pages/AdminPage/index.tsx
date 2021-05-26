import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { AddCellMemberPaper } from "src/components/Level1/Papers/AddCellMemberPaper"
import { MembersList } from "src/components/Level2/Lists/MembersList"
import { Notices } from "src/components/Level2/SwipeableListViews/Notices"
import { AppState } from "src/store/reducers/rootReducer"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface AdminPageProps {}

export const AdminPage: FC<AdminPageProps> = (props) => {
  const classes = useStyles()

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
      <AppBarMain title="Members" />
      <ContainerMain>
        <Notices notices={noticesArr} />
        <AddCellMemberPaper />
        <MembersList members={membersArr} />
      </ContainerMain>
    </Fragment>
  )
}
