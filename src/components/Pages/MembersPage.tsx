import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { getCellMembersWithIds } from "src/store/selectors/members"
import { IMembersWithIdCollection } from "src/types"
import { localise } from "src/utils/localisation"

import { AppState } from "../../store/reducers/rootReducer"
import { MembersList } from "../Level2/Lists/MembersList"

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
// const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface MembersPageProps {}

export interface ISMembersPage {
  editMode: boolean
}

export const MembersPage: FC<MembersPageProps> = (props) => {
  // const classes = useStyles()
  const membersWithId = useSelector<AppState, IMembersWithIdCollection>(
    getCellMembersWithIds
  )
  const membersArr = Object.values(membersWithId)

  return (
    <Fragment>
      <AppBarMain title={localise({ english: "Members", korean: "멤버" })} />
      <ContainerMain>
        <MembersList members={membersArr} />
      </ContainerMain>
    </Fragment>
  )
}
