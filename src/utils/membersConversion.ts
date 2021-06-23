import { IMemberDate, IMemberWithId } from "src/types"

export const memberWithIdToDate = (member: IMemberWithId): IMemberDate => ({
  ...member,
  dob: member.dob.toDate(),
})
