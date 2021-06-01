import Avatar from "@material-ui/core/Avatar"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { FC } from "react"
import { CustomAvatar } from "src/components/Level2/Avatars/CustomAvatar"
import { ProfileMenu } from "src/components/Level2/Menus/ProfileMenu"
import { IMemberDownload } from "src/types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      border: "1px solid #e0e0e0",
    },
  })
)
export interface MemberListItemProps {
  member: IMemberDownload
  secondaryAction?: (member: IMemberDownload) => React.ReactNode
}

export const MemberListItem: FC<MemberListItemProps> = ({
  member,
  secondaryAction,
}) => {
  const classes = useStyles()

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar>
        <CustomAvatar member={member} />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<Typography>{member.name}</Typography>}
      />
      <ListItemSecondaryAction>
        {secondaryAction ? secondaryAction(member) : <ProfileMenu />}
      </ListItemSecondaryAction>
    </ListItem>
  )
}
