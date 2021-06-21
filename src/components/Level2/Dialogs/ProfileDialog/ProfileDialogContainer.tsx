// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CELL_MEMBERS_DOWNLOAD } from "src/components/App"
import { CLOSE_PROFILE_DIALOG, UNMOUNT_PROFILE_DIALOG } from "src/store/actions/types"
import { AppState } from "src/store/reducers/rootReducer"
import { IMemberDownload, IMemberWithId } from "src/types"

import { ProfileDialogContents } from "./ProfileDialogContents"

// const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileDialogContainerProps {
  memberId: string
  open: boolean
}

export const ProfileDialogContainer: FC<ProfileDialogContainerProps> = (
  props
) => {
  // const classes = useStyles()
  const dispatch = useDispatch()
  const memberFS = useSelector<AppState, null | IMemberWithId>((state) => {
    const members: { [key: string]: IMemberDownload } =
      state.firestore.data[CELL_MEMBERS_DOWNLOAD]
    return props.memberId && members
      ? { ...members[props.memberId], id: props.memberId }
      : null
  })

  const [memberLocal, setMemberLocal] = useState<IMemberWithId | null>(null)

  useEffect(() => {
    if (memberFS) setMemberLocal(memberFS)
  }, [props.memberId, memberFS])

  return (
    memberLocal && (
      <ProfileDialogContents
        member={memberLocal}
        open={props.open}
        handleClose={() => dispatch({ type: CLOSE_PROFILE_DIALOG })}
        onExited={() => dispatch({ type: UNMOUNT_PROFILE_DIALOG })}
      />
    )
  )
}
