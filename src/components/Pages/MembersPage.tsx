import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { localise } from "src/utils/localisation"
import { membersDownloadToMembersWithId } from "src/utils/membersConversion"

import { AppState } from "../../store/reducers/rootReducer"
import { CELL_MEMBERS_DOWNLOAD } from "../App"
import { AddCellMemberPaper } from "../Level1/Papers/AddCellMemberPaper"
import { MembersList } from "../Level2/Lists/MembersList"
import { Notices } from "../Level2/SwipeableListViews/Notices"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface MembersPageProps {}

export interface ISMembersPage {
  editMode: boolean
}

export const MembersPage: FC<MembersPageProps> = (props) => {
  const classes = useStyles()
  const profile = useSelector<AppState, any>((state) => state.firebase.profile)

  // Get notices from Firestore
  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])

  // Get members from Firestore
  useFirestoreConnect([
    {
      collection: "members",
      where: ["cell", "==", profile.cell ? profile.cell : ""], // querying cell == "" return permission error
    },
  ])
  const stateFS = useSelector<AppState, any>((state) => state.firestore)
  const membersArr = membersDownloadToMembersWithId(
    stateFS.data[CELL_MEMBERS_DOWNLOAD]
  ).ordered
  const noticesArr = stateFS.ordered.notices

  return (
    <Fragment>
      <AppBarMain title={localise({ english: "Members", korean: "멤버" })} />
      <ContainerMain>
        <Notices notices={noticesArr} />
        <AddCellMemberPaper />
        <MembersList members={membersArr} />
      </ContainerMain>
    </Fragment>
  )
}
