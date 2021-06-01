import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CLOSE_PROFILE_DIALOG, UNMOUNT_PROFILE_DIALOG } from "src/store/actions/types"
import { AppState } from "src/store/reducers/rootReducer"

import { ProfileDialogContents } from "./ProfileDialogContents"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileDialogProps {}

export const ProfileDialog: FC<ProfileDialogProps> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { member, open } = useSelector<AppState, AppState["profileDialog"]>(
    (state) => state.profileDialog
  )

  return (
    member && (
      <ProfileDialogContents
        member={member}
        open={open}
        handleClose={() => dispatch({ type: CLOSE_PROFILE_DIALOG })}
        onExited={() => dispatch({ type: UNMOUNT_PROFILE_DIALOG })}
      />
    )
  )
}
