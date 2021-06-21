// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { AppState } from "src/store/reducers/rootReducer"

import { ProfileDialogContainer } from "./ProfileDialogContainer"



// const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileDialogProps {}

export const ProfileDialog: FC<ProfileDialogProps> = () => {
  const { memberId, open } = useSelector<
    AppState,
    AppState["dialog"]["profile"]
  >((state) => state.dialog.profile)

  return (
    <Fragment>
      {memberId && <ProfileDialogContainer memberId={memberId} open={open} />}
    </Fragment>
  )
}
