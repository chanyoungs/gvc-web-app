import React, { FC, Fragment, useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { AppState } from "src/store/reducers/rootReducer"
import { getCellMembersWithIds } from "src/store/selectors/members"
import { IMembersWithIdCollection, IMemberWithId } from "src/types"

import { ProfileDialogContents } from "./ProfileDialogContents"

export interface ProfileDialogProps {}

export const ProfileDialog: FC<ProfileDialogProps> = () => {
  const { memberId, open } = useSelector<
    AppState,
    AppState["dialog"]["profile"]
  >((state) => state.dialog.profile)

  const membersFS = useSelector<AppState, IMembersWithIdCollection>(
    getCellMembersWithIds
  )

  const [memberLocal, setMemberLocal] = useState<IMemberWithId | null>(null)

  useEffect(() => {
    if (membersFS)
      setMemberLocal(memberId === null ? null : membersFS[memberId])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId])

  return (
    <Fragment>
      {memberLocal && (
        <ProfileDialogContents member={memberLocal} open={open} />
      )}
    </Fragment>
  )
}
