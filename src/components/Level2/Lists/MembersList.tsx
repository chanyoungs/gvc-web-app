import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"
import { useSelector } from "react-redux"
import { MemberListItem } from "src/components/Level1/ListItems/MemberListItem"
import { AppState } from "src/store/reducers/rootReducer"

import { IMemberDownload } from "../../../types"
import { CustomList } from "./CustomList"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    IconButtonAddMember: {
      background: theme.palette.common.white,
      color: theme.palette.background.default,
      padding: theme.spacing(1),
    },
    IconButtonEditMember: {
      background: theme.palette.background.default,
      color: theme.palette.common.white,
      padding: theme.spacing(1),
    },
    IconButtonRemoveMember: {
      background: theme.palette.common.white,
      color: theme.palette.background.default,
      padding: theme.spacing(1),
    },
    paper: {
      background: theme.palette.primary.main,
      width: "100%",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    textEdit: {
      color: theme.palette.secondary.light,
    },
    textMember: {
      color: theme.palette.secondary.dark,
    },
  })
)

export interface MembersListProps {
  members: IMemberDownload[]
  editMode: boolean
}

export const MembersList: FC<MembersListProps> = ({ members, editMode }) => {
  const classes = useStyles()

  const search = useSelector<AppState, string>((state) => state.appBar.search)

  const members_ =
    members &&
    [...members]
      .filter((member) =>
        member.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .sort((member1, member2) => {
        return member1.name > member2.name ? 1 : -1
      })

  return (
    <CustomList
      items={members_}
      render={(member) => <MemberListItem key={member.id} member={member} />}
    />
  )
}
