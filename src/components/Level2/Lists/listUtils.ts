import { IMemberDate, IMemberWithId } from "src/types"

export const getName = (member: IMemberWithId | IMemberDate) =>
  member.nameKor || member.nameEng

export const sortMembers = (member1: IMemberWithId, member2: IMemberWithId) =>
  getName(member1) > getName(member2) ? 1 : -1

export const filterMembersSearch =
  (search: string) => (member: IMemberWithId | IMemberDate) =>
    getName(member).toLocaleLowerCase().includes(search.toLocaleLowerCase())
