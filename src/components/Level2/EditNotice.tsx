import React from "react"

import { INoticeWithMeta } from "../../types"
import { EditNoticePaper } from "../Level1/Papers/EditNoticePaper"

export interface EditNoticeProps {
  notices: INoticeWithMeta[] | undefined
}

export const EditNotice: React.FC<EditNoticeProps> = ({ notices }) => {
  let contents
  if (!notices) {
    contents = <div data-testid="edit-loading">Loading...</div>
  } else if (notices.length === 0) {
    contents = <div data-testid="edit-instructions">광고가 없습니다.</div>
  } else {
    contents = (
      <div>
        {notices.map((notice) => (
          <div key={notice.id} data-testid="edit-notices">
            <EditNoticePaper notice={notice} />
          </div>
        ))}
      </div>
    )
  }
  return contents
}
