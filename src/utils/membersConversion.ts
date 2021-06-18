import { MembersReducer } from "src/store/reducers/membersReducer"
import { IMemberDate, IMemberDownload, IMemberWithId } from "src/types"

export const memberWithIdToDate = (member: IMemberWithId): IMemberDate => ({
  ...member,
  dob: member.dob.toDate(),
})

export const memberDownloadToMembersWithId = (
  memberDownload: IMemberDownload,
  id: string
): IMemberWithId => ({ ...memberDownload, id })

export const membersDownloadToMembersWithId = (membersDownloadData: {
  [key: string]: IMemberDownload
}): MembersReducer => {
  const membersReducer: MembersReducer = { data: {}, ordered: [] }
  membersDownloadData &&
    Object.keys(membersDownloadData).forEach((id) => {
      const memberWithId: IMemberWithId = { ...membersDownloadData[id], id }
      membersReducer.data[id] = memberWithId
      membersReducer.ordered.push(memberWithId)
    })
  return membersReducer
}
