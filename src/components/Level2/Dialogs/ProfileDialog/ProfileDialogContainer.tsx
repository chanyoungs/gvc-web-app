// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CLOSE_PROFILE_DIALOG, UNMOUNT_PROFILE_DIALOG } from "src/store/actions/types"
import { AppState } from "src/store/reducers/rootReducer"
import { getCellMembersWithIds } from "src/store/selectors/members"
import { IMemberWithId } from "src/types"

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
  const memberFS = useSelector<AppState, null | IMemberWithId>(
    (state) => getCellMembersWithIds(state)[props.memberId]
  )

  const [memberLocal, setMemberLocal] = useState<IMemberWithId | null>(null)

  useEffect(() => {
    if (memberFS) setMemberLocal(memberFS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.memberId])

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
