import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { MembersList } from "src/components/Level2/Lists/MembersList"
import { AppState } from "src/store/reducers/rootReducer"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface AdminPageProps {}

export const AdminPage: FC<AdminPageProps> = (props) => {
  const classes = useStyles()

  // Get members from Firestore
  useFirestoreConnect([
    {
      collection: "members",
    },
  ])
  const stateFS = useSelector<AppState, any>((state) => state.firestore)
  const membersArr = stateFS.ordered.members

  return (
    <Fragment>
      <ContainerMain>
        <MembersList members={membersArr} editMode={false} />
      </ContainerMain>
    </Fragment>
  )
}
