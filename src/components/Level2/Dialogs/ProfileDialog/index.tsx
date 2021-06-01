import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CLOSE_PROFILE_DIALOG, UNMOUNT_PROFILE_DIALOG } from "src/store/actions/types"
import { AppState } from "src/store/reducers/rootReducer"
import { IMemberDownload } from "src/types"

import { ProfileDialogContents } from "./ProfileDialogContents"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileDialogProps {}

export const ProfileDialog: FC<ProfileDialogProps> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { memberId, open } = useSelector<AppState, AppState["profileDialog"]>(
    (state) => state.profileDialog
  )

  const member = useSelector<AppState, IMemberDownload>((state) => {
    const members = state.firestore.data.members
    return memberId && members && members[memberId]
  })

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
