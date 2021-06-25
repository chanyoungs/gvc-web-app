// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomMenu } from "src/components/Level1/Menus/CustomMenu"
import { updateMemberCell } from "src/store/actions/adminActions"
import { OPEN_CELL_ALLOCATION_DIALOG, OPEN_PROFILE_DIALOG } from "src/store/actions/types"
import { AppState } from "src/store/reducers/rootReducer"
import { checkAdmin, checkCellLeader } from "src/store/selectors/accessRights"
import { IMemberWithId } from "src/types"
import { localise } from "src/utils/localisation"

// const useStyles = makeStyles<Theme>((theme) => createStyles({}))

export interface ProfileMenuProps {
  member: IMemberWithId
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ member }) => {
  // const classes = useStyles()
  const dispatch = useDispatch()
  const isAdmin = useSelector<AppState, boolean>(checkAdmin)
  const isCellLeader = useSelector<AppState, boolean>(checkCellLeader)

  const menus = [
    {
      label: localise({ english: "Profile", korean: "프로필 보기" }),
      onClick: () => {
        dispatch({ type: OPEN_PROFILE_DIALOG, payload: member.id })
      },
    },
  ]
  if (isAdmin || isCellLeader)
    menus.push({
      label: localise({ english: "Change cell", korean: "셀 배정" }),
      onClick: () =>
        dispatch({
          type: OPEN_CELL_ALLOCATION_DIALOG,
          payload: {
            cellCurrent: member.cell,
            cellRequest: member.cellRequest,
            onConfirm: (chosenCellId: string) =>
              dispatch(
                updateMemberCell({
                  memberId: member.id,
                  newCellId: chosenCellId,
                })
              ),
          },
        }),
    })
  return <CustomMenu menus={menus} icon={<MoreVertIcon />} edge="end" />
}
