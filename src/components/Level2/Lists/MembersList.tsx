import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"
import { useSelector } from "react-redux"
import { MemberListItem } from "src/components/Level1/ListItems/MemberListItem"
import { AppState } from "src/store/reducers/rootReducer"

import { IMemberDownload } from "../../../types"
import { CustomList } from "./CustomList"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface MembersListProps {
  members: IMemberDownload[]
  secondaryAction?: (member: IMemberDownload) => React.ReactNode
}

export const MembersList: FC<MembersListProps> = ({
  members,
  secondaryAction,
}) => {
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
      render={(member) => (
        <MemberListItem
          key={member.id}
          member={member}
          secondaryAction={secondaryAction}
        />
      )}
    />
  )
}
