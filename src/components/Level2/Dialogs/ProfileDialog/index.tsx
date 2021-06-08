import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CLOSE_PROFILE_DIALOG, UNMOUNT_PROFILE_DIALOG } from "src/store/actions/types"
import { AppState } from "src/store/reducers/rootReducer"
import { IMemberDownload } from "src/types"

import { ProfileDialogContainer } from "./ProfileDialogContainer"
import { ProfileDialogContents } from "./ProfileDialogContents"

const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileDialogProps {}

export const ProfileDialog: FC<ProfileDialogProps> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { memberId, open } = useSelector<AppState, AppState["profileDialog"]>(
    (state) => state.profileDialog
  )

  return (
    <Fragment>
      {memberId && <ProfileDialogContainer memberId={memberId} open={open} />}
    </Fragment>
  )
}
