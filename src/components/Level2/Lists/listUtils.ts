import { IMemberDownload, IMemberUpload } from "src/types"

export const getName = (member: IMemberDownload | IMemberUpload) =>
  member.nameKor || member.nameEng

export const sortMembers = (
  member1: IMemberDownload,
  member2: IMemberDownload
) => (getName(member1) > getName(member2) ? 1 : -1)

export const filterMembersSearch = (search: string) => (member: any) =>
  getName(member).toLocaleLowerCase().includes(search.toLocaleLowerCase())
