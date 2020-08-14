import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"

import { AppState } from "../../store/reducers/rootReducer"
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
  const [values, setValues] = useState<ISMembersPage>({
    editMode: false,
  })

  const setEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setValues({ ...values, editMode: !values.editMode })
  }

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
  const membersArr = stateFS.ordered.members
  const noticesArr = stateFS.ordered.notices

  return (
    <Fragment>
      <AppBarMain title="Members" />
      <ContainerMain>
        <Notices notices={noticesArr} />
        <AddCellMemberPaper />
        <MembersList members={membersArr} editMode={values.editMode} />
      </ContainerMain>
    </Fragment>
  )
}
