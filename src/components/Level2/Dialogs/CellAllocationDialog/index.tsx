import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { AppState } from "src/store/reducers/rootReducer"

import { CellAllocationDialogContents } from "./CellAllocationDialogContents"

export interface CellAllocationDialogProps {}

export const CellAllocationDialog: FC<CellAllocationDialogProps> = () => {
  const { mount, onConfirm, ...cellAllocationProps } = useSelector<
    AppState,
    AppState["dialog"]["cellAllocation"]
  >((state) => state.dialog.cellAllocation)

  return (
    <Fragment>
      {mount && onConfirm && (
        <CellAllocationDialogContents
          {...cellAllocationProps}
          onConfirm={onConfirm}
        />
      )}
    </Fragment>
  )
}
