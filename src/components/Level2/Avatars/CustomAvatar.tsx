import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"
import { useDispatch } from "react-redux"
import { OPEN_PROFILE_DIALOG } from "src/store/actions/types"
import { IMemberDownload } from "src/types"

const useStyles = makeStyles<Theme, { size?: number }>((theme) =>
  createStyles({
    avatar: {
      width: (props) => props.size && theme.spacing(props.size),
      height: (props) => props.size && theme.spacing(props.size),
    },
    iconButton: {
      padding: 0,
    },
  })
)

export interface CustomAvatarProps {
  member: IMemberDownload
  size?: number
  padding?: boolean
}

export const CustomAvatar: FC<CustomAvatarProps> = (props) => {
  const classes = useStyles({ size: props.size })
  const dispatch = useDispatch()
  const onClick = () =>
    dispatch({ type: OPEN_PROFILE_DIALOG, payload: props.member })

  return (
    <IconButton
      onClick={onClick}
      className={props.padding ? undefined : classes.iconButton}
    >
      <Avatar
        className={props.size ? classes.avatar : undefined}
        alt={props.member.name}
        src={props.member.thumbnailUrl}
      />
    </IconButton>
  )
}
