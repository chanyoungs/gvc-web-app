import { IMemberDownload, IMemberUpload } from "src/types"

export const memberDownloadToUpload = (
  member: IMemberDownload
): IMemberUpload => ({ ...member, dob: member.dob.toDate() })
