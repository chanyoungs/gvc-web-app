import Avatar from "@material-ui/core/Avatar"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { FC } from "react"
import { IMemberDownload } from "src/types"

import { ProfileMenu } from "../Menus/ProfileMenu"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      border: "1px solid #e0e0e0",
    },
  })
)
export interface MemberListItemProps {
  member: IMemberDownload
}

export const MemberListItem: FC<MemberListItemProps> = ({ member }) => {
  const classes = useStyles()

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar>
        <Avatar alt={member.name} src={member.thumbnailUrl} />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<Typography>{member.name}</Typography>}
      />
      <ListItemSecondaryAction>
        <ProfileMenu edge="end" />
      </ListItemSecondaryAction>
    </ListItem>
  )
}
